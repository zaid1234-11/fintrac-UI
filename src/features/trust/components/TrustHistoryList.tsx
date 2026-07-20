import { TrustScore } from '../../types';
import { LucideTrendingUp, LucideTrendingDown, LucideCalendar } from 'lucide-react';

interface TrustHistoryListProps {
  score: TrustScore;
}

export function TrustHistoryList({ score }: TrustHistoryListProps) {
  // Mock historical changes based on the score trend
  const history = [
    { period: 'Today', change: score.trend > 0 ? '+3' : '-1', isPositive: score.trend > 0 },
    { period: 'Yesterday', change: '-1', isPositive: false },
    { period: 'Last Week', change: '+6', isPositive: true },
    { period: 'Last Month', change: '+11', isPositive: true },
  ];

  return (
    <div className="w-full rounded-2xl bg-white/5 border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-white">Trust History</h3>
        <LucideCalendar className="w-4 h-4 text-white/40" />
      </div>

      <div className="flex flex-col gap-2">
        {history.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
            <span className="text-sm text-white/70 group-hover:text-white transition-colors">{item.period}</span>
            <div className={`flex items-center gap-1.5 text-sm font-medium px-2 py-1 rounded bg-white/5 ${item.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {item.isPositive ? <LucideTrendingUp className="w-3.5 h-3.5" /> : <LucideTrendingDown className="w-3.5 h-3.5" />}
              {item.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
