"use client";

import { useState, useEffect } from "react";

export type CapabilityTier = 3 | 2 | 1 | 0;

export interface LiquidCapabilityState {
  tier: CapabilityTier;
  isLowEnd: boolean;
  reducedMotion: boolean;
}

/**
 * Custom hook to detect client hardware capabilities and user preferences
 * to scale CSS Liquid Glass rendering features dynamically.
 * 
 * - Tier 3 (High): Full features (Single Blur Host + Static Grain Texture + Fresnel Highlights + Ambient Glows)
 * - Tier 2 (Medium): Single Blur Host + Fresnel Highlights + Borders (omits heavy noise tile overlay)
 * - Tier 1 (Low / Battery Saver): Single Blur Host + Solid Material Tints + Borders (omits noise tile & ambient glows)
 * - Tier 0 (Reduced Motion): Static / No keyframe animations
 */
export function useLiquidCapability(): LiquidCapabilityState {
  const [capability, setCapability] = useState<LiquidCapabilityState>({
    tier: 2, // Default safe fallback during SSR/hydration
    isLowEnd: false,
    reducedMotion: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = mediaQuery.matches;

    // Hardware signals
    const concurrency = navigator.hardwareConcurrency || 4;
    // @ts-ignore - deviceMemory is available in Chrome/Edge
    const memory = navigator.deviceMemory || 4;

    let tier: CapabilityTier = 2;

    if (reducedMotion) {
      tier = 0;
    } else if (concurrency >= 8 && memory >= 8) {
      tier = 3;
    } else if (concurrency >= 4 && memory >= 4) {
      tier = 2;
    } else {
      tier = 1;
    }

    setCapability({
      tier,
      isLowEnd: tier === 1,
      reducedMotion,
    });

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setCapability((prev) => ({
        ...prev,
        reducedMotion: e.matches,
        tier: e.matches ? 0 : prev.tier === 0 ? 2 : prev.tier,
      }));
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange);
      return () => mediaQuery.removeEventListener("change", handleMotionChange);
    }
  }, []);

  return capability;
}
