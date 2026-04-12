// src/components/Chapter5/InsightCard.tsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Insight } from '../../types';

interface InsightCardProps {
  insight: Insight;
}

export const InsightCard = ({ insight }: InsightCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className={`cursor-pointer bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 transition-all duration-300 ${
        isExpanded ? 'shadow-lg border-blue-300' : 'hover:shadow-md hover:border-blue-200'
      }`}
      whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
    >
      <div className="flex items-start gap-6">
        {/* Number Badge */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
            {insight.number}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-900 text-xl font-bold pr-4">
              {insight.title}
            </h3>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                className="w-6 h-6 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {insight.content}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {insight.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
