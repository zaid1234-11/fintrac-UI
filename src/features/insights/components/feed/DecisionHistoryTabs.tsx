import { useState } from 'react';
import { Decision } from '../../types';
import { DecisionCard } from './DecisionCard';

interface DecisionHistoryTabsProps {
  decisions: Decision[];
  onFeedback?: (id: string, rating: 'helpful' | 'not_helpful', reason?: string) => void;
}

export function DecisionHistoryTabs({ decisions, onFeedback }: DecisionHistoryTabsProps) {
  const [activeTab, setActiveTab] = useState<'completed' | 'dismissed' | 'snoozed' | 'archived'>('completed');

  const historyDecisions = decisions.filter(d => 
    d.tier === 'completed' || d.tier === 'archived'
  );

  if (historyDecisions.length === 0) return null;

  const completed = decisions.filter(d => d.tier === 'completed');
  const dismissed = decisions.filter(d => d.status === 'dismissed');
  const snoozed = decisions.filter(d => d.tier === 'archived' && d.status === 'recommended');
  
  const getDisplayDecisions = () => {
    switch (activeTab) {
      case 'completed': return completed;
      case 'dismissed': return dismissed;
      case 'snoozed': return snoozed;
      case 'archived': return historyDecisions;
      default: return [];
    }
  };

  const displayDecisions = getDisplayDecisions();

  return (
    <div className="mt-24">
      <div className="mb-8">
        <h2 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-2">
          Decision History
        </h2>
        {activeTab === 'completed' && completed.length > 0 && (
          <p className="text-emerald-400/80 text-sm">
            You completed {completed.length} recommendation{completed.length > 1 ? 's' : ''} this month. 
            Great job accelerating your goals!
          </p>
        )}
      </div>

      <div className="flex space-x-1 border-b border-white/10 mb-8 overflow-x-auto no-scrollbar pb-px">
        {(['completed', 'snoozed', 'dismissed', 'archived'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'text-fintrac-primary border-b-2 border-fintrac-primary'
                : 'text-white/50 hover:text-white hover:bg-white/5 rounded-t-lg'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {displayDecisions.length === 0 ? (
          <div className="text-center py-12 text-white/40 text-sm">
            No {activeTab} decisions found.
          </div>
        ) : (
          displayDecisions.map(decision => (
            <DecisionCard 
              key={decision.id}
              decision={decision}
              onAccept={() => {}}
              onLater={() => {}}
              onDismiss={() => {}}
              onFeedback={onFeedback}
            />
          ))
        )}
      </div>
    </div>
  );
}
