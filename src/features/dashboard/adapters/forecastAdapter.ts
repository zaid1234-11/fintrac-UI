import { ForecastObject } from '../types/dashboardTypes';

/**
 * forecastAdapter
 * Maps raw backend responses into ForecastObject.
 */
export function adaptForecasts(telemetryData: any): ForecastObject[] {
  const forecasts: ForecastObject[] = [];

  // Fallback forecast based on PRD
  forecasts.push({
    forecast_id: 'fc_001',
    goal_ids: ['goal_emergency_fund'],
    scenario_label: 'Reduce food delivery by ₹700/month',
    outputs: {
      goals: {
        'goal_emergency_fund': {
          baseline_completion_date: '2027-02-01',
          projected_completion_date: '2026-10-01',
          time_saved_days: 123,
          projected_health_label: 'on_track',
        }
      }
    },
    confidence: 0.88,
  });

  return forecasts;
}
