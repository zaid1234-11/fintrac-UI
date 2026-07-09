import { WeeklyImpactCard } from './WeeklyImpactCard';
import { TrustScoreCard } from './TrustScoreCard';

export function InsightsSidebar() {
  return (
    <div className="w-80 shrink-0 hidden lg:flex flex-col gap-6 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar">
      <WeeklyImpactCard />
      <TrustScoreCard />
      
      {/* Needs Attention could go here in a full implementation */}
      
      <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
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
    </div>
  );
}
