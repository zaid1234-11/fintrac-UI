import { LucideShieldCheck } from 'lucide-react';

interface DecisionEvidenceProps {
  evidence: string[];
}

export function DecisionEvidence({ evidence }: DecisionEvidenceProps) {
  if (!evidence || evidence.length === 0) return null;

  return (
    <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
      <div className="flex items-center gap-2 mb-3">
        <LucideShieldCheck className="w-4 h-4 text-fintrac-primary" />
        <h4 className="text-sm font-medium text-white">AI Evidence</h4>
      </div>
      <ul className="space-y-2">
        {evidence.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-white/70">
            <span className="text-white/30 mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
