import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export function RecentProgress() {
  const achievements = [
    { id: 1, metric: '₹840', subtitle: 'saved', context: '12% below last month' },
    { id: 2, metric: '₹12,500', subtitle: 'extra paid', context: 'Debt accelerated' },
    { id: 3, metric: '5 pts', subtitle: 'improvement', context: 'Health score rising' }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-4 px-2">
        <Activity className="w-5 h-5 text-[#D29B2D]" />
        <h2 className="text-label-small">Recent Progress</h2>
      </div>

      <div className="flex flex-col gap-3">
        {achievements.map((item) => (
          <div key={item.id} className="fintrac-light-card p-6 transition-all hover:brightness-105 flex items-center justify-between group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/80 to-white/0 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]" />
            <div className="relative z-10">
              <div className="text-3xl font-display text-gradient-olive leading-none mb-1">{item.metric}</div>
              <div className="text-label-small font-lexend uppercase tracking-widest text-[#2A2E06]/60">{item.subtitle}</div>
            </div>
            <div className="text-right flex flex-col items-end relative z-10">
              <div className="text-[#2A2E06] text-[11px] mt-1 px-3 py-1.5 rounded-full font-medium border border-[#2A2E06]/10 bg-[#2A2E06]/[0.02] shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]">{item.context}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
