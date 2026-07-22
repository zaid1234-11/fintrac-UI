import React from "react";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";
import LiquidCard from "@/components/liquid/LiquidCard";

// ──────────────────────────────────────────────
// Feature teasers — static cards, NOT scroll-scrub
// These are a visual menu into /features, not a
// miniature frame-scrub. That would compete with
// the real Features page.
// ──────────────────────────────────────────────

const FEATURE_CARDS = [
  {
    title: "Behavioral Friction",
    caption:
      "Measures how hard each spending habit is to change — and routes budget cuts where they hurt least.",
    href: "/features",
  },
  {
    title: "Financial Seasons",
    caption:
      "Growth, Harvest, Drought, Recovery, Dormancy. Your budget adapts to the season you're actually in.",
    href: "/features",
  },
  {
    title: "Elastic RL Engine",
    caption:
      "POMDP-driven budget rebalancing. 5,000 simulated agents. Validated convergence on real spending patterns.",
    href: "/features",
  },
];

interface FeaturesPreviewSectionProps {
  features?: typeof FEATURE_CARDS;
}

export default function FeaturesPreviewSection({
  features = FEATURE_CARDS,
}: FeaturesPreviewSectionProps) {
  return (
    <section
      data-testid="features-preview"
      className="relative w-full py-16 sm:py-20 md:py-28 px-5 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* Ambient Glow Background */}
      <div className="ambient-glow bg-[var(--color-season-dormancy)] w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section header */}
        <ScrollFadeIn delay={0} yOffset={12} className="mb-10 sm:mb-14 text-center">
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-3">
            THE ARCHITECTURE
          </div>
          <h2 className="font-display font-light text-white text-[24px] sm:text-[32px] md:text-[40px] leading-[1.08] max-w-[20ch] mx-auto">
            Built on honest math.
            <br />
            <span className="text-white/50">Not optimistic guesses.</span>
          </h2>
        </ScrollFadeIn>

        {/* Feature cards — static mode, staggered fade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {features.map((feature, i) => (
            <ScrollFadeIn
              key={feature.title}
              delay={i * 0.15}
              yOffset={16}
            >
              <LiquidCard level={2} interactive={true} className="p-5 sm:p-6 md:p-7 rounded-[28px]">
                <div className="relative z-10">
                  <div className="font-mono text-[10px] tracking-[0.2em] text-white/30 mb-4 font-semibold">
                    0{i + 1}
                  </div>
                  <h3 className="font-display text-[18px] sm:text-[20px] text-white font-medium mb-3 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-white/50 leading-relaxed mb-5">
                    {feature.caption}
                  </p>
                  <Link
                    href={feature.href}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-white/40 group-hover:text-white/70 transition-colors before:absolute before:inset-0"
                  >
                    Explore
                    <span className="text-[10px] transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </div>
              </LiquidCard>
            </ScrollFadeIn>
          ))}
        </div>

        {/* CTA link to full features page */}
        <div className="text-center">
          <Magnetic radius={6}>
            <Link
              href="/features"
              className="inline-flex items-center gap-2 text-[13px] text-white/50 hover:text-white/80 transition-colors font-mono"
            >
              See the full architecture
              <span className="text-[12px]">→</span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
