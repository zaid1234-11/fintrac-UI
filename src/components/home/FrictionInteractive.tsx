"use client";

import React, { useState } from "react";

const TARGET_SAVINGS = 6000;

interface Category {
  id: string;
  name: string;
  fixedFriction?: number;
  color: string;
}

const CATEGORIES: Category[] = [
  { id: "rent", name: "Rent", fixedFriction: 0.95, color: "bg-white/40" },
  { id: "subs", name: "Subscriptions", fixedFriction: 0.35, color: "bg-white/60" },
  { id: "shopping", name: "Shopping", fixedFriction: 0.15, color: "bg-white/80" },
  { id: "dining", name: "Dining Out", color: "bg-white" },
];

export default function FrictionInteractive() {
  const [diningFrictionRaw, setDiningFrictionRaw] = useState<number>(50);
  const diningFriction = diningFrictionRaw / 100;

  const getFriction = (catId: string) => {
    if (catId === "dining") return diningFriction;
    return CATEGORIES.find((c) => c.id === catId)?.fixedFriction || 0;
  };

  // Traditional (Equal Cut)
  const traditionalCut = TARGET_SAVINGS / CATEGORIES.length;
  const traditionalStats = CATEGORIES.map((c) => {
    const f = getFriction(c.id);
    return {
      ...c,
      cut: traditionalCut,
      pain: traditionalCut * f,
      friction: f,
    };
  });
  const traditionalTotalPain = traditionalStats.reduce((acc, curr) => acc + curr.pain, 0);

  // Elastic Engine
  const sumOfSquaredInverses = CATEGORIES.reduce((acc, c) => {
    const f = getFriction(c.id);
    return acc + Math.pow(1 - f, 2);
  }, 0);

  const elasticStats = CATEGORIES.map((c) => {
    const f = getFriction(c.id);
    const weight = Math.pow(1 - f, 2);
    const cut = sumOfSquaredInverses === 0 ? traditionalCut : TARGET_SAVINGS * (weight / sumOfSquaredInverses);
    return {
      ...c,
      cut,
      pain: cut * f,
      friction: f,
    };
  });
  const elasticTotalPain = elasticStats.reduce((acc, curr) => acc + curr.pain, 0);

  const formatINR = (val: number) =>
    val.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  const getFrictionLabel = (val: number) => {
    if (val < 33) return "Low";
    if (val < 66) return "Medium";
    return "High";
  };

  const diningElasticPercent = Math.round(
    (elasticStats.find((c) => c.id === "dining")!.cut / TARGET_SAVINGS) * 100
  );

  return (
    <>
      {/* Slider Control */}
      <div className="mb-16 max-w-xl mx-auto bg-white/[0.03] border border-white/10 rounded-[24px] p-6 md:p-8 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <label htmlFor="dining-friction" className="text-sm font-medium text-white/90">
            Dining out friction
          </label>
          <span className="text-sm text-white/50 font-mono">
            {getFrictionLabel(diningFrictionRaw)} ({diningFrictionRaw}%)
          </span>
        </div>
        <input
          id="dining-friction"
          type="range"
          min="0"
          max="100"
          value={diningFrictionRaw}
          onChange={(e) => setDiningFrictionRaw(Number(e.target.value))}
          aria-valuetext={getFrictionLabel(diningFrictionRaw)}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
        />
        <div className="mt-4 flex justify-between text-[11px] text-white/40 uppercase tracking-wider font-semibold">
          <span>Easy to cut</span>
          <span>Hard to cut</span>
        </div>
      </div>

      {/* Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Traditional Panel */}
        <div className="bg-white/[0.02] border border-white/[0.08] rounded-[24px] p-8 flex flex-col">
          <div className="mb-8">
            <h3 className="text-xl font-display text-white mb-2">Traditional — Equal Cut</h3>
            <p className="text-sm text-white/40">Fixed ₹1,500 cut across all 4 categories.</p>
          </div>
          <div className="flex-1 flex flex-col gap-6">
            {traditionalStats.map((stat) => (
              <div key={`trad-${stat.id}`}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/70">{stat.name}</span>
                  <span className="text-white font-mono">{formatINR(Math.round(stat.cut))}</span>
                </div>
                <div className="w-full h-2 bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stat.color} rounded-full transition-all duration-300 ease-out`}
                    style={{ width: `${(stat.cut / TARGET_SAVINGS) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Elastic Panel */}
        <div className="bg-white/[0.04] border border-white/20 rounded-[24px] p-8 flex flex-col shadow-2xl">
          <div className="mb-8">
            <h3 className="text-xl font-display text-white mb-2">FinTrac Elastic Engine</h3>
            <p className="text-sm text-white/60">Dynamic adjustments based on category friction.</p>
          </div>
          <div className="flex-1 flex flex-col gap-6">
            {elasticStats.map((stat) => (
              <div key={`elastic-${stat.id}`}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/90 font-medium">{stat.name}</span>
                  <span className="text-white font-mono font-medium">{formatINR(Math.round(stat.cut))}</span>
                </div>
                <div className="w-full h-2 bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stat.color} rounded-full transition-all duration-300 ease-out`}
                    style={{ width: `${(stat.cut / TARGET_SAVINGS) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics & Caption */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-black/20 rounded-[16px] p-4 border border-white/5 text-center">
            <p className="text-[11px] uppercase tracking-wider text-white/40 mb-1">Traditional Pain</p>
            <p className="text-2xl font-mono text-white/60">{Math.round(traditionalTotalPain)}</p>
          </div>
          <div className="bg-white/10 rounded-[16px] p-4 border border-white/20 text-center shadow-lg">
            <p className="text-[11px] uppercase tracking-wider text-white/60 mb-1">Elastic Pain</p>
            <p className="text-2xl font-mono text-white font-medium">{Math.round(elasticTotalPain)}</p>
          </div>
        </div>
        <p className="text-center text-[14px] md:text-[15px] text-white/60 leading-relaxed font-light px-4">
          At <strong className="text-white font-medium">{getFrictionLabel(diningFrictionRaw).toLowerCase()}</strong> friction, dining out absorbs{" "}
          <strong className="text-white font-medium">{diningElasticPercent}%</strong> of the monthly cut under the elastic engine — versus a fixed 25% under traditional budgeting, every month, regardless of how it feels.
        </p>
      </div>
    </>
  );
}
