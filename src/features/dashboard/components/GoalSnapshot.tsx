import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoalObject } from '../types/dashboardTypes';
import { Target, AlertCircle, CheckCircle2, Clock, Zap } from 'lucide-react';

export function GoalSnapshot({ goals }: { goals: GoalObject[] }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Delay animation trigger slightly for better effect
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!goals || goals.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 w-full"
    >
      <div className="flex items-center justify-between mb-6 pl-2">
        <div className="flex items-center gap-3">
          <Target className="w-5 h-5 text-emerald-600 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <h2 className="text-label-small">Goal Snapshot</h2>
        </div>
        <button className="text-xs font-medium text-[#2A2E06]/95 hover:text-[#2A2E06]/100 transition-colors font-lexend uppercase tracking-wider">View All Goals</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goals.slice(0, 3).map((goal, i) => (
          <div
            key={goal.goal_id}
            className="fintrac-light-card p-8 rounded-[32px] cursor-pointer transition-all hover:brightness-105 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/80 to-white/0 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite] pointer-events-none z-0" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2A2E06]/[0.02] rounded-full blur-[40px] -z-10 group-hover:bg-emerald-500/10 transition-colors" />

            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-2xl font-display text-gradient-olive mb-1 transition-colors">{goal.name}</h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[0.65rem] uppercase tracking-wider text-positive font-semibold shadow-sm">
                {goal.health_label === 'on_track' ? 'Ahead of schedule' : 'Needs attention'}
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex flex-col mb-4 font-geist font-medium">
                <span className="text-primary-olive text-4xl font-display mb-2">{goal.progress}%</span>
                <span className="text-[#2A2E06]/80 text-base font-lexend tracking-wide">₹{(goal.target_amount * (1 - goal.progress/100)).toLocaleString()} left</span>
              </div>
              <div className="h-2 w-full bg-[#2A2E06]/10 rounded-full overflow-hidden border border-[#2A2E06]/[0.05] p-px">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${goal.health_label === 'at_risk' || goal.health_label === 'off_track' ? 'bg-red-500' : 'bg-emerald-500'}`}
                  style={{ width: mounted ? `${goal.progress}%` : '0%' }}
                />
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#2A2E06]/20 flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-label-small opacity-75">Current ETA</span>
                  <span className="text-primary-olive tracking-wide metric-glow font-medium">
                    {!goal.eta_date || isNaN(new Date(goal.eta_date).getTime()) 
                      ? 'Estimating...' 
                      : new Date(goal.eta_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                {goal.optimized_eta_date && (
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-label-small opacity-75">Optimized ETA</span>
                    <span className="text-positive font-semibold tracking-wide flex items-center gap-1 metric-glow text-sm">
                      <Zap className="w-3 h-3" />
                      {isNaN(new Date(goal.optimized_eta_date).getTime()) 
                        ? 'Estimating...' 
                        : new Date(goal.optimized_eta_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
