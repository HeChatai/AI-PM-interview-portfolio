// src/components/Chapter1/Chapter1.tsx

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Building2, Lightbulb, CheckCircle, ChevronDown } from 'lucide-react';
import { chapter1Data } from '../../data/content';
import { fadeInUp, staggerContainer } from '../../lib/animations';

export const Chapter1 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="min-h-screen bg-white px-6 py-32">
      <div className="max-w-7xl mx-auto">
        {/* Chapter Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase">
            Chapter {chapter1Data.chapterNumber}
          </span>
          <h1 className="text-slate-900 text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 max-w-4xl mx-auto leading-tight">
            {chapter1Data.title}
          </h1>
        </motion.div>

        {/* Comparison Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.2)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {/* Left: Code Repository */}
          <motion.div
            variants={fadeInUp}
            className="bg-blue-50 rounded-2xl p-8 lg:p-10 border border-blue-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-blue-900 text-2xl font-bold">
                {chapter1Data.comparison.left.title}
              </h2>
            </div>

            <ul className="space-y-4 mb-8">
              {chapter1Data.comparison.left.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-blue-200 pt-6">
              <div className="text-blue-900 text-xl font-bold mb-1">
                {chapter1Data.comparison.left.conclusion}
              </div>
              <div className="text-blue-700">
                {chapter1Data.comparison.left.subConclusion}
              </div>
            </div>
          </motion.div>

          {/* Right: Enterprise Environment */}
          <motion.div
            variants={fadeInUp}
            className="bg-amber-50 rounded-2xl p-8 lg:p-10 border border-amber-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-amber-900 text-2xl font-bold">
                {chapter1Data.comparison.right.title}
              </h2>
            </div>

            <ul className="space-y-4 mb-8">
              {chapter1Data.comparison.right.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0 text-lg">•</span>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-amber-200 pt-6">
              <div className="text-amber-900 text-xl font-bold mb-1">
                {chapter1Data.comparison.right.conclusion}
              </div>
              <div className="text-amber-700">
                {chapter1Data.comparison.right.subConclusion}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Core Insight */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
          className="bg-slate-100 rounded-2xl p-8 lg:p-12 mb-16"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-slate-900 text-xl font-bold mb-2">核心洞察</h3>
              <p className="text-slate-600 leading-relaxed">
                {chapter1Data.insight.explanation}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 ml-14">
            <p className="text-blue-600 text-lg lg:text-xl font-bold text-center">
              "{chapter1Data.insight.highlight}"
            </p>
          </div>
        </motion.div>

        {/* Transition CTA */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-slate-600 text-lg mb-6 max-w-3xl mx-auto">
            {chapter1Data.transition.text}
          </p>
          <a
            href="#chapter2"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors cursor-pointer"
          >
            {chapter1Data.transition.cta}
            <ChevronDown className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
