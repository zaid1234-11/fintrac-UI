"use client";

import React, { useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let rafId: number;
    let targetTime = 0;
    
    const updateTargetTime = (x: number) => {
      const video = videoRef.current;
      // Ensure video duration is a valid number before doing math
      if (!video || Number.isNaN(video.duration) || video.duration === 0) return;
      const width = window.innerWidth;
      // Left edge (0) = start of video. Right edge (width) = end of video.
      const progress = Math.max(0, Math.min(1, x / width));
      targetTime = progress * video.duration;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateTargetTime(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateTargetTime(e.touches[0].clientX);
      }
    };

    const loop = () => {
      const video = videoRef.current;
      if (video && !Number.isNaN(video.duration) && video.duration > 0) {
        // Smoothly interpolate current time towards target time
        const diff = targetTime - video.currentTime;
        // Butter-smooth lerp (8% per frame) with near-zero cutoff prevents micro-stutters
        if (Math.abs(diff) > 0.005) {
          video.currentTime += diff * 0.08; 
        }
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-[#111] text-[#1a1a1a] font-sans relative overflow-hidden">
      <Navbar variant="fixed" rightOpacity={1} />

      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          ref={videoRef}
          src="/cp-vid-smooth-fast.mp4"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
      </div>


    </div>
  );
}
