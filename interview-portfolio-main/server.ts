// server.ts - Express API server for tracking visitor IP and location

import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import path from 'path';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Health check endpoint MUST be defined first (before any middleware)
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Middleware
app.use(cors());

// Serve static files FIRST (before other middleware)
const distPath = path.resolve(__dirname, '..', 'dist');
console.log('Serving static files from:', distPath);
app.use(express.static(distPath));

app.use(express.json());

// PostgreSQL connection pool (optional - works without database too)
// Railway PostgreSQL requires SSL, so we always enable it when DATABASE_URL exists
const pool = process.env.DATABASE_URL ? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
}) : null;

let dbAvailable = false;

// Log database configuration status on startup
console.log('=== Database Config ===');
console.log('DATABASE_URL present:', !!process.env.DATABASE_URL);
console.log('NODE_ENV:', process.env.NODE_ENV || 'undefined');
console.log('Pool created:', !!pool);
console.log('======================');

// Initialize database table (non-blocking - runs in background)
async function initDb() {
  if (!pool) {
    console.log('⚠️  No DATABASE_URL provided, running without database tracking');
    dbAvailable = false;
    return;
  }

  try {
    // Test connection first with timeout
    const connectionTest = Promise.race([
      pool.query('SELECT NOW()'),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timeout')), 5000))
    ]);

    await connectionTest;
    dbAvailable = true;

    // Create table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS page_visits (
        id SERIAL PRIMARY KEY,
        ip_address VARCHAR(45),
        country VARCHAR(100),
        region VARCHAR(100),
        city VARCHAR(100),
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        timezone VARCHAR(50),
        user_agent TEXT,
        referer TEXT,
        page_path VARCHAR(500),
        event_type VARCHAR(50) DEFAULT 'page_view',
        downloaded_resume BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Database table created');

    // Add new columns if they don't exist (for existing tables)
    try {
      await pool.query('ALTER TABLE page_visits ADD COLUMN IF NOT EXISTS event_type VARCHAR(50) DEFAULT \'page_view\'');
      await pool.query('ALTER TABLE page_visits ADD COLUMN IF NOT EXISTS downloaded_resume BOOLEAN DEFAULT FALSE');
      console.log('✅ Database columns added (if needed)');
    } catch (alterError) {
      console.log('Column alteration note:', alterError);
    }

    console.log('✅ Database table initialized');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    dbAvailable = false;
  }
}

// Get client IP address (handles proxies and Railway)
function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

// Fetch location data from IP using free API
async function getLocationByIp(ip: string): Promise<any> {
  if (!ip || ip === 'unknown' || ip.startsWith('10.') || ip.startsWith('192.168.')) {
    return { country: 'Private IP', region: '', city: '', lat: null, lon: null, timezone: '' };
  }

  // Try multiple IP geolocation services in order of preference
  const services = [
    // ipapi.co - HTTPS version
    async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const response = await fetch(`https://ipapi.co/${ip}/json/`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`ipapi.co: ${response.status}`);
      const data: any = await response.json();
      if (data.error) throw new Error('ipapi.co returned error');
      return {
        country: data.country_name || data.country || 'Unknown',
        region: data.region || '',
        city: data.city || '',
        lat: data.latitude || null,
        lon: data.longitude || null,
        timezone: data.timezone || '',
      };
    },
    // ip-api.com - fallback (works for non-commercial, but blocked for some hosting IPs)
    async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const response = await fetch(`http://ip-api.com/json/${ip}?fields=country,regionName,city,lat,lon,timezone,status`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`ip-api.com: ${response.status}`);
      const data: any = await response.json();
      if (data.status !== 'success') throw new Error(`ip-api.com status: ${data.status}`);
      return {
        country: data.country || 'Unknown',
        region: data.regionName || '',
        city: data.city || '',
        lat: data.lat || null,
        lon: data.lon || null,
        timezone: data.timezone || '',
      };
    },
    // ipwhois.app - another fallback
    async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const response = await fetch(`http://ipwhois.app/json2/${ip}?fields=country,region,city,latitude,longitude,timezone`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`ipwhois.app: ${response.status}`);
      const data: any = await response.json();
      if (!data.success) throw new Error('ipwhois.app returned error');
      return {
        country: data.country || 'Unknown',
        region: data.region || '',
        city: data.city || '',
        lat: data.latitude || null,
        lon: data.longitude || null,
        timezone: data.timezone || '',
      };
    },
  ];

  for (const [index, getService] of services.entries()) {
    try {
      const result = await getService();
      console.log(`IP lookup succeeded via service ${index + 1}`);
      return result;
    } catch (error) {
      console.log(`IP lookup service ${index + 1} failed:`, error);
      // Continue to next service
    }
  }

  console.error('All IP lookup services failed');
  return { country: 'Unknown', region: '', city: '', lat: null, lon: null, timezone: '' };
}

