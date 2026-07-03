import EditorialCard from "@/components/EditorialCard";
import { CheckCircle2, CircleDashed } from "lucide-react";

export default function HonestMathCard() {
  return (
    <EditorialCard
      title="Built on Honest Math"
      index={2}
      imageSrc="/card-bg.png"
    >
      <div className="mt-4 mb-16 flex flex-col gap-6 w-full">
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] uppercase tracking-widest text-white/70">Behavioral Economics</span>
          <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] uppercase tracking-widest text-white/70">POMDP Framework</span>
          <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] uppercase tracking-widest text-white/70">Elastic RL Engine</span>
          <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] uppercase tracking-widest text-white/70">Recovery Analysis</span>
        </div>

        <div className="space-y-4 mt-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-season-growth)]" />
              <h4 className="text-white/90 text-sm font-semibold tracking-wide">Validated</h4>
            </div>
            <ul className="pl-6 space-y-1.5 text-xs text-white/50 border-l border-white/10 ml-2">
              <li>Friction-weighted routing</li>
              <li>5,000 Simulated Agents</li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <CircleDashed className="w-4 h-4 text-white/40" />
              <h4 className="text-white/60 text-sm font-semibold tracking-wide">Not Yet Validated</h4>
            </div>
            <ul className="pl-6 space-y-1.5 text-xs text-white/40 border-l border-white/5 ml-2">
              <li>Multi-year recovery velocity</li>
            </ul>
          </div>
        </div>
      </div>
    </EditorialCard>
  );
}
