import { 
  Goal, 
  AllocationResult, 
  ForecastResult, 
  TradeoffResult, 
  ScenarioPreview, 
  GoalHealth 
} from '../types/goalEngineTypes';

export class GoalDecisionEngine {
  /**
   * Calculates how long it will take to reach a goal given a monthly contribution.
   */
  private static calculateMonthsToCompletion(
    currentAmount: number,
    targetAmount: number,
    monthlyContribution: number
  ): number {
    if (currentAmount >= targetAmount) return 0;
    if (monthlyContribution <= 0) return Infinity; // Will never reach
    return Math.ceil((targetAmount - currentAmount) / monthlyContribution);
  }

  /**
   * Determines the health label based on how the projected completion date compares to the target date.
   */
  private static determineHealth(
    projectedCompletionDate: Date,
    targetDate: Date
  ): GoalHealth {
    const projectedTime = projectedCompletionDate.getTime();
    const targetTime = targetDate.getTime();
    const daysDiff = (projectedTime - targetTime) / (1000 * 60 * 60 * 24);

    if (daysDiff <= 15) return 'on_track';
    if (daysDiff <= 60) return 'slightly_delayed';
    if (daysDiff <= 180) return 'at_risk';
    return 'off_track';
  }

  /**
   * Main Forecast orchestration.
   * Given goals and their intended monthly contributions, returns the forecast for each.
   */
  public static generateForecasts(
    goals: Goal[],
    allocations: Record<string, number>
  ): ForecastResult[] {
    const today = new Date();

    return goals.map(goal => {
      const currentMonthly = allocations[goal.id] || 0;
      const baselineMonthly = goal.contributionParams?.amount || 0; // The original plan

      const baselineMonths = this.calculateMonthsToCompletion(goal.currentAmount, goal.targetAmount, baselineMonthly);
      const projectedMonths = this.calculateMonthsToCompletion(goal.currentAmount, goal.targetAmount, currentMonthly);

      const baselineDate = new Date(today);
      if (baselineMonths !== Infinity) baselineDate.setMonth(baselineDate.getMonth() + baselineMonths);

      const projectedDate = new Date(today);
      if (projectedMonths !== Infinity) projectedDate.setMonth(projectedDate.getMonth() + projectedMonths);

      const timeSavedDays = projectedMonths === Infinity || baselineMonths === Infinity 
        ? 0 
        : Math.round((baselineDate.getTime() - projectedDate.getTime()) / (1000 * 60 * 60 * 24));

      return {
        goalId: goal.id,
        baselineCompletionDate: baselineMonths === Infinity ? 'Never' : baselineDate.toISOString(),
        projectedCompletionDate: projectedMonths === Infinity ? 'Never' : projectedDate.toISOString(),
        timeSavedDays,
        projectedHealthLabel: projectedMonths === Infinity ? 'off_track' : this.determineHealth(projectedDate, new Date(goal.targetDate)),
        confidence: projectedMonths === Infinity ? 0 : goal.confidence // Simplified confidence for MVP
      };
    });
  }

  /**
   * When a user changes an allocation, calculate the tradeoffs (who won, who lost).
   */
  public static calculateTradeoffs(
    goals: Goal[],
    baselineAllocations: Record<string, number>,
    newAllocations: Record<string, number>
  ): TradeoffResult[] {
    const baselineForecasts = this.generateForecasts(goals, baselineAllocations);
    const newForecasts = this.generateForecasts(goals, newAllocations);

    const tradeoffs: TradeoffResult[] = [];

    // Find who gained money and who lost money
    const gainers = goals.filter(g => (newAllocations[g.id] || 0) > (baselineAllocations[g.id] || 0));
    const losers = goals.filter(g => (newAllocations[g.id] || 0) < (baselineAllocations[g.id] || 0));

    // For a simple MVP, we just pair the largest gainer with the largest loser
    // If a user drags a slider up, the UI logic should automatically pull from another goal to keep total budget flat
    if (gainers.length > 0 && losers.length > 0) {
      const gainer = gainers[0];
      const loser = losers[0];

      const gainerBaseline = baselineForecasts.find(f => f.goalId === gainer.id);
      const gainerNew = newForecasts.find(f => f.goalId === gainer.id);
      const loserBaseline = baselineForecasts.find(f => f.goalId === loser.id);
      const loserNew = newForecasts.find(f => f.goalId === loser.id);

      if (gainerBaseline && gainerNew && loserBaseline && loserNew) {
        // Calculate days impact. Positive means improved (earlier completion), negative means delayed (later completion).
        
        // Gainer: baseline completion date minus new completion date
        const gainerImpactDays = gainerNew.projectedCompletionDate === 'Never' || gainerBaseline.projectedCompletionDate === 'Never' 
          ? 0 
          : Math.round((new Date(gainerBaseline.projectedCompletionDate).getTime() - new Date(gainerNew.projectedCompletionDate).getTime()) / (1000 * 60 * 60 * 24));
          
        // Loser: baseline completion date minus new completion date (will be negative because new is later)
        const loserImpactDays = loserNew.projectedCompletionDate === 'Never' || loserBaseline.projectedCompletionDate === 'Never'
          ? 0
          : Math.round((new Date(loserBaseline.projectedCompletionDate).getTime() - new Date(loserNew.projectedCompletionDate).getTime()) / (1000 * 60 * 60 * 24));

        tradeoffs.push({
          sourceGoalId: loser.id, // The one that lost money (source of funds)
          targetGoalId: gainer.id, // The one that gained money
          amountShifted: (baselineAllocations[loser.id] || 0) - (newAllocations[loser.id] || 0),
          sourceImpactDays: loserImpactDays,
          targetImpactDays: gainerImpactDays,
          sourceGoalName: loser.name,
          targetGoalName: gainer.name
        });
      }
    }

    return tradeoffs;
  }

  /**
   * Simulates dragging an allocation slider to see the "Preview" state before applying.
   */
  public static simulateScenario(
    targetGoalId: string,
    goals: Goal[],
    baselineAllocations: Record<string, number>,
    newAllocations: Record<string, number>
  ): ScenarioPreview {
    const baselineForecasts = this.generateForecasts(goals, baselineAllocations);
    const newForecasts = this.generateForecasts(goals, newAllocations);

    const targetBaseline = baselineForecasts.find(f => f.goalId === targetGoalId);
    const targetNew = newForecasts.find(f => f.goalId === targetGoalId);

    const etaChangeDays = targetBaseline && targetNew && targetBaseline.projectedCompletionDate !== 'Never' && targetNew.projectedCompletionDate !== 'Never'
      ? Math.round((new Date(targetBaseline.projectedCompletionDate).getTime() - new Date(targetNew.projectedCompletionDate).getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    const confidenceChange = targetBaseline && targetNew
      ? targetNew.confidence - targetBaseline.confidence
      : 0;

    const tradeoffs = this.calculateTradeoffs(goals, baselineAllocations, newAllocations);

    return {
      etaChangeDays,
      confidenceChange,
      tradeoffs
    };
  }
}
