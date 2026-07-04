import { create } from 'zustand';
import { Goal, GoalSummary } from '../types/goalEngineTypes';

// Initial Mock Data
const MOCK_GOALS: Goal[] = [
  {
    id: 'goal_emergency',
    type: 'emergency_fund',
    name: 'Emergency Fund',
    description: '4 months of essential expenses',
    targetAmount: 80000,
    currentAmount: 57600, // 72%
    startDate: '2026-01-01',
    targetDate: '2027-02-01',
    priorityRank: 1,
    priorityLabel: 'critical',
    healthRank: 1,
    healthLabel: 'on_track',
    confidence: 0.88,
    contributionModel: 'fixed_monthly',
    contributionParams: { amount: 5000 },
    dependsOnGoalIds: [],
    state: 'active',
  },
  {
    id: 'goal_laptop',
    type: 'laptop',
    name: 'New Laptop',
    targetAmount: 120000,
    currentAmount: 51600, // 43%
    startDate: '2026-02-01',
    targetDate: '2026-12-15',
    priorityRank: 2,
    priorityLabel: 'high',
    healthRank: 2,
    healthLabel: 'slightly_delayed',
    confidence: 0.65,
    contributionModel: 'fixed_monthly',
    contributionParams: { amount: 4000 },
    dependsOnGoalIds: ['goal_emergency'],
    dependencyType: 'soft',
    state: 'active',
  },
  {
    id: 'goal_vacation',
    type: 'vacation',
    name: 'Japan Trip',
    targetAmount: 300000,
    currentAmount: 54000, // 18%
    startDate: '2025-10-01',
    targetDate: '2028-05-01',
    priorityRank: 3,
    priorityLabel: 'medium',
    healthRank: 3,
    healthLabel: 'at_risk',
    confidence: 0.45,
    contributionModel: 'fixed_monthly',
    contributionParams: { amount: 3000 },
    dependsOnGoalIds: ['goal_emergency'],
    dependencyType: 'hard',
    state: 'active',
  }
];

const MOCK_ALLOCATIONS = {
  'goal_emergency': 5000,
  'goal_laptop': 4000,
  'goal_vacation': 3000
};

interface GoalStoreState {
  goals: Goal[];
  allocations: Record<string, number>;
  totalMonthlyBudget: number;
  
  // Actions
  updateAllocation: (goalId: string, amount: number) => void;
  applyAllocations: (newAllocations: Record<string, number>) => void;
  getGoalSummary: () => GoalSummary;
}

export const useGoalStore = create<GoalStoreState>((set, get) => ({
  goals: MOCK_GOALS,
  allocations: MOCK_ALLOCATIONS,
  totalMonthlyBudget: 12000, // User has 12k/month to allocate

  updateAllocation: (goalId: string, amount: number) => {
    set((state) => ({
      allocations: { ...state.allocations, [goalId]: amount }
    }));
  },

  applyAllocations: (newAllocations: Record<string, number>) => {
    // This is where "Apply Changes" happens, mutating the source of truth
    set((state) => {
      // In a real app, this would make an API call to save the new allocations.
      // For this store, we just update the true allocations map and the goal models.
      const updatedGoals = state.goals.map(goal => ({
        ...goal,
        contributionParams: {
          ...goal.contributionParams,
          amount: newAllocations[goal.id] ?? goal.contributionParams.amount
        }
      }));
      
      return { 
        allocations: newAllocations,
        goals: updatedGoals
      };
    });
  },

  getGoalSummary: () => {
    const goals = get().goals;
    return {
      onTrackCount: goals.filter(g => g.healthLabel === 'on_track').length,
      needsAttentionCount: goals.filter(g => g.healthLabel === 'slightly_delayed').length,
      atRiskCount: goals.filter(g => g.healthLabel === 'at_risk' || g.healthLabel === 'off_track').length
    };
  }
}));
