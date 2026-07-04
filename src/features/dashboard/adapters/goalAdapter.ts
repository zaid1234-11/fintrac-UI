import { GoalObject } from '../types/dashboardTypes';

/**
 * goalAdapter
 * Maps raw backend responses into GoalObject.
 */
export function adaptGoals(profileData: any): GoalObject[] {
  const goals: GoalObject[] = [];

  // Fallback goals based on PRD shapes until backend natively serves Goal OS
  goals.push({
    goal_id: 'goal_emergency_fund',
    name: 'Emergency Fund',
    progress: 72,
    health_rank: 1,
    health_label: 'on_track',
    priority_rank: 1,
    priority_label: 'critical',
    target_amount: 80000,
    current_amount: 58000,
    eta_date: '2027-02-01',
    optimized_eta_date: '2026-10-01',
  });

  goals.push({
    goal_id: 'goal_laptop',
    name: 'New Laptop',
    progress: 43,
    health_rank: 2,
    health_label: 'slightly_delayed',
    priority_rank: 2,
    priority_label: 'medium',
    target_amount: 120000,
    current_amount: 51600,
    eta_date: '2026-12-15',
  });

  goals.push({
    goal_id: 'goal_vacation',
    name: 'Japan Trip',
    progress: 18,
    health_rank: 3,
    health_label: 'at_risk',
    priority_rank: 3,
    priority_label: 'low',
    target_amount: 300000,
    current_amount: 54000,
    eta_date: '2028-05-01',
  });

  return goals;
}
