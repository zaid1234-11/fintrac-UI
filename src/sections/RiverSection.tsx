"use client";

import { useRef, useEffect, useState } from "react";
import { m, useInView } from "framer-motion";

/* River tributary data */
const tributaries = [
  { id: "housing", label: "Housing", allocation: 35, color: "#2A6FA1", friction: "protected" },
  { id: "food", label: "Food & Groceries", allocation: 18, color: "#4F7A61", friction: "moderate" },
  { id: "transport", label: "Transport", allocation: 12, color: "#7FB8E6", friction: "protected" },
  { id: "entertainment", label: "Entertainment", allocation: 8, color: "#D4A15A", friction: "flexible" },
  { id: "savings", label: "Savings", allocation: 15, color: "#2F5A3E", friction: "reservoir" },
  { id: "investments", label: "Investments", allocation: 12, color: "#1E5580", friction: "deep" },
];

/* SVG Particle that flows along a path */
function FlowParticle({
  pathId,
  delay,
  duration,
  color,
}: {
  pathId: string;
  delay: number;
  duration: number;
  color: string;
}) {
  return (
    <circle r="3" fill={color} opacity="0.7">
      <animateMotion
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
        keyPoints="0;1"
        keyTimes="0;1"
        calcMode="linear"
      >
        <mpath href={`#${pathId}`} />
      </animateMotion>
      <animate
        attributeName="opacity"
        values="0;0.8;0.8;0"
        keyTimes="0;0.1;0.85;1"
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="r"
        values="2;3;2"
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
    </circle>
  );
}

/* SVG Path data for tributaries */
const pathData: Record<string, string> = {
  main: "M 600 20 C 600 80 600 120 600 160",
  housing: "M 600 160 C 550 200 350 260 200 320 Q 150 340 120 380 L 100 450",
  food: "M 600 160 C 580 210 460 270 380 330 Q 350 350 340 400 L 330 450",
  transport: "M 600 160 C 590 220 540 280 520 340 Q 510 370 500 420 L 490 450",
  entertainment: "M 600 160 C 620 220 680 280 720 340 Q 730 370 740 420 L 750 450",
  savings: "M 600 160 C 640 210 780 270 860 330 Q 890 350 900 400 L 910 450",
  investments: "M 600 160 C 660 200 900 260 1050 320 Q 1090 340 1100 380 L 1100 450",
};

