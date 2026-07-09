import { AuditLogEvent } from '../../types';
import { 
  LucideClock, 
  LucideDatabase, 
  LucideLightbulb, 
  LucideTarget, 
  LucideEdit, 
  LucideSettings,
  LucideCpu,
  LucideChevronDown,
  LucideSearch
} from 'lucide-react';
import { useState } from 'react';

interface AuditTimelineProps {
  events: AuditLogEvent[];
}

export function AuditTimeline({ events }: AuditTimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getCategoryIcon = (category: AuditLogEvent['category']) => {
    switch (category) {
      case 'data_import': return <LucideDatabase className="w-4 h-4 text-blue-400" />;
      case 'recommendation': return <LucideLightbulb className="w-4 h-4 text-emerald-400" />;
      case 'goal_update': return <LucideTarget className="w-4 h-4 text-purple-400" />;
      case 'user_correction': return <LucideEdit className="w-4 h-4 text-orange-400" />;
      case 'system_event': return <LucideSettings className="w-4 h-4 text-slate-400" />;
      default: return <LucideClock className="w-4 h-4 text-white/40" />;
    }
  };

  const getCategoryDot = (category: AuditLogEvent['category']) => {
    switch (category) {
      case 'data_import': return 'bg-blue-400';
      case 'recommendation': return 'bg-emerald-400';
      case 'goal_update': return 'bg-purple-400';
      case 'user_correction': return 'bg-orange-400';
      case 'system_event': return 'bg-slate-400';
      default: return 'bg-white/40';
    }
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="w-full rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col h-full max-h-[800px]">
      <h3 className="text-lg font-medium text-white mb-2">Audit Timeline</h3>
      <p className="text-sm text-white/50 mb-8">Provenance and accountability for AI decisions.</p>

      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          
          {events.map((event) => {
            const isExpanded = expandedId === event.eventId;

            return (
              <div key={event.eventId} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                
                {/* Node */}
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black border border-white/10 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                  <div className={`w-2 h-2 rounded-full ${getCategoryDot(event.category)} shadow-glow`} />
                </div>
                
                {/* Content Card */}
                <div 
                  className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10 cursor-pointer"
                  onClick={() => toggleExpand(event.eventId)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(event.category)}
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                        {event.category.replace('_', ' ')}
                      </span>
                    </div>
                    <span className="text-xs text-white/40 font-mono">
                      {formatDate(event.timestamp)}, {formatTime(event.timestamp)}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-white/90 leading-snug">
                    {event.description}
                  </h4>

                  {/* Inline Inspect Panel */}
                  <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
                        
                        {/* Engine Metadata */}
                        {event.engineMetadata && (
                          <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-black/40 border border-white/5">
                            <div className="flex justify-between items-center mb-1">
                              <span className="flex items-center gap-1.5 text-xs font-medium text-fintrac-primary">
                                <LucideCpu className="w-3.5 h-3.5" />
                                {event.engineMetadata.engineName}
                              </span>
                              <span className="text-[10px] font-mono text-white/40">{event.engineMetadata.version}</span>
                            </div>
                            <div className="flex justify-between text-xs text-white/60">
                              <span>Confidence</span>
                              <span className="text-white">{event.engineMetadata.confidence}%</span>
                            </div>
                            <div className="flex justify-between text-xs text-white/60">
                              <span>Processing Time</span>
                              <span className="text-white font-mono">{event.engineMetadata.processingTimeMs}ms</span>
                            </div>
                          </div>
                        )}

                        {/* Evidence */}
                        {event.evidence && event.evidence.length > 0 && (
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-white/40 mb-2 block">Evidence</span>
                            <ul className="space-y-1">
                              {event.evidence.map((ev, i) => (
                                <li key={i} className="text-xs text-white/70 flex items-start gap-2">
                                  <span className="text-white/30 mt-0.5">•</span>
                                  {ev}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Input Sources */}
                        {event.inputSources && event.inputSources.length > 0 && (
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-white/40 mb-2 block">Input Sources</span>
                            <div className="flex flex-wrap gap-2">
                              {event.inputSources.map((src, i) => (
                                <span key={i} className="text-[10px] font-medium text-white/60 bg-white/10 px-2 py-1 rounded">
                                  {src}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Affected Objects */}
                        {event.affectedObjects && event.affectedObjects.length > 0 && (
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-white/40 mb-2 block">Affected Objects</span>
                            <div className="flex flex-col gap-1.5">
                              {event.affectedObjects.map((obj, i) => (
                                <div key={i} className="flex items-center justify-between text-xs p-2 rounded bg-white/5 border border-white/5">
                                  <span className="text-white/50">{obj.type}</span>
                                  <span className="text-white font-medium flex items-center gap-1">
                                    {obj.name}
                                    <LucideSearch className="w-3 h-3 text-white/30" />
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>

                  {!isExpanded && (event.engineMetadata || event.evidence || event.inputSources) && (
                    <div className="mt-3 flex items-center justify-center pt-2 border-t border-white/5 group-hover:border-white/10 transition-colors">
                      <LucideChevronDown className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                    </div>
                  )}
                  {isExpanded && (
                    <div className="mt-3 flex items-center justify-center pt-2 border-t border-white/10">
                      <LucideChevronDown className="w-4 h-4 text-white/50 rotate-180 transition-transform" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
