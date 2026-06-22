"use client";

import { ReactLenis } from 'lenis/react';
import React from 'react';

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={{ lerp: 0.15, smoothWheel: true, touchMultiplier: 2 }}>
      {children}
    </ReactLenis>
  );
}
