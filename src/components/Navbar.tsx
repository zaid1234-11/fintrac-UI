"use client";

import React from "react";
import { Menu } from "lucide-react";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import BorderGlow from "./BorderGlow";

const NAV_ITEMS = ["Home", "Features", "Contact"];

export default function Navbar({ variant = "fixed", rightOpacity = 1 }: { variant?: "fixed" | "static", rightOpacity?: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("Home");

  useEffect(() => {
    if (pathname === "/features") {
      setActiveItem("Features");
    } else if (pathname === "/") {
      setActiveItem("Home");
    }
  }, [pathname]);

  return (
    <nav
      data-testid="fintrac-nav"
      className={`${variant === "fixed" ? "fixed pointer-events-none" : "relative"
        } top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-6`}
    >
      {/* leaf/bulb logo */}
      <div className="pointer-events-auto flex items-center gap-3">
        <div className="flex items-center justify-center">
          <img src="/logo.png" alt="FinTrac" className="h-[63px] w-auto object-contain" draggable={false} />
        </div>
      </div>

      {/* capsule nav */}
      <div
        data-testid="capsule-nav"
        className="pointer-events-auto hidden md:flex absolute left-1/2 -translate-x-1/2 group"
      >
        <BorderGlow
          borderRadius={32}
          backgroundColor="rgba(0, 0, 0, 0.1)"
          glowColor="40 80 80"
          glowRadius={20}
          glowIntensity={0.8}
          coneSpread={20}
          animated={true}
          className="border-white/[0.08] backdrop-blur-md px-6 py-1.5"
        >
          <div className="flex flex-row items-center gap-3">
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item;
              return (
                <button
                  key={item}
                  data-testid={`nav-${item.toLowerCase()}`}
                  onClick={() => {
                    if (item === "Home") {
                      if (pathname === "/") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        router.push("/");
                      }
                    } else if (item === "Features") {
                      if (pathname === "/features") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        router.push("/features");
                      }
                    } else {
                      setActiveItem(item);
                    }
                  }}
                  className={`relative px-5 py-1.5 font-display text-[12px] tracking-wide rounded-[32px] transition-colors duration-200 ${isActive ? "text-white font-medium" : "text-white/40 hover:text-white/85"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-[32px] bg-white/[0.08] z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item}</span>
                </button>
              );
            })}
          </div>
        </BorderGlow>
      </div>

      {/* right side login + menu */}
      <div 
        className="pointer-events-auto flex items-center gap-4 transition-opacity duration-300"
        style={{ opacity: rightOpacity, pointerEvents: rightOpacity > 0.5 ? "auto" : "none" }}
      >
        <button data-testid="nav-login" className="group transition-transform hover:scale-105 active:scale-95">
          <BorderGlow
            borderRadius={32}
            backgroundColor="rgba(255, 255, 255, 0.02)"
            glowColor="40 80 80"
            glowRadius={20}
            glowIntensity={0.8}
            coneSpread={20}
            animated={true}
            className="px-6 py-2 border-white/20 flex items-center justify-center"
          >
            <span className="text-[12px] tracking-wide text-white">Login</span>
          </BorderGlow>
        </button>
        <button
          data-testid="nav-menu"
          aria-label="Menu"
          className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="1">
            <path d="M4 10h16M4 14h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
