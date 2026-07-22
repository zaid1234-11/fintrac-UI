git add src/hooks/useLiquidCapability.ts src/hooks/useLiquidGlass.ts
git commit -m "feat(liquid): add liquid capability hook and hardware tiering system"

git add src/components/liquid/
git commit -m "feat(liquid): implement LiquidSurface and LiquidCard primitives with WebGL displacement shader"

git add src/app/globals.css
git commit -m "style(liquid): update CSS tokens for translucent liquid glass opacities and glowing borders"

git add src/components/Navbar.tsx src/components/MobileMenu.tsx
git commit -m "refactor(navigation): migrate Navbar and MobileMenu to LiquidSurface level 1 with rounded corners"

git add src/features/dashboard/components/DashboardSidebar.tsx
git commit -m "refactor(dashboard-sidebar): migrate DashboardSidebar to LiquidSurface level 2 with liquid nav pills"

git add src/features/dashboard/components/HeroRecommendation.tsx src/features/dashboard/components/FinancialStatusHeader.tsx
git commit -m "refactor(dashboard-hero): migrate HeroRecommendation and FinancialStatusHeader to LiquidCard"

git add src/features/dashboard/components/GoalSnapshot.tsx src/features/dashboard/components/FutureOutlook.tsx src/features/dashboard/components/FinancialSignals.tsx
git commit -m "refactor(dashboard-cards): migrate GoalSnapshot, FutureOutlook, and FinancialSignals to LiquidCard"

git add src/components/dashboard/FrictionKPICard.tsx src/components/dashboard/SavingsCard.tsx src/components/dashboard/HealthScoreCard.tsx
git commit -m "refactor(dashboard-kpi): migrate FrictionKPICard, SavingsCard, and HealthScoreCard to LiquidCard"

git add src/features/dashboard/components/RecentDecisions.tsx src/features/dashboard/components/RecentProgress.tsx src/features/dashboard/components/AiMonitoringFooter.tsx
git commit -m "refactor(dashboard-activity): migrate RecentDecisions, RecentProgress, and AiMonitoringFooter to LiquidCard"

git add src/features/forecasting/components/
git commit -m "refactor(forecasting): migrate forecast sidebar, visualizer, scenario selector, and panels"

git add src/features/goals/components/ src/app/\(app\)/dashboard/goals/page.tsx
git commit -m "refactor(goals): migrate PrimaryGoalFocus, AiGoalCoach, GoalEventsLog, and GoalSidebar"

git add src/features/insights/components/
git commit -m "refactor(insights): migrate DecisionCard, InsightsSidebar, TrustScoreCard, and WeeklyImpactCard"

git add src/features/transactions/components/sidebar/index.tsx src/features/trust/components/TrustScoreHero.tsx src/components/trust/FounderNote.tsx
git commit -m "refactor(transactions-trust): migrate transaction sidebar, TrustScoreHero, and FounderNote"

git add src/components/home/ src/components/EditorialCard.tsx src/components/GlassCard.tsx
git commit -m "refactor(landing): migrate FeaturesPreviewSection, ForecastTeaseSection, and EditorialCard"

git add .
git commit -m "refactor(preview-story): migrate HeroScrollStory and DashboardPreview to LiquidCard"

git push origin main
