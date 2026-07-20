"use client";

import React, { useRef, Suspense } from "react";
import { useInView } from "framer-motion";

export default function IntersectionLazyLoad({
  children,
  fallback,
  minHeight = "300px",
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minHeight?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <div ref={ref} style={{ minHeight }} className="w-full h-full relative">
      {isInView ? (
        <Suspense fallback={fallback || null}>{children}</Suspense>
      ) : (
        fallback || null
      )}
    </div>
  );
}
