// src/components/Chapter7/Footer.tsx

import { motion } from 'framer-motion';
import { Mail, Download, ArrowUp, MessageCircle } from 'lucide-react';
import { FooterData } from '../../types';

interface FooterProps {
  footerData: FooterData;
}

export const Footer = ({ footerData }: FooterProps) => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-6"
          >
            {footerData.greeting}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-base mb-8"
          >
            以上内容，仅是个人 AI 化中的一部分的实践和思考，如感兴趣，欢迎联系
          </motion.p>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-6 mb-8"
          >
            <a
              href={`mailto:${footerData.contact.email}`}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>{footerData.contact.email}</span>
            </a>
            <div className="flex items-center gap-2 text-slate-300">
              <MessageCircle className="w-5 h-5" />
              <span>微信：{footerData.contact.wechat}</span>
            </div>
          </motion.div>

          {/* Download Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-4 mb-8"
          >
            {footerData.downloads.map((download, index) => (
              <a
                key={index}
                href={download.url}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Download className="w-5 h-5" />
                {download.label}
              </a>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="border-t border-slate-700 my-8" />

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-slate-500 text-sm"
          >
            {footerData.copyright}
          </motion.p>
        </div>

        {/* Back to Top Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={handleBackToTop}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
            回到顶部
          </button>
        </motion.div>
      </div>
    </footer>
  );
};
