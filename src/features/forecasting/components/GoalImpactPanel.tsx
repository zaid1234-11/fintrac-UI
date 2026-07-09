'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Shield, TrendingUp } from 'lucide-react';
import type { GoalForecast } from '../types';

const healthColors: Record<GoalForecast['healthLabel'], { bg: string; text: string; dot: string }> = {
  on_track: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  slightly_delayed: { bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-400' },
  at_risk: { bg: 'bg-orange-500/10', text: 'text-orange-400', dot: 'bg-orange-400' },
  critical: { bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-400' },
};

const healthLabels: Record<GoalForecast['healthLabel'], string> = {
  on_track: 'On Track',
  slightly_delayed: 'Slightly Delayed',
  at_risk: 'At Risk',
  critical: 'Critical',
};

function GoalForecastCard({ goal, index }: { goal: GoalForecast; index: number }) {
  const colors = healthColors[goal.healthLabel];
  const progress = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);

  const baseDate = new Date(goal.baselineCompletionDate);
  const projDate = new Date(goal.projectedCompletionDate);
  const formatDate = (d: Date) => d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
      className="p-6 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] hover:bg-white/[0.12] hover:border-white/[0.18] transition-all duration-300 group shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-display text-base text-white mb-1">{goal.goalName}</h3>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${colors.bg} ${colors.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
              {healthLabels[goal.healthLabel]}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-mono text-white/40">
          <Shield className="w-3 h-3" />
          {Math.round(goal.confidence * 100)}%
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Progress</span>
          <span className="text-[10px] font-mono text-white/50">{progress.toFixed(0)}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${colors.dot}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] font-mono text-white/30">₹{goal.currentAmount.toLocaleString()}</span>
          <span className="text-[10px] font-mono text-white/30">₹{goal.targetAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Timeline Comparison */}
      <div className="p-4 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/[0.08]">
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-3">Completion Timeline</span>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <span className="text-[10px] text-white/30 font-mono block mb-0.5">Current Path</span>
            <span className="text-sm font-display text-white/60 line-through decoration-white/20">{formatDate(baseDate)}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="flex-1 text-right">
            <span className="text-[10px] text-white/30 font-mono block mb-0.5">With Scenario</span>
            <span className="text-sm font-display text-emerald-400">{formatDate(projDate)}</span>
          </div>
        </div>
      </div>

      {/* Time Saved Badge */}
      {goal.timeSavedDays > 0 && (
        <div className="mt-4 flex items-center gap-2 text-emerald-400">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">{goal.timeSavedDays} days sooner</span>
          <TrendingUp className="w-3 h-3 ml-auto opacity-50" />
        </div>
      )}
    </motion.div>
  );
}

export function GoalImpactPanel({ goalForecasts }: { goalForecasts: GoalForecast[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-6 ml-2">
        <TrendingUp className="w-5 h-5 text-white/80" />
        <h2 className="text-[10px] tracking-[0.2em] text-white/40 font-mono uppercase">Goal Impact</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {goalForecasts.map((goal, i) => (
          <GoalForecastCard key={goal.goalId} goal={goal} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
