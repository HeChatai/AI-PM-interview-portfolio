// src/main.tsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Track page/section visit with IP location
let lastTrackedSection = '';

// Track a visit or event
export function trackVisit(pagePath: string, eventType: 'page_view' | 'resume_download' = 'page_view') {
  const currentSection = pagePath;

  // Don't track the same section twice within 5 seconds (only for page_view)
  if (eventType === 'page_view' && lastTrackedSection === currentSection) return;
  if (eventType === 'page_view') lastTrackedSection = currentSection;

  const trackData = {
    page_path: currentSection,
    referer: document.referrer || null,
    event_type: eventType,
    downloaded_resume: eventType === 'resume_download',
  };

  // Send tracking request
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trackData),
    keepalive: true,
  }).then(() => console.log('Tracked:', currentSection, eventType))
    .catch(err => console.error('Track error:', err));
}

// Track initial page load
trackVisit('/');

// Track section changes based on scroll position
function setupSectionTracking() {
  const sections = [
    { id: 'hero', path: '/' },
    { id: 'chapter1', path: '/chapter-1' },
    { id: 'chapter2', path: '/chapter-2' },
    { id: 'chapter3', path: '/chapter-3' },
    { id: 'chapter4', path: '/chapter-4' },
    { id: 'chapter5', path: '/chapter-5' },
    { id: 'chapter6', path: '/chapter-6' },
    { id: 'chapter7', path: '/chapter-7' },
  ];

  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = sections.find(s => s.id === entry.target.id);
        if (section) {
          trackVisit(section.path);
        }
      }
    });
  }, observerOptions);

  // Observe sections after DOM is ready
  setTimeout(() => {
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }, 1000);
}

// Setup section tracking
setupSectionTracking();

// Expose trackVisit to global scope for use in other components
(window as any).trackVisit = trackVisit;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
