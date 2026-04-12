// src/components/Chapter7/NotApplicableList.tsx

import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface NotApplicableListProps {
  items: string[];
}

export const NotApplicableList = ({ items }: NotApplicableListProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-red-50 border border-red-200 rounded-xl p-6"
    >
      <ul className="space-y-3">
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3"
          >
            <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <span className="text-slate-700 leading-relaxed">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};
