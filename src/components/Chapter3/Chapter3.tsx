// src/components/Chapter3/Chapter3.tsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StepCardProps {
  stepNumber: number;
  title: string;
  subtitle?: string;
  color: 'blue' | 'purple' | 'green';
  icon?: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function StepCard({
  stepNumber,
  title,
  color,
  children,
  isOpen,
  onToggle,
}: StepCardProps) {
  const colorMap = {
    blue: {
      bg: 'bg-blue-600',
      bgLight: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      textDark: 'text-blue-900',
    },
    purple: {
      bg: 'bg-purple-600',
      bgLight: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
      textDark: 'text-purple-900',
    },
    green: {
      bg: 'bg-green-600',
      bgLight: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-600',
      textDark: 'text-green-900',
    },
  };

  const colors = colorMap[color];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: stepNumber * 0.1 }}
      className={`rounded-2xl border ${colors.border} cursor-pointer ${
        isOpen ? 'shadow-lg' : 'shadow-sm'
      }`}
      onClick={onToggle}
    >
      <div className={`flex items-center justify-between p-4 sm:p-8 ${colors.bgLight}`}>
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 ${colors.bg} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
          >
            {stepNumber}
          </div>
          <h2 className="text-slate-900 text-lg sm:text-2xl font-bold truncate">{title}</h2>
        </div>
        <motion.svg
          className={`w-5 h-5 sm:w-6 sm:h-6 text-slate-400 flex-shrink-0 ml-2`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 sm:px-8 pb-4 sm:pb-8 pt-4 sm:pt-6 bg-white">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Chapter3() {
  const [openStep, setOpenStep] = useState<number | null>(1);

  const toggleStep = (step: number) => {
    setOpenStep(openStep === step ? null : step);
  };

  return (
    <section id="chapter3" className="bg-white min-h-screen px-4 sm:px-6 py-16 sm:py-24 max-w-7xl mx-auto">
      {/* Chapter Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase">
          Chapter 03
        </span>
        <h1 className="text-slate-900 text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 max-w-4xl mx-auto">
          我的实战解法
        </h1>
        <p className="text-slate-600 text-lg mt-6 max-w-3xl mx-auto leading-relaxed">
          企业内部上 Agent，最忌讳一上来就想搞全面覆盖。
          <br />
          我的做法是：找到高频、多角色参与的决策链，从这一个点切进去。
        </p>
      </motion.div>

      {/* Three Steps Overview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-12 sm:mb-20"
      >
        {/* Step 1 */}
        <div className="relative">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-blue-900 text-xl font-bold mb-2">Step 1</h3>
            <p className="text-blue-700 font-medium">找切入点</p>
            <p className="text-blue-600 text-sm mt-1">决策链路地图</p>
          </div>
          {/* Arrow */}
          <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
            <svg
              className="w-8 h-8 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-purple-900 text-xl font-bold mb-2">Step 2</h3>
            <p className="text-purple-700 font-medium">挖规则</p>
            <p className="text-purple-600 text-sm mt-1">三层挖掘法</p>
          </div>
          {/* Arrow */}
          <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
            <svg
              className="w-8 h-8 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Step 3 */}
        <div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <h3 className="text-green-900 text-xl font-bold mb-2">Step 3</h3>
            <p className="text-green-700 font-medium">建飞轮</p>
            <p className="text-green-600 text-sm mt-1">双飞轮机制</p>
          </div>
        </div>
      </motion.div>

      {/* Step 1 Detail */}
      <StepCard
        stepNumber={1}
        title="找对切入点——不做大而全，只切最高频的决策链"
        color="blue"
        isOpen={openStep === 1}
        onToggle={() => toggleStep(1)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Before */}
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="text-slate-700 font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
              Before: 立项决策涉及的角色和系统（分散、断点多）
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">•</span>
                <span>战略部 → 战略系统</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">•</span>
                <span>市场部 → CRM 系统</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">•</span>
                <span>财务部 → 预算系统</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">•</span>
                <span>人力部 → 资源系统</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">•</span>
                <span>项目组 → 项目管理系统</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">•</span>
                <span>审批流 → OA 审批系统</span>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-blue-900 font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              After: AI 作为中枢，统一调度
            </h3>
            <div className="flex items-center justify-center gap-2 text-sm">
              <div className="bg-blue-600 text-white px-3 py-2 rounded-lg font-medium">
                AI Agent
              </div>
              <svg
                className="w-4 h-4 text-blue-600"
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
              <div className="bg-blue-200 text-blue-800 px-3 py-2 rounded-lg font-medium">
                跨系统数据整合
              </div>
              <svg
                className="w-4 h-4 text-blue-600"
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
              <div className="bg-blue-600 text-white px-3 py-2 rounded-lg font-medium">
                统一决策输出
              </div>
            </div>
          </div>
        </div>

        {/* My Actions */}
        <div className="mt-6 bg-white rounded-xl p-6 border border-blue-100">
          <h4 className="text-blue-900 font-semibold mb-3">我的具体工作：</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>绘制了完整的决策链路地图，识别出关键决策节点</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>访谈了多个角色的关键人员，理解决策依赖的信息来源</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>梳理出多个系统的数据接口，明确数据可得性和质量</span>
            </li>
          </ul>
        </div>
      </StepCard>

      {/* Step 2 Detail */}
      <div className="mt-8">
        <StepCard
          stepNumber={2}
          title="挖掘隐性规则——把'人脑里的经验'变成'AI 能用的框架'"
          color="purple"
          isOpen={openStep === 2}
          onToggle={() => toggleStep(2)}
        >
          {/* Three Layer Method */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="text-purple-600 font-bold text-sm mb-2">第一层</div>
              <h3 className="text-slate-900 font-bold mb-3">数据分析</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>分析历史立项项目，提取决策模式</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>识别通过 vs 驳回项目的关键差异因子</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="text-purple-600 font-bold text-sm mb-2">第二层</div>
              <h3 className="text-slate-900 font-bold mb-3">深度访谈</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>访谈战略/财务/人力/业务专家</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>用"决策日志法"还原判断过程</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="text-purple-600 font-bold text-sm mb-2">第三层</div>
              <h3 className="text-slate-900 font-bold mb-3">共创验证</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>组织跨角色工作坊</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>用真实案例验证规则的覆盖率和准确率</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Outputs */}
          <div className="bg-purple-50 rounded-xl p-6">
            <h3 className="text-purple-900 font-bold mb-3">输出产物：</h3>
            <ul className="space-y-2 text-sm text-purple-800">
              <li className="flex items-start gap-2">
                <span className="text-purple-600">✓</span>
                <span>《项目立项决策框架 v1.0》—— 包含决策规则</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">✓</span>
                <span>上下文组装规范——明确信息来源、优先级、冲突处理逻辑</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">✓</span>
                <span>跨系统数据映射表——系统、字段的映射关系</span>
              </li>
            </ul>
          </div>
        </StepCard>
      </div>

      {/* Step 3 Detail: Flywheels */}
      <div className="mt-8">
        <StepCard
          stepNumber={3}
          title="建两个数据飞轮——准确率从 40% 到 90%+ 的关键"
          color="green"
          isOpen={openStep === 3}
          onToggle={() => toggleStep(3)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Flywheel 1: Rule Self-Evolution */}
            <div className="bg-white rounded-xl p-6 border border-green-200">
              <h3 className="text-green-700 font-bold text-lg mb-4 flex items-center gap-2">
                <svg
                  className="w-6 h-6 animate-spin"
                  style={{ animationDuration: '10s' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                飞轮一：规则自进化（Skill 机制）
              </h3>
              <p className="text-green-600 text-sm mb-4">
                让 Agent 的工作规则不是写死的，而是能根据反馈自动升级的。
              </p>

              {/* Loop Diagram */}
              <div className="relative h-56 sm:h-64 mb-4">
                {/* Outer ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 border-4 border-green-200 rounded-full"></div>
                </div>
                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-white px-4 py-2 rounded-full z-10">
                    <div className="text-green-600 text-lg font-bold">持续优化</div>
                  </div>
                </div>
                {/* Rotating particles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-40 h-40 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <div
                      className="absolute w-3 h-3 bg-green-500 rounded-full"
                      style={{ top: '-6px', left: '50%', transform: 'translateX(-50%)' }}
                    />
                    <div
                      className="absolute w-3 h-3 bg-green-500 rounded-full"
                      style={{
                        bottom: '-6px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    />
                    <div
                      className="absolute w-3 h-3 bg-green-500 rounded-full"
                      style={{
                        top: '50%',
                        left: '-6px',
                        transform: 'translateY(-50%)',
                      }}
                    />
                    <div
                      className="absolute w-3 h-3 bg-green-500 rounded-full"
                      style={{
                        top: '50%',
                        right: '-6px',
                        transform: 'translateY(-50%)',
                      }}
                    />
                  </motion.div>
                </div>
                {/* Fixed labels */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="absolute"
                    style={{
                      top: '16px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <span className="text-xs text-green-700 font-medium bg-white/90 px-2 py-0.5 rounded whitespace-nowrap">
                      AI 产出
                    </span>
                  </div>
                  <div
                    className="absolute"
                    style={{
                      bottom: '16px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <span className="text-xs text-green-700 font-medium bg-white/90 px-2 py-0.5 rounded whitespace-nowrap">
                      全量发布
                    </span>
                  </div>
                  <div
                    className="absolute"
                    style={{
                      left: '32px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    <span className="text-xs text-green-700 font-medium bg-white/90 px-2 py-0.5 rounded whitespace-nowrap">
                      用户反馈
                    </span>
                  </div>
                  <div
                    className="absolute"
                    style={{
                      right: '32px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    <span className="text-xs text-green-700 font-medium bg-white/90 px-2 py-0.5 rounded whitespace-nowrap">
                      A/B 测试
                    </span>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-green-50 rounded-lg p-3 text-center border-2 border-green-200">
                  <div className="text-green-600 text-xl font-bold">≥90%</div>
                  <div className="text-green-700 text-xs">准确率</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center border-2 border-green-200">
                  <div className="text-green-600 text-xl font-bold">≥95%</div>
                  <div className="text-green-700 text-xs">完整率</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center border-2 border-green-200">
                  <div className="text-green-600 text-xl font-bold">≥80%</div>
                  <div className="text-green-700 text-xs">采纳率</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center border-2 border-green-200">
                  <div className="text-green-600 text-xl font-bold">≤20%</div>
                  <div className="text-green-700 text-xs">修正率</div>
                </div>
              </div>

              {/* Feedback Sources */}
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="text-green-800 font-semibold text-sm mb-2">反馈来源：</h4>
                <ul className="space-y-1 text-xs text-green-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>显性反馈：用户对每次 AI 产出打分（1-5 星）+ 文字评价</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>隐性反馈：用户是否直接采用、是否修改、修改幅度</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>专家复核：每周抽取案例由领域专家做深度评估</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Flywheel 2: Project Memory Pool */}
            <div className="bg-white rounded-xl p-6 border border-blue-200">
              <h3 className="text-blue-700 font-bold text-lg mb-4 flex items-center gap-2">
                <svg
                  className="w-6 h-6 animate-spin"
                  style={{ animationDuration: '10s', animationDirection: 'reverse' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                飞轮二：项目经验池（Memory 机制）
              </h3>
              <p className="text-blue-600 text-sm mb-4">
                同一个项目，AI 处理得越多，对这个项目就越了解，准确率就越高。
              </p>

              {/* Memory Layers */}
              <div className="space-y-3 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <div className="text-blue-700 font-bold text-sm mb-1">
                    L1 项目基础信息（静态）
                  </div>
                  <div className="text-blue-600 text-xs">
                    项目目标、范围、预算、团队、战略契合度、优先级
                  </div>
                </div>
                <div className="bg-blue-100 rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="text-blue-800 font-bold text-sm mb-1">
                    L2 过程记忆（动态累积）
                  </div>
                  <div className="text-blue-700 text-xs">
                    历史决策记录、用户纠正/确认的行为、特殊规则和例外情况
                  </div>
                </div>
                <div className="bg-blue-200 rounded-lg p-4 border-l-4 border-blue-600">
                  <div className="text-blue-900 font-bold text-sm mb-1">
                    L3 模式识别（AI 提炼）
                  </div>
                  <div className="text-blue-800 text-xs">
                    从历史数据中自动识别的决策模式、高风险信号预警
                  </div>
                </div>
              </div>

              {/* Retrieval Strategy */}
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h4 className="text-blue-800 font-semibold text-sm mb-2">记忆检索策略：</h4>
                <ul className="space-y-1 text-xs text-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>基于语义相似度检索相关记忆</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>基于时间衰减，近期记忆权重更高</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>基于置信度，专家确认的记忆权重更高</span>
                  </li>
                </ul>
              </div>

              <div className="text-center text-blue-700 text-sm font-medium bg-blue-50 rounded-lg p-3">
                AI 对每个项目的理解像滚雪球一样越滚越大，准确率持续攀升。
              </div>
            </div>
          </div>
        </StepCard>
      </div>

      {/* Transition CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-16"
      >
        <a
          href="#chapter4"
          className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
        >
          继续看结果数据
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
    </section>
  );
}
