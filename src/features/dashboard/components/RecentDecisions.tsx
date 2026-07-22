import React from 'react';
import { m } from 'framer-motion';
import { History } from 'lucide-react';
import LiquidCard from '@/components/liquid/LiquidCard';

export function RecentDecisions() {
  const decisions = [
    { id: 1, title: 'Dinner cooked at home', value: '₹320 saved', trend: 'positive' },
    { id: 2, title: 'Emergency Fund moved', value: '+2 weeks', trend: 'positive' },
    { id: 3, title: 'Unused subscription cut', value: '₹199/mo', trend: 'neutral' },
  ];

  return (
    <m.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-4 px-2">
        <History className="w-5 h-5 text-emerald-400" />
        <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">Recent Wins</h2>
      </div>

      <LiquidCard level={2} className="p-6 rounded-[28px]">
        <div className="flex flex-col relative z-10">
          {decisions.map((item) => (
            <div key={item.id} className="flex flex-col gap-1 py-5 border-b border-white/10 last:border-0 group cursor-pointer hover:px-2 transition-all">
              <div className="text-white/80 font-medium text-sm md:text-base">{item.title}</div>
              <div className={`text-2xl md:text-3xl font-display tracking-tight ${item.trend === 'positive' ? 'text-emerald-400' : 'text-white'}`}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </LiquidCard>
    </m.section>
  );
}
