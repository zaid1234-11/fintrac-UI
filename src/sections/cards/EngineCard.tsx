import EditorialCard from "@/components/EditorialCard";
import { ArrowRight } from "lucide-react";

const steps = [
  "Transactions",
  "Behavior Modeling",
  "POMDP System",
  "Adaptive Budgeting",
];

export default function EngineCard() {
  return (
    <EditorialCard
      title="The FinTrac Engine"
      index={4}
      imageSrc="/card-bg.png"
    >
      <div className="mt-8 mb-16 max-w-[260px] flex flex-col justify-center gap-4">
        {steps.map((step, idx) => (
          <div key={step} className="flex flex-col gap-3">
            <div className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-center shadow-md backdrop-blur-sm">
              <span className="text-white/90 text-sm font-medium tracking-wide">{step}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-white/30 rotate-90" />
              </div>
            )}
          </div>
        ))}
      </div>
    </EditorialCard>
  );
}
