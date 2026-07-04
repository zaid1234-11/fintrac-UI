"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface EditorialCardProps {
  title: string;
  side?: "left" | "right";
  align?: "up" | "down";
  index: number;
  testId?: string;
  imageSrc?: string;
  children?: React.ReactNode;
  onAction?: () => void;
  isWide?: boolean;
}

/**
 * Reusable Editorial Card — dark variant.
 * Title at top (white), image bleeds from BOTTOM with vertical mask gradient.
 * Small circular white icon button bottom-right.
 *
 * `side` = "left" | "right"  — which side of the branch the card sits on.
 * `align` = "up" | "down"   — vertical anchor offset for alternating layout.
 */
export default function EditorialCard({
  title,
  side = "left",
  align = "up",
  index,
  children,
  testId,
  imageSrc = "/card-bg.png",
  onAction,
  isWide = false
}: EditorialCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.6 0.6"],
  });

  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], ["15vh", "0vh"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      data-testid={testId}
      className={`relative grid grid-cols-12 gap-4 md:gap-8 w-full ${align === "up" ? "mt-[-2vh]" : "mt-[20vh]"
        }`}
    >
      <motion.article
        style={{ y, scale, opacity }}
        className={`
          relative rounded-[28px] isolate cursor-pointer overflow-hidden
          shadow-[0px_0px_0px_0px_rgba(255,255,255,0.3)]
          col-span-12 ${isWide ? "md:col-span-6" : "md:col-span-4"}
          ${side === "left" ? "md:col-start-2 md:-translate-x-[4vw]" : (isWide ? "md:col-start-6" : "md:col-start-8 md:translate-x-[4vw]")}
          ${isWide ? "max-w-[620px]" : "max-w-[420px]"}
        `}
      >
        {/* Tint and inner shadow layer */}
        <div className="absolute inset-0 z-0 rounded-[28px] shadow-[inset_0_0_16px_4px_rgba(255,255,255,0.7)] bg-[#F8F8F4]/70 md:bg-transparent pointer-events-none" />

        {/* Backdrop blur and distortion layer */}
        <div
          className="absolute inset-0 z-[-1] rounded-[28px] pointer-events-none isolate"
          style={{
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            filter: "url(#glass-distortion)",
            WebkitFilter: "url(#glass-distortion)"
          }}
        />

        {/* content */}
        <div className="relative z-10 flex flex-col p-7 md:p-9 pb-24 md:pb-24 text-[#474842]">
          <header>
            <div className="font-mono text-[11px] tracking-[0.25em] text-[#474842]/60 mb-3 font-semibold">
              0{index} / 06
            </div>
            <h3 className="font-display font-bold text-[#474842] text-[28px] md:text-[36px] leading-[1.08] max-w-[15ch]">
              {title}
            </h3>
          </header>

          {children && (
            <div className="relative z-10 mt-6 font-medium">{children}</div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={onAction}
          data-testid={`${testId}-action`}
          aria-label={`Open ${title}`}
          className="absolute bottom-5 right-5 z-20 w-11 h-11 rounded-full bg-[#474842] text-white flex items-center justify-center hover:scale-[1.04] transition-transform duration-200 cursor-pointer shadow-lg"
        >
          <ArrowUpRight size={18} strokeWidth={1.8} />
        </button>
      </motion.article>
    </div>
  );
}
