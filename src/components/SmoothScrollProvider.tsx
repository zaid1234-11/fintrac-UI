"use client";

import { ReactLenis } from 'lenis/react';
import React, { useEffect, useState } from 'react';

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    
    // Defer Lenis initialization to avoid blocking the main thread during hydration
    const timer = setTimeout(() => setIsReady(true), 100);
    
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      clearTimeout(timer);
    };
  }, []);

  if (isReducedMotion || !isReady) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ 
      lerp: 0.1, 
      duration: 1.2,
      smoothWheel: true, 
      syncTouch: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2 
    }}>
      {children}
    </ReactLenis>
  );
}
