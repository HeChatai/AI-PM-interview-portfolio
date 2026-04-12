// src/components/Chapter5/Chapter5.tsx

import { motion } from 'framer-motion';
import { chapter5Data } from '../../data/content';
import { InsightCard } from './InsightCard';
import { fadeInUp, staggerContainer } from '../../lib/animations';

export const Chapter5 = () => {
  const containerVariants = staggerContainer(0.15);

  return (
    <section id="chapter5" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Chapter Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="text-blue-600 font-semibold text-sm tracking-wider uppercase"
          >
            Chapter {chapter5Data.chapterNumber}
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="text-slate-900 text-3xl sm:text-4xl lg:text-5xl font-bold mt-4"
          >
            {chapter5Data.title}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-slate-600 text-lg mt-6 leading-relaxed"
          >
            {chapter5Data.introduction}
          </motion.p>
        </motion.div>

        {/* Insight Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="space-y-4"
        >
          {chapter5Data.insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </motion.div>

        {/* Transition CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-16"
        >
          <a
            href="#chapter6"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            继续看能力映射
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
