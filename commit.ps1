git add public/liquid-glass.js src/hooks/
git commit -m "feat(ui): add liquid glass core script and react hook"

git add src/features/dashboard/components/DashboardSidebar.tsx src/features/dashboard/components/AiMonitoringFooter.tsx src/features/dashboard/components/FinancialStatusHeader.tsx src/features/dashboard/components/FutureOutlook.tsx src/features/dashboard/components/GoalSnapshot.tsx src/features/dashboard/components/HeroRecommendation.tsx src/features/dashboard/components/RecentDecisions.tsx src/features/dashboard/components/RecentProgress.tsx
git commit -m "feat(dashboard): integrate liquid glass in dashboard components"

git add src/features/forecasting/components/
git commit -m "feat(forecasting): integrate liquid glass in forecasting components"

git add src/features/goals/components/
git commit -m "feat(goals): integrate liquid glass in goals components"

git add src/features/insights/components/sidebar/ src/features/insights/components/feed/DecisionCard.tsx
git commit -m "feat(insights): integrate liquid glass in insights components"

git add src/features/transactions/components/sidebar/index.tsx
git commit -m "feat(transactions): integrate liquid glass in transactions sidebar"

git add src/features/transactions/components/workspace/TransactionFilterChips.tsx
git commit -m "style(transactions): hide horizontal scrollbar in filter chips"

git add src/app/globals.css src/app/layout.tsx
git commit -m "style(core): update globals and layout for liquid glass support"

git add src/components/SmoothScrollProvider.tsx
git commit -m "chore(ui): adjust smooth scrolling physics parameters"

git add src/features/trust/
git commit -m "feat(trust): add Trust Center features architecture"

git add src/app/dashboard/trust-center/
git commit -m "feat(trust): add Trust Center page and Four Zones structure"

git add src/features/dashboard/DashboardView.tsx src/features/dashboard/components/FinancialSignals.tsx src/app/dashboard/goals/page.tsx src/features/insights/components/layout/InsightsLayout.tsx
git commit -m "refactor(dashboard): update dashboard layout and view configurations"

git push
