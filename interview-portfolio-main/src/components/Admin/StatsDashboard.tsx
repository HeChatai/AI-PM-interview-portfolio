// src/components/Admin/StatsDashboard.tsx

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, Clock, TrendingUp, Users, FileDown } from 'lucide-react';

interface VisitStats {
  total: number;
  resumeDownloads: number;
  byCountry: { country: string; count: number }[];
  byCity: { city: string; country: string; count: number }[];
  byTimezone: { timezone: string; count: number }[];
  recent: { ip_address: string; country: string; city: string; page_path: string; event_type: string; downloaded_resume: boolean; created_at: string }[];
}

export const StatsDashboard = () => {
  const [stats, setStats] = useState<VisitStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch((_err) => {
        setError('Failed to load stats');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading stats...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">访问统计 Dashboard</h1>
          <p className="text-slate-400">实时追踪访问者地理位置数据</p>
        </motion.div>

        {/* Total Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800 rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">总访问量</p>
                <p className="text-3xl font-bold text-white">{stats?.total || 0}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-slate-800 rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-600 rounded-lg">
                <FileDown className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">简历下载</p>
                <p className="text-3xl font-bold text-white">{stats?.resumeDownloads || 0}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800 rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-600 rounded-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">国家/地区</p>
                <p className="text-3xl font-bold text-white">{stats?.byCountry.length || 0}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800 rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-600 rounded-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">城市</p>
                <p className="text-3xl font-bold text-white">{stats?.byCity.length || 0}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-800 rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-600 rounded-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">时区</p>
                <p className="text-3xl font-bold text-white">{stats?.byTimezone.length || 0}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Country Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            访问者国家/地区分布
          </h2>
          <div className="space-y-3">
            {stats?.byCountry.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-slate-300">{item.country}</span>
                <div className="flex items-center gap-4">
                  <div className="w-48 bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${((item.count / (stats.total || 1)) * 100).toFixed(1)}%` }}
                    />
                  </div>
                  <span className="text-white font-medium w-12 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* City Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            访问者城市分布 (Top 20)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="pb-3 text-slate-400 font-medium">城市</th>
                  <th className="pb-3 text-slate-400 font-medium">国家</th>
                  <th className="pb-3 text-slate-400 font-medium text-right">访问量</th>
                </tr>
              </thead>
              <tbody>
                {stats?.byCity.map((item, index) => (
                  <tr key={index} className="border-b border-slate-800">
                    <td className="py-3 text-white">{item.city || 'Unknown'}</td>
                    <td className="py-3 text-slate-400">{item.country}</td>
                    <td className="py-3 text-white text-right font-medium">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Timezone Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            时区分布
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats?.byTimezone.map((item, index) => (
              <div key={index} className="bg-slate-700 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">{item.timezone}</p>
                <p className="text-2xl font-bold text-white">{item.count}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Visits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-slate-800 rounded-xl p-6 border border-slate-700"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            最近访问记录 (Top 50)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="pb-3 text-slate-400 font-medium">IP 地址</th>
                  <th className="pb-3 text-slate-400 font-medium">地理位置</th>
                  <th className="pb-3 text-slate-400 font-medium">访问页面</th>
                  <th className="pb-3 text-slate-400 font-medium">下载简历</th>
                  <th className="pb-3 text-slate-400 font-medium text-right">时间</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recent.map((visit, index) => (
                  <tr key={index} className="border-b border-slate-800">
                    <td className="py-3 text-slate-300 font-mono text-sm">{visit.ip_address}</td>
                    <td className="py-3 text-white">
                      {visit.city && visit.country ? `${visit.city}, ${visit.country}` : visit.country}
                    </td>
                    <td className="py-3 text-blue-400">{visit.page_path}</td>
                    <td className="py-3">
                      <AnimatePresence>
                        {visit.downloaded_resume ? (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center gap-1 text-emerald-400 text-sm font-medium"
                          >
                            <FileDown className="w-4 h-4" />
                            已下载
                          </motion.span>
                        ) : (
                          <span className="text-slate-600 text-sm">-</span>
                        )}
                      </AnimatePresence>
                    </td>
                    <td className="py-3 text-slate-400 text-right text-sm">
                      {new Date(visit.created_at).toLocaleString('zh-CN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 text-center"
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            返回首页
          </a>
        </motion.div>
      </div>
    </div>
  );
};
