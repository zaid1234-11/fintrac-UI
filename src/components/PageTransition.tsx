"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "./Loader";
import { AnimatePresence, motion } from "framer-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Trigger the loader
    setIsLoading(true);
    
    // Enforce minimum loader duration of 1.5s for butter-smooth effect
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div
        key={pathname + (isLoading ? "-loading" : "-ready")}
        style={{ opacity: isLoading ? 0 : 1 }}
        className="w-full h-full transition-opacity duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        {children}
      </div>
    </>
  );
}
