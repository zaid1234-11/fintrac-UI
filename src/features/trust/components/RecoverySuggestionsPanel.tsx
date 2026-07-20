import { RecoverySuggestion } from '../../types';
import { LucideArrowRight, LucideClock, LucideTrendingUp } from 'lucide-react';
import Link from 'next/link';

interface RecoverySuggestionsPanelProps {
  suggestions: RecoverySuggestion[];
  onAction?: (id: string, type: string, targetId?: string) => void;
}

export function RecoverySuggestionsPanel({ suggestions, onAction }: RecoverySuggestionsPanelProps) {
  if (suggestions.length === 0) return null;

  const getActionLink = (type: string) => {
    switch (type) {
      case 'open_transactions': return '/dashboard/transactions';
      case 'open_insights': return '/dashboard/insights';
      default: return '#';
    }
  };

  const getActionText = (type: string) => {
    switch (type) {
      case 'open_transactions': return 'Open Transactions';
      case 'open_insights': return 'Open AI Decision Center';
      case 'reconnect_source': return 'Reconnect Source';
      default: return 'Resolve Issue';
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-white mb-4">Recovery Suggestions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestions.map(suggestion => (
          <div key={suggestion.id} className="rounded-xl bg-white/5 border border-white/10 p-5 flex flex-col group hover:bg-white/10 transition-colors">
            <h4 className="text-sm font-medium text-white mb-4">{suggestion.title}</h4>
            
            <div className="mt-auto pt-4 border-t border-white/5 flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-white/50">
                  <LucideClock className="w-3.5 h-3.5" />
                  {suggestion.estimatedTimeMinutes} min
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium bg-emerald-400/10 px-2 py-1 rounded">
                  <LucideTrendingUp className="w-3.5 h-3.5" />
                  +{suggestion.expectedTrustImpact} Score
                </span>
              </div>

              {suggestion.actionType === 'reconnect_source' ? (
                <button 
                  onClick={() => onAction && onAction(suggestion.id, suggestion.actionType, suggestion.targetId)}
                  className="flex items-center justify-between w-full text-xs font-semibold text-fintrac-primary hover:text-white transition-colors py-2 group-hover:bg-fintrac-primary/10 px-3 -mx-3 rounded-lg"
                >
                  {getActionText(suggestion.actionType)}
                  <LucideArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </button>
              ) : (
                <Link 
                  href={getActionLink(suggestion.actionType)}
                  className="flex items-center justify-between w-full text-xs font-semibold text-fintrac-primary hover:text-white transition-colors py-2 group-hover:bg-fintrac-primary/10 px-3 -mx-3 rounded-lg"
                >
                  {getActionText(suggestion.actionType)}
                  <LucideArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
