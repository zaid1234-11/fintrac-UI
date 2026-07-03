"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import BorderGlow from "./BorderGlow";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Trust", href: "/trust" },
  { label: "About", href: "/about" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent background scrolling when mobile menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#11120f]"
        >
          {/* Header Controls */}
          <div className="relative z-10 flex items-center justify-between px-6 py-6">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="FinTrac" className="h-[40px] md:h-[63px] w-auto object-contain" draggable={false} />
            </div>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="w-10 h-10 flex items-center justify-center rounded-full text-white/80 hover:text-white transition-colors"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Grand Typography Navigation */}
          <div className="relative z-10 flex-1 flex flex-col items-start justify-center px-8 gap-8">
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ delay: i * 0.05 + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="font-display text-[10vw] sm:text-5xl tracking-tight text-white/90 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Prominent Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 px-6 pb-12 w-full flex justify-center"
          >
            <button className="w-full max-w-[420px] bg-white text-black py-4 rounded-[32px] font-medium tracking-wide transition-transform active:scale-[0.98]" onClick={onClose}>
              Join Waitlist
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
