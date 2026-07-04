"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { SEASON, TOOLTIP_STYLE, AXIS_STYLE, GRID_STYLE } from "@/lib/chartTheme";
import { formatINR } from "@/lib/formatINR";

export interface SpendingPoint {
  month: string;
  actual: number | null;
  forecast: number | null;
  budget: number;
}

interface SpendingAreaChartProps {
  data: SpendingPoint[];
}

export default function SpendingAreaChart({ data }: SpendingAreaChartProps) {
  return (
    <div className="w-full h-[180px] sm:h-[220px] md:h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={SEASON.harvest} stopOpacity={0.3} />
              <stop offset="95%" stopColor={SEASON.harvest} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={SEASON.growth} stopOpacity={0.2} />
              <stop offset="95%" stopColor={SEASON.growth} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray={GRID_STYLE.strokeDasharray}
            stroke={GRID_STYLE.stroke}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={AXIS_STYLE}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={AXIS_STYLE}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
            domain={['dataMin - 2000', 'dataMax + 2000']}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE.contentStyle}
            labelStyle={TOOLTIP_STYLE.labelStyle}
            itemStyle={TOOLTIP_STYLE.itemStyle}
            formatter={(value: any, name: any) => [
              formatINR(value),
              name === "actual" ? "Actual" : "AI Forecast",
            ]}
          />
          <ReferenceLine
            y={data[0]?.budget ?? 0}
            stroke="rgba(255, 255, 255, 0.15)"
            strokeDasharray="6 4"
            label={{
              value: "Budget",
              position: "right",
              fill: "#6B6D62",
              fontSize: 10,
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          />
          <Area
            type="monotone"
            dataKey="actual"
            stroke={SEASON.harvest}
            strokeWidth={2}
            fill="url(#actualGradient)"
            dot={false}
            activeDot={{
              r: 4,
              fill: SEASON.harvest,
              stroke: "#2E2F2B",
              strokeWidth: 2,
            }}
            connectNulls={false}
          />
          <Area
            type="monotone"
            dataKey="forecast"
            stroke={SEASON.growth}
            strokeWidth={2}
            strokeDasharray="6 3"
            fill="url(#forecastGradient)"
            dot={false}
            activeDot={{
              r: 4,
              fill: SEASON.growth,
              stroke: "#2E2F2B",
              strokeWidth: 2,
            }}
            connectNulls={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
