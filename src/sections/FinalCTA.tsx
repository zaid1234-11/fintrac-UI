"use client";

import React from "react";
import { m } from "framer-motion";
import { EASE_REVEAL } from "@/lib/chartTheme";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";

interface FinalCTAProps {
  headline?: string;
  subline?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function FinalCTA({
  headline = "Growth takes time.",
  subline = "Let your budget adapt with you.",
  ctaLabel = "Join Early Access",
  ctaHref = "/contact",
}: FinalCTAProps) {
  return (
    <section
      data-testid="final-cta"
      className="relative w-full min-h-[40vh] md:min-h-[60vh] flex items-center justify-center py-24 sm:py-32 px-6 sm:px-8 md:px-14"
    >
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease: EASE_REVEAL }}
        className="max-w-[800px] mx-auto text-center"
      >
        <h2 className="font-display font-light text-white text-[32px] sm:text-[40px] md:text-[56px] lg:text-[64px] leading-[1.05] tracking-tight mb-4">
          {headline}
          <br />
          <span className="text-white/50">{subline}</span>
        </h2>

        <div className="flex flex-col items-center gap-5 mt-10 sm:mt-12">
          <div className="w-full max-w-[420px]">
            <Magnetic radius={8}>
              <Link href={ctaHref} className="block w-full">
                <button
                  data-testid="final-cta-button"
                  className="iridescent text-[14px] sm:text-[15px] px-8 sm:px-10 py-4 w-full min-h-[56px] rounded-2xl"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {ctaLabel}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                  <span className="drop-shadow" />
                </button>
              </Link>
            </Magnetic>
          </div>

          {/* Low-pressure reassurance — real progress, not fake social proof */}
          <p className="text-[12px] text-white/30 font-mono max-w-[36ch] leading-relaxed">
            No credit card required. Your data stays on your device.
            Trust architecture built in from day one.
          </p>

          <Link
            href="/features"
            className="text-[12px] text-white/35 hover:text-white/60 transition-colors flex items-center gap-1 font-mono"
          >
            See all features <span>→</span>
          </Link>
        </div>
      </m.div>
    </section>
  );
}
