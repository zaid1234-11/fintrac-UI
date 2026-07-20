export type TrustHealthState = 'Excellent' | 'Good' | 'Fair' | 'Needs Attention';
export type FreshnessState = 'Fresh' | 'Aging' | 'Stale';
export type DataSourceStatus = 'Connected' | 'Disconnected' | 'Error';
export type EventType = 'recommendation_generated' | 'forecast_created' | 'goal_status_changed' | 'data_source_connected' | 'permission_changed' | 'correction_applied';
export type EventCategory = 'data_import' | 'recommendation' | 'goal_update' | 'user_correction' | 'system_event';

export interface TrustScore {
  overallScore: number;
  trend: number; // e.g., +3 or -1
  history: number[]; // e.g., [74, 79, 83, 87] for sparkline
  lastCalculated: string; // ISO String
}

export interface TrustHealth {
  healthState: TrustHealthState;
  confidenceDistribution: {
    high: number;
    medium: number;
    needsReview: number;
  };
  scoreBreakdown: {
    dataCompleteness: number;
    dataFreshness: number;
    forecastAccuracy: number;
    recommendationReliability: number;
    userCorrections: number;
  };
}

export interface RecoverySuggestion {
  id: string;
  title: string;
  estimatedTimeMinutes: number;
  expectedTrustImpact: number;
  actionType: 'open_transactions' | 'reconnect_source' | 'open_insights';
  targetId?: string; // e.g., source id to reconnect
}

export interface DataSource {
  id: string;
  name: string;
  type: 'sms' | 'bank_statement' | 'manual' | 'upi' | 'credit_card';
  status: DataSourceStatus;
  lastSync: string; // ISO String
  coverage: number; // e.g., 98
  reliability: number; // e.g., 99.7
  transactionsCount: number; // e.g., 1284
  freshnessState: FreshnessState;
}

export interface EngineMetadata {
  engineName: string;
  version: string;
  processingTimeMs: number;
  confidence: number;
}

export interface AuditLogEvent {
  eventId: string;
  eventType: EventType;
  category: EventCategory;
  timestamp: string; // ISO String
  description: string;
  
  // Inspect Panel Data
  engineMetadata?: EngineMetadata;
  evidence?: string[];
  inputSources?: string[];
  affectedObjects?: { type: string, name: string }[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  purpose: string;
  isEnabled: boolean;
  isCritical: boolean;
  trustImpact: number; // e.g., -4
  impactWarnings: string[];
}
