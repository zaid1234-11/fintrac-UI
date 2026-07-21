"use client";

import { Waves } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-shadow border-t border-white/5 safe-area-bottom">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 cursor-pointer">
              <Waves className="w-7 h-7 text-river-sky" strokeWidth={2.2} />
              <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-white tracking-tight">
                FinTrac
              </span>
            </Link>
            <p className="text-white/40 text-[13px] sm:text-sm leading-relaxed max-w-md">
              Money behaves like a living system. FinTrac routes budget
              adjustments where they create the least behavioral resistance,
              adapting over time instead of forcing change all at once.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#behavior"
                  className="text-white/40 text-sm hover:text-white/70 transition-colors cursor-pointer py-1.5 inline-block"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#river"
                  className="text-white/40 text-sm hover:text-white/70 transition-colors cursor-pointer py-1.5 inline-block"
                >
                  The River System
                </a>
              </li>
              <li>
                <a
                  href="#seasons"
                  className="text-white/40 text-sm hover:text-white/70 transition-colors cursor-pointer py-1.5 inline-block"
                >
                  Seasons
                </a>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-white/40 text-sm hover:text-white/70 transition-colors cursor-pointer py-1.5 inline-block"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Research */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
              Research
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#research"
                  className="text-white/40 text-sm hover:text-white/70 transition-colors cursor-pointer py-1.5 inline-block"
                >
                  Methodology
                </a>
              </li>
              <li>
                <span className="text-white/40 text-sm py-1.5 inline-block">
                  POMDP Paper
                  <span className="ml-1.5 text-xs text-amber/60">(Coming soon)</span>
                </span>
              </li>
              <li>
                <span className="text-white/40 text-sm py-1.5 inline-block">
                  Simulation Data
                  <span className="ml-1.5 text-xs text-amber/60">(Coming soon)</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} FinTrac AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-white/25 text-xs hover:text-white/50 transition-colors cursor-pointer py-1"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-white/25 text-xs hover:text-white/50 transition-colors cursor-pointer py-1"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
