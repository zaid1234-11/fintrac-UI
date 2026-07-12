"use client";
import { useEffect } from "react";

export default function GlobalMouseTracker() {
  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const x = e.clientX / window.innerWidth;
          const y = e.clientY / window.innerHeight;
          document.documentElement.style.setProperty("--mouse-x", x.toString());
          document.documentElement.style.setProperty("--mouse-y", y.toString());
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Set initial values
    document.documentElement.style.setProperty("--mouse-x", "0.5");
    document.documentElement.style.setProperty("--mouse-y", "0.5");

    // Defer initialization to avoid blocking main thread on load
    const timer = setTimeout(() => {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
}
