"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";

export default function FogLayer() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const fogOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.3, 0]);
  const fogY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {/* Primary fog layer - slow drift */}
      <m.div
        style={{ opacity: fogOpacity, y: fogY }}
        className="absolute inset-0 gpu-accelerated"
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-[60%]"
          style={{
            background:
              "linear-gradient(to top, rgba(244,247,249,0.9) 0%, rgba(244,247,249,0.5) 40%, transparent 100%)",
            animation: "fog-drift 20s ease-in-out infinite",
          }}
        />
      </m.div>

      {/* Secondary fog layer - opposite drift */}
      <m.div
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.4, 0.8], [0.5, 0.2, 0]),
          y: useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]),
        }}
        className="absolute inset-0 gpu-accelerated"
      >
        <div
          className="absolute bottom-0 left-[-10%] right-[-10%] h-[50%]"
          style={{
            background:
              "radial-gradient(ellipse at 30% 100%, rgba(127,184,230,0.3) 0%, transparent 70%)",
            animation: "fog-drift-slow 25s ease-in-out infinite",
          }}
        />
      </m.div>

      {/* Soft top vignette */}
      <m.div
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.3], [0.4, 0]),
        }}
        className="absolute top-0 left-0 right-0 h-[30%]"
        aria-hidden="true"
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(to bottom, rgba(16,32,42,0.3) 0%, transparent 100%)",
          }}
        />
      </m.div>
    </div>
  );
}
