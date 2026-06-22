"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxLayer {
  id: string;
  label: string;
  zIndex: number;
  speed: number;          // parallax scroll speed multiplier
  mouseSpeed: number;     // mouse depth movement multiplier
  gradient: string;       // CSS gradient for placeholder
}

const layers: ParallaxLayer[] = [
  {
    id: "sky",
    label: "Sky",
    zIndex: 1,
    speed: 0.1,
    mouseSpeed: 2,
    gradient: "linear-gradient(180deg, #1a3a5c 0%, #2A6FA1 30%, #7FB8E6 60%, #D4A15A 85%, #F4C67A 100%)",
  },
  {
    id: "clouds",
    label: "Clouds",
    zIndex: 2,
    speed: 0.15,
    mouseSpeed: 3,
    gradient: "none",
  },
  {
    id: "mountains",
    label: "Mountains",
    zIndex: 3,
    speed: 0.25,
    mouseSpeed: 5,
    gradient: "none",
  },
  {
    id: "forest-back",
    label: "Forest Back",
    zIndex: 4,
    speed: 0.35,
    mouseSpeed: 8,
    gradient: "none",
  },
  {
    id: "river",
    label: "River",
    zIndex: 5,
    speed: 0.45,
    mouseSpeed: 10,
    gradient: "none",
  },
  {
    id: "trees-front",
    label: "Trees Front",
    zIndex: 6,
    speed: 0.55,
    mouseSpeed: 14,
    gradient: "none",
  },
  {
    id: "fog",
    label: "Fog",
    zIndex: 7,
    speed: 0.2,
    mouseSpeed: 4,
    gradient: "none",
  },
];

