import React, { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import LiquidCard from "./liquid/LiquidCard";

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
 * Reusable Editorial Card — migrated to Liquid Design System (Level 2 Material).
 * Uses LiquidCard for standard container material surface; backdrop blur is owned
 * strictly by the single parent LiquidSurface host.
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
      <m.article
        style={{ y, scale, opacity }}
        className={`
          relative isolate cursor-pointer
          col-span-12 ${isWide ? "md:col-span-6" : "md:col-span-4"}
          ${side === "left" ? "md:col-start-2 md:-translate-x-[4vw]" : (isWide ? "md:col-start-6" : "md:col-start-8 md:translate-x-[4vw]")}
          ${isWide ? "max-w-[620px]" : "max-w-[420px]"}
        `}
      >
        <LiquidCard
          level={2}
          interactive={true}
          className="rounded-[20px] md:rounded-[28px]"
        >
          {/* content */}
          <div className="relative z-10 flex flex-col p-5 sm:p-7 md:p-9 pb-20 md:pb-24 text-[#474842]">
            <header>
              <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#474842]/60 mb-2 sm:mb-3 font-semibold">
                0{index} / 06
              </div>
              <h3 className="font-display font-bold text-[#474842] text-[24px] sm:text-[28px] md:text-[36px] leading-[1.08] max-w-[15ch]">
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
        </LiquidCard>
      </m.article>
    </div>
  );
}

