/**
 * Forecasting Engine Types
 * Based on PRD-03 Forecasting Engine v5
 */

export interface ForecastScenario {
  scenarioId: string;
  label: string;
  description: string;
  deltas: {
    categorySpend?: Record<string, number>;
    goalContributionOverrides?: Record<string, number>;
    incomeDelta?: number;
    sideIncomeDelta?: number;
  };
  origin: 'user' | 'recommendation_engine' | 'system';
}

export interface GoalForecast {
  goalId: string;
  goalName: string;
  projectedCompletionDate: string;
  baselineCompletionDate: string;
  timeSavedDays: number;
  healthRank: number;
  healthLabel: 'on_track' | 'slightly_delayed' | 'at_risk' | 'critical';
  confidence: number;
  currentAmount: number;
  targetAmount: number;
}

export interface ForecastOutput {
  forecastId: string;
  scenarioId: string;
  scenarioLabel: string;
  pathType: 'current' | 'alternative';
  baselinePathId?: string;
  goals: Record<string, GoalForecast>;
  cashflow: {
    monthlySurplusDelta: number;
    riskIndexDelta: number;
  };
  confidence: number;
  createdAt: string;
}

export interface SensitivityLever {
  lever: string;
  category: string;
  icon: string;
  unitChange: number;
  impactDays: number;
  impactPercent: number;
  direction: 'positive' | 'negative';
}

export interface ForecastChartPoint {
  month: string;
  currentPath: number;
  projectedPath: number;
}

export interface ForecastConstraintResult {
  status: 'valid' | 'adjusted' | 'rejected';
  requestedContribution?: number;
  allowedContribution?: number;
  reason?: string;
}
