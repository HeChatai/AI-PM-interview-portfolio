// src/components/Chapter4/AccuracyChart.tsx

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  ReferenceDot
} from 'recharts';
import type { DataPoint, Milestone } from '../../types';

interface AccuracyChartProps {
  dataPoints: DataPoint[];
  milestones: Milestone[];
}

export const AccuracyChart = ({ dataPoints, milestones }: AccuracyChartProps) => {
  // 将 milestone 转换为图表上的标记点
  const milestoneDots = milestones.map((milestone) => {
    const dataPoint = dataPoints.find(dp => dp.date === milestone.date);
    return {
      date: milestone.date,
      value: dataPoint?.value || 0,
      label: milestone.label
    };
  });

  return (
    <div className="bg-white rounded-2xl p-8 lg:p-12 mb-12 shadow-sm">
      <h2 className="text-slate-900 text-2xl font-bold text-center mb-8">
        核心场景 AI 准确率提升曲线
      </h2>

      <div style={{ height: '400px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataPoints} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <defs>
              {/* 曲线下方的渐变填充 */}
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0.02} />
              </linearGradient>

              {/* 曲线本身的渐变色 */}
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>

              {/* 关键节点光晕效果 */}
              <radialGradient id="milestoneGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </radialGradient>
            </defs>

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              dy={10}
            />

            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
              dx={-10}
            />

            {/* 曲线下方的渐变区域 */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="none"
              fill="url(#areaGradient)"
            />

            {/* 渐变曲线 */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#lineGradient)"
              strokeWidth={4}
              dot={{ r: 5, fill: '#22c55e', stroke: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />

            {/* 关键节点标记 */}
            {milestoneDots.map((dot) => (
              <ReferenceDot
                key={dot.date}
                x={dot.date}
                y={dot.value}
                r={10}
                fill="#22c55e"
                stroke="#fff"
                strokeWidth={3}
                className="cursor-pointer"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 关键节点标注 - 放在图表下方居中 */}
      <div className="flex justify-center gap-12 mt-8">
        {milestoneDots.map((milestone) => (
          <div key={milestone.date} className="flex items-center gap-3">
            <div className="relative">
              <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg shadow-green-500/50" />
              <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-20" />
            </div>
            <div>
              <div className="text-slate-900 text-sm font-bold">{milestone.date}</div>
              <div className="text-slate-500 text-xs">{milestone.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
