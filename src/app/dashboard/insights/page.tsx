'use client';

import { useDecisions } from '../../../features/insights/hooks/useDecisions';
import { InsightsLayout } from '../../../features/insights/components/layout/InsightsLayout';
import { DecisionFeed } from '../../../features/insights/components/feed/DecisionFeed';
import { InsightsSidebar } from '../../../features/insights/components/sidebar/InsightsSidebar';

export default function InsightsPage() {
  const { 
    decisions, 
    isLoading, 
    currentAnalysisText,
    acceptDecision,
    snoozeDecision,
    dismissDecision,
    submitFeedback
  } = useDecisions();

  return (
    <InsightsLayout>
      <div className="flex items-start gap-8 relative">
        <main className="flex-1 w-full min-w-0">
          <DecisionFeed 
            decisions={decisions}
            isLoading={isLoading}
            loadingText={currentAnalysisText}
            onAccept={acceptDecision}
            onLater={snoozeDecision}
            onDismiss={dismissDecision}
            onFeedback={submitFeedback}
          />
        </main>
        
        <aside className="hidden lg:block relative z-20">
          <InsightsSidebar />
        </aside>
      </div>
    </InsightsLayout>
  );
}
