import React, { useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import LiquidSurface from "./liquid/LiquidSurface";

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
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] p-4 flex flex-col justify-between"
        >
          <LiquidSurface level={1} className="w-full h-full rounded-[32px] flex flex-col justify-between p-6 bg-[#11120f]/90">
            {/* Header Controls */}
            <div className="relative z-10 flex items-center justify-between safe-area-top">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="FinTrac" className="h-[36px] sm:h-[40px] md:h-[63px] w-auto object-contain" draggable={false} />
              </div>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="w-11 h-11 flex items-center justify-center rounded-full text-white/80 hover:text-white bg-white/5 border border-white/10 active:scale-95 transition-transform"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Grand Typography Navigation */}
            <div className="relative z-10 flex-1 flex flex-col items-start justify-center px-4 gap-5 sm:gap-7">
              {NAV_ITEMS.map((item, i) => (
                <m.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="font-display text-[28px] sm:text-[36px] md:text-5xl tracking-tight text-white/90 hover:text-white transition-colors py-1 block"
                  >
                    {item.label}
                  </Link>
                </m.div>
              ))}
            </div>

            {/* Prominent Footer CTA */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 safe-area-bottom w-full flex justify-center"
            >
              <Link href="/sign-up" className="w-full max-w-[420px] bg-white text-black min-h-[52px] py-3.5 rounded-[32px] font-medium tracking-wide transition-transform active:scale-[0.98] flex items-center justify-center text-[15px]" onClick={onClose}>
                Join Waitlist
              </Link>
            </m.div>
          </LiquidSurface>
        </m.div>
      )}
    </AnimatePresence>
  );
}

