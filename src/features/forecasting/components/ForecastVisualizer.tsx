'use client';

import React from 'react';
import { m } from 'framer-motion';
import { GitFork } from 'lucide-react';
import ForecastForkChart from '@/components/forecasting/ForecastForkChart';
import type { ForecastChartPoint } from '../types';

interface ForecastVisualizerProps {
  chartData: ForecastChartPoint[];
  todayIndex: number;
  scenarioSaving: number;
  onScenarioSavingChange: (value: number) => void;
  projectedSavings: number;
}

export function ForecastVisualizer({
  chartData,
  todayIndex,
  scenarioSaving,
  onScenarioSavingChange,
  projectedSavings,
}: ForecastVisualizerProps) {
  // Transform chartData to match ForecastForkChart's expected format
  const baselineData = chartData.map(p => ({
    month: p.month,
    currentPath: p.currentPath,
  }));

  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.liquidGlass && cardRef.current) {
      // @ts-ignore
      const glass = window.liquidGlass(cardRef.current, { scale: -112, chroma: 6 });
      return () => { if (glass && glass.destroy) glass.destroy(); };
    }
  }, []);

  return (
    <m.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-3 mb-6 ml-2">
        <GitFork className="w-5 h-5 text-white/80" />
        <h2 className="text-[10px] tracking-[0.2em] text-white/40 font-mono uppercase">Current Path vs Optimized</h2>
      </div>

      <div ref={cardRef} className="goal-liquid-glass p-6">
        <ForecastForkChart
          baselineData={baselineData}
          todayIndex={todayIndex}
        />
      </div>
    </m.section>
  );
}
