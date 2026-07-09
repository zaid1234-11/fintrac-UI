import { Permission } from '../../types';
import { LucideAlertTriangle, LucideTrendingDown } from 'lucide-react';
import { useState } from 'react';

interface PermissionControlsProps {
  permissions: Permission[];
  onToggle: (id: string) => void;
}

export function PermissionControls({ permissions, onToggle }: PermissionControlsProps) {
  const [pendingDisableId, setPendingDisableId] = useState<string | null>(null);

  const handleToggleClick = (permission: Permission) => {
    if (permission.isEnabled && permission.impactWarnings && permission.impactWarnings.length > 0) {
      setPendingDisableId(permission.id);
    } else {
      onToggle(permission.id);
    }
  };

  const confirmDisable = (id: string) => {
    onToggle(id);
    setPendingDisableId(null);
  };

  const cancelDisable = () => {
    setPendingDisableId(null);
  };

  return (
    <div className="w-full mt-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-1">Permissions & Privacy</h3>
          <p className="text-sm text-white/50">Control what data FinTrac can access.</p>
        </div>
      </div>

      <div className="space-y-4">
        {permissions.map(permission => {
          const isPending = pendingDisableId === permission.id;

          return (
            <div 
              key={permission.id} 
              className={`rounded-xl border p-5 transition-colors overflow-hidden ${
                permission.isEnabled && !isPending
                  ? 'bg-white/5 border-white/10' 
                  : isPending
                  ? 'bg-rose-500/5 border-rose-500/20'
                  : 'bg-black/50 border-white/5'
              }`}
            >
              <div className="flex items-start justify-between gap-4 relative">
                
                {/* Normal Content */}
                <div className={`flex-1 transition-all duration-300 ${isPending ? 'opacity-0 translate-y-4 pointer-events-none absolute' : 'opacity-100 translate-y-0 relative'}`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <h4 className={`text-sm font-medium ${permission.isEnabled ? 'text-white' : 'text-white/60'}`}>
                      {permission.name}
                    </h4>
                    {!permission.isEnabled && permission.isCritical && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                        <LucideAlertTriangle className="w-3 h-3" />
                        Critical
                      </span>
                    )}
                  </div>
                  
                  <p className={`text-xs mb-3 leading-relaxed ${permission.isEnabled ? 'text-white/70' : 'text-white/40'}`}>
                    {permission.description}
                  </p>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white/30 shrink-0 mt-0.5">Purpose</span>
                    <p className={`text-xs ${permission.isEnabled ? 'text-fintrac-primary/80' : 'text-white/30'}`}>
                      {permission.purpose}
                    </p>
                  </div>
                </div>

                {/* Pending Warning Content */}
                <div className={`flex-1 transition-all duration-300 ${!isPending ? 'opacity-0 -translate-y-4 pointer-events-none absolute' : 'opacity-100 translate-y-0 relative'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <LucideAlertTriangle className="w-4 h-4 text-rose-400" />
                    <h4 className="text-sm font-medium text-rose-400">
                      Disable {permission.name}?
                    </h4>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {permission.impactWarnings?.map((warning, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-rose-200/70">
                        <span className="text-rose-400 mt-0.5">•</span>
                        {warning}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 border-t border-rose-500/20 pt-4">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-rose-400 bg-rose-400/10 px-2 py-1 rounded">
                      <LucideTrendingDown className="w-3.5 h-3.5" />
                      Trust Score {permission.trustImpact}
                    </div>
                    
                    <div className="flex-1 flex justify-end gap-2">
                      <button 
                        onClick={cancelDisable}
                        className="text-xs font-medium text-white/50 hover:text-white px-3 py-1.5 rounded transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => confirmDisable(permission.id)}
                        className="text-xs font-medium text-rose-950 bg-rose-400 hover:bg-rose-300 px-3 py-1.5 rounded transition-colors"
                      >
                        Confirm Disable
                      </button>
                    </div>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button 
                  onClick={() => handleToggleClick(permission)}
                  className={`relative shrink-0 w-12 h-6 rounded-full transition-colors focus:outline-none z-10 ${
                    permission.isEnabled ? 'bg-fintrac-primary' : 'bg-white/20'
                  } ${isPending ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                  <span className="sr-only">Toggle {permission.name}</span>
                  <span 
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      permission.isEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`} 
                  />
                </button>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
