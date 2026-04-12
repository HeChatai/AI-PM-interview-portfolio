// src/components/Chapter6/RadarChart.tsx

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface RadarData {
  labels: string[];
  scores: number[];
  fullMark: number;
}

interface RadarChartProps {
  data: RadarData;
}

export const RadarChartComponent = ({ data }: RadarChartProps) => {
  const { labels, scores, fullMark } = data;

  // Calculate polygon points
  const calculatePoints = (scale: number = 1) => {
    const angleStep = (Math.PI * 2) / labels.length;
    return labels
      .map((_, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const x = 150 + Math.cos(angle) * 120 * scale;
        const y = 150 + Math.sin(angle) * 120 * scale;
        return `${x},${y}`;
      })
      .join(' ');
  };

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1];

  const chartData = useMemo(
    () =>
      labels.map((label, index) => ({
        subject: label,
        A: scores[index],
        fullMark,
      })),
    [labels, scores, fullMark]
  );

  return (
    <div className="relative">
      <svg viewBox="0 0 300 300" className="w-full max-w-[300px] mx-auto">
        {/* Grid lines */}
        {gridLevels.map((level, i) => (
          <polygon
            key={i}
            points={calculatePoints(level)}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {labels.map((_, index) => {
          const angle = (Math.PI * 2 / labels.length) * index - Math.PI / 2;
          const x = 150 + Math.cos(angle) * 120;
          const y = 150 + Math.sin(angle) * 120;
          return (
            <line
              key={index}
              x1={150}
              y1={150}
              x2={x}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <motion.polygon
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          points={calculatePoints(
            scores.map((s) => s / fullMark).reduce((a, b) => a + b, 0) /
              labels.length
          )}
          fill="rgba(59, 130, 246, 0.2)"
          stroke="#2563eb"
          strokeWidth="2"
        />

        {/* Actual data polygon using proper calculation */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          points={labels
            .map((_, index) => {
              const angle = (Math.PI * 2 / labels.length) * index - Math.PI / 2;
              const scale = scores[index] / fullMark;
              const x = 150 + Math.cos(angle) * 120 * scale;
              const y = 150 + Math.sin(angle) * 120 * scale;
              return `${x},${y}`;
            })
            .join(' ')}
          fill="rgba(37, 99, 235, 0.2)"
          stroke="#2563eb"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {labels.map((_, index) => {
          const angle = (Math.PI * 2 / labels.length) * index - Math.PI / 2;
          const scale = scores[index] / fullMark;
          const x = 150 + Math.cos(angle) * 120 * scale;
          const y = 150 + Math.sin(angle) * 120 * scale;
          return (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill="#2563eb"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
            />
          );
        })}

        {/* Labels */}
        {labels.map((label, index) => {
          const angle = (Math.PI * 2 / labels.length) * index - Math.PI / 2;
          const x = 150 + Math.cos(angle) * 145;
          const y = 150 + Math.sin(angle) * 145;
          return (
            <text
              key={index}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] fill-slate-700 font-medium"
            >
              {label}
            </text>
          );
        })}
      </svg>

      {/* Tooltip on hover - simplified version */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        {chartData.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-slate-600"
          >
            <span>{item.subject}</span>
            <span className="font-semibold text-blue-600">{item.A}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
