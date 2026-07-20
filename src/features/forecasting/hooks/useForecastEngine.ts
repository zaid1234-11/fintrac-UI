'use client';

import { useState, useMemo, useCallback } from 'react';
import type { 
  ForecastScenario, 
  ForecastOutput, 
  GoalForecast, 
  SensitivityLever, 
  ForecastChartPoint 
} from '../types';

/**
 * Mock data for the forecasting engine.
 * In production, this would come from the Supabase backend via the Forecast API.
 */

const MOCK_SCENARIOS: ForecastScenario[] = [
  {
    scenarioId: 'sc_001',
    label: 'Reduce Food Delivery by ₹700/mo',
    description: 'Cut Swiggy/Zomato spend and redirect ₹700/month to Emergency Fund.',
    deltas: {
      categorySpend: { food_delivery: -700 },
      goalContributionOverrides: { goal_001: 700 },
    },
    origin: 'recommendation_engine',
  },
  {
    scenarioId: 'sc_002',
    label: 'Cancel Unused Subscriptions',
    description: 'Cancel Netflix, Spotify, and YouTube Premium — save ₹1,100/month.',
    deltas: {
      categorySpend: { subscriptions: -1100 },
      goalContributionOverrides: { goal_002: 1100 },
    },
    origin: 'recommendation_engine',
  },
  {
    scenarioId: 'sc_003',
    label: 'Side Income ₹5,000/mo',
    description: 'Freelance income added, split between Emergency Fund and Vacation.',
    deltas: {
      sideIncomeDelta: 5000,
      goalContributionOverrides: { goal_001: 3000, goal_003: 2000 },
    },
    origin: 'user',
  },
];

const MOCK_GOAL_FORECASTS: GoalForecast[] = [
  {
    goalId: 'goal_001',
    goalName: 'Emergency Fund',
    projectedCompletionDate: '2026-10-01',
    baselineCompletionDate: '2027-02-01',
    timeSavedDays: 123,
    healthRank: 1,
    healthLabel: 'on_track',
    confidence: 0.92,
    currentAmount: 45000,
    targetAmount: 160000,
  },
  {
    goalId: 'goal_002',
    goalName: 'New Laptop',
    projectedCompletionDate: '2026-12-15',
    baselineCompletionDate: '2027-03-20',
    timeSavedDays: 95,
    healthRank: 2,
    healthLabel: 'slightly_delayed',
    confidence: 0.78,
    currentAmount: 25000,
    targetAmount: 85000,
  },
  {
    goalId: 'goal_003',
    goalName: 'Vacation Fund',
    projectedCompletionDate: '2027-06-01',
    baselineCompletionDate: '2027-09-15',
    timeSavedDays: 106,
    healthRank: 3,
    healthLabel: 'at_risk',
    confidence: 0.54,
    currentAmount: 8000,
    targetAmount: 60000,
  },
];

const MOCK_SENSITIVITY: SensitivityLever[] = [
  { lever: 'Food Delivery', category: 'spending', icon: '🍕', unitChange: -500, impactDays: 43, impactPercent: 12, direction: 'positive' },
  { lever: 'Subscriptions', category: 'spending', icon: '📺', unitChange: -1100, impactDays: 67, impactPercent: 18, direction: 'positive' },
  { lever: 'Entertainment', category: 'spending', icon: '🎬', unitChange: -800, impactDays: 38, impactPercent: 10, direction: 'positive' },
  { lever: 'Side Income', category: 'income', icon: '💼', unitChange: 5000, impactDays: 112, impactPercent: 31, direction: 'positive' },
  { lever: 'Salary Raise', category: 'income', icon: '📈', unitChange: 8000, impactDays: 145, impactPercent: 40, direction: 'positive' },
  { lever: 'Transport', category: 'spending', icon: '🚗', unitChange: -300, impactDays: 12, impactPercent: 3, direction: 'positive' },
];

function generateChartData(scenarioSaving: number): ForecastChartPoint[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const baseValues = [45000, 50000, 54000, 58500, 63000, 67000, 71500, 76000, 80000, 84500, 89000, 93000];
  
  return months.map((month, i) => {
    const currentPath = baseValues[i];
    // After month 3 (today), the projected path diverges
    const projectedPath = i <= 3 
      ? currentPath 
      : currentPath + scenarioSaving * (i - 3);
    return { month, currentPath, projectedPath };
  });
}

export function useForecastEngine() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(MOCK_SCENARIOS[0].scenarioId);
  const [scenarioSaving, setScenarioSaving] = useState(2000);

  const scenarios = MOCK_SCENARIOS;
  const goalForecasts = MOCK_GOAL_FORECASTS;
  const sensitivityLevers = MOCK_SENSITIVITY;

  const activeScenario = useMemo(
    () => scenarios.find(s => s.scenarioId === activeScenarioId) ?? scenarios[0],
    [activeScenarioId, scenarios]
  );

  const chartData = useMemo(
    () => generateChartData(scenarioSaving),
    [scenarioSaving]
  );

  const projectedSavings = useMemo(() => {
    const last = chartData[chartData.length - 1];
    return last ? last.projectedPath - last.currentPath : 0;
  }, [chartData]);

  const overallConfidence = useMemo(() => {
    const avg = goalForecasts.reduce((sum, g) => sum + g.confidence, 0) / goalForecasts.length;
    return Math.round(avg * 100);
  }, [goalForecasts]);

  const totalTimeSaved = useMemo(
    () => goalForecasts.reduce((sum, g) => sum + g.timeSavedDays, 0),
    [goalForecasts]
  );

  const selectScenario = useCallback((id: string) => {
    setActiveScenarioId(id);
  }, []);

  return {
    scenarios,
    activeScenario,
    selectScenario,
    goalForecasts,
    sensitivityLevers,
    chartData,
    scenarioSaving,
    setScenarioSaving,
    projectedSavings,
    overallConfidence,
    totalTimeSaved,
    todayIndex: 3,
  };
}
