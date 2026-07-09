import { TrustHealth } from '../../types';
import Link from 'next/link';
import { LucideChevronRight } from 'lucide-react';

interface ConfidenceDistributionPanelProps {
  health: TrustHealth;
}

export function ConfidenceDistributionPanel({ health }: ConfidenceDistributionPanelProps) {
  const dist = health.confidenceDistribution;

  return (
    <div className="w-full rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-medium text-white">Confidence Distribution</h3>
        <span className="text-sm px-3 py-1 bg-white/10 text-white/70 rounded-full">{health.healthState}</span>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* High Confidence */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-emerald-400 font-medium">High</span>
            <span className="text-white/70">{dist.high}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${dist.high}%` }} />
          </div>
        </div>

        {/* Medium Confidence */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-amber-400 font-medium">Medium</span>
            <span className="text-white/70">{dist.medium}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${dist.medium}%` }} />
          </div>
        </div>

        {/* Needs Review */}
        <Link href="/dashboard/transactions?filter=needs_review" className="group block cursor-pointer">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-rose-400 font-medium flex items-center gap-1">
              Needs Review
              <LucideChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </span>
            <span className="text-white/70">{dist.needsReview}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-rose-400 rounded-full" style={{ width: `${dist.needsReview}%` }} />
          </div>
        </Link>
        
      </div>
    </div>
  );
}