export default function ParallaxScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    const checkMotion = () =>
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );

    checkMobile();
    checkMotion();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, prefersReducedMotion]);

  const scaleValue = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {layers.map((layer) => {
        const scrollY = useTransform(
          scrollYProgress,
          [0, 1],
          ["0%", `${layer.speed * -50}%`]
        );

        const mouseX =
          isMobile || prefersReducedMotion ? 0 : mousePos.x * layer.mouseSpeed;
        const mouseY =
          isMobile || prefersReducedMotion ? 0 : mousePos.y * layer.mouseSpeed;

        return (
          <motion.div
            key={layer.id}
            className="absolute inset-0 will-change-transform gpu-accelerated"
            style={{
              zIndex: layer.zIndex,
              y: scrollY,
              scale: layer.id === "sky" ? scaleValue : 1,
              x: mouseX,
              ...(layer.id !== "sky" ? { translateY: mouseY * 0.3 } : {}),
            }}
            transition={{
              x: { type: "spring", stiffness: 50, damping: 30 },
              translateY: { type: "spring", stiffness: 50, damping: 30 },
            }}
          >
            {layer.id === "sky" ? (
              /* Sky gradient placeholder */
              <div
                className="w-full h-full"
                style={{ background: layer.gradient }}
              />
            ) : layer.id === "clouds" ? (
              /* Cloud shapes using CSS */
              <div className="w-full h-full relative">
                <div
                  className="absolute top-[12%] left-[10%] w-[35%] h-[18%] rounded-full opacity-40"
                  style={{
                    background:
                      "radial-gradient(ellipse, rgba(255,255,255,0.8) 0%, transparent 70%)",
                    animation: "fog-drift 30s ease-in-out infinite",
                  }}
                />
                <div
                  className="absolute top-[8%] right-[15%] w-[25%] h-[14%] rounded-full opacity-30"
                  style={{
                    background:
                      "radial-gradient(ellipse, rgba(255,255,255,0.7) 0%, transparent 70%)",
                    animation: "fog-drift-slow 35s ease-in-out infinite",
                  }}
                />
                <div
                  className="absolute top-[18%] left-[45%] w-[20%] h-[10%] rounded-full opacity-25"
                  style={{
                    background:
                      "radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 70%)",
                    animation: "fog-drift 40s ease-in-out infinite reverse",
                  }}
                />
              </div>
            ) : layer.id === "mountains" ? (
              <div className="w-full h-full relative">
                <svg
                  viewBox="0 0 1920 1080"
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    <linearGradient id="mountainGrad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3d5a6e" />
                      <stop offset="100%" stopColor="#2A6FA1" />
                    </linearGradient>
                    <linearGradient id="mountainGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4a6d82" />
                      <stop offset="100%" stopColor="#2F5A3E" />
                    </linearGradient>
                  </defs>
                  {/* Far mountains */}
                  <path
                    d="M0 600 L200 380 L400 480 L600 320 L800 420 L1000 350 L1200 400 L1400 300 L1600 380 L1920 450 L1920 1080 L0 1080 Z"
                    fill="url(#mountainGrad1)"
                    opacity="0.7"
                  />
                  {/* Near mountains */}
                  <path
                    d="M0 650 L150 520 L350 580 L500 450 L700 550 L900 480 L1100 520 L1300 430 L1500 500 L1700 450 L1920 530 L1920 1080 L0 1080 Z"
                    fill="url(#mountainGrad2)"
                    opacity="0.85"
                  />
                </svg>
              </div>
            ) : layer.id === "forest-back" ? (
              <div className="w-full h-full relative">
                <svg
                  viewBox="0 0 1920 1080"
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    <linearGradient id="forestGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2F5A3E" />
                      <stop offset="100%" stopColor="#1a3a28" />
                    </linearGradient>
                  </defs>
                  {/* Forest tree line */}
                  <path
                    d="M0 700 Q60 640 120 700 Q180 620 240 700 Q300 650 360 700 Q420 610 480 700 Q540 640 600 700 Q660 620 720 700 Q780 650 840 700 Q900 610 960 700 Q1020 640 1080 700 Q1140 620 1200 700 Q1260 650 1320 700 Q1380 610 1440 700 Q1500 640 1560 700 Q1620 620 1680 700 Q1740 650 1800 700 Q1860 630 1920 700 L1920 1080 L0 1080 Z"
                    fill="url(#forestGrad)"
                  />
                </svg>
              </div>
            ) : layer.id === "river" ? (
              <div className="w-full h-full relative">
                <svg
                  viewBox="0 0 1920 1080"
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    <linearGradient id="riverGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#2A6FA1" />
                      <stop offset="50%" stopColor="#7FB8E6" />
                      <stop offset="100%" stopColor="#2A6FA1" />
                    </linearGradient>
                  </defs>
                  {/* River band */}
                  <path
                    d="M0 820 Q200 790 400 810 Q600 830 800 800 Q1000 780 1200 810 Q1400 830 1600 800 Q1800 785 1920 810 L1920 870 Q1800 850 1600 870 Q1400 890 1200 860 Q1000 840 800 870 Q600 890 400 860 Q200 850 0 880 Z"
                    fill="url(#riverGrad)"
                    opacity="0.8"
                  />
                  {/* Water shimmer */}
                  <path
                    d="M0 835 Q300 815 600 835 Q900 850 1200 830 Q1500 815 1920 840 L1920 855 Q1500 835 1200 855 Q900 870 600 850 Q300 840 0 855 Z"
                    fill="rgba(127,184,230,0.4)"
                    style={{ animation: "water-shimmer 4s ease-in-out infinite" }}
                  />
                </svg>
              </div>
            ) : layer.id === "trees-front" ? (
              <div className="w-full h-full relative">
                <svg
                  viewBox="0 0 1920 1080"
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    <linearGradient id="treeFrontGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1a3a28" />
                      <stop offset="100%" stopColor="#10202A" />
                    </linearGradient>
                  </defs>
                  {/* Foreground trees - left cluster */}
                  <path
                    d="M-50 1080 L-50 600 Q0 540 50 600 Q80 520 120 600 Q160 560 200 620 L200 1080 Z"
                    fill="url(#treeFrontGrad)"
                  />
                  {/* Foreground trees - right cluster */}
                  <path
                    d="M1720 1080 L1720 580 Q1760 510 1800 580 Q1840 530 1880 590 Q1920 540 1970 610 L1970 1080 Z"
                    fill="url(#treeFrontGrad)"
                  />
                </svg>
              </div>
            ) : layer.id === "fog" ? (
              <div className="w-full h-full relative">
                <div
                  className="absolute bottom-[15%] left-[-5%] right-[-5%] h-[25%] opacity-50"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(244,247,249,0.6) 0%, transparent 100%)",
                    animation: "fog-drift-slow 18s ease-in-out infinite",
                  }}
                />
              </div>
            ) : null}
          </motion.div>
        );
      })}
    </div>
  );
}
