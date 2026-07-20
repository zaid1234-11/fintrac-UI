import { useState, useEffect } from 'react';
import { Decision, DecisionStatus, DecisionTier } from '../types';

// Mock AI analysis delay
const ANALYSIS_DELAY_MS = 2500;

const mockDecisions: Decision[] = [
  {
    id: 'dec_1',
    title: 'Reduce your Swiggy spending',
    type: 'leak_reduction',
    priority: 1,
    tier: 'do_today',
    score: 95,
    impact: 90,
    confidence: 94,
    urgency: 85,
    effort: 10,
    expectedOutcome: [
      { label: 'Monthly savings increase', value: 'by ₹1,850' },
      { label: 'Goal completion', value: '12 days sooner' }
    ],
    potentialSavings: 1850,
    status: 'recommended',
    linkedEntities: [
      { type: 'goal', id: 'g_1', title: 'Europe Trip' },
      { type: 'transaction', id: 't_221', title: 'Recent Swiggy Order' }
    ],
    timeline: [
      { status: 'new', timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), label: 'Created 2 days ago' },
      { status: 'recommended', timestamp: new Date().toISOString(), label: 'Recommended Today' }
    ],
    evidence: [],
    evidenceTimeline: [
      { date: new Date(Date.now() - 86400000 * 14).toISOString(), type: 'observed', label: 'Swiggy spend reached ₹4,200/week' },
      { date: new Date(Date.now() - 86400000 * 7).toISOString(), type: 'observed', label: 'Swiggy spend remained high' },
      { date: new Date(Date.now() - 86400000).toISOString(), type: 'inferred', label: 'Food spending increased 31% compared to normal pattern' },
    ],
    whyNow: 'Spending has increased for three consecutive weeks.',
    confidenceQuality: 'Very High',
    confidenceBasedOn: ['Merchant history', 'Recurring pattern', '6 months of spending']
  },
  {
    id: 'dec_2',
    title: 'Cancel unused Spotify Premium',
    type: 'savings_opportunity',
    priority: 2,
    tier: 'do_today',
    score: 88,
    impact: 70,
    confidence: 98,
    urgency: 95, // Renews soon
    effort: 20,
    expectedOutcome: [
      { label: 'Monthly savings increase', value: 'by ₹119' },
      { label: 'Annual savings', value: '₹1,428' }
    ],
    potentialSavings: 119,
    status: 'recommended',
    linkedEntities: [
      { type: 'merchant', id: 'm_spo', title: 'Spotify AB' }
    ],
    timeline: [
      { status: 'recommended', timestamp: new Date().toISOString(), label: 'Recommended Today' }
    ],
    evidence: [],
    evidenceTimeline: [
      { date: new Date(Date.now() - 86400000 * 30).toISOString(), type: 'observed', label: 'Subscription renewed' },
      { date: new Date(Date.now() - 86400000 * 10).toISOString(), type: 'observed', label: 'No activity detected' },
      { date: new Date(Date.now() - 86400000 * 2).toISOString(), type: 'inferred', label: 'Likely unused subscription' },
    ],
    whyNow: 'Your subscription renewed last month without any usage, and billing is upcoming.',
    confidenceQuality: 'High',
    confidenceBasedOn: ['Subscription tracker', 'Device activity data']
  },
  {
    id: 'dec_3',
    title: 'Increase Emergency Fund Contribution',
    type: 'goal_acceleration',
    priority: 3,
    tier: 'high_impact',
    score: 82,
    impact: 85,
    confidence: 88,
    urgency: 60,
    effort: 40,
    expectedOutcome: [
      { label: 'Emergency Fund 4 months runway', value: 'Reached 3 months earlier' }
    ],
    status: 'recommended',
    linkedEntities: [
      { type: 'goal', id: 'g_em', title: 'Emergency Fund' }
    ],
    timeline: [
      { status: 'recommended', timestamp: new Date(Date.now() - 86400000).toISOString(), label: 'Recommended Yesterday' }
    ],
    evidence: [],
    evidenceTimeline: [
      { date: new Date(Date.now() - 86400000 * 5).toISOString(), type: 'observed', label: 'Salary credited' },
      { date: new Date(Date.now() - 86400000 * 3).toISOString(), type: 'observed', label: 'Fixed expenses cleared' },
      { date: new Date(Date.now() - 86400000 * 1).toISOString(), type: 'inferred', label: '₹3,500 unallocated surplus detected' },
    ],
    whyNow: 'Your savings goal is behind schedule but you have a monthly surplus.',
    confidenceQuality: 'High',
    confidenceBasedOn: ['Income consistency', 'Surplus analysis', 'Goal trajectory']
  },
  // Adding a completed mock decision to test the new states
  {
    id: 'dec_completed_1',
    title: 'Cancelled unused Netflix',
    type: 'savings_opportunity',
    priority: 1,
    tier: 'completed',
    score: 90,
    impact: 75,
    confidence: 99,
    urgency: 90,
    effort: 15,
    expectedOutcome: [
      { label: 'Monthly savings increase', value: 'by ₹649' }
    ],
    potentialSavings: 649,
    status: 'completed',
    timeline: [
      { status: 'completed', timestamp: new Date(Date.now() - 86400000 * 4).toISOString(), label: 'Completed 4 days ago' }
    ],
    evidence: [],
    whyNow: 'Subscription was going unused.',
    confidenceQuality: 'Very High',
    confidenceBasedOn: ['Historical usage'],
    realizedImpact: [
      { label: 'Saved', value: '₹649/month' },
      { label: 'Europe Trip ETA', value: 'improved 7 days' }
    ]
  }
];

