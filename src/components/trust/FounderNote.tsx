"use client";

import React from "react";
import { m } from "framer-motion";
import { EASE_REVEAL } from "@/lib/chartTheme";

interface FounderNoteProps {
  quote: string;
  name: string;
  role: string;
}

/**
 * The only first-person voice on the site.
 * Deliberately the plainest, smallest-visual-weight component —
 * adding visual weight here would compete with the founder's voice.
 * 
 * Never names the founder explicitly (by design, per CONCEPT_V3.2 §4.0).
 * One canonical copy source, used identically on /trust and homepage.
 */
export default function FounderNote({ quote, name, role }: FounderNoteProps) {
  return (
    <m.blockquote
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE_REVEAL }}
      className="rounded-3xl p-8 sm:p-10 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Quote */}
      <p className="font-serif text-[17px] sm:text-[19px] md:text-[21px] text-white/85 leading-relaxed italic mb-6 max-w-[48ch]">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Attribution */}
      <footer className="flex items-center gap-3">
        {/* Avatar placeholder — a simple monogram circle */}
        <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
          <span className="font-display text-[13px] text-white/50">
            {name
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </span>
        </div>
        <div>
          <div className="text-[13px] text-white/70 font-medium">{name}</div>
          <div className="text-[11px] text-white/40 font-mono">{role}</div>
        </div>
      </footer>
    </m.blockquote>
  );
}
