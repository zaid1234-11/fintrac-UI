import EditorialCard from "@/components/EditorialCard";

export default function BudgetComparisonCard() {
  return (
    <EditorialCard
      title="Why Traditional Budgets Fail"
      index={0}
      imageSrc="/card-bg.png"
    >
      <p className="text-white/60 text-sm mb-6 leading-relaxed">
        Most budgeting tools treat every category equally. Humans don&apos;t work that way.
      </p>

      <div className="grid grid-cols-2 gap-4 mt-auto mb-16">
        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
          <p className="text-white/40 text-xs font-semibold mb-3 uppercase tracking-wider">Traditional</p>
          <ul className="space-y-2 text-sm text-white/50 font-mono">
            <li className="flex justify-between"><span>Food</span><span>-10%</span></li>
            <li className="flex justify-between"><span>Transport</span><span>-10%</span></li>
            <li className="flex justify-between"><span>Shopping</span><span>-10%</span></li>
            <li className="flex justify-between"><span>Dining</span><span>-10%</span></li>
          </ul>
        </div>
        <div className="bg-[var(--color-bg-2)] rounded-xl p-4 border border-white/10 shadow-lg relative overflow-hidden">
          {/* Subtle glow for FinTrac column */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-season-growth)]/10 to-transparent pointer-events-none" />
          <p className="text-white/80 text-xs font-semibold mb-3 uppercase tracking-wider relative z-10">FinTrac</p>
          <ul className="space-y-2 text-sm text-white/90 font-mono relative z-10">
            <li className="flex justify-between"><span>Food</span><span className="text-[var(--color-season-growth)]">-2%</span></li>
            <li className="flex justify-between"><span>Transport</span><span className="text-[var(--color-season-growth)]">-1%</span></li>
            <li className="flex justify-between"><span>Shopping</span><span className="text-[var(--color-season-drought)]">-15%</span></li>
            <li className="flex justify-between"><span>Dining</span><span className="text-[var(--color-season-drought)]">-12%</span></li>
          </ul>
        </div>
      </div>
    </EditorialCard>
  );
}
