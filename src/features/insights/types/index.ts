export type DecisionTier = 'do_today' | 'high_impact' | 'nice_to_have' | 'in_progress' | 'completed' | 'archived';

export type DecisionType = 
  | 'savings_opportunity' 
  | 'leak_reduction' 
  | 'goal_acceleration' 
  | 'risk_alert' 
  | 'behavior_change' 
  | 'trust_action';

export type DecisionStatus = 'new' | 'recommended' | 'accepted' | 'in_progress' | 'completed' | 'dismissed';

export type DecisionConfidenceQuality = 'Very High' | 'High' | 'Medium' | 'Low';

export interface LinkedEntity {
  type: 'transaction' | 'goal' | 'forecast' | 'merchant';
  id: string;
  title: string;
}

export interface TimelineEvent {
  date: string; // ISO string
  type: 'observed' | 'inferred';
  label: string;
}

export interface ImpactMetric {
  label: string;
  value: string;
}

export interface DecisionTimelineEvent {
  status: DecisionStatus;
  timestamp: string; // ISO string
  label: string; // e.g., "Recommended Today", "Accepted 2 hours ago"
}

export interface Decision {
  id: string;
  title: string;
  type: DecisionType;
  priority: number; // For sorting within a tier
  tier: DecisionTier;
  score: number;
  
  // Scoring parameters (0-100)
  impact: number;
  confidence: number;
  urgency: number;
  effort: number;
  
  // Explanatory
  expectedOutcome: ImpactMetric[];
  potentialSavings?: number; // Optional monetary value
  status: DecisionStatus;
  
  // Links
  linkedEntities?: LinkedEntity[];
  
  // History & Lifecycle
  timeline: DecisionTimelineEvent[];
  history?: {
    createdAt: string;
    acceptedAt?: string;
    completedAt?: string;
    archivedAt?: string;
  };
  
  // Evidence
  evidence: string[]; // Deprecated in favor of evidenceTimeline for new ones
  evidenceTimeline?: TimelineEvent[];
  whyNow: string;
  
  // Confidence quality details
  confidenceQuality: DecisionConfidenceQuality;
  confidenceBasedOn: string[];
  
  // Completed State
  realizedImpact?: ImpactMetric[];
  feedback?: {
    rating?: 'helpful' | 'not_helpful';
    reason?: string;
  };
}
