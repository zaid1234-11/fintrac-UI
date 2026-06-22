import EditorialCard from "@/components/EditorialCard";

const seasons = [
  { name: "Growth", score: 92, color: "var(--color-season-growth)" },
  { name: "Harvest", score: 85, color: "var(--color-season-harvest)" },
  { name: "Recovery", score: 78, color: "var(--color-season-recovery)" },
  { name: "Dormancy", score: 64, color: "var(--color-season-dormancy)" },
  { name: "Drought", score: 42, color: "var(--color-season-drought)" },
];

export default function SeasonsCard() {
  return (
    <EditorialCard
      headline="Financial Seasons"
      imageSrc="/card-bg.png"
    >
      <div className="mt-4 mb-16 max-w-[280px]">
        <p className="text-white/70 text-sm leading-relaxed mb-8">
          A living taxonomy of your financial climate. Every season requires a different survival strategy.
        </p>

        <ul className="space-y-4">
          {seasons.map((s) => (
            <li key={s.name} className="flex items-center gap-4">
              <div 
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.2)]" 
                style={{ backgroundColor: s.color }} 
              />
              <div className="flex-1 flex justify-between items-baseline border-b border-white/5 pb-1">
                <span className="text-white/90 text-sm font-medium tracking-wide">{s.name}</span>
                <span className="text-white/40 font-mono text-xs">Score: {s.score}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </EditorialCard>
  );
}
