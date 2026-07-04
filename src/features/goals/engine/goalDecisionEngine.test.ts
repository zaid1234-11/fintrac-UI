import { GoalDecisionEngine } from './goalDecisionEngine';
import { Goal } from '../types/goalEngineTypes';
import { describe, it, expect } from 'vitest';

describe('GoalDecisionEngine', () => {
  const mockGoalA: Goal = {
    id: 'g_laptop',
    type: 'laptop',
    name: 'New Laptop',
    targetAmount: 120000,
    currentAmount: 60000, // 60,000 left
    startDate: '2026-01-01',
    targetDate: new Date(new Date().setMonth(new Date().getMonth() + 10)).toISOString(), // Target 10 months from now
    priorityRank: 2,
    priorityLabel: 'high',
    healthRank: 1,
    healthLabel: 'on_track',
    confidence: 0.8,
    contributionModel: 'fixed_monthly',
    contributionParams: { amount: 6000 },
    state: 'active'
  };

  const mockGoalB: Goal = {
    id: 'g_vacation',
    type: 'vacation',
    name: 'Japan Trip',
    targetAmount: 300000,
    currentAmount: 100000, // 200,000 left
    startDate: '2026-01-01',
    targetDate: new Date(new Date().setMonth(new Date().getMonth() + 20)).toISOString(), // Target 20 months from now
    priorityRank: 3,
    priorityLabel: 'medium',
    healthRank: 2,
    healthLabel: 'slightly_delayed',
    confidence: 0.6,
    contributionModel: 'fixed_monthly',
    contributionParams: { amount: 10000 },
    state: 'active'
  };

  it('should generate accurate forecasts based on monthly allocations', () => {
    const goals = [mockGoalA, mockGoalB];
    const allocations = {
      'g_laptop': 6000, // Takes 10 months to save 60k
      'g_vacation': 10000 // Takes 20 months to save 200k
    };

    const forecasts = GoalDecisionEngine.generateForecasts(goals, allocations);

    expect(forecasts).toHaveLength(2);
    
    const laptopForecast = forecasts.find(f => f.goalId === 'g_laptop');
    expect(laptopForecast).toBeDefined();
    
    // baseline is 6000, projected is 6000. Time saved should be 0.
    expect(laptopForecast?.timeSavedDays).toBe(0);
    // Since it perfectly meets target in 10 months, health should be 'on_track'
    expect(laptopForecast?.projectedHealthLabel).toBe('on_track');

    const vacationForecast = forecasts.find(f => f.goalId === 'g_vacation');
    expect(vacationForecast?.timeSavedDays).toBe(0);
    expect(vacationForecast?.projectedHealthLabel).toBe('on_track');
  });

  it('should calculate tradeoffs when shifting money between goals', () => {
    const goals = [mockGoalA, mockGoalB];
    
    const baselineAllocations = {
      'g_laptop': 6000, 
      'g_vacation': 10000
    };

    // We shift 2000 from vacation to laptop
    const newAllocations = {
      'g_laptop': 8000, // Now saves 60k in 7.5 -> 8 months (saves 2 months)
      'g_vacation': 8000 // Now saves 200k in 25 months (loses 5 months)
    };

    const tradeoffs = GoalDecisionEngine.calculateTradeoffs(goals, baselineAllocations, newAllocations);

    expect(tradeoffs).toHaveLength(1);
    
    const tradeoff = tradeoffs[0];
    expect(tradeoff.sourceGoalId).toBe('g_vacation');
    expect(tradeoff.targetGoalId).toBe('g_laptop');
    expect(tradeoff.amountShifted).toBe(2000);
    
    // Target (Laptop) improved. 10 months -> 8 months = roughly 60 days
    expect(tradeoff.targetImpactDays).toBeGreaterThan(50);
    expect(tradeoff.targetImpactDays).toBeLessThan(70);

    // Source (Vacation) suffered. 20 months -> 25 months = roughly -150 days
    expect(tradeoff.sourceImpactDays).toBeLessThan(-140);
    expect(tradeoff.sourceImpactDays).toBeGreaterThan(-160);
  });

  it('should simulate a scenario preview accurately', () => {
    const goals = [mockGoalA, mockGoalB];
    
    const baselineAllocations = {
      'g_laptop': 6000, 
      'g_vacation': 10000
    };

    const newAllocations = {
      'g_laptop': 8000, 
      'g_vacation': 8000 
    };

    const preview = GoalDecisionEngine.simulateScenario('g_laptop', goals, baselineAllocations, newAllocations);

    // Laptop ETA improved by roughly 60 days
    expect(preview.etaChangeDays).toBeGreaterThan(50);
    
    // Tradeoff array should contain the victim (vacation)
    expect(preview.tradeoffs).toHaveLength(1);
    expect(preview.tradeoffs[0].sourceGoalId).toBe('g_vacation');
  });
});
