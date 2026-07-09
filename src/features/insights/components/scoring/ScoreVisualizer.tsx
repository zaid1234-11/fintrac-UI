interface ScoreVisualizerProps {
  score: number;
  impact: number;
  confidence: number;
  urgency: number;
  effort: number;
}

export function ScoreVisualizer({ score, impact, confidence, urgency, effort }: ScoreVisualizerProps) {
  const renderBar = (label: string, value: number, colorClass: string) => (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-white/50 w-20">{label}</span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass} rounded-full transition-all duration-1000`} 
          style={{ width: `${value}%` }} 
        />
      </div>
      <span className="text-xs font-mono text-white/70 w-8 text-right">{value}</span>
    </div>
  );

  return (
    <div className="mt-4 pt-4 border-t border-white/5">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-white/80">Overall Score</h4>
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-fintrac-primary">{score}</span>
          <span className="text-xs text-white/40">/100</span>
        </div>
      </div>
      
      <div className="space-y-2">
        {renderBar('Impact', impact, 'bg-emerald-400')}
        {renderBar('Confidence', confidence, 'bg-fintrac-primary')}
        {renderBar('Urgency', urgency, 'bg-amber-400')}
        {/* Effort is inversely proportional, high effort = red/amber */}
        {renderBar('Effort', effort, effort > 50 ? 'bg-rose-400' : 'bg-white/40')}
      </div>
    </div>
  );
}
