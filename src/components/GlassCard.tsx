import LiquidCard from "./liquid/LiquidCard";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "frosted" | "editorial";
  tiltIntensity?: number;
  glowColor?: string;
}

export default function GlassCard({
  children,
  className = "",
  variant = "dark",
}: GlassCardProps) {
  const level = variant === "editorial" ? 3 : variant === "frosted" ? 2 : 2;

  return (
    <LiquidCard
      level={level}
      interactive={true}
      className={className}
    >
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </LiquidCard>
  );
}

