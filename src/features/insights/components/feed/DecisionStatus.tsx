import { DecisionStatus as StatusType } from '../../types';

interface DecisionStatusProps {
  status: StatusType;
}

export function DecisionStatus({ status }: DecisionStatusProps) {
  if (status === 'recommended') return null;

  return (
    <div className="absolute top-4 right-4 z-10">
      {status === 'accepted' && (
        <span className="px-3 py-1 rounded-full bg-fintrac-primary/20 text-fintrac-primary border border-fintrac-primary/30 text-xs font-semibold shadow-[0_0_15px_rgba(205,255,100,0.2)]">
          Accepted
        </span>
      )}
      {status === 'in_progress' && (
        <span className="px-3 py-1 rounded-full bg-fintrac-primary/10 text-fintrac-primary border border-fintrac-primary/20 text-xs font-medium flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-fintrac-primary animate-pulse" />
          In Progress
        </span>
      )}
      {status === 'completed' && (
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
          Completed
        </span>
      )}
    </div>
  );
}
