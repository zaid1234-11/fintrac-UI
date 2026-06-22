"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface WaterRevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function WaterRevealText({
  text,
  className = "",
  delay = 0,
  as: Tag = "h1",
}: WaterRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const words = text.split(" ");

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <Tag className="inline">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
            <motion.span
              className="inline-block"
              initial={{
                y: "110%",
                rotateX: 40,
                opacity: 0,
                filter: "blur(4px)",
              }}
              animate={
                isInView
                  ? {
                      y: "0%",
                      rotateX: 0,
                      opacity: 1,
                      filter: "blur(0px)",
                    }
                  : {}
              }
              transition={{
                duration: 1,
                delay: delay + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: "bottom center" }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
