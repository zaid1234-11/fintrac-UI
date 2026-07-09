'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import type { SensitivityLever } from '../types';

function LeverRow({ lever, index, maxDays }: { lever: SensitivityLever; index: number; maxDays: number }) {
  const barWidth = Math.min(100, (lever.impactDays / maxDays) * 100);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.liquidGlass && cardRef.current) {
      // @ts-ignore
      const glass = window.liquidGlass(cardRef.current, { scale: -112, chroma: 6 });
      return () => { if (glass && glass.destroy) glass.destroy(); };
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
    >
      <div ref={cardRef} className="goal-liquid-glass flex items-center gap-4 p-4 transition-all duration-300 group">
      {/* Icon */}
      <div className="w-9 h-9 rounded-lg bg-white/[0.08] flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
        {lever.icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-display text-white truncate">{lever.lever}</span>
          <span className="text-xs font-mono text-emerald-400 shrink-0 ml-2">
            {lever.impactDays} days
          </span>
        </div>

        {/* Impact Bar */}
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500/60 to-emerald-400"
            initial={{ width: 0 }}
            animate={{ width: `${barWidth}%` }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] font-mono text-white/30">
            {lever.unitChange > 0 ? '+' : ''}₹{Math.abs(lever.unitChange).toLocaleString()}/mo
          </span>
          <span className="text-[10px] font-mono text-white/30">
            {lever.impactPercent}% impact
          </span>
        </div>
      </div>
      </div>
    </motion.div>
  );
}

export function SensitivityPanel({ levers }: { levers: SensitivityLever[] }) {
  const sorted = [...levers].sort((a, b) => b.impactDays - a.impactDays);
  const maxDays = sorted[0]?.impactDays ?? 1;

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
    >
      <div className="flex items-center gap-3 mb-6 ml-2">
        <BarChart3 className="w-5 h-5 text-white/80" />
        <h2 className="text-[10px] tracking-[0.2em] text-white/40 font-mono uppercase">Sensitivity Analysis</h2>
        <span className="text-[10px] text-white/25 font-mono ml-auto">Which levers matter most?</span>
      </div>

      <div className="flex flex-col gap-2">
        {sorted.map((lever, i) => (
          <LeverRow key={lever.lever} lever={lever} index={i} maxDays={maxDays} />
        ))}
      </div>
    </motion.section>
  );
}
