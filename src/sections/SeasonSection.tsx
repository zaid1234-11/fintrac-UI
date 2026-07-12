"use client";

import { useRef, useState } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";
import {
  Sun,
  Sprout,
  Leaf,
  Snowflake,
  CloudRain,
} from "lucide-react";

const seasons = [
  {
    id: "growth",
    name: "Growth",
    icon: Sprout,
    description: "Income exceeds spending consistently. Surplus flows into savings and investments.",
    metrics: { savingsRate: "24%", flowSpeed: "High", stability: "Strong" },
    colors: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      icon: "text-emerald-500",
      accent: "#22C55E",
      gradient: "from-emerald-50 to-green-50",
    },
    atmosphere: "Morning sunlight filters through new leaves. The river flows strong and clear.",
  },
  {
    id: "harvest",
    name: "Harvest",
    icon: Sun,
    description: "Goals are being met. Investments mature. Financial momentum peaks.",
    metrics: { savingsRate: "31%", flowSpeed: "Peak", stability: "Excellent" },
    colors: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-700",
      icon: "text-amber-500",
      accent: "#D4A15A",
      gradient: "from-amber-50 to-yellow-50",
    },
    atmosphere: "Golden afternoon light. The river widens at the reservoir, abundant and warm.",
  },
  {
    id: "recovery",
    name: "Recovery",
    icon: Leaf,
    description: "Post-disruption rebuilding. Spending patterns normalizing. Confidence returning.",
    metrics: { savingsRate: "12%", flowSpeed: "Moderate", stability: "Rebuilding" },
    colors: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      icon: "text-blue-500",
      accent: "#2A6FA1",
      gradient: "from-blue-50 to-sky-50",
    },
    atmosphere: "Early morning. Mist lifts slowly. The river finds its way back to familiar channels.",
  },
  {
    id: "dormancy",
    name: "Dormancy",
    icon: Snowflake,
    description: "Spending is stable but stagnant. No growth, no decline. Waiting for momentum.",
    metrics: { savingsRate: "8%", flowSpeed: "Slow", stability: "Flat" },
    colors: {
      bg: "bg-slate-50",
      border: "border-slate-200",
      text: "text-slate-600",
      icon: "text-slate-400",
      accent: "#94A3B8",
      gradient: "from-slate-50 to-gray-50",
    },
    atmosphere: "Overcast, still. The river moves but barely. Everything waits beneath the surface.",
  },
  {
    id: "drought",
    name: "Drought",
    icon: CloudRain,
    description: "Income disruption or emergency spending. Conservation mode activated.",
    metrics: { savingsRate: "-3%", flowSpeed: "Critical", stability: "At Risk" },
    colors: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-700",
      icon: "text-orange-500",
      accent: "#EA580C",
      gradient: "from-orange-50 to-red-50",
    },
    atmosphere: "Dry heat. The riverbed shows. But underground, reserves still flow slowly.",
  },
];

export default function SeasonSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const [activeSeason, setActiveSeason] = useState(seasons[0]);

  return (
    <section
      id="seasons"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-mist) 0%, #F0F4F8 50%, var(--color-mist) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-amber text-sm font-semibold tracking-widest uppercase mb-4 block">
            Financial Climate
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-shadow font-[family-name:var(--font-display)] mb-6 text-balance">
            Current Season
          </h2>
          <p className="text-shadow/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Forget &ldquo;financial health scores.&rdquo; Your finances move
            through seasons—each with its own rhythm, challenges, and
            opportunities.
          </p>
        </m.div>

        {/* Season Selector */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {seasons.map((season) => {
            const Icon = season.icon;
            const isActive = activeSeason.id === season.id;
            return (
              <button
                key={season.id}
                onClick={() => setActiveSeason(season)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 ${
                  isActive
                    ? `${season.colors.bg} ${season.colors.text} ${season.colors.border} border-2 shadow-sm`
                    : "bg-white text-shadow/60 border border-shadow/10 hover:border-shadow/20"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? season.colors.icon : "text-shadow/40"}`} />
                {season.name}
              </button>
            );
          })}
        </m.div>

        {/* Active Season Card */}
        <AnimatePresence mode="wait">
          <m.div
            key={activeSeason.id}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`bg-gradient-to-br ${activeSeason.colors.gradient} rounded-3xl p-8 lg:p-12 border ${activeSeason.colors.border} shadow-sm`}
          >
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left — Details */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  {(() => {
                    const Icon = activeSeason.icon;
                    return (
                      <div
                        className={`w-12 h-12 rounded-2xl ${activeSeason.colors.bg} flex items-center justify-center`}
                      >
                        <Icon className={`w-6 h-6 ${activeSeason.colors.icon}`} />
                      </div>
                    );
                  })()}
                  <div>
                    <h3 className={`text-2xl font-bold font-[family-name:var(--font-display)] ${activeSeason.colors.text}`}>
                      {activeSeason.name} Season
                    </h3>
                  </div>
                </div>
                <p className="text-shadow/70 text-lg leading-relaxed mb-6">
                  {activeSeason.description}
                </p>
                <p className="text-shadow/40 text-sm italic leading-relaxed">
                  {activeSeason.atmosphere}
                </p>
              </div>

              {/* Right — Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/60 rounded-2xl p-5 text-center">
                  <p className="text-xs text-shadow/50 mb-2 uppercase tracking-wider">
                    Savings Rate
                  </p>
                  <p className={`text-3xl font-bold font-[family-name:var(--font-mono)] ${activeSeason.colors.text}`}>
                    {activeSeason.metrics.savingsRate}
                  </p>
                </div>
                <div className="bg-white/60 rounded-2xl p-5 text-center">
                  <p className="text-xs text-shadow/50 mb-2 uppercase tracking-wider">
                    Flow Speed
                  </p>
                  <p className={`text-lg font-semibold ${activeSeason.colors.text}`}>
                    {activeSeason.metrics.flowSpeed}
                  </p>
                </div>
                <div className="bg-white/60 rounded-2xl p-5 text-center">
                  <p className="text-xs text-shadow/50 mb-2 uppercase tracking-wider">
                    Stability
                  </p>
                  <p className={`text-lg font-semibold ${activeSeason.colors.text}`}>
                    {activeSeason.metrics.stability}
                  </p>
                </div>
              </div>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
