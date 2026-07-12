"use client";
import { m, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

export default function Magnetic({ children, radius = 8, className = "" }: { children: React.ReactNode, radius?: number, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Max movement is `radius` pixels at the edge of the element
    const moveX = (middleX / (width / 2)) * radius;
    const moveY = (middleY / (height / 2)) * radius;
    
    x.set(moveX);
    y.set(moveY);
  };

  const reset = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={`inline-block origin-center ${className}`}
    >
      {children}
    </m.div>
  );
}
