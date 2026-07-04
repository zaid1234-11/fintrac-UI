import { RecommendationObject } from '../types/dashboardTypes';

/**
 * recommendationAdapter
 * Adapts raw backend responses (telemetry, profile, or transactions) into the PRD-compliant RecommendationObject.
 * This ensures the UI is decoupled from the current backend shape while it evolves.
 */
export function adaptRecommendations(profileData: any, telemetryData: any): RecommendationObject[] {
  const recommendations: RecommendationObject[] = [];

  // Example: If we have a high friction score or specific behavioral tags, map to a recommendation.
  if (profileData && profileData.friction_score > 70) {
    recommendations.push({
      recommendation_id: 'rec_friction_001',
      title: 'High spending friction detected',
      subtitle: 'Review recent impulse purchases',
      impact: {
        amount: 2500, // example derived impact
      },
      confidence: 0.85,
      reason: 'Your friction score indicates an uptick in unstructured spending.',
      source: 'behavioral_engine',
      type: 'important',
      comparison_metric: '+22%',
      comparison_context: 'Last 90 Days',
      evidence: ['Amazon', 'Flipkart'],
    });
  }

  // Generic fallback if backend data doesn't trigger anything yet
  if (recommendations.length === 0) {
    recommendations.push({
      recommendation_id: 'rec_default_001',
      title: 'Reduce food delivery',
      subtitle: 'Redirect to Emergency Fund',
      impact: {
        amount: 700,
        time_saved_days: 120,
        goal_id: 'goal_emergency_fund',
      },
      confidence: 0.88,
      reason: 'Food delivery spend increased significantly.',
      source: 'forecasting_engine',
      type: 'critical',
      comparison_metric: '+18%',
      comparison_context: 'Last 90 Days',
      evidence: ['Swiggy', 'Zomato', 'EatSure'],
    });
  }

  return recommendations;
}
