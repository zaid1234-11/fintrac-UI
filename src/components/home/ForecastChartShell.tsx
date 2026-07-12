"use client";

import React from "react";
import dynamic from "next/dynamic";
import IntersectionLazyLoad from "@/components/IntersectionLazyLoad";

// The actual chart is heavy (Recharts + Decimal.js). 
// We strip it from SSR and bundle it separately.
const LazyForecastForkChart = dynamic(
  () => import("@/components/forecasting/ForecastForkChart"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center animate-pulse">
        <div className="w-8 h-8 border-4 border-white/20 border-t-white/60 rounded-full animate-spin mb-4" />
        <span className="text-white/40 text-sm font-mono tracking-widest uppercase">Initializing Engine...</span>
      </div>
    )
  }
);

interface ForecastChartShellProps {
  baselineData: any[];
  todayIndex: number;
}

/**
 * Client Component shell that defers the mounting and fetching of the client chart
 * until it scrolls into view, preserving main thread performance on initial load.
 */
export default function ForecastChartShell({ baselineData, todayIndex }: ForecastChartShellProps) {
  return (
    <IntersectionLazyLoad minHeight="400px">
      <LazyForecastForkChart baselineData={baselineData} todayIndex={todayIndex} />
    </IntersectionLazyLoad>
  );
}
