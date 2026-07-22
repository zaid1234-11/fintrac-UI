import React from 'react';
import { WeeklyImpactCard } from './WeeklyImpactCard';
import { TrustScoreCard } from './TrustScoreCard';
import LiquidCard from '@/components/liquid/LiquidCard';

function RecommendationStats() {
  return (
    <LiquidCard level={2} className="p-5">
      <h3 className="text-sm font-semibold text-white/70 mb-4">Recommendation Stats</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/50">Active Decisions</span>
          <span className="text-white">4</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/50">Completed (30d)</span>
          <span className="text-white">12</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/50">Dismissed</span>
          <span className="text-white">1</span>
        </div>
      </div>
    </LiquidCard>
  );
}

export function InsightsSidebar() {
  return (
    <div className="w-80 shrink-0 hidden lg:flex flex-col gap-6 sticky top-24">
      <WeeklyImpactCard />
      <TrustScoreCard />
      <RecommendationStats />
    </div>
  );
}

