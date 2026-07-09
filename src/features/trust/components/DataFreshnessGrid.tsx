import { DataSource } from '../../types';
import { LucideSmartphone, LucideLandmark, LucideEdit3, LucideRefreshCw, LucideCreditCard, LucideAlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns'; // Wait, let's just write a custom formatter or use simple string manipulation.

interface DataFreshnessGridProps {
  sources: DataSource[];
  onReconnect: (id: string) => void;
}

export function DataFreshnessGrid({ sources, onReconnect }: DataFreshnessGridProps) {
  const getIcon = (type: DataSource['type']) => {
    switch (type) {
      case 'sms': return <LucideSmartphone className="w-5 h-5" />;
      case 'bank_statement': return <LucideLandmark className="w-5 h-5" />;
      case 'credit_card': return <LucideCreditCard className="w-5 h-5" />;
      case 'manual': return <LucideEdit3 className="w-5 h-5" />;
      default: return <LucideLandmark className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: DataSource['status']) => {
    switch (status) {
      case 'Connected': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Disconnected': return 'text-white/50 bg-white/5 border-white/10';
      case 'Error': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
    }
  };

  const getFreshnessColor = (state: DataSource['freshnessState']) => {
    switch (state) {
      case 'Fresh': return 'text-emerald-400';
      case 'Aging': return 'text-amber-400';
      case 'Stale': return 'text-rose-400';
    }
  };

  // Simple relative time formatter
  const formatTime = (isoString: string) => {
    const diff = Date.now() - new Date(isoString).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-white">Data Sources & Freshness</h3>
        <span className="text-xs text-white/50">{sources.length} Connected</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map(source => (
          <div key={source.id} className="rounded-xl bg-white/5 border border-white/10 p-5 flex flex-col relative overflow-hidden group hover:bg-white/[0.07] transition-colors">
            
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-black/50 border border-white/5 flex items-center justify-center text-white/70">
                {getIcon(source.type)}
              </div>
              <span className={`px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${getStatusColor(source.status)}`}>
                {source.status}
              </span>
            </div>

            <h4 className="text-sm font-medium text-white mb-4">{source.name}</h4>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Coverage</span>
                <span className="text-xs text-white/80">{source.coverage}%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Reliability</span>
                <span className="text-xs text-white/80">{source.reliability}%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Transactions</span>
                <span className="text-xs text-white/80">{source.transactionsCount.toLocaleString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Last Sync</span>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${getFreshnessColor(source.freshnessState).replace('text-', 'bg-')}`} />
                  <span className={`text-xs font-medium ${getFreshnessColor(source.freshnessState)}`}>
                    {formatTime(source.lastSync)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-end">

              {source.status === 'Error' || source.freshnessState === 'Stale' ? (
                <button 
                  onClick={() => onReconnect(source.id)}
                  className="flex items-center gap-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors bg-rose-400/10 hover:bg-rose-400/20 px-2 py-1 rounded"
                >
                  <LucideRefreshCw className="w-3 h-3" />
                  Reconnect
                </button>
              ) : null}
            </div>

            {source.status === 'Error' && (
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
            )}
          </div>
        ))}

        {/* Add New Source Button */}
        <button className="rounded-xl border border-dashed border-white/20 p-5 flex flex-col items-center justify-center text-white/40 hover:text-white/70 hover:border-white/40 hover:bg-white/5 transition-all min-h-[180px]">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3">
            <span className="text-xl">+</span>
          </div>
          <span className="text-sm font-medium">Connect Source</span>
        </button>
      </div>
    </div>
  );
}
