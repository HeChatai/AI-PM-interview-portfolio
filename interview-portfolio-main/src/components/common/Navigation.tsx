// src/components/common/Navigation.tsx

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';

// Import trackVisit from main
const trackVisit = (window as any).trackVisit;

const navItems = [
  { label: '问题洞察', href: '#chapter1' },
  { label: '四个真问题', href: '#chapter2' },
  { label: '实战解法', href: '#chapter3' },
  { label: '结果数据', href: '#chapter4' },
  { label: '认知沉淀', href: '#chapter5' },
  { label: '能力映射', href: '#chapter6' },
  { label: '可迁移性', href: '#chapter7' },
];

export const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = () => {
    // Track resume download
    if (trackVisit) {
      trackVisit('/resume', 'resume_download');
    }
    window.open('/resume.pdf', '_blank');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-white font-bold text-xl">
              AI PM Portfolio
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Download Button */}
            <div className="hidden md:block">
              <button
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                下载简历
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-slate-900 border-b border-slate-700 md:hidden"
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-slate-300 hover:text-white transition-colors text-sm font-medium py-2"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={handleDownload}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                下载简历
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
