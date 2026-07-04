import { useBehavioralProfile, useTelemetry, useTransactions } from '../api/useDashboardData';
import { adaptRecommendations } from '../adapters/recommendationAdapter';
import { adaptGoals } from '../adapters/goalAdapter';
import { adaptForecasts } from '../adapters/forecastAdapter';
import { DashboardState, RecommendationObject, GoalObject, ForecastObject } from '../types/dashboardTypes';

export function useDashboard() {
  const { data: profile, isLoading: isProfileLoading, error: profileError } = useBehavioralProfile();
  const { data: telemetry, isLoading: isTelemetryLoading, error: telemetryError } = useTelemetry();
  // Using transactions to simulate some net cash flow metrics for the status header
  const { data: transactions, isLoading: isTxLoading } = useTransactions(100);

  const isLoading = isProfileLoading || isTelemetryLoading || isTxLoading;
  
  if (profileError) console.error("Profile API Error:", profileError);
  if (telemetryError) console.error("Telemetry API Error:", telemetryError);
  
  // We don't bubble up the error to the UI so the adapters can provide their graceful fallbacks.
  const error = null;

  const healthScore = profile?.friction_score ? 100 - profile.friction_score : 85;

  let healthLabel: DashboardState['healthLabel'] = 'At Risk';
  if (healthScore >= 95) healthLabel = 'Flourishing';
  else if (healthScore >= 85) healthLabel = 'Excellent';
  else if (healthScore >= 70) healthLabel = 'Healthy';
  else if (healthScore >= 55) healthLabel = 'Improving';
  else if (healthScore >= 40) healthLabel = 'Recovering';

  // 1. Synthesize Dashboard State (Status Header)
  const dashboardState: DashboardState = {
    stage: profile?.friction_score > 60 ? 'Awareness' : 'Optimization',
    healthScore,
    healthLabel,
    trend: '+3', // Example static trend indicating a positive +3 points
    netCashFlow: transactions ? transactions.reduce((acc: number, tx: any) => tx.type === 'credit' ? acc + tx.amount : acc - tx.amount, 0) : 8300,
  };

  // 2. Map via Adapters
  const recommendations = adaptRecommendations(profile, telemetry);
  const goals = adaptGoals(profile);
  const forecasts = adaptForecasts(telemetry);

  // 3. Prioritization Engine Logic (Simplified)
  // Split recommendations into the hero (top 1) and signals (rest)
  const sortedRecommendations = [...recommendations].sort((a, b) => b.confidence - a.confidence);
  const heroRecommendation = sortedRecommendations.length > 0 ? sortedRecommendations[0] : null;
  const signals = sortedRecommendations.slice(1, 4);

  // Pick the primary forecast for the Future Outlook based on the top goal
  const primaryForecast = forecasts.length > 0 ? forecasts[0] : null;

  return {
    data: {
      dashboardState,
      heroRecommendation,
      goals,
      primaryForecast,
      signals
    },
    isLoading,
    error
  };
}
