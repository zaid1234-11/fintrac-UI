import { useState } from 'react';
import { LucideThumbsUp, LucideThumbsDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DecisionFeedbackProps {
  decisionId: string;
  currentRating?: 'helpful' | 'not_helpful';
  onSubmit: (id: string, rating: 'helpful' | 'not_helpful', reason?: string) => void;
}

export function DecisionFeedback({ decisionId, currentRating, onSubmit }: DecisionFeedbackProps) {
  const [showReasons, setShowReasons] = useState(false);

  const handleRating = (rating: 'helpful' | 'not_helpful') => {
    if (rating === 'not_helpful') {
      setShowReasons(true);
    } else {
      onSubmit(decisionId, rating);
      setShowReasons(false);
    }
  };

  const submitReason = (reason: string) => {
    onSubmit(decisionId, 'not_helpful', reason);
    setShowReasons(false);
  };

  const reasons = [
    'Already completed',
    'Not relevant',
    'Incorrect recommendation',
    'Other'
  ];

  return (
    <div className="mt-6 pt-4 border-t border-white/5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/50">Helpful?</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleRating('helpful')}
            className={`p-2 rounded-lg transition-colors ${
              currentRating === 'helpful' 
                ? 'bg-fintrac-primary text-black' 
                : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
            }`}
          >
            <LucideThumbsUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleRating('not_helpful')}
            className={`p-2 rounded-lg transition-colors ${
              currentRating === 'not_helpful' 
                ? 'bg-rose-500 text-white' 
                : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
            }`}
          >
            <LucideThumbsDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showReasons && !currentRating && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-xs text-white/40 mb-3">Tell us why so we can improve:</p>
              <div className="flex flex-wrap gap-2">
                {reasons.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => submitReason(reason)}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/70 hover:bg-white/5 transition-colors"
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
