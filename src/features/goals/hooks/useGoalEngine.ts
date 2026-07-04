import { useState, useCallback, useMemo } from 'react';
import { useGoalStore } from '../store/goalStore';
import { GoalDecisionEngine } from '../engine/goalDecisionEngine';
import { ScenarioPreview } from '../types/goalEngineTypes';

export function useGoalEngine() {
  const { goals, allocations: baseAllocations, totalMonthlyBudget, applyAllocations, getGoalSummary } = useGoalStore();
  
  // Local "Preview" state
  const [previewAllocations, setPreviewAllocations] = useState<Record<string, number>>(baseAllocations);
  
  // Is the user currently looking at a dirty preview state?
  const isDirty = useMemo(() => {
    return Object.keys(baseAllocations).some(
      (key) => baseAllocations[key] !== previewAllocations[key]
    );
  }, [baseAllocations, previewAllocations]);

  // When a user drags a slider, we update the local preview state
  const updatePreviewAllocation = useCallback((goalId: string, newAmount: number) => {
    setPreviewAllocations(prev => {
      const next = { ...prev, [goalId]: newAmount };
      
      // Auto-balancing logic for MVP
      // If we increase a goal by X, we should ideally decrease another goal by X to keep total budget flat.
      // For this simple UI, we'll just let them drag freely but track the gap.
      return next;
    });
  }, []);

  // When the user clicks "Apply Changes"
  const commitChanges = useCallback(() => {
    applyAllocations(previewAllocations);
  }, [applyAllocations, previewAllocations]);

  // When the user clicks "Cancel"
  const discardChanges = useCallback(() => {
    setPreviewAllocations(baseAllocations);
  }, [baseAllocations]);

  // Get the scenario preview (ETA diffs, tradeoffs, etc) for a specific goal based on the dirty preview allocations
  const getPreviewForGoal = useCallback((goalId: string): ScenarioPreview => {
    return GoalDecisionEngine.simulateScenario(goalId, goals, baseAllocations, previewAllocations);
  }, [goals, baseAllocations, previewAllocations]);

  const totalAllocatedPreview = useMemo(() => {
    return Object.values(previewAllocations).reduce((a, b) => a + b, 0);
  }, [previewAllocations]);

  return {
    goals,
    baseAllocations,
    previewAllocations,
    totalMonthlyBudget,
    totalAllocatedPreview,
    isDirty,
    updatePreviewAllocation,
    commitChanges,
    discardChanges,
    getPreviewForGoal,
    summary: getGoalSummary()
  };
}
