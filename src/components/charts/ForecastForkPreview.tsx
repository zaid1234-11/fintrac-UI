"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { SEASON, TOOLTIP_STYLE, AXIS_STYLE } from "@/lib/chartTheme";
import { formatINR } from "@/lib/formatINR";
import Link from "next/link";

interface ForecastForkPreviewProps {
  data: { month: string; currentPath: number; projectedPath?: number }[];
}

/**
 * Non-interactive mini forecast chart (~120px) for embedding
 * inside DashboardPreview. Links out to /forecasting for the
 * full interactive experience.
 */
export default function ForecastForkPreview({ data }: ForecastForkPreviewProps) {
  return (
    <div className="relative">
      <div className="w-full h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
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
            />
            <Tooltip
              contentStyle={TOOLTIP_STYLE.contentStyle}
              labelStyle={TOOLTIP_STYLE.labelStyle}
              formatter={(value: any) => [formatINR(value)]}
            />
            <Line
              type="monotone"
              dataKey="currentPath"
              stroke={SEASON.harvest}
              strokeWidth={2}
              dot={false}
              name="Current Path"
            />
            <Line
              type="monotone"
              dataKey="projectedPath"
              stroke={SEASON.growth}
              strokeWidth={2}
              strokeDasharray="5 3"
              dot={false}
              name="Projected"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Link
        href="/forecasting"
        className="mt-2 inline-flex items-center gap-1 text-[11px] font-mono text-white/40 hover:text-white/70 transition-colors"
      >
        See full forecast
        <span className="text-[10px]">→</span>
      </Link>
    </div>
  );
}
