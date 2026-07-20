import { LucideCheck, LucideClock, LucideX } from 'lucide-react';

interface ActionButtonsProps {
  onAccept: () => void;
  onLater: () => void;
  onDismiss: () => void;
  disabled?: boolean;
}

export function ActionButtons({ onAccept, onLater, onDismiss, disabled }: ActionButtonsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mt-6">
      <button
        onClick={onAccept}
        disabled={disabled}
        className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-fintrac-primary text-black font-semibold hover:bg-fintrac-primary/90 transition-colors disabled:opacity-50"
      >
        <LucideCheck className="w-4 h-4" />
        <span>Accept</span>
      </button>
      
      <button
        onClick={onLater}
        disabled={disabled}
        className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/10 text-white font-medium hover:bg-white/15 transition-colors disabled:opacity-50"
      >
        <LucideClock className="w-4 h-4 opacity-70" />
        <span>Later</span>
      </button>
      
      <button
        onClick={onDismiss}
        disabled={disabled}
        className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/10 text-white/70 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-50"
      >
        <LucideX className="w-4 h-4 opacity-70" />
        <span>Dismiss</span>
      </button>
    </div>
  );
}
