'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGoalEngine } from '@/features/goals/hooks/useGoalEngine';
import { PrimaryGoalFocus } from '@/features/goals/components/PrimaryGoalFocus';
import { ContributionAllocation } from '@/features/goals/components/ContributionAllocation';
import { AiGoalCoach } from '@/features/goals/components/AiGoalCoach';
import { GoalEventsLog } from '@/features/goals/components/GoalEventsLog';
import { DashboardVideoBackground } from '@/features/dashboard/components/DashboardVideoBackground';

export default function GoalOSPage() {
  return (
    <div className="relative min-h-screen w-full bg-transparent overflow-hidden selection:bg-emerald-500/30 selection:text-white text-white">
      {/* Layer 1: Cinematic Ambient Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <DashboardVideoBackground src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260520_111942_8fc50f9e-4dfd-45c1-81bb-d93342a23d87.mp4" />
      </div>

      <div className="relative z-10 w-full min-h-screen pt-8 md:pt-16 px-4 md:px-8 max-w-[1800px] mx-auto pb-32">
        <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] 2xl:grid-cols-[320px_1fr] gap-6 xl:gap-10">

          {/* LEFT SIDEBAR (Sticky) */}
          <aside className="w-full shrink-0">
            <div className="sticky top-16 flex flex-col gap-6">
              <GoalSidebar />
              <GoalEventsLog />
            </div>
          </aside>

          {/* MAIN CONTENT (Posters and Grid) */}
          <main className="flex-1 flex flex-col gap-6">
            <PrimaryGoalFocus />
            <AiGoalCoach />
            <ContributionAllocation />
          </main>

        </div>
      </div>
    </div>
  );
}

function GoalSidebar() {
  const { summary, totalAllocatedPreview, totalMonthlyBudget } = useGoalEngine();
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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div ref={cardRef} className="goal-liquid-glass flex flex-col gap-6 p-6">
        <div>
          <h1 className="font-display text-xl mb-1 text-white">Goal OS</h1>
          <p className="text-xs font-lexend text-white/60">How do I reach what matters faster?</p>
        </div>

        <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white/60">Active Goals</span>
            <span className="text-lg font-display text-emerald-400">
              {summary.onTrackCount + summary.needsAttentionCount + summary.atRiskCount}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white/60">Total Allocated</span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-medium text-white">₹{totalAllocatedPreview.toLocaleString()}</span>
              <span className="text-[10px] text-white/40 font-geist">/ ₹{totalMonthlyBudget.toLocaleString()}</span>
            </div>
          </div>

          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-1">
            <motion.div
              className="h-full bg-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (totalAllocatedPreview / totalMonthlyBudget) * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

