'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useForecastEngine } from '@/features/forecasting/hooks/useForecastEngine';
import { ForecastSidebar } from '@/features/forecasting/components/ForecastSidebar';
import { ScenarioSelector } from '@/features/forecasting/components/ScenarioSelector';
import { ForecastVisualizer } from '@/features/forecasting/components/ForecastVisualizer';
import { GoalImpactPanel } from '@/features/forecasting/components/GoalImpactPanel';
import { SensitivityPanel } from '@/features/forecasting/components/SensitivityPanel';
import { DashboardVideoBackground } from '@/features/dashboard/components/DashboardVideoBackground';

export default function ForecastPage() {
  const {
    chartData,
    todayIndex,
    scenarioSaving,
    setScenarioSaving,
    projectedSavings,
    goalForecasts,
    sensitivityLevers,
  } = useForecastEngine();

  return (
    <div className="relative min-h-screen w-full bg-transparent overflow-hidden selection:bg-emerald-500/30 selection:text-white text-white">
      {/* Layer 1: Cinematic Ambient Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <DashboardVideoBackground src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260422_112520_ee819691-f2e8-4c54-bb77-3fb72c84eaa5.mp4" />
      </div>

      <div className="relative z-10 w-full min-h-screen pt-8 md:pt-16 px-4 md:px-8 max-w-[1800px] mx-auto pb-32">
        <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] 2xl:grid-cols-[320px_1fr] gap-6 xl:gap-10">

          {/* LEFT SIDEBAR (Sticky) */}
          <aside className="w-full shrink-0">
            <div className="sticky top-16 flex flex-col gap-6">
              <ForecastSidebar />
              <ScenarioSelector />
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 flex flex-col gap-10">
            <ForecastVisualizer
              chartData={chartData}
              todayIndex={todayIndex}
              scenarioSaving={scenarioSaving}
              onScenarioSavingChange={setScenarioSaving}
              projectedSavings={projectedSavings}
            />
            <GoalImpactPanel goalForecasts={goalForecasts} />
            <SensitivityPanel levers={sensitivityLevers} />
          </main>

        </div>
      </div>
    </div>
  );
}
