import React from 'react';
import { motion } from 'framer-motion';
import { useGoalEngine } from '../hooks/useGoalEngine';

export function GoalHero() {
  const { summary } = useGoalEngine();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fintrac-light-card p-10 rounded-[32px] overflow-hidden relative group border-0 ring-1 ring-[#2A2E06]/10"
    >
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-transparent pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
        <div>
          <span className="text-label-small mb-4 block opacity-70">Goal Summary</span>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            
            {/* On Track */}
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-12 bg-emerald-500 rounded-full" />
              <div className="flex flex-col">
                <span className="text-3xl font-display text-primary-olive metric-glow">{summary.onTrackCount}</span>
                <span className="text-xs font-lexend text-[#2A2E06]/60 uppercase tracking-wider">On Track</span>
              </div>
            </div>

            {/* Needs Attention */}
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-12 bg-amber-400 rounded-full" />
              <div className="flex flex-col">
                <span className="text-3xl font-display text-primary-olive metric-glow">{summary.needsAttentionCount}</span>
                <span className="text-xs font-lexend text-[#2A2E06]/60 uppercase tracking-wider">Needs Attention</span>
              </div>
            </div>

            {/* At Risk */}
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-12 bg-red-400 rounded-full" />
              <div className="flex flex-col">
                <span className="text-3xl font-display text-primary-olive metric-glow">{summary.atRiskCount}</span>
                <span className="text-xs font-lexend text-[#2A2E06]/60 uppercase tracking-wider">At Risk</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.section>
  );
}
