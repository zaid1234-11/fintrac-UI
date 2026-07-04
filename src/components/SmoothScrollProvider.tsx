"use client";

import { ReactLenis } from 'lenis/react';
import React, { useEffect, useState } from 'react';

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (isReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ 
      lerp: 0.075, 
      duration: 1.2,
      smoothWheel: true, 
      syncTouch: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1 
    }}>
      {children}
    </ReactLenis>
  );
}
