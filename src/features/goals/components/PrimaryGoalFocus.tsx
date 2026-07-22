import React, { useRef, useEffect } from 'react';
import { m } from 'framer-motion';
import { useGoalEngine } from '../hooks/useGoalEngine';
import { Zap, Clock, ShieldCheck, Activity } from 'lucide-react';

import LiquidCard from '@/components/liquid/LiquidCard';

export function PrimaryGoalFocus() {
  const { goals, getPreviewForGoal } = useGoalEngine();

  // Find the highest priority active goal (Critical or High)
  const primaryGoal = goals.find(g => g.priorityLabel === 'critical' || g.priorityLabel === 'high');

  if (!primaryGoal) return null;

  // We fetch the preview state for this goal so it reacts immediately to sliders
  const preview = getPreviewForGoal(primaryGoal.id);

  const getConfidenceLabel = (conf: number) => {
    if (conf >= 0.85) return 'Very High';
    if (conf >= 0.70) return 'High';
    if (conf >= 0.50) return 'Moderate';
    return 'Low';
  };

  const confidenceScore = Math.min(100, (primaryGoal.confidence + preview.confidenceChange) * 100);

  return (
    <m.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative"
    >
      <div className="flex items-center gap-3 mb-6 ml-2">
        <Activity className="w-5 h-5 text-white opacity-80" />
        <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">Primary Focus</h2>
      </div>

      <LiquidCard level={4} className="p-10 rounded-[32px] overflow-hidden relative group">
        <div className="flex flex-col md:flex-row justify-between gap-12 relative z-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-semibold text-amber-400 uppercase tracking-wider mb-6">
              <Zap className="w-3 h-3" />
              Top Priority
            </div>

            <h3 className="text-4xl md:text-5xl font-display text-white mb-4">{primaryGoal.name}</h3>
            <p className="text-white/60 font-lexend max-w-md leading-relaxed">
              {primaryGoal.description || 'Your most important financial target right now.'}
            </p>

            <div className="mt-8 flex flex-col gap-2 font-geist">
              <span className="text-sm text-white/50">Current Progress</span>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-display text-white">
                  ₹{primaryGoal.currentAmount.toLocaleString()}
                </span>
                <span className="text-lg text-white/40 mb-1">
                  / ₹{primaryGoal.targetAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Right side stats */}
          <div className="flex-shrink-0 flex flex-col gap-6 md:min-w-[240px]">
            {/* Momentum Indicator */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs font-lexend text-white/50 uppercase tracking-wider mb-2 block">Momentum</span>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-medium">↑ Increasing</span>
                <span className="text-sm text-white/40">• 8 weeks</span>
              </div>
            </div>

            {/* Forecast Confidence Indicator */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs font-lexend text-white/50 uppercase tracking-wider mb-3 block flex items-center gap-2">
                Forecast Confidence
                {preview.confidenceChange !== 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-sm ${preview.confidenceChange > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {preview.confidenceChange > 0 ? '+' : ''}{(preview.confidenceChange * 100).toFixed(0)}%
                  </span>
                )}
              </span>

              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">
                  {getConfidenceLabel(confidenceScore / 100)}
                </span>
                <span className="text-sm font-geist font-medium text-white/80">
                  {confidenceScore.toFixed(0)}%
                </span>
              </div>

              {/* Confidence Bar */}
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <m.div
                  className={`h-full rounded-full transition-all duration-300 ${confidenceScore >= 70 ? 'bg-emerald-500' : 'bg-amber-400'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${confidenceScore}%` }}
                />
              </div>
            </div>

            {/* Live ETA Impact (Only shows when dragging sliders) */}
            {preview.etaChangeDays !== 0 && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className={`p-4 rounded-xl border flex items-start gap-3 ${preview.etaChangeDays > 0 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}
              >
                <Clock className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">ETA {preview.etaChangeDays > 0 ? 'Improved' : 'Delayed'}</span>
                  <span className="text-xs opacity-80">
                    Goal arrives {Math.abs(preview.etaChangeDays)} days {preview.etaChangeDays > 0 ? 'sooner' : 'later'}.
                  </span>
                </div>
              </m.div>
            )}

          </div>
        </div>
      </LiquidCard>
    </m.section>
  );
}
