// src/components/Chapter4/Chapter4.tsx

import { chapter4Data } from '../../data/content';
import { AccuracyChart } from './AccuracyChart';
import { MetricCard } from './MetricCard';

export const Chapter4 = () => {
  return (
    <section
      id="chapter4"
      className="min-h-screen bg-slate-50 px-6 py-20 sm:py-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Chapter Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase">
            Chapter 04
          </span>
          <h1 className="text-slate-900 text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 max-w-4xl mx-auto">
            最终结果
          </h1>
          <p className="text-slate-600 text-lg mt-6 max-w-3xl mx-auto">
            {chapter4Data.timeline}
          </p>
        </div>

        {/* Accuracy Chart */}
        <AccuracyChart
          dataPoints={chapter4Data.accuracyCurve.dataPoints}
          milestones={chapter4Data.accuracyCurve.milestones}
        />

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {chapter4Data.metrics.map((metric, index) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              index={index}
            />
          ))}
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 lg:p-12 text-center mb-12">
          <p className="text-slate-700 text-lg leading-relaxed">
            {chapter4Data.summary}
          </p>
        </div>

        {/* Transition CTA */}
        <div className="text-center">
          <a
            href="#chapter5"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors cursor-pointer"
          >
            继续看认知沉淀
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};