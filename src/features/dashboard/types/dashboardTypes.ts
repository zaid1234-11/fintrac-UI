export interface RecommendationObject {
  recommendation_id: string;
  title: string;
  subtitle: string;
  impact: {
    time_saved_days?: number;
    goal_id?: string;
    amount?: number;
  };
  confidence: number;
  reason: string;
  source: string;
  type: 'critical' | 'important' | 'informational';
  evidence?: string[];
  comparison_metric?: string;
  comparison_context?: string;
}

export interface GoalObject {
  goal_id: string;
  name: string;
  progress: number;
  health_rank: number;
  health_label: 'on_track' | 'slightly_delayed' | 'at_risk' | 'off_track';
  priority_rank: number;
  priority_label: 'critical' | 'high' | 'medium' | 'low';
  target_amount?: number;
  current_amount?: number;
  eta_date?: string;
  optimized_eta_date?: string;
}

export interface ForecastObject {
  forecast_id: string;
  goal_ids: string[];
  scenario_label: string;
  outputs: {
    goals: Record<string, {
      baseline_completion_date: string;
      projected_completion_date: string;
      time_saved_days: number;
      projected_health_label: 'on_track' | 'slightly_delayed' | 'at_risk' | 'off_track';
    }>;
  };
  confidence: number;
}

export interface DashboardState {
  stage: 'Awareness' | 'Understanding' | 'Optimization' | 'Automation';
  healthScore: number;
  healthLabel: 'Flourishing' | 'Excellent' | 'Healthy' | 'Improving' | 'Recovering' | 'At Risk';
  trend: string;
  netCashFlow: number;
}