export default function RiverSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [hoveredTributary, setHoveredTributary] = useState<string | null>(null);

  return (
    <section
      id="river"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 bg-mist overflow-hidden"
    >
      {/* Subtle water-themed background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 80%, rgba(42,111,161,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 20%, rgba(79,122,97,0.05) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-river-deep text-sm font-semibold tracking-widest uppercase mb-4 block">
            The Watershed
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-shadow font-[family-name:var(--font-display)] mb-6 text-balance">
            The River System
          </h2>
          <p className="text-shadow/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Your finances flow like a living watershed. Income enters upstream,
            splitting into tributaries where each category finds its natural
            channel.
          </p>
        </m.div>

        {/* River SVG */}
        <m.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <svg
            viewBox="0 0 1200 600"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Financial flow river system visualization"
          >
            <defs>
              {/* Water gradient */}
              <linearGradient id="mainRiverGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2A6FA1" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#7FB8E6" stopOpacity="0.7" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="waterGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Tributary paths (defined for particle animation) */}
              <path id="path-main" d={pathData.main} />
              <path id="path-housing" d={pathData.housing} />
              <path id="path-food" d={pathData.food} />
              <path id="path-transport" d={pathData.transport} />
              <path id="path-entertainment" d={pathData.entertainment} />
              <path id="path-savings" d={pathData.savings} />
              <path id="path-investments" d={pathData.investments} />
            </defs>

            {/* Main income river */}
            <m.path
              d="M 580 0 C 580 40 575 80 580 120 Q 590 150 600 160 Q 610 150 620 120 C 625 80 620 40 620 0 Z"
              fill="url(#mainRiverGrad)"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={isInView ? { opacity: 1, pathLength: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3 }}
            />

            {/* Income label */}
            <m.text
              x="600"
              y="15"
              textAnchor="middle"
              className="fill-shadow text-xs font-[family-name:var(--font-mono)] font-semibold"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              INCOME
            </m.text>

            {/* Tributaries */}
            {tributaries.map((t, i) => {
              const isHovered = hoveredTributary === t.id;
              const strokeWidth = (t.allocation / 35) * 20 + 4;

              return (
                <g key={t.id}>
                  {/* Tributary path */}
                  <m.path
                    d={pathData[t.id] || ""}
                    fill="none"
                    stroke={t.color}
                    strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                    strokeLinecap="round"
                    strokeOpacity={isHovered ? 1 : 0.6}
                    filter={isHovered ? "url(#waterGlow)" : undefined}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{
                      pathLength: { duration: 1.5, delay: 0.5 + i * 0.15, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.5, delay: 0.5 + i * 0.15 },
                    }}
                    style={{ cursor: "pointer", transition: "stroke-width 0.3s, stroke-opacity 0.3s" }}
                    onMouseEnter={() => setHoveredTributary(t.id)}
                    onMouseLeave={() => setHoveredTributary(null)}
                  />

                  {/* Flow particles */}
                  {isInView && (
                    <>
                      <FlowParticle pathId={`path-${t.id}`} delay={1 + i * 0.3} duration={3 + i * 0.5} color={t.color} />
                      <FlowParticle pathId={`path-${t.id}`} delay={2 + i * 0.3} duration={3.5 + i * 0.5} color={t.color} />
                      <FlowParticle pathId={`path-${t.id}`} delay={3 + i * 0.3} duration={4 + i * 0.5} color={t.color} />
                    </>
                  )}
                </g>
              );
            })}

            {/* Particles on main stream */}
            {isInView && (
              <>
                <FlowParticle pathId="path-main" delay={0.5} duration={2} color="#7FB8E6" />
                <FlowParticle pathId="path-main" delay={1.2} duration={2.5} color="#2A6FA1" />
              </>
            )}

            {/* Destination labels */}
            {tributaries.map((t, i) => {
              const positions = [
                { x: 100, y: 480 },
                { x: 330, y: 480 },
                { x: 490, y: 480 },
                { x: 750, y: 480 },
                { x: 910, y: 480 },
                { x: 1100, y: 480 },
              ];

              return (
                <m.g
                  key={`label-${t.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.5 + i * 0.1 }}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredTributary(t.id)}
                  onMouseLeave={() => setHoveredTributary(null)}
                >
                  {/* End pool */}
                  <ellipse
                    cx={positions[i].x}
                    cy={positions[i].y - 15}
                    rx={t.allocation + 8}
                    ry={12}
                    fill={t.color}
                    opacity={hoveredTributary === t.id ? 0.4 : 0.15}
                    style={{ transition: "opacity 0.3s" }}
                  />
                  <text
                    x={positions[i].x}
                    y={positions[i].y + 5}
                    textAnchor="middle"
                    className="fill-shadow/80 font-[family-name:var(--font-body)]"
                    fontSize="11"
                    fontWeight={hoveredTributary === t.id ? "600" : "500"}
                  >
                    {t.label}
                  </text>
                  <text
                    x={positions[i].x}
                    y={positions[i].y + 22}
                    textAnchor="middle"
                    className="fill-shadow/50 font-[family-name:var(--font-mono)]"
                    fontSize="12"
                    fontWeight="600"
                  >
                    {t.allocation}%
                  </text>
                  <text
                    x={positions[i].x}
                    y={positions[i].y + 38}
                    textAnchor="middle"
                    fontSize="9"
                    fill={
                      t.friction === "protected"
                        ? "#D4A15A"
                        : t.friction === "flexible"
                        ? "#4F7A61"
                        : t.friction === "reservoir"
                        ? "#2F5A3E"
                        : t.friction === "deep"
                        ? "#1E5580"
                        : "#7FB8E6"
                    }
                    fontWeight="600"
                    style={{ textTransform: "uppercase" }}
                  >
                    {t.friction}
                  </text>
                </m.g>
              );
            })}
          </svg>

          {/* Legend */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-shadow/60"
          >
            <span className="flex items-center gap-2">
              <svg width="24" height="8">
                <line x1="0" y1="4" x2="24" y2="4" stroke="#2A6FA1" strokeWidth="4" strokeLinecap="round" />
              </svg>
              Width = Allocation
            </span>
            <span className="flex items-center gap-2">
              <svg width="24" height="8">
                <circle cx="4" cy="4" r="3" fill="#7FB8E6" opacity="0.7" />
                <circle cx="14" cy="4" r="2.5" fill="#7FB8E6" opacity="0.5" />
              </svg>
              Particles = Flow Speed
            </span>
            <span className="flex items-center gap-2">
              <svg width="24" height="8">
                <ellipse cx="12" cy="4" rx="10" ry="4" fill="#4F7A61" opacity="0.2" />
              </svg>
              Pools = Destinations
            </span>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
