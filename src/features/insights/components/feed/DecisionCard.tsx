import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideChevronDown, LucideChevronUp, Target, Droplet, PiggyBank, AlertTriangle, Activity, Shield, LucideArrowRight } from 'lucide-react';
import { Decision, LinkedEntity } from '../../types';
import { DecisionStatus } from './DecisionStatus';
import { DecisionTimeline } from './DecisionTimeline';
import { DecisionEvidence } from './DecisionEvidence';
import { DecisionEvidenceTimeline } from './DecisionEvidenceTimeline';
import { DecisionConfidence } from './DecisionConfidence';
import { ScoreVisualizer } from '../scoring/ScoreVisualizer';
import { ActionButtons } from './ActionButtons';
import { DecisionFeedback } from './DecisionFeedback';
import Link from 'next/link';

interface DecisionCardProps {
  decision: Decision;
  onAccept: (id: string) => void;
  onLater: (id: string) => void;
  onDismiss: (id: string) => void;
  onFeedback?: (id: string, rating: 'helpful' | 'not_helpful', reason?: string) => void;
}

export function DecisionCard({ decision, onAccept, onLater, onDismiss, onFeedback }: DecisionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const getIcon = () => {
    switch (decision.type) {
      case 'savings_opportunity': return <PiggyBank className="w-5 h-5 text-emerald-400" />;
      case 'leak_reduction': return <Droplet className="w-5 h-5 text-blue-400" />;
      case 'goal_acceleration': return <Target className="w-5 h-5 text-fintrac-primary" />;
      case 'risk_alert': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'behavior_change': return <Activity className="w-5 h-5 text-purple-400" />;
      case 'trust_action': return <Shield className="w-5 h-5 text-slate-400" />;
      default: return null;
    }
  };

  const getEntityLabel = (type: string) => {
    switch (type) {
      case 'transaction': return 'View Transaction';
      case 'goal': return 'Open Goal';
      case 'forecast': return 'Review Forecast';
      case 'merchant': return 'Inspect Merchant';
      default: return 'View Details';
    }
  };

  const getEntityHref = (entity: LinkedEntity) => {
    switch (entity.type) {
      case 'transaction': return `/dashboard/transactions?id=${entity.id}`;
      case 'goal': return `/dashboard/goals?id=${entity.id}`;
      case 'forecast': return `/dashboard/forecast?id=${entity.id}`;
      case 'merchant': return `/dashboard/insights?merchant=${entity.id}`; // Generic fallback
      default: return '#';
    }
  };

  const handleAccept = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onAccept(decision.id);
      setIsAnimatingOut(false);
    }, 400); // Wait for exit animation
  };

  if (decision.status === 'completed') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative rounded-2xl bg-white/5 border border-white/10 p-6 overflow-hidden"
      >
        <div className="flex items-center gap-2 text-emerald-400 mb-4">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="text-sm font-bold uppercase tracking-wider">Completed</span>
        </div>

        <h3 className="text-xl font-medium text-white mb-6 leading-tight">
          {decision.title}
        </h3>

        {decision.realizedImpact && decision.realizedImpact.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-white/5">
            {decision.realizedImpact.map((impact, idx) => (
              <div key={idx}>
                <span className="text-xs text-white/50 block mb-1">{impact.label}</span>
                <span className="text-sm font-semibold text-fintrac-primary">{impact.value}</span>
              </div>
            ))}
          </div>
        )}

        {onFeedback && (
          <DecisionFeedback 
            decisionId={decision.id} 
            currentRating={decision.feedback?.rating}
            onSubmit={onFeedback} 
          />
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: isAnimatingOut ? 0 : 1, 
        y: isAnimatingOut ? -10 : 0,
        scale: isAnimatingOut ? 0.98 : 1
      }}
      transition={{ duration: 0.3 }}
      className="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-6 shadow-2xl overflow-hidden"
    >
      <DecisionStatus status={decision.status} />

      <div className="flex items-start gap-4 mb-6 pr-24">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
          {getIcon()}
        </div>
        <div>
          <span className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1 block">
            {decision.type.replace('_', ' ')}
          </span>
          <h3 className="text-xl font-medium text-white leading-tight">
            {decision.title}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
          <span className="text-xs text-white/50 block mb-2">Expected Outcome</span>
          <div className="space-y-2">
            {decision.expectedOutcome.map((outcome, idx) => (
              <div key={idx}>
                <span className="text-sm font-medium text-white block">{outcome.label}</span>
                <span className="text-xs text-fintrac-primary block">{outcome.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
          <div>
            <span className="text-xs text-white/50 block mb-1">Why Now?</span>
            <p className="text-sm text-white/80 leading-snug">{decision.whyNow}</p>
          </div>
        </div>
      </div>

      <DecisionConfidence 
        confidence={decision.confidence}
        quality={decision.confidenceQuality}
        basedOn={decision.confidenceBasedOn}
      />

      <ActionButtons 
        onAccept={handleAccept}
        onLater={() => onLater(decision.id)}
        onDismiss={() => onDismiss(decision.id)}
        disabled={isAnimatingOut || decision.status === 'accepted'}
      />

      {/* Cross-Module Navigation Links */}
      {decision.linkedEntities && decision.linkedEntities.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {decision.linkedEntities.map((entity, idx) => (
            <Link 
              key={idx} 
              href={getEntityHref(entity)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/70 hover:text-white transition-colors"
            >
              <span>{getEntityLabel(entity.type)}</span>
              <span className="opacity-50 mx-0.5">•</span>
              <span className="font-medium truncate max-w-[120px]">{entity.title}</span>
              <LucideArrowRight className="w-3 h-3 opacity-50 ml-1" />
            </Link>
          ))}
        </div>
      )}

      {/* Expand Toggle */}
      <button 
        onClick={() => setExpanded(!expanded)}
        className="mt-6 flex items-center justify-center gap-2 w-full py-2 border-t border-white/5 text-xs text-white/40 hover:text-white/70 transition-colors"
      >
        <span>{expanded ? 'Hide Details' : 'Show Evidence & Scoring'}</span>
        {expanded ? <LucideChevronUp className="w-3 h-3" /> : <LucideChevronDown className="w-3 h-3" />}
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {decision.evidenceTimeline && decision.evidenceTimeline.length > 0 ? (
              <DecisionEvidenceTimeline timeline={decision.evidenceTimeline} />
            ) : (
              <DecisionEvidence evidence={decision.evidence} />
            )}
            <ScoreVisualizer 
              score={decision.score}
              impact={decision.impact}
              confidence={decision.confidence}
              urgency={decision.urgency}
              effort={decision.effort}
            />
            <DecisionTimeline events={decision.timeline} />
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
