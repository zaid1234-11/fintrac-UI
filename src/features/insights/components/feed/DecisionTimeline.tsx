import { DecisionTimelineEvent } from '../../types';

interface DecisionTimelineProps {
  events: DecisionTimelineEvent[];
}

export function DecisionTimeline({ events }: DecisionTimelineProps) {
  return (
    <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
      <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Timeline</h4>
      <div className="space-y-4">
        {events.map((event, idx) => (
          <div key={idx} className="relative flex items-start gap-3">
            {/* Connector Line */}
            {idx !== events.length - 1 && (
              <div className="absolute left-2.5 top-5 w-[1px] h-full bg-white/10 -ml-px" />
            )}
            
            {/* Status Dot */}
            <div className={`relative z-10 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5
              ${event.status === 'completed' ? 'bg-emerald-500/20 border-emerald-500/50' : 
                event.status === 'accepted' || event.status === 'in_progress' ? 'bg-fintrac-primary/20 border-fintrac-primary/50' :
                'bg-white/5 border-white/20'}`}>
              <div className={`w-1.5 h-1.5 rounded-full 
                ${event.status === 'completed' ? 'bg-emerald-400' : 
                  event.status === 'accepted' || event.status === 'in_progress' ? 'bg-fintrac-primary' :
                  'bg-white/40'}`} />
            </div>
            
            {/* Label and Timestamp */}
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                event.status === 'completed' ? 'text-emerald-400' : 
                event.status === 'accepted' || event.status === 'in_progress' ? 'text-fintrac-primary' :
                'text-white/70'
              }`}>{event.label}</p>
              <p className="text-xs text-white/40 mt-0.5">
                {new Date(event.timestamp).toLocaleString(undefined, {
                  month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
