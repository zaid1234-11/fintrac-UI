import { DecisionConfidenceQuality } from '../../types';

interface DecisionConfidenceProps {
  confidence: number;
  quality: DecisionConfidenceQuality;
  basedOn: string[];
}

export function DecisionConfidence({ confidence, quality, basedOn }: DecisionConfidenceProps) {
  const getQualityColor = () => {
    switch (quality) {
      case 'Very High': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'High': return 'text-fintrac-primary bg-fintrac-primary/10 border-fintrac-primary/20';
      case 'Medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Low': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      default: return 'text-white/70 bg-white/5 border-white/10';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/50">Confidence</span>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getQualityColor()}`}>
            {quality}
          </span>
          <span className="text-sm font-semibold text-white">{confidence}%</span>
        </div>
      </div>
      
      {basedOn && basedOn.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {basedOn.map((reason, idx) => (
            <span key={idx} className="text-[10px] px-2 py-1 rounded bg-white/5 text-white/40 uppercase tracking-wider">
              {reason}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
