// src/components/Chapter4/MetricCard.tsx

import type { MetricCard as MetricCardType } from '../../types';
import { NumberCounter } from './NumberCounter';

interface MetricCardProps {
  metric: MetricCardType;
  index: number;
  className?: string;
}

export const MetricCard = ({ metric, index, className = '' }: MetricCardProps) => {
  const getImprovementLabel = () => {
    switch (metric.improvement.type) {
      case 'absolute':
        return `+${metric.improvement.value}${metric.improvement.suffix}`;
      case 'percentage':
        return `${metric.improvement.value}${metric.improvement.suffix}`;
      case 'multiplier':
        return `${metric.improvement.value}${metric.improvement.suffix}`;
      case 'qualitative':
        return metric.improvement.suffix || '稳定';
      default:
        return '';
    }
  };

  const formatValue = (value: number | string, suffix: string) => {
    if (typeof value === 'number') {
      return `${value}${suffix}`;
    }
    return `${value}${suffix}`;
  };

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-md border border-slate-200 hover:shadow-xl hover:border-green-300 transition-all duration-300 ${className}`}>
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-400" />

      {/* Label */}
      <div className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-4">
        {metric.label}
      </div>

      {/* Before/After values */}
      <div className="flex items-baseline gap-2 mb-3">
        <div className="text-slate-400 font-semibold text-2xl">
          {formatValue(metric.before.value, metric.before.suffix)}
        </div>
        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <div className="text-green-600 font-bold text-4xl">
          <NumberCounter
            value={metric.after.value}
            duration={1500}
            delay={500 + index * 100}
            suffix={metric.after.suffix}
            decimals={typeof metric.after.value === 'number' && metric.after.value % 1 !== 0 ? 1 : 0}
          />
        </div>
      </div>

      {/* Improvement badge */}
      <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-2.5 py-1 rounded-lg text-xs font-semibold mb-3">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <span>{getImprovementLabel()}</span>
      </div>

      {/* Description */}
      <p className="text-slate-500 text-xs leading-relaxed">
        {metric.description}
      </p>
    </div>
  );
};
