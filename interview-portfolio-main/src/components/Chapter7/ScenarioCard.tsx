// src/components/Chapter7/ScenarioCard.tsx

import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { ScenarioCard as ScenarioCardType, ConditionCard } from '../../types';

interface ScenarioCardProps {
  scenario?: ScenarioCardType;
  condition?: ConditionCard;
  variant: 'applicable' | 'condition';
}

export const ScenarioCard = ({ scenario, condition, variant }: ScenarioCardProps) => {
  const data = scenario || condition;
  if (!data) return null;

  const IconComponent = Lucide[data.icon as keyof typeof Lucide] as React.ComponentType<{
    className?: string;
  }>;

  const bgColors = {
    applicable: 'bg-green-50 border-green-200',
    condition: 'bg-blue-50 border-blue-200'
  };

  const iconColors = {
    applicable: 'text-green-600',
    condition: 'text-blue-600'
  };

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
      className={`p-6 rounded-xl border ${bgColors[variant]} transition-all duration-300 h-full`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg bg-white shadow-sm ${iconColors[variant]}`}>
          {IconComponent ? <IconComponent className="w-6 h-6" /> : null}
        </div>
        <div className="flex-1">
          <h3 className="text-slate-900 font-semibold text-lg mb-2">
            {data.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
