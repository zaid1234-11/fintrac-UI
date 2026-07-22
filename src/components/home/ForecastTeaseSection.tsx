import React from "react";
import ForecastChartShell from "@/components/home/ForecastChartShell";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import LiquidCard from "@/components/liquid/LiquidCard";

// ──────────────────────────────────────────────
// Mock baseline data — realistic 12-month projection
// ──────────────────────────────────────────────

const MOCK_BASELINE = [
  { month: "Jun", currentPath: 120000 },
  { month: "Jul", currentPath: 128000 },
  { month: "Aug", currentPath: 135000 },
  { month: "Sep", currentPath: 142000 },
  { month: "Oct", currentPath: 148000 },
  { month: "Nov", currentPath: 153000 },
  { month: "Dec", currentPath: 157000 },
  { month: "Jan", currentPath: 160500 },
  { month: "Feb", currentPath: 163000 },
  { month: "Mar", currentPath: 165000 },
  { month: "Apr", currentPath: 167000 },
  { month: "May", currentPath: 169000 },
];

const TODAY_INDEX = 5; // November is "today"

interface ForecastTeaseSectionProps {
  baselineData?: typeof MOCK_BASELINE;
  todayIndex?: number;
}

/**
 * Homepage Section 3 — Forecast Tease.
 * Single centered glass-panel card containing the full interactive
 * ForecastForkChart. The "why this matters" moment.
 */
export default function ForecastTeaseSection({
  baselineData = MOCK_BASELINE,
  todayIndex = TODAY_INDEX,
}: ForecastTeaseSectionProps) {
  return (
    <section
      data-testid="forecast-tease"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-8"
    >
      <ScrollFadeIn className="max-w-[680px] mx-auto" delay={0.1} yOffset={40}>
        {/* Section label */}
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-3 text-center">
          FORECASTING ENGINE
        </div>
        <h2 className="font-display font-light text-white text-[24px] sm:text-[32px] md:text-[40px] leading-[1.08] text-center mb-3">
          What happens if you change{" "}
          <span className="text-white/50">one habit?</span>
        </h2>
        <p className="text-[14px] text-white/50 text-center mb-8 sm:mb-10 max-w-[44ch] mx-auto leading-relaxed">
          Drag the slider. Watch your financial trajectory fork in real-time.
          No backend. No lag. Just cause and effect.
        </p>

        {/* Ambient Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[300px] max-h-[300px] sm:max-w-none sm:max-h-none bg-[var(--color-season-growth)] ambient-glow mix-blend-screen opacity-30" />

        {/* Glass card wrapping the full interactive chart */}
        <LiquidCard level={2} className="p-4 sm:p-5 md:p-6 relative z-10 rounded-[32px]">
          <ForecastChartShell
            baselineData={baselineData}
            todayIndex={todayIndex}
          />
        </LiquidCard>
      </ScrollFadeIn>
    </section>
  );
}
