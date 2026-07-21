"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "frosted" | "editorial";
  tiltIntensity?: number;
  glowColor?: string;
}

export default function GlassCard({
  children,
  className = "",
  variant = "dark",
  tiltIntensity = 5,
  glowColor = "rgba(255, 255, 255, 0.12)",
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 120, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 120, mass: 0.5 });

  const rotateY = useTransform(smoothMouseX, [0, 1], [-tiltIntensity, tiltIntensity]);
  const rotateX = useTransform(smoothMouseY, [0, 1], [tiltIntensity, -tiltIntensity]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    mouseX.set(x);
    mouseY.set(y);
    
    // Update local CSS variables for the specular highlight
    ref.current.style.setProperty("--mx", x.toString());
    ref.current.style.setProperty("--my", y.toString());
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    if (ref.current) {
      ref.current.style.setProperty("--mx", "0.5");
      ref.current.style.setProperty("--my", "0.5");
    }
  };

  const variantClass = 
    variant === "editorial" ? "liquid-glass-card" : 
    variant === "frosted" ? "glass-tile" : 
    "liquid-glass-card";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
        ["--mx" as string]: 0.5,
        ["--my" as string]: 0.5,
      }}
      className={`glass-depth-hover glass-shimmer glass-specular ${variantClass} ${className}`}
    >
      <div className="relative z-10 w-full h-full" style={{ transform: "translateZ(10px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
