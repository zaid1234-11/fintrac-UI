export type GoalPriority = 'critical' | 'high' | 'medium' | 'low';
export type GoalHealth = 'on_track' | 'slightly_delayed' | 'at_risk' | 'off_track';
export type GoalStage = 'Awareness' | 'Understanding' | 'Optimization' | 'Automation';
export type ContributionModel = 'fixed_monthly' | 'percentage_savings' | 'round_up' | 'manual';

export interface Goal {
  id: string;
  type: string;
  name: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  targetDate: string;
  priorityRank: number;
  priorityLabel: GoalPriority;
  healthRank: number;
  healthLabel: GoalHealth;
  confidence: number;
  contributionModel: ContributionModel;
  contributionParams: Record<string, any>;
  dependsOnGoalIds?: string[];
  dependencyType?: 'soft' | 'hard';
  state: 'draft' | 'active' | 'paused' | 'completed' | 'archived';
  simulatedCompletionDate?: string;
}

export interface GoalSummary {
  onTrackCount: number;
  needsAttentionCount: number;
  atRiskCount: number;
}

export interface AllocationResult {
  goalId: string;
  recommendedMonthlyAmount: number;
  currentMonthlyAmount: number;
  gap: number;
}

export interface ForecastResult {
  goalId: string;
  baselineCompletionDate: string;
  projectedCompletionDate: string;
  timeSavedDays: number;
  projectedHealthLabel: GoalHealth;
  confidence: number;
}

export interface TradeoffResult {
  sourceGoalId: string;
  targetGoalId: string;
  amountShifted: number;
  sourceImpactDays: number;
  targetImpactDays: number;
  sourceGoalName?: string;
  targetGoalName?: string;
}

export interface RecommendationResult {
  recommendationId: string;
  type: 'acceleration' | 'savings_opportunity' | 'behavior_change';
  title: string;
  actionText: string;
  impactText: string;
  confidence: number;
  reason: string;
}

export interface LifeProgress {
  stage: 'Building Stability' | 'Building Wealth' | 'Financial Freedom';
  description: string;
}

export interface GoalEvent {
  id: string;
  goalId: string;
  eventType: 'goal_created' | 'goal_activated' | 'goal_milestone_reached' | 'goal_at_risk' | 'goal_paused' | 'goal_completed' | 'goal_archived';
  date: string;
  title: string;
  description?: string;
}

export interface ScenarioPreview {
  etaChangeDays: number;
  confidenceChange: number;
  tradeoffs: TradeoffResult[];
}
