"use client";

import React from "react";
import { motion } from "framer-motion";
import { EASE_REVEAL, STAGGER_DELAY } from "@/lib/chartTheme";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";

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
      className="relative w-full py-20 sm:py-28 px-6 sm:px-8"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE_REVEAL }}
          className="mb-10 sm:mb-14 text-center"
        >
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-3">
            THE ARCHITECTURE
          </div>
          <h2 className="font-display font-light text-white text-[24px] sm:text-[32px] md:text-[40px] leading-[1.08] max-w-[20ch] mx-auto">
            Built on honest math.
            <br />
            <span className="text-white/50">Not optimistic guesses.</span>
          </h2>
        </motion.div>

        {/* Feature cards — static mode, staggered fade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {features.map((feature, i) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: i * STAGGER_DELAY,
                ease: EASE_REVEAL,
              }}
              className="group rounded-3xl p-6 sm:p-7 relative overflow-hidden cursor-pointer transition-all duration-300 hover:translate-y-[-2px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

              <div className="relative z-10">
                <h3 className="font-display text-[18px] sm:text-[20px] text-white font-medium mb-3 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-white/50 leading-relaxed mb-5">
                  {feature.caption}
                </p>
                <Link
                  href={feature.href}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-white/40 group-hover:text-white/70 transition-colors"
                >
                  Explore
                  <span className="text-[10px] transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </motion.article>
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
