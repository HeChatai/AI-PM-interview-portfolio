// src/components/Hero/Hero.tsx

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { heroData } from '../../data/content';
import { fadeInUp, staggerContainer } from '../../lib/animations';

export const Hero = () => {
  return (
    <section className="min-h-screen relative bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        {/* Tagline */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <span className="inline-block bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-full">
            {heroData.tagline}
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold text-center mt-8 max-w-5xl"
        >
          {heroData.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-lg sm:text-xl text-center mt-6 max-w-3xl leading-relaxed"
        >
          <p>{heroData.subtitle}</p>
          <p className="mt-2">{heroData.description}</p>
        </motion.div>

        {/* Metric Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.15)}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full max-w-5xl"
        >
          {heroData.metrics.map((metric) => {
            const isBeforeAfter = metric.value.includes('→');
            const beforeValue = isBeforeAfter ? metric.value.split('→')[0].trim() : '';
            const afterValue = isBeforeAfter ? metric.value.split('→')[1].trim() : '';

            return (
              <motion.div
                key={metric.id}
                variants={fadeInUp}
                whileHover={{
                  y: -8,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
                className="group bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/30 rounded-3xl p-10 min-h-[240px] hover:border-green-400/50 transition-all duration-300 cursor-pointer"
              >
                {/* Label */}
                <div className="text-slate-300 text-sm font-semibold mb-6 uppercase tracking-wider text-center">
                  {metric.label}
                </div>

                {/* Value Display */}
                {isBeforeAfter ? (
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="text-4xl font-bold text-slate-400 whitespace-nowrap">
                      {beforeValue}
                    </div>
                    <svg className="w-6 h-6 text-green-400 flex-shrink-0 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <div className="text-5xl font-bold text-green-400 whitespace-nowrap drop-shadow-lg">
                      {afterValue}
                    </div>
                  </div>
                ) : (
                  <div className="text-green-400 text-5xl font-bold mb-6 text-center drop-shadow-lg">{metric.value}</div>
                )}

                {/* Description */}
                <div className="text-slate-400 text-sm leading-relaxed text-center">
                  {metric.description}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.8 }}
          className="mt-20 flex flex-col items-center cursor-pointer"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth',
            });
          }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-6 text-slate-400 mb-2"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
          <span className="text-slate-400 text-sm">向下滚动探索</span>
        </motion.div>
      </div>
    </section>
  );
};
