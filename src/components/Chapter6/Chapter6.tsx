// src/components/Chapter6/Chapter6.tsx

import { motion } from 'framer-motion';
import { chapter6Data } from '../../data/content';
import { RadarChartComponent } from './RadarChart';
import { CapabilityCard } from './CapabilityCard';
import { fadeInUp, staggerContainer } from '../../lib/animations';

export const Chapter6 = () => {
  const containerVariants = staggerContainer(0.15);
  const cardVariants = staggerContainer(0.1);

  return (
    <section id="chapter6" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
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
            Chapter {chapter6Data.chapterNumber}
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="text-slate-900 text-3xl sm:text-4xl lg:text-5xl font-bold mt-4"
          >
            {chapter6Data.title}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-slate-600 text-lg mt-6 leading-relaxed max-w-3xl mx-auto"
          >
            {chapter6Data.introduction}
          </motion.p>
        </motion.div>

        {/* Radar Chart and Capabilities Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Radar Chart */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200"
          >
            <h3 className="text-slate-900 text-xl font-bold mb-6 text-center">
              能力雷达图
            </h3>
            <RadarChartComponent data={chapter6Data.radarData} />
          </motion.div>

          {/* Capability Summary */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="space-y-4"
          >
            {chapter6Data.capabilities.map((capability) => (
              <motion.div
                key={capability.id}
                variants={fadeInUp}
              >
                <CapabilityCard capability={capability} compact />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Transition CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-16"
        >
          <a
            href="#chapter7"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            继续看可迁移性说明
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
