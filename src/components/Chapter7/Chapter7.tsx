// src/components/Chapter7/Chapter7.tsx

import { motion } from 'framer-motion';
import { chapter7Data } from '../../data/content';
import { ScenarioCard } from './ScenarioCard';
import { NotApplicableList } from './NotApplicableList';
import { Footer } from './Footer';
import { fadeInUp, staggerContainer } from '../../lib/animations';

export const Chapter7 = () => {
  const containerVariants = staggerContainer(0.15);
  const cardVariants = staggerContainer(0.1);

  return (
    <>
      <section id="chapter7" className="py-20 bg-white">
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
              Chapter {chapter7Data.chapterNumber}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-slate-900 text-3xl sm:text-4xl lg:text-5xl font-bold mt-4"
            >
              {chapter7Data.title}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-slate-600 text-lg mt-6 leading-relaxed max-w-3xl mx-auto"
            >
              {chapter7Data.introduction}
            </motion.p>
          </motion.div>

          {/* Scenarios and Conditions Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            {/* Applicable Scenarios */}
            <div>
              <h3 className="text-slate-900 font-bold text-xl mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">
                  ✓
                </span>
                适用场景
              </h3>
              <div className="space-y-4">
                {chapter7Data.applicableScenarios.map((scenario, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                  >
                    <ScenarioCard scenario={scenario} variant="applicable" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Migration Conditions */}
            <div>
              <h3 className="text-slate-900 font-bold text-xl mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
                  ✓
                </span>
                迁移条件
              </h3>
              <div className="space-y-4">
                {chapter7Data.migrationConditions.map((condition, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                  >
                    <ScenarioCard condition={condition} variant="condition" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Not Applicable */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12"
          >
            <h3 className="text-slate-900 font-bold text-xl mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm">
                ✗
              </span>
              不适用范围
            </h3>
            <NotApplicableList items={chapter7Data.notApplicable} />
          </motion.div>

          {/* Summary */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center py-8 border-t border-slate-200"
          >
            <p className="text-slate-700 text-lg leading-relaxed">
              {chapter7Data.summary}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer footerData={chapter7Data.footer} />
    </>
  );
};
