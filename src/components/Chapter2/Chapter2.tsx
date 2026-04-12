// src/components/Chapter2/Chapter2.tsx

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileSearch, GitMerge, MessageCircle, ShieldAlert, ChevronDown, ArrowRight } from 'lucide-react';
import { chapter2Data } from '../../data/content';
import { fadeInUp, staggerContainer } from '../../lib/animations';

const iconMap = {
  FileSearch: FileSearch,
  GitMerge: GitMerge,
  MessageCircle: MessageCircle,
  ShieldAlert: ShieldAlert,
};

const colorMap = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    iconBg: 'bg-blue-600',
    iconText: 'text-white',
    title: 'text-blue-900',
    accent: 'text-blue-600',
    highlight: 'bg-blue-600',
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    iconBg: 'bg-amber-600',
    iconText: 'text-white',
    title: 'text-amber-900',
    accent: 'text-amber-600',
    highlight: 'bg-amber-600',
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    iconBg: 'bg-emerald-600',
    iconText: 'text-white',
    title: 'text-emerald-900',
    accent: 'text-emerald-600',
    highlight: 'bg-emerald-600',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    iconBg: 'bg-purple-600',
    iconText: 'text-white',
    title: 'text-purple-900',
    accent: 'text-purple-600',
    highlight: 'bg-purple-600',
  },
};

export const Chapter2 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="chapter2"
      ref={ref}
      className="min-h-screen bg-slate-50 px-6 py-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Chapter Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="inline-block bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Chapter {chapter2Data.chapterNumber}
          </span>
          <h1 className="text-slate-900 text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 max-w-4xl mx-auto leading-tight">
            {chapter2Data.title}
          </h1>
          <p className="text-slate-600 text-lg mt-6 max-w-3xl mx-auto leading-relaxed">
            {chapter2Data.introduction}
          </p>
        </motion.div>

        {/* Problem Cards Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.15)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {chapter2Data.problems.map((problem) => {
            const IconComponent = iconMap[problem.icon as keyof typeof iconMap] || FileSearch;
            const colors = colorMap[problem.color];

            return (
              <motion.div
                key={problem.id}
                variants={fadeInUp}
                whileHover={{
                  y: -4,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                }}
                className={`${colors.bg} rounded-2xl p-8 border ${colors.border} hover:shadow-xl transition-all duration-300`}
              >
                {/* Icon & Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${colors.iconText}`} />
                  </div>
                  <h2 className={`${colors.title} text-xl font-bold`}>
                    {problem.title}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-slate-700 mb-6 leading-relaxed">
                  {problem.description}
                </p>

                {/* Symptom */}
                <div className="bg-white/60 rounded-xl p-5 mb-4">
                  <div className="flex items-start gap-3">
                    <span className={`${colors.accent} text-lg flex-shrink-0`}>💡</span>
                    <div>
                      <div className="text-slate-900 font-semibold text-sm mb-1">典型症状</div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        {problem.symptom}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Root Cause */}
                <div className={`flex items-center gap-3 ${colors.accent}`}>
                  <div className={`w-2 h-2 ${colors.highlight} rounded-full`} />
                  <span className="font-medium text-sm">根因：{problem.rootCause}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Core Insight */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-8 lg:p-12 mb-16 shadow-lg"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-slate-900 text-xl font-bold mb-2">核心洞察</h3>
              <p className="text-slate-600 leading-relaxed">
                {chapter2Data.insight.explanation}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 ml-14">
            <p className="text-blue-600 text-lg lg:text-xl font-bold text-center">
              "{chapter2Data.insight.highlight}"
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
            {chapter2Data.transition.text}
          </p>
          <a
            href="#chapter3"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors cursor-pointer"
          >
            {chapter2Data.transition.cta}
            <ChevronDown className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
