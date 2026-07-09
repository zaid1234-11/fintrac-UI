export function WeeklyImpactCard() {
  return (
    <div className="rounded-2xl bg-fintrac-primary/10 border border-fintrac-primary/20 p-5 shadow-[0_0_30px_rgba(205,255,100,0.1)]">
      <h3 className="text-sm font-semibold text-fintrac-primary mb-4">This Week</h3>
      
      <div className="space-y-4">
        <div>
          <span className="text-2xl font-bold text-white tracking-tight">₹2,140</span>
          <span className="text-xs text-white/50 block mt-1">Potential Savings</span>
        </div>
        
        <div className="h-px w-full bg-fintrac-primary/10" />
        
        <div>
          <span className="text-xl font-medium text-white">3</span>
          <span className="text-xs text-white/50 block mt-0.5">Decisions Accepted</span>
        </div>
        
        <div className="h-px w-full bg-fintrac-primary/10" />
        
        <div>
          <span className="text-xl font-medium text-white">2</span>
          <span className="text-xs text-white/50 block mt-0.5">Goals Accelerated</span>
        </div>
        
        <div className="h-px w-full bg-fintrac-primary/10" />
        
        <div>
          <span className="text-xl font-medium text-white">1</span>
          <span className="text-xs text-white/50 block mt-0.5">Risk Prevented</span>
        </div>
      </div>
    </div>
  );
}
