"use client";

import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SEASON, TOOLTIP_STYLE, AXIS_STYLE } from "@/lib/chartTheme";
import { formatINR } from "@/lib/formatINR";

interface ForecastForkChartProps {
  baselineData: { month: string; currentPath: number }[];
  todayIndex: number;
}

/**
 * Full interactive fork chart with slider.
 * Client-side `projectPath()` recompute on every drag — no backend
 * round-trip, no perceived lag. Deterministic cause-and-effect.
 */
export default function ForecastForkChart({
  baselineData,
  todayIndex,
}: ForecastForkChartProps) {
  const [scenarioSaving, setScenarioSaving] = useState(2000);

  const chartData = useMemo(() => {
    return baselineData.map((point, i) => {
      if (i <= todayIndex) {
        return {
          month: point.month,
          currentPath: point.currentPath,
          projectedPath: point.currentPath,
        };
      }
      // Project forward: each month adds the scenario saving difference
      const monthsAhead = i - todayIndex;
      const currentProjection =
        baselineData[todayIndex].currentPath +
        (point.currentPath - baselineData[todayIndex].currentPath);
      const projectedProjection = currentProjection + scenarioSaving * monthsAhead;
      return {
        month: point.month,
        currentPath: point.currentPath,
        projectedPath: projectedProjection,
      };
    });
  }, [baselineData, todayIndex, scenarioSaving]);

  const projectedSavings = useMemo(() => {
    const lastPoint = chartData[chartData.length - 1];
    if (!lastPoint) return 0;
    return (lastPoint.projectedPath ?? 0) - (lastPoint.currentPath ?? 0);
  }, [chartData]);

  return (
    <div className="flex flex-col gap-5">
      {/* Projected savings callout */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 flex items-center justify-between">
        <div>
          <div className="text-[10px] tracking-[0.2em] text-white/40 font-mono uppercase mb-1">
            Projected Additional Savings
          </div>
          <div className="font-mono text-[18px] sm:text-[22px] text-white tabular-nums">
            {formatINR(projectedSavings)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] tracking-[0.2em] text-white/40 font-mono uppercase mb-1">
            Monthly Redirect
          </div>
          <div className="font-mono text-[16px] text-[#8FA876]">
            {formatINR(scenarioSaving)}/mo
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[200px] sm:h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
          >
            <XAxis
              dataKey="month"
              tick={AXIS_STYLE}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={AXIS_STYLE}
              axisLine={false}
              tickLine={false}
              domain={['dataMin - 5000', 'dataMax + 5000']}
              tickFormatter={(v: number) =>
                v >= 100000
                  ? `${(v / 100000).toFixed(1)}L`
                  : `${(v / 1000).toFixed(0)}K`
              }
            />
            <ReferenceLine
              x={baselineData[todayIndex]?.month}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeDasharray="4 4"
              label={{
                value: "Today",
                position: "top",
                fill: "#6B6D62",
                fontSize: 10,
                fontFamily: "var(--font-geist-mono), monospace",
              }}
            />
            <Tooltip
              contentStyle={TOOLTIP_STYLE.contentStyle}
              labelStyle={TOOLTIP_STYLE.labelStyle}
              formatter={(value: any, name: any) => [
                formatINR(value),
                name === "currentPath" ? "Current Path" : "With Redirect",
              ]}
            />
            <Line
              type="monotone"
              dataKey="currentPath"
              stroke={SEASON.harvest}
              strokeWidth={2}
              dot={false}
              name="currentPath"
            />
            <Line
              type="monotone"
              dataKey="projectedPath"
              stroke={SEASON.growth}
              strokeWidth={2}
              strokeDasharray="6 3"
              dot={false}
              name="projectedPath"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Slider */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="scenario-slider"
            className="text-[12px] text-white/60 font-mono"
          >
            Monthly redirect amount
          </label>
          <span className="text-[12px] text-white/40 font-mono">
            {formatINR(scenarioSaving)}
          </span>
        </div>
        <input
          id="scenario-slider"
          type="range"
          min={500}
          max={10000}
          step={500}
          value={scenarioSaving}
          onChange={(e) => setScenarioSaving(Number(e.target.value))}
          className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#8FA876]"
        />
        <div className="flex justify-between text-[10px] text-white/30 font-mono">
          <span>₹500</span>
          <span>₹10,000</span>
        </div>
      </div>
    </div>
  );
}
