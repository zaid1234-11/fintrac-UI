"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function RevealText({ text, className = "", delay = 0, as: Component = "span" }: { text: string, className?: string, delay?: number, as?: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      }
    }
  };

  const child: any = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 24,
        stiffness: 120,
        mass: 0.8
      }
    }
  };

  const MotionComponent = motion.create(Component as any);

  return (
    <MotionComponent
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden pb-1 -mb-1 mr-[0.25em]">
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </MotionComponent>
  );
}
