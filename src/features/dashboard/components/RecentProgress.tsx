import React, { useRef, useEffect } from 'react';
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
        <Activity className="w-5 h-5 text-amber-400" />
        <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">Recent Progress</h2>
      </div>

      <div className="flex flex-col gap-3">
        {achievements.map((item) => (
          <GlassCard key={item.id} item={item} />
        ))}
      </div>
    </motion.section>
  );
}

function GlassCard({ item }: { item: any }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.liquidGlass && cardRef.current) {
      // @ts-ignore
      const glass = window.liquidGlass(cardRef.current, { scale: -112, chroma: 6 });
      return () => { if (glass && glass.destroy) glass.destroy(); };
    }
  }, []);

  return (
    <div ref={cardRef} className="goal-liquid-glass p-6 transition-all flex items-center justify-between group relative overflow-hidden">
      <div className="relative z-10">
        <div className="text-3xl font-display text-white leading-none mb-1">{item.metric}</div>
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">{item.subtitle}</div>
      </div>
      <div className="text-right flex flex-col items-end relative z-10">
        <div className="text-white/80 text-[11px] mt-1 px-3 py-1.5 rounded-full font-medium border border-white/10 bg-white/5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">{item.context}</div>
      </div>
    </div>
  );
}
