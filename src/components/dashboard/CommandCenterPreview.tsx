"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import KPIRow from "./KPIRow";
import SpendingAreaChart, {
  type SpendingPoint,
} from "@/components/charts/SpendingAreaChart";
import CategoryRingChart, {
  type CategoryData,
} from "@/components/charts/CategoryRingChart";
import ForecastForkPreview from "@/components/charts/ForecastForkPreview";
import AIInsightCard, {
  type Insight,
} from "@/components/charts/AIInsightCard";
import BorderGlow from "@/components/BorderGlow";
import { EASE_REVEAL } from "@/lib/chartTheme";

// ──────────────────────────────────────────────
// Mock Data — realistic financial insights
// ──────────────────────────────────────────────

const MOCK_KPIS = {
  savings: { amount: 24500, deltaPercent: 12 },
  healthScore: 73,
  frictionCount: 4,
};

const MOCK_SPENDING: SpendingPoint[] = [
  { month: "Jun", actual: 42000, forecast: null, budget: 45000 },
  { month: "Jul", actual: 38500, forecast: null, budget: 45000 },
  { month: "Aug", actual: 44200, forecast: null, budget: 45000 },
  { month: "Sep", actual: 41800, forecast: null, budget: 45000 },
  { month: "Oct", actual: 47300, forecast: null, budget: 45000 },
  { month: "Nov", actual: 43900, forecast: null, budget: 45000 },
  { month: "Dec", actual: null, forecast: 41200, budget: 45000 },
  { month: "Jan", actual: null, forecast: 39800, budget: 45000 },
  { month: "Feb", actual: null, forecast: 37500, budget: 45000 },
];

const MOCK_CATEGORIES: CategoryData[] = [
  { name: "Groceries", percentage: 82, amount: 12400, healthScore: 82 },
  { name: "Transport", percentage: 65, amount: 4800, healthScore: 65 },
  { name: "Dining", percentage: 38, amount: 8900, healthScore: 38 },
  { name: "Shopping", percentage: 71, amount: 6200, healthScore: 71 },
  { name: "Subscriptions", percentage: 90, amount: 2100, healthScore: 90 },
];

const MOCK_FORECAST = [
  { month: "Sep", currentPath: 145000, projectedPath: 145000 },
  { month: "Oct", currentPath: 148000, projectedPath: 148000 },
  { month: "Nov", currentPath: 151000, projectedPath: 153000 },
  { month: "Dec", currentPath: 153500, projectedPath: 157000 },
  { month: "Jan", currentPath: 155000, projectedPath: 161000 },
  { month: "Feb", currentPath: 157000, projectedPath: 166000 },
];

const MOCK_INSIGHT: Insight = {
  headline: "Dining spend is up 34%.",
  detail:
    "Three restaurants account for 80% of the increase. Redirecting ₹2,000/month toward your Emergency Fund would move your completion date forward by 2 months.",
  confidence: 91,
  urgency: "drought",
  actionLabel: "Apply Recommendation",
};

// ──────────────────────────────────────────────
// Component Props (for later API connection)
// ──────────────────────────────────────────────

interface CommandCenterPreviewProps {
  kpis?: typeof MOCK_KPIS;
  spendingData?: SpendingPoint[];
  categoryData?: CategoryData[];
  forecastData?: typeof MOCK_FORECAST;
  primaryInsight?: Insight;
}

export default function CommandCenterPreview({
  kpis = MOCK_KPIS,
  spendingData = MOCK_SPENDING,
  categoryData = MOCK_CATEGORIES,
  forecastData = MOCK_FORECAST,
  primaryInsight = MOCK_INSIGHT,
}: CommandCenterPreviewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    // Simple math to determine which slide is most visible
    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.clientWidth;
    const index = Math.round(scrollLeft / width);
    setActiveSlide(index);
  };

  return (
    <section
      data-testid="command-center-preview"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-8 md:px-14"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE_REVEAL }}
          className="mb-10 sm:mb-14"
        >
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-3">
            FINANCIAL COMMAND CENTER
          </div>
          <h2 className="font-display font-light text-white text-[28px] sm:text-[36px] md:text-[48px] leading-[1.05] max-w-[22ch]">
            Your money, understood.
            <br />
            <span className="text-white/50">Not just tracked.</span>
          </h2>
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8FA876] animate-pulse" />
              Recommendation engine active
            </span>
            <span className="text-[11px] font-mono text-white/30">
              159+ transactions parsed
            </span>
          </div>
        </motion.header>

        {/* Command Center grid */}
        <BorderGlow
          borderRadius={24}
          backgroundColor="rgba(255, 255, 255, 0.015)"
          glowColor="40 80 80"
          glowRadius={25}
          glowIntensity={0.4}
          coneSpread={20}
          className="border-white/[0.06] p-4 sm:p-6 md:p-8"
        >
          {/* KPI Row */}
          <KPIRow
            savings={kpis.savings}
            healthScore={kpis.healthScore}
            frictionCount={kpis.frictionCount}
          />

          {/* AI Insight Card — promoted above charts on all sizes for maximum visibility */}
          <div className="mt-4 sm:mt-6">
            <AIInsightCard insight={primaryInsight} />
          </div>

          {/* Charts grid / Mobile Carousel */}
          <div className="mt-4 sm:mt-6 relative">
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-4 pb-2 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-6 md:overflow-visible md:pb-0 scroll-pl-4"
            >
              {/* Slide 1: Spending chart */}
              <div className="snap-center shrink-0 w-[85vw] sm:w-[60vw] md:w-auto md:row-span-2 rounded-2xl bg-white/[0.02] border border-white/[0.04] p-4 flex flex-col">
                <div className="text-[10px] tracking-[0.25em] text-white/40 font-mono mb-3">
                  SPENDING · ACTUAL VS FORECAST
                </div>
                <div className="flex-1 min-h-[220px]">
                  <SpendingAreaChart data={spendingData} />
                </div>
              </div>

              {/* Slide 2: Category Health */}
              <div className="snap-center shrink-0 w-[85vw] sm:w-[60vw] md:w-auto md:row-span-1 md:col-start-2 rounded-2xl bg-white/[0.02] border border-white/[0.04] p-4">
                <div className="text-[10px] tracking-[0.25em] text-white/40 font-mono mb-3">
                  CATEGORY HEALTH
                </div>
                <CategoryRingChart categories={categoryData} />
              </div>

              {/* Slide 3: 90-Day Forecast */}
              <div className="snap-center shrink-0 w-[85vw] sm:w-[60vw] md:w-auto md:row-span-1 md:col-start-2 rounded-2xl bg-white/[0.02] border border-white/[0.04] p-4">
                <div className="text-[10px] tracking-[0.25em] text-white/40 font-mono mb-3">
                  90-DAY FORECAST
                </div>
                <ForecastForkPreview data={forecastData} />
              </div>
            </div>

            {/* Mobile Pagination Indicators */}
            <div className="flex md:hidden justify-center gap-2 mt-4">
              {[0, 1, 2].map(i => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-300 ${activeSlide === i ? "w-4 bg-white" : "w-1.5 bg-white/20"}`} 
                />
              ))}
            </div>
          </div>

          {/* Real progress — not fake social proof */}
          <div className="mt-6 pt-4 border-t border-white/[0.04] flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              "Recommendation engine",
              "Forecasting engine",
              "Trust architecture",
              "Season classification",
            ].map((item) => (
              <span
                key={item}
                className="text-[10px] font-mono tracking-wide text-white/30"
              >
                {item}
              </span>
            ))}
          </div>
        </BorderGlow>
      </div>
    </section>
  );
}
