import React from 'react';
import { WeeklyImpactCard } from './WeeklyImpactCard';
import { TrustScoreCard } from './TrustScoreCard';

function RecommendationStats() {
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
    <div ref={cardRef} className="goal-liquid-glass p-5">
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
    </div>
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
