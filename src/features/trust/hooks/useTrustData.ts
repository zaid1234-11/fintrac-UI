import { useState, useEffect } from 'react';
import { 
  TrustScore, 
  TrustHealth, 
  RecoverySuggestion, 
  DataSource, 
  AuditLogEvent, 
  Permission 
} from '../types';

const mockTrustScore: TrustScore = {
  overallScore: 87,
  trend: 3,
  history: [74, 79, 83, 87],
  lastCalculated: new Date().toISOString()
};

const mockTrustHealth: TrustHealth = {
  healthState: 'Good',
  confidenceDistribution: {
    high: 82,
    medium: 13,
    needsReview: 5
  },
  scoreBreakdown: {
    dataCompleteness: 95,
    dataFreshness: 90,
    forecastAccuracy: 82,
    recommendationReliability: 85,
    userCorrections: 92,
  }
};

const mockRecoverySuggestions: RecoverySuggestion[] = [
  {
    id: 'sug_1',
    title: 'Review 6 Uncategorized Merchants',
    estimatedTimeMinutes: 3,
    expectedTrustImpact: 4,
    actionType: 'open_transactions'
  },
  {
    id: 'sug_2',
    title: 'Reconnect ICICI Credit Card',
    estimatedTimeMinutes: 2,
    expectedTrustImpact: 6,
    actionType: 'reconnect_source',
    targetId: 'ds_3'
  },
  {
    id: 'sug_3',
    title: 'Approve 3 Recommendations',
    estimatedTimeMinutes: 1,
    expectedTrustImpact: 2,
    actionType: 'open_insights'
  }
];

const mockDataSources: DataSource[] = [
  {
    id: 'ds_1',
    name: 'SMS Parsing',
    type: 'sms',
    status: 'Connected',
    lastSync: new Date(Date.now() - 1000 * 60 * 3).toISOString(), // 3 mins ago
    coverage: 98,
    reliability: 99.7,
    transactionsCount: 1284,
    freshnessState: 'Fresh'
  },
  {
    id: 'ds_2',
    name: 'HDFC Bank Statement',
    type: 'bank_statement',
    status: 'Connected',
    lastSync: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 48 hours ago
    coverage: 100,
    reliability: 100,
    transactionsCount: 342,
    freshnessState: 'Aging'
  },
  {
    id: 'ds_3',
    name: 'ICICI Credit Card',
    type: 'credit_card',
    status: 'Error',
    lastSync: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    coverage: 85,
    reliability: 72.1,
    transactionsCount: 89,
    freshnessState: 'Stale'
  }
];

const mockAuditLogs: AuditLogEvent[] = [
  {
    eventId: 'evt_1',
    eventType: 'recommendation_generated',
    category: 'recommendation',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    description: 'Recommendation generated: "Reduce food delivery by ₹700"',
    engineMetadata: {
      engineName: 'Recommendation Engine',
      version: 'v1.4.2',
      processingTimeMs: 82,
      confidence: 94
    },
    evidence: ['6 months of food delivery spend', '18% increase vs last month'],
    inputSources: ['HDFC Bank Statement', 'SMS Parsing'],
    affectedObjects: [{ type: 'Goal', name: 'Emergency Fund' }]
  },
  {
    eventId: 'evt_2',
    eventType: 'data_source_connected',
    category: 'data_import',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    description: 'Statement Imported (HDFC Bank)',
    inputSources: ['Manual Upload']
  },
  {
    eventId: 'evt_3',
    eventType: 'correction_applied',
    category: 'user_correction',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    description: 'Merchant Review (Swiggy: Entertainment → Food)',
    affectedObjects: [{ type: 'Merchant', name: 'Swiggy' }]
  },
  {
    eventId: 'evt_4',
    eventType: 'goal_status_changed',
    category: 'goal_update',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    description: 'Goal "Emergency Fund" became At Risk',
    engineMetadata: {
      engineName: 'Goal OS Engine',
      version: 'v2.0.1',
      processingTimeMs: 45,
      confidence: 98
    },
    affectedObjects: [{ type: 'Goal', name: 'Emergency Fund' }]
  }
];

const mockPermissions: Permission[] = [
  {
    id: 'perm_1',
    name: 'SMS Parsing',
    description: 'Local on-device parsing of transactional SMS.',
    purpose: 'To automatically categorize transactions and detect merchants without requiring bank logins.',
    isEnabled: true,
    isCritical: true,
    trustImpact: -4,
    impactWarnings: ['Merchant recognition accuracy may decrease.', 'Recurring payment detection will be limited.', 'Recommendation confidence will drop.']
  },
  {
    id: 'perm_2',
    name: 'Bank Statements',
    description: 'Access to uploaded PDF statements.',
    purpose: 'To provide deep historical accuracy for forecasting.',
    isEnabled: true,
    isCritical: false,
    trustImpact: -2,
    impactWarnings: ['Historical forecasting accuracy will drop.']
  },
  {
    id: 'perm_3',
    name: 'Analytics & Telemetry',
    description: 'Anonymous usage data.',
    purpose: 'To help improve the UI and stability of FinTrac.',
    isEnabled: false,
    isCritical: false,
    trustImpact: 0,
    impactWarnings: ['No direct impact on your data.']
  }
];

export function useTrustData() {
  const [trustScore, setTrustScore] = useState<TrustScore | null>(null);
  const [trustHealth, setTrustHealth] = useState<TrustHealth | null>(null);
  const [suggestions, setSuggestions] = useState<RecoverySuggestion[]>([]);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEvent[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTrustScore(mockTrustScore);
      setTrustHealth(mockTrustHealth);
      setSuggestions(mockRecoverySuggestions);
      setDataSources(mockDataSources);
      setAuditLogs(mockAuditLogs);
      setPermissions(mockPermissions);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const togglePermission = (id: string) => {
    setPermissions(current => 
      current.map(p => 
        p.id === id ? { ...p, isEnabled: !p.isEnabled } : p
      )
    );
  };

  const reconnectSource = (id: string) => {
    setDataSources(current => 
      current.map(ds => 
        ds.id === id ? { ...ds, status: 'Connected', freshnessState: 'Fresh', lastSync: new Date().toISOString(), coverage: 100, reliability: 100 } : ds
      )
    );
    // Optimistically remove suggestion
    setSuggestions(current => current.filter(s => s.targetId !== id));
  };

  return {
    trustScore,
    trustHealth,
    suggestions,
    dataSources,
    auditLogs,
    permissions,
    isLoading,
    togglePermission,
    reconnectSource
  };
}
