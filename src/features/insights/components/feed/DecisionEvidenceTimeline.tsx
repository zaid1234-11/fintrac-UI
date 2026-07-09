import { TimelineEvent } from '../../types';
import { LucideEye, LucideBrainCircuit } from 'lucide-react';

interface DecisionEvidenceTimelineProps {
  timeline: TimelineEvent[];
}

export function DecisionEvidenceTimeline({ timeline }: DecisionEvidenceTimelineProps) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
      <h4 className="text-sm font-medium text-white mb-4">Evidence Timeline</h4>
      <div className="space-y-4 relative">
        {timeline.map((event, idx) => (
          <div key={idx} className="relative flex items-start gap-4">
            {idx !== timeline.length - 1 && (
              <div className="absolute left-3 top-7 w-[1px] h-[calc(100%-1rem)] bg-white/10 -ml-px" />
            )}
            
            <div className="relative z-10 w-6 h-6 rounded-full bg-black border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
              {event.type === 'observed' ? (
                <LucideEye className="w-3 h-3 text-white/50" />
              ) : (
                <LucideBrainCircuit className="w-3 h-3 text-fintrac-primary" />
              )}
            </div>
            
            <div className="flex-1">
              <span className={`text-xs font-semibold uppercase tracking-wider mb-0.5 block ${
                event.type === 'observed' ? 'text-white/40' : 'text-fintrac-primary'
              }`}>
                {event.type === 'observed' ? 'Observed' : 'AI Analysis'}
              </span>
              <p className="text-sm text-white/80">{event.label}</p>
              <p className="text-xs text-white/30 mt-0.5">
                {new Date(event.date).toLocaleString(undefined, {
                  month: 'short', day: 'numeric'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
