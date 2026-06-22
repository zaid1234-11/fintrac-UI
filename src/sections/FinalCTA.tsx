"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section
      data-testid="final-cta"
      className="relative w-full py-40 px-8 md:px-14"
      style={{ background: "#1f201b" }}
    >
      <div className="max-w-[1400px] mx-auto text-center">
        <h2 className="font-display font-light text-white text-[40px] md:text-[64px] leading-[1.05] tracking-tight">
          Growth takes time.<br />
          <span className="text-white/55">Let your budget adapt with you.</span>
        </h2>
        <div className="flex flex-col items-center gap-6 mt-12">
          <button
            data-testid="final-cta-button"
            className="group transition-transform hover:scale-105 active:scale-95"
          >
            <BorderGlow
              borderRadius={32}
              backgroundColor="rgba(255, 255, 255, 0.02)"
              glowColor="40 80 80"
              glowRadius={20}
              glowIntensity={0.8}
              coneSpread={20}
              animated={true}
              className="px-8 py-3 border border-white/20 flex items-center justify-center iridescent"
            >
              <span className="flex items-center text-white font-medium text-[15px]">
                Join Early Access
                <ArrowUpRight size={18} strokeWidth={2} className="ml-2" />
              </span>
            </BorderGlow>
          </button>
          
          <Link 
            href="/features" 
            className="text-[13px] text-white/40 hover:text-white/70 transition-colors flex items-center gap-1"
          >
            See all features <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
