import React, { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { GoalObject } from '../types/dashboardTypes';
import { Target, AlertCircle, CheckCircle2, Clock, Zap } from 'lucide-react';

import LiquidCard from '@/components/liquid/LiquidCard';

function GoalCard({ goal, mounted }: { goal: GoalObject, mounted: boolean }) {
  return (
    <LiquidCard
      level={2}
      interactive={true}
      className="p-8 cursor-pointer transition-all group relative overflow-hidden rounded-[28px]"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] -z-10 group-hover:bg-emerald-500/10 transition-colors" />

      <div className="flex justify-between items-start mb-10 relative z-10">
        <div>
          <h3 className="text-2xl font-display text-white mb-1 transition-colors">{goal.name}</h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[0.65rem] uppercase tracking-wider text-emerald-400 font-semibold shadow-sm">
          {goal.health_label === 'on_track' ? 'Ahead of schedule' : 'Needs attention'}
        </div>
      </div>
      
      <div className="mb-6 relative z-10">
        <div className="flex flex-col mb-4 font-geist font-medium">
          <span className="text-white text-4xl font-display mb-2">{goal.progress}%</span>
          <span className="text-white/60 text-base font-lexend tracking-wide">₹{(goal.target_amount * (1 - goal.progress/100)).toLocaleString()} left</span>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden border border-white/5 p-px">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${goal.health_label === 'at_risk' || goal.health_label === 'off_track' ? 'bg-red-500' : 'bg-emerald-500'}`}
            style={{ width: mounted ? `${goal.progress}%` : '0%' }}
          />
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-2 relative z-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/50 font-semibold uppercase tracking-[0.22em]">Current ETA</span>
            <span className="text-white tracking-wide font-medium">
              {!goal.eta_date || isNaN(new Date(goal.eta_date).getTime()) 
                ? 'Estimating...' 
                : new Date(goal.eta_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          </div>
          {goal.optimized_eta_date && (
            <div className="flex items-center justify-between text-xs mt-1">
              <span className="text-white/50 font-semibold uppercase tracking-[0.22em]">Optimized ETA</span>
              <span className="text-emerald-400 font-semibold tracking-wide flex items-center gap-1 text-sm">
                <Zap className="w-3 h-3" />
                {isNaN(new Date(goal.optimized_eta_date).getTime()) 
                  ? 'Estimating...' 
                  : new Date(goal.optimized_eta_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </div>
          )}
        </div>
      </div>
    </LiquidCard>
  );
}

export function GoalSnapshot({ goals }: { goals: GoalObject[] }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!goals || goals.length === 0) return null;

  return (
    <m.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 w-full"
    >
      <div className="flex items-center justify-between mb-6 pl-2">
        <div className="flex items-center gap-3">
          <Target className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">Goal Snapshot</h2>
        </div>
        <button className="text-xs font-medium text-white/60 hover:text-white transition-colors font-lexend uppercase tracking-wider">View All Goals</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goals.slice(0, 3).map((goal) => (
          <GoalCard key={goal.goal_id} goal={goal} mounted={mounted} />
        ))}
      </div>
    </m.section>
  );
}