export function useDecisions() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [analysisStep, setAnalysisStep] = useState(0);
  
  const analysisSteps = [
    'Analyzing recent activity...',
    'Evaluating spending patterns...',
    'Checking recurring payments...',
    'Ranking opportunities...'
  ];

  useEffect(() => {
    let stepInterval: NodeJS.Timeout;
    
    const startAnalysis = async () => {
      setIsLoading(true);
      setAnalysisStep(0);
      
      stepInterval = setInterval(() => {
        setAnalysisStep(prev => Math.min(prev + 1, analysisSteps.length - 1));
      }, ANALYSIS_DELAY_MS / analysisSteps.length);

      await new Promise(resolve => setTimeout(resolve, ANALYSIS_DELAY_MS));
      
      clearInterval(stepInterval);
      setDecisions(mockDecisions);
      setIsLoading(false);
    };

    startAnalysis();

    return () => {
      if (stepInterval) clearInterval(stepInterval);
    };
  }, []);

  const handleAccept = (id: string) => {
    setDecisions(current => 
      current.map(decision => {
        if (decision.id === id) {
          const updatedTimeline = [
            ...decision.timeline,
            { status: 'accepted' as DecisionStatus, timestamp: new Date().toISOString(), label: 'Accepted just now' }
          ];
          
          return {
            ...decision,
            status: 'accepted',
            tier: 'in_progress', 
            timeline: updatedTimeline
          };
        }
        return decision;
      })
    );
  };

  const handleComplete = (id: string) => {
    setDecisions(current => 
      current.map(decision => {
        if (decision.id === id) {
          const updatedTimeline = [
            ...decision.timeline,
            { status: 'completed' as DecisionStatus, timestamp: new Date().toISOString(), label: 'Completed' }
          ];
          
          return {
            ...decision,
            status: 'completed',
            tier: 'completed',
            timeline: updatedTimeline,
            realizedImpact: decision.expectedOutcome // Optimistically convert expected to realized
          };
        }
        return decision;
      })
    );
  };

  const handleDismiss = (id: string) => {
    setDecisions(current => 
      current.map(decision => {
        if (decision.id === id) {
          return {
            ...decision,
            status: 'dismissed',
            tier: 'archived', // Move dismissed items to history archive
            timeline: [
              ...decision.timeline,
              { status: 'dismissed' as DecisionStatus, timestamp: new Date().toISOString(), label: 'Dismissed' }
            ]
          };
        }
        return decision;
      })
    );
  };

  const handleLater = (id: string) => {
    setDecisions(current => 
      current.map(decision => {
        if (decision.id === id) {
          return {
            ...decision,
            tier: 'archived', // Consider snoozed in history too
            timeline: [
              ...decision.timeline,
              { status: 'recommended' as DecisionStatus, timestamp: new Date().toISOString(), label: 'Snoozed for later' }
            ]
          };
        }
        return decision;
      })
    );
  };

  const handleFeedback = (id: string, rating: 'helpful' | 'not_helpful', reason?: string) => {
    setDecisions(current => 
      current.map(decision => {
        if (decision.id === id) {
          return {
            ...decision,
            feedback: { rating, reason }
          };
        }
        return decision;
      })
    );
  };

  return {
    decisions,
    isLoading,
    currentAnalysisText: analysisSteps[analysisStep],
    acceptDecision: handleAccept,
    completeDecision: handleComplete,
    dismissDecision: handleDismiss,
    snoozeDecision: handleLater,
    submitFeedback: handleFeedback,
    refresh: () => {
      setDecisions([]);
      setIsLoading(true);
      setTimeout(() => {
        setDecisions(mockDecisions);
        setIsLoading(false);
      }, ANALYSIS_DELAY_MS);
    }
  };
}
