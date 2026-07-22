"use client";

import React, { HTMLAttributes, ReactNode, useRef, useEffect } from "react";
import { useLiquidCapability } from "@/hooks/useLiquidCapability";

export interface LiquidSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  level?: 1 | 2;
  interactive?: boolean;
  className?: string;
  as?: React.ElementType;
}

export function LiquidSurface({
  children,
  level = 1,
  className = "",
  as: Component = "div",
  ...rest
}: LiquidSurfaceProps) {
  const { tier } = useLiquidCapability();
  const surfaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let glassInstance: any = null;
    const el = surfaceRef.current;
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

  const blurStyle = tier > 0 ? "backdrop-blur-[16px] [webkit-backdrop-filter:blur(16px)]" : "";
  const bgStyle = level === 1 ? "bg-[var(--liquid-bg-level-1)]" : "bg-[var(--liquid-bg-level-2)]";
  const borderStyle = level === 1 ? "border-[var(--liquid-border-level-1)]" : "border-[var(--liquid-border-level-2)]";

  const hasRounded = className.includes("rounded-");
  const roundedStyle = hasRounded ? "" : "rounded-[28px]";

  return (
    <Component
      ref={surfaceRef}
      className={`relative border ${roundedStyle} ${bgStyle} ${borderStyle} ${blurStyle} transition-colors duration-200 overflow-hidden ${className}`}
      {...rest}
    >
      {/* Fresnel Specular Edge Lighting Layer (Tier 2+) */}
      {showFresnel && (
        <div
          className="aria-hidden:true pointer-events-none absolute inset-0 rounded-[inherit] z-0 opacity-60"
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
      <div className="relative z-10 w-full h-full">{children}</div>
    </Component>
  );
}

export default LiquidSurface;

