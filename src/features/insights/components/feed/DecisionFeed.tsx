import { Decision } from '../../types';
import { DecisionCard } from './DecisionCard';
import { DecisionMetricsHeader } from './DecisionMetricsHeader';
import { DecisionHistoryTabs } from './DecisionHistoryTabs';

interface DecisionFeedProps {
  decisions: Decision[];
  isLoading: boolean;
  loadingText: string;
  onAccept: (id: string) => void;
  onLater: (id: string) => void;
  onDismiss: (id: string) => void;
  onFeedback?: (id: string, rating: 'helpful' | 'not_helpful', reason?: string) => void;
}

export function DecisionFeed({ decisions, isLoading, loadingText, onAccept, onLater, onDismiss, onFeedback }: DecisionFeedProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 h-full">
        <div className="relative w-16 h-16 mb-8">
          <div className="absolute inset-0 border-t-2 border-fintrac-primary rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-r-2 border-emerald-400 rounded-full animate-spin-reverse"></div>
        </div>
        <p className="text-white/70 font-medium animate-pulse">{loadingText}</p>
      </div>
    );
  }

  // Filter out archived/completed for the active feed
  const activeDecisions = decisions.filter(d => 
    d.status !== 'dismissed' && d.tier !== 'archived' && d.tier !== 'completed'
  );

  if (activeDecisions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 h-full text-center max-w-sm mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
          <span className="text-3xl">✨</span>
        </div>
        <h3 className="text-xl font-medium text-white mb-3">You're in great shape.</h3>
        <p className="text-white/60 leading-relaxed">
          No high-priority financial decisions require your attention today. 
          We'll notify you when something meaningful changes.
        </p>
      </div>
    );
  }

  // Group by tier
  const tiers = {
    do_today: activeDecisions.filter(d => d.tier === 'do_today').sort((a, b) => a.priority - b.priority),
    high_impact: activeDecisions.filter(d => d.tier === 'high_impact').sort((a, b) => a.priority - b.priority),
    nice_to_have: activeDecisions.filter(d => d.tier === 'nice_to_have').sort((a, b) => a.priority - b.priority),
    in_progress: activeDecisions.filter(d => d.tier === 'in_progress').sort((a, b) => a.priority - b.priority),
  };

  const renderTier = (title: string, items: Decision[]) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-12">
        <h2 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6 sticky top-0 bg-black/50 backdrop-blur-md py-2 z-20">
          {title}
        </h2>
        <div className="space-y-6">
          {items.map(decision => (
            <DecisionCard 
              key={decision.id}
              decision={decision}
              onAccept={onAccept}
              onLater={onLater}
              onDismiss={onDismiss}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto w-full pb-32">
      <DecisionMetricsHeader decisions={decisions} isLoading={isLoading} />
      
      {renderTier('Do Today', tiers.do_today)}
      {renderTier('High Impact', tiers.high_impact)}
      {renderTier('Nice to Have', tiers.nice_to_have)}
      {renderTier('In Progress', tiers.in_progress)}
      
      <DecisionHistoryTabs decisions={decisions} onFeedback={onFeedback} />
    </div>
  );
}
