import React from 'react';
import { Check, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { IncidentStatus, IncidentTimelineEvent } from '../../types/incident';

interface StatusTimelineProps {
  currentStatus: IncidentStatus;
  timelineEvents: IncidentTimelineEvent[];
  hasAssignedOfficer?: boolean;
}

const STAGES: Array<{ key: 'Reported' | 'Assigned' | 'In Progress' | 'Resolved'; label: string }> = [
  { key: 'Reported', label: 'Reported' },
  { key: 'Assigned', label: 'Assigned' },
  { key: 'In Progress', label: 'In Progress' },
  { key: 'Resolved', label: 'Resolved' }
];

export const StatusTimeline: React.FC<StatusTimelineProps> = ({
  currentStatus,
  timelineEvents,
  hasAssignedOfficer = false
}) => {
  // Determine current active stage index
  const getStageIndex = () => {
    if (currentStatus === 'Resolved') return 3;
    if (currentStatus === 'In Progress') return 2;
    if (hasAssignedOfficer) return 1;
    return 0; // Reported
  };

  const activeIndex = getStageIndex();

  const getStageDetails = (stageKey: string) => {
    const matching = timelineEvents.filter((e) => {
      if (stageKey === 'Reported') return e.status === 'Reported';
      if (stageKey === 'Assigned') return e.status === 'Assigned';
      if (stageKey === 'In Progress') return e.status === 'In Progress';
      if (stageKey === 'Resolved') return e.status === 'Resolved';
      return false;
    });
    return matching.length > 0 ? matching[matching.length - 1] : null;
  };

  return (
    <div className="w-full py-4">
      {/* Horizontal Progress Flow */}
      <div className="relative flex items-center justify-between mb-8 px-3">
        {/* Track Line */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 -z-0" />
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-brand-600 transition-all duration-500 -z-0"
          style={{ width: `${(activeIndex / (STAGES.length - 1)) * 90}%` }}
        />

        {STAGES.map((stage, idx) => {
          const isCompleted = idx < activeIndex || (idx === 3 && currentStatus === 'Resolved');
          const isCurrent = idx === activeIndex && currentStatus !== 'Resolved';
          const isFuture = idx > activeIndex;

          return (
            <div key={stage.key} className="relative z-10 flex flex-col items-center">
              <div
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center font-semibold text-xs transition-all duration-300
                  ${
                    isCompleted
                      ? 'bg-emerald-500 text-white shadow-md ring-4 ring-emerald-50'
                      : isCurrent
                      ? 'bg-brand-600 text-white shadow-lg ring-4 ring-brand-100 animate-pulse-subtle'
                      : 'bg-white text-slate-400 border-2 border-slate-300'
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : isCurrent ? (
                  <Clock className="w-4 h-4" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isCurrent
                    ? 'text-brand-700 font-bold'
                    : isCompleted
                    ? 'text-slate-800'
                    : 'text-slate-400'
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Vertical Detailed History Logs */}
      <div className="mt-6 border-t border-slate-100 pt-5">
        <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
          Audit Activity & Dispatch Log
        </h5>
        <div className="space-y-4">
          {timelineEvents.map((event, idx) => (
            <div key={idx} className="relative flex items-start gap-3.5 pl-2 group">
              {idx !== timelineEvents.length - 1 && (
                <div className="absolute left-[18px] top-6 bottom-0 w-0.5 bg-slate-200" />
              )}
              <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center flex-shrink-0 z-10 group-hover:border-brand-500 transition">
                {event.status === 'Resolved' ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                ) : event.status === 'Assigned' ? (
                  <Check className="w-3 h-3 text-blue-600" />
                ) : (
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                )}
              </div>
              <div className="flex-1 bg-slate-50/70 hover:bg-slate-50 p-3 rounded-xl border border-slate-200/80 transition">
                <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                  <span className="text-xs font-semibold text-slate-900">
                    {event.status} Event
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {new Date(event.timestamp).toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{event.description}</p>
                <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="font-medium text-slate-600">Actor:</span>
                  <span>{event.actor}</span>
                  {event.badge && (
                    <span className="bg-slate-200/70 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-mono">
                      {event.badge}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
