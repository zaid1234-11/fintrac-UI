"use client";

import React from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { scoreToColor, TOOLTIP_STYLE } from "@/lib/chartTheme";
import { formatINR } from "@/lib/formatINR";

export interface CategoryData {
  name: string;
  percentage: number;
  amount: number;
  healthScore: number;
}

interface CategoryRingChartProps {
  categories: CategoryData[];
}

export default function CategoryRingChart({ categories }: CategoryRingChartProps) {
  const chartData = categories.map((cat, i) => ({
    name: cat.name,
    value: cat.percentage,
    amount: cat.amount,
    fill: scoreToColor(cat.healthScore),
    // RadialBarChart uses index ordering from outer to inner
  }));

  return (
    <div className="w-full h-[200px] sm:h-[220px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="90%"
          barSize={12}
          data={chartData}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            background={{ fill: "rgba(255, 255, 255, 0.04)" }}
            dataKey="value"
            cornerRadius={6}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE.contentStyle}
            labelStyle={TOOLTIP_STYLE.labelStyle}
            formatter={(value: any, _name: any, entry: any) => {
              const payload = entry?.payload;
              return [
                `${value}% — ${formatINR(payload?.amount ?? 0)}`,
                payload?.name ?? "",
              ];
            }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      {/* Legend below chart */}
      <div className="absolute bottom-0 inset-x-0 flex flex-wrap justify-center gap-x-4 gap-y-1 px-2">
        {categories.map((cat) => (
          <div key={cat.name} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: scoreToColor(cat.healthScore) }}
            />
            <span className="text-[10px] font-mono text-white/50">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
