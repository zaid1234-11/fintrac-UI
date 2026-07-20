"use client";

import dynamic from "next/dynamic";

const NoiseOverlay = dynamic(() => import("@/components/NoiseOverlay"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), { ssr: false });
const GlobalMouseTracker = dynamic(() => import("@/components/GlobalMouseTracker"), { ssr: false });

export default function ClientOverlays() {
  return (
    <>
      <GlobalMouseTracker />
      <NoiseOverlay />
      <ScrollProgress />
    </>
  );
}
