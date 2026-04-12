// src/components/Chapter6/CapabilityCard.tsx

import { motion } from 'framer-motion';
import { Capability } from '../../types';
import { Star } from 'lucide-react';

interface CapabilityCardProps {
  capability: Capability;
  compact?: boolean;
}

export const CapabilityCard = ({
  capability,
  compact = false,
}: CapabilityCardProps) => {
  const handleJumpTo = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetId = capability.linkTo.replace('-problem', '-').replace('-permission', 'chapter3');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (compact) {
    return (
      <div className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-slate-900 font-semibold">{capability.name}</h4>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < capability.rating
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-slate-200 text-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-slate-600 text-sm mb-2">{capability.description}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">案例:</span>
          <span className="text-xs text-blue-600 font-medium">
            {capability.case}
          </span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-900 text-xl font-bold">{capability.name}</h3>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-6 h-6 ${
                i < capability.rating
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-slate-200 text-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-slate-600 mb-4">{capability.description}</p>

      <div className="bg-slate-50 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-2">
          <span className="text-slate-500 text-sm flex-shrink-0">案例/产物:</span>
          <p className="text-slate-700 text-sm">{capability.caseDetail}</p>
        </div>
      </div>

      <button
        onClick={handleJumpTo}
        className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm"
      >
        跳转到相关章节
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
    </motion.div>
  );
};
