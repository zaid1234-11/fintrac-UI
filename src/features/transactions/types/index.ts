export type ReviewStatus = 'verified' | 'needs_review' | 'auto_categorized';
export type TransactionDirection = 'inflow' | 'outflow';
export type AnomalyType = 'unusual_amount' | 'new_merchant' | 'duplicate' | 'category_conflict' | 'none';

export interface TransactionEvidence {
  type: 'sms' | 'email' | 'bank_statement';
  content: string;
}

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  category: string;
  direction: TransactionDirection;
  date: string;
  
  // AI & Recommendation Engine fields
  confidence: number;
  reviewStatus: ReviewStatus;
  recurring: boolean;
  anomalyType: AnomalyType;
  explanation: string;
  evidence: TransactionEvidence[];
  merchantMemoryMatched: boolean;
  correctedByUser: boolean;
  
  // UI helpers
  originalMerchantName?: string;
  tags: string[];
}

export interface MonthlySnapshot {
  spent: number;
  income: number;
  savingsRate: number;
  transactionsCount: number;
  autoCategorizedCount: number;
  needsReviewCount: number;
}
