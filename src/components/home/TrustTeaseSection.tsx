"use client";

import React from "react";
import { motion } from "framer-motion";
import FounderNote from "@/components/trust/FounderNote";
import { EASE_REVEAL } from "@/lib/chartTheme";
import Link from "next/link";

// ──────────────────────────────────────────────
// Canonical excerpt — same on /trust and homepage.
// One source of truth, not independently authored.
// ──────────────────────────────────────────────

const FOUNDER_QUOTE =
  "I built FinTrac because every budgeting tool I tried assumed willpower was infinite and spending was rational. Neither is true. This system was designed around how people actually behave with money — not how we wish they would.";

const FOUNDER_NAME = "The Founder";
const FOUNDER_ROLE = "FinTrac AI";

interface TrustTeaseSectionProps {
  quote?: string;
  name?: string;
  role?: string;
}

/**
 * Homepage Section 5 — Trust Tease.
 * Single FounderNote excerpt linking to /trust.
 * Intentionally the smaller of the two trust moments
 * (the full /trust page runs three movements).
 */
export default function TrustTeaseSection({
  quote = FOUNDER_QUOTE,
  name = FOUNDER_NAME,
  role = FOUNDER_ROLE,
}: TrustTeaseSectionProps) {
  return (
    <section
      data-testid="trust-tease"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-8"
    >
      <div className="max-w-[680px] mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_REVEAL }}
          className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-6 text-center"
        >
          TRUST ARCHITECTURE
        </motion.div>

        {/* The note itself */}
        <FounderNote quote={quote} name={name} role={role} />

        {/* Link to full trust page */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE_REVEAL }}
          className="mt-6 text-center"
        >
          <Link
            href="/trust"
            className="inline-flex items-center gap-1 text-[12px] font-mono text-white/35 hover:text-white/60 transition-colors"
          >
            Read how we handle your data
            <span className="text-[11px]">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
