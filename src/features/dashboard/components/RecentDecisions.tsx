import React from 'react';
import { motion } from 'framer-motion';
import { History, CheckCircle } from 'lucide-react';

export function RecentDecisions() {
  const decisions = [
    { id: 1, title: 'Dinner cooked at home', value: '₹320 saved', trend: 'positive' },
    { id: 2, title: 'Emergency Fund moved', value: '+2 weeks', trend: 'positive' },
    { id: 3, title: 'Unused subscription cut', value: '₹199/mo', trend: 'neutral' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-4 px-2">
        <History className="w-5 h-5 text-[#547C59]" />
        <h2 className="text-label-small">Recent Wins</h2>
      </div>

      <div className="fintrac-light-card p-6">
        <div className="flex flex-col">
          {decisions.map((item) => (
            <div key={item.id} className="flex flex-col gap-1 py-5 border-b border-[#2A2E06]/10 last:border-0 group cursor-pointer hover:px-2 transition-all">
              <div className="text-[#2A2E06] font-medium text-sm md:text-base opacity-80">{item.title}</div>
              <div className={`text-2xl md:text-3xl font-display tracking-tight ${item.trend === 'positive' ? 'text-positive' : 'text-[#2A2E06]'}`}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
