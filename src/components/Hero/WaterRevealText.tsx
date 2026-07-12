import React from "react";

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
  // Computed once on the server
  const words = text.split(" ");

  return (
    <div className={`overflow-hidden ${className}`}>
      <Tag className="inline">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
            <span
              className="water-word animate-now"
              style={{ animationDelay: `${delay + i * 0.08}s` }}
            >
              {word}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
