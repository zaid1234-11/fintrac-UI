git add -A public/dashboard_frames/ public/hero-branch-new.png
git commit -m "chore: remove deprecated dashboard frames and images"

git add -A src/app/dashboard/ src/app/sign-in/ src/app/sign-up/
git commit -m "chore: remove deprecated dashboard and auth routes"

git add -A "lighthouse-*.json" "lighthouse-*.html" lcp_dump.txt
git commit -m "docs: add lighthouse performance audit reports"

git add -A "public/*.webp" public/liquid-glass.js
git commit -m "feat(assets): add optimized webp images and liquid glass script"

git add -A src/app/globals.css src/app/layout.tsx src/app/template.tsx src/middleware.ts src/app/features/page.tsx src/app/(app)/
git commit -m "feat(core): update core layout, middleware, and app routing"

git add -A src/components/ClientOverlays.tsx src/components/FramerLazyProvider.tsx src/components/IntersectionLazyLoad.tsx src/components/ScrollFadeIn.tsx
git commit -m "feat(ui): add lazy loading and scroll animation providers"

git add -A src/components/CircularText.tsx src/components/EditorialCard.tsx src/components/GlobalMouseTracker.tsx src/components/Magnetic.tsx src/components/MobileMenu.tsx src/components/Navbar.tsx src/components/PageTransition.tsx src/components/RevealText.tsx src/components/ScrollProgress.tsx src/components/SmoothScrollProvider.tsx
git commit -m "refactor(ui): enhance shared interaction components"

git add -A src/components/Hero/
git commit -m "feat(hero): update parallax and fluid simulation components"

git add -A src/sections/BehaviorSection.tsx src/sections/FinalCTA.tsx src/sections/FrictionSection.tsx src/sections/HeroScrollStory.tsx src/sections/HeroSection.tsx
git commit -m "feat(landing): update core landing page sections"

git add -A src/sections/IntelligenceSection.tsx src/sections/ResearchSection.tsx src/sections/RiverSection.tsx src/sections/SeasonSection.tsx
git commit -m "feat(landing): update content and flow sections"

git add -A src/components/home/
git commit -m "feat(home): add interactive forecast and friction components"

git add -A src/features/dashboard/ src/components/dashboard/ src/components/charts/
git commit -m "refactor(dashboard): revamp dashboard views and metrics cards"

git add -A src/features/forecasting/ src/features/goals/
git commit -m "feat(forecasting): update forecasting and goal tracking features"

git add -A src/features/insights/ src/features/transactions/
git commit -m "feat(transactions): update transactions workspace and insights feed"

git add -A .
git commit -m "chore: update trust components and finalize project state"

git push