// API: Track page visit or resume download
app.post('/api/track', async (req: Request, res: Response) => {
  console.log('=== /api/track received ===');
  console.log('dbAvailable:', dbAvailable);
  console.log('pool:', !!pool);
  console.log('req.body:', req.body);

  if (!dbAvailable || !pool) {
    // Log to console but don't store
    const ip = getClientIp(req);
    console.log(`📊 Visit tracked (no DB): ${ip} - ${req.body.page_path || '/'}`);
    return res.json({ success: true, ip, location: { country: 'Logging only' }, message: 'No database configured' });
  }

  try {
    const ip = getClientIp(req);
    console.log('Client IP:', ip);
    const location = await getLocationByIp(ip);
    console.log('Location:', location);
    const { page_path = '/', referer = '', event_type = 'page_view', downloaded_resume = false } = req.body;
    const user_agent = req.headers['user-agent'] || '';

    const result = await pool.query(
      `INSERT INTO page_visits
       (ip_address, country, region, city, latitude, longitude, timezone, user_agent, referer, page_path, event_type, downloaded_resume)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING id`,
      [ip, location.country, location.region, location.city, location.lat, location.lon, location.timezone, user_agent, referer, page_path, event_type, downloaded_resume]
    );

    console.log('✅ Visit saved to DB, id:', result.rows[0]?.id);

    res.json({ success: true, ip, location });
  } catch (error) {
    console.error('❌ Track error:', error);
    res.status(500).json({ success: false, error: 'Tracking failed' });
  }
});

// API: Get visit statistics (for admin dashboard)
app.get('/api/stats', async (req: Request, res: Response) => {
  if (!dbAvailable || !pool) {
    return res.json({
      total: 0,
      resumeDownloads: 0,
      byCountry: [],
      byCity: [],
      recent: [],
      byTimezone: [],
      message: 'Database not configured - add PostgreSQL in Railway to enable tracking'
    });
  }

  try {
    // Total visits
    const totalResult = await pool.query('SELECT COUNT(*) as total FROM page_visits');
    const total = parseInt(totalResult.rows[0].total);

    // Resume downloads count
    const downloadsResult = await pool.query('SELECT COUNT(*) as count FROM page_visits WHERE downloaded_resume = true');
    const resumeDownloads = parseInt(downloadsResult.rows[0].count);

    // Visits by country
    const countryResult = await pool.query(`
      SELECT country, COUNT(*) as count
      FROM page_visits
      GROUP BY country
      ORDER BY count DESC
      LIMIT 20
    `);

    // Visits by city
    const cityResult = await pool.query(`
      SELECT city, country, COUNT(*) as count
      FROM page_visits
      WHERE city != ''
      GROUP BY city, country
      ORDER BY count DESC
      LIMIT 20
    `);

    // Recent visits
    const recentResult = await pool.query(`
      SELECT ip_address, country, city, page_path, event_type, downloaded_resume, created_at
      FROM page_visits
      ORDER BY created_at DESC
      LIMIT 50
    `);

    // Visits by timezone
    const timezoneResult = await pool.query(`
      SELECT timezone, COUNT(*) as count
      FROM page_visits
      WHERE timezone != ''
      GROUP BY timezone
      ORDER BY count DESC
    `);

    res.json({
      total,
      resumeDownloads,
      byCountry: countryResult.rows,
      byCity: cityResult.rows,
      recent: recentResult.rows,
      byTimezone: timezoneResult.rows,
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Fallback route for SPA - serve index.html for all other GET requests
// Use app.use without path pattern to catch all remaining requests
app.use((req: Request, res: Response) => {
  if (req.method === 'GET') {
    res.sendFile(path.join(distPath, 'index.html'));
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

// Start server (non-blocking database initialization)
async function start() {
  // Start server immediately - don't wait for database
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 API endpoints: /api/track (POST), /api/stats (GET), /health (GET)`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
  });

  // Initialize database in background (non-blocking)
  initDb().catch(err => console.error('Background DB init failed:', err));
}

start();
