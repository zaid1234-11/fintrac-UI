"use client";

import React, { HTMLAttributes, ReactNode, useRef, useEffect } from "react";
import { useLiquidCapability } from "@/hooks/useLiquidCapability";

export interface LiquidCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  level?: 2 | 3 | 4;
  interactive?: boolean;
  className?: string;
  as?: React.ElementType;
}

export function LiquidCard({
  children,
  level = 2,
  interactive = false,
  className = "",
  as: Component = "div",
  ...rest
}: LiquidCardProps) {
  const { tier } = useLiquidCapability();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let glassInstance: any = null;
    const el = cardRef.current;
    if (!el) return;

    const initGlass = () => {
      if (typeof window !== "undefined" && (window as any).liquidGlass) {
        try {
          glassInstance = (window as any).liquidGlass(el, {
            scale: -112,
            chroma: 6,
            mapBlur: 14,
          });
        } catch (e) {
          console.warn("liquidGlass init failed:", e);
        }
      }
    };

    initGlass();
    const timer = setTimeout(initGlass, 300);

    return () => {
      clearTimeout(timer);
      if (glassInstance && typeof glassInstance.destroy === "function") {
        try {
          glassInstance.destroy();
        } catch (_) {}
      }
    };
  }, []);

  const showGrain = tier >= 3;
  const showFresnel = tier >= 2;

  // Frosted backdrop blur application for liquid glass cards
  const blurStyle = tier > 0 ? "backdrop-blur-[16px] [webkit-backdrop-filter:blur(16px)]" : "";

  const bgStyles = {
    2: "bg-[var(--liquid-bg-level-2)]",
    3: "bg-[var(--liquid-bg-level-3)]",
    4: "bg-[var(--liquid-bg-level-4)]",
  };

  const borderStyles = {
    2: "border-[var(--liquid-border-level-2)]",
    3: "border-[var(--liquid-border-level-3)]",
    4: "border-[var(--liquid-border-level-4)]",
  };

  const shadowStyles = {
    2: "shadow-[var(--liquid-shadow-card)]",
    3: "shadow-[var(--liquid-shadow-card)] shadow-[var(--liquid-shadow-glow)]",
    4: "shadow-2xl shadow-[var(--liquid-shadow-glow)]",
  };

  const hoverStyle = interactive
    ? "transition-all duration-300 hover:scale-[1.01] hover:border-white/40 cursor-pointer"
    : "";

  return (
    <Component
      ref={cardRef}
      className={`relative rounded-[28px] border ${bgStyles[level]} ${borderStyles[level]} ${blurStyle} ${shadowStyles[level]} ${hoverStyle} overflow-hidden ${className}`}
      {...rest}
    >
      {/* Fresnel Specular Edge Lighting Layer (Tier 2+) */}
      {showFresnel && (
        <div
          className="aria-hidden:true pointer-events-none absolute inset-0 rounded-[inherit] z-0 opacity-70"
          style={{ background: "var(--liquid-fresnel-light)" }}
        />
      )}

      {/* Pre-baked Static PNG Noise Grain Texture Overlay (Tier 3+) */}
      {showGrain && (
        <div
          className="aria-hidden:true pointer-events-none absolute inset-0 rounded-[inherit] z-0 opacity-40 mix-blend-overlay"
          style={{ backgroundImage: "var(--liquid-grain-texture)" }}
        />
      )}

      {/* Content Surface */}
      <div className="relative z-10">{children}</div>
    </Component>
  );
}

export default LiquidCard;
