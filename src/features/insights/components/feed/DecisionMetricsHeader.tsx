import { Decision } from '../../types';

interface DecisionMetricsHeaderProps {
  decisions: Decision[];
  isLoading: boolean;
}

export function DecisionMetricsHeader({ decisions, isLoading }: DecisionMetricsHeaderProps) {
  if (isLoading || decisions.length === 0) return null;

  const activeDecisions = decisions.filter(d => d.tier !== 'archived' && d.tier !== 'completed');
  const completedDecisions = decisions.filter(d => d.tier === 'completed');
  
  // Calculate potential savings for active decisions
  const potentialSavings = activeDecisions.reduce((acc, curr) => acc + (curr.potentialSavings || 0), 0);
  
  // Calculate average confidence for active decisions
  const avgConfidence = activeDecisions.length > 0
    ? Math.round(activeDecisions.reduce((acc, curr) => acc + curr.confidence, 0) / activeDecisions.length)
    : 0;

  // Estimate 3 mins per action
  const estimatedTime = activeDecisions.length * 3;

  // Completion rate (completed / (completed + active))
  const total = activeDecisions.length + completedDecisions.length;
  const completionRate = total > 0 ? Math.round((completedDecisions.length / total) * 100) : 0;

  const renderMetric = (label: string, value: string) => (
    <div className="flex flex-col">
      <span className="text-xl font-medium text-white">{value}</span>
      <span className="text-xs text-white/50 mt-1">{label}</span>
    </div>
  );

  return (
    <div className="w-full rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-6 mb-8 flex items-center justify-between shadow-2xl">
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold text-white/80">Today's Decisions</h3>
        <span className="text-xs text-fintrac-primary mt-1">{activeDecisions.length} Active</span>
      </div>
      
      <div className="h-10 w-px bg-white/10" />
      {renderMetric('Potential Savings', `₹${potentialSavings.toLocaleString()}/mo`)}
      
      <div className="h-10 w-px bg-white/10" />
      {renderMetric('Avg Confidence', `${avgConfidence}%`)}
      
      <div className="h-10 w-px bg-white/10" />
      {renderMetric('Estimated Time', `${estimatedTime} min`)}
      
      <div className="h-10 w-px bg-white/10" />
      {renderMetric('Completion Rate', `${completionRate}%`)}
    </div>
  );
}
