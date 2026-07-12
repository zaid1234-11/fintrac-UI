"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "./Loader";
import { AnimatePresence, m } from "framer-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }

    // Trigger the loader
    setIsLoading(true);
    
    // Enforce minimum loader duration of 1.5s for butter-smooth effect
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [pathname, isInitialMount]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <m.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
          >
            <Loader />
          </m.div>
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
