import React from 'react';
import { Incident, IncidentStatus, IncidentTimelineEvent } from '../../types/incident';
import {
  CheckCircle2,
  Clock,
  UserCheck,
  Activity,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface StatusTimelineProps {
  incident: Incident;
}

const STAGES: {
  status: IncidentStatus;
  label: string;
  defaultDescription: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    status: 'REPORTED',
    label: 'REPORTED',
    defaultDescription: 'Emergency incident reported by student.',
    icon: Clock,
  },
  {
    status: 'RECEIVED',
    label: 'RECEIVED',
    defaultDescription: 'Campus Dispatch verified & triaged priority.',
    icon: ShieldAlert,
  },
  {
    status: 'ASSIGNED',
    label: 'ASSIGNED',
    defaultDescription: 'Patrol officer or response team designated.',
    icon: UserCheck,
  },
  {
    status: 'IN PROGRESS',
    label: 'IN PROGRESS',
    defaultDescription: 'Active mitigation and on-scene emergency management.',
    icon: Activity,
  },
  {
    status: 'RESOLVED',
    label: 'RESOLVED',
    defaultDescription: 'Area secured, incident resolved and documented.',
    icon: CheckCircle2,
  },
];

export const StatusTimeline: React.FC<StatusTimelineProps> = ({ incident }) => {
  const currentStageIndex = STAGES.findIndex((s) => s.status === incident.status);

  const formatTimestamp = (iso?: string) => {
    if (!iso) return null;
    try {
      const d = new Date(iso);
      return d.toLocaleTimeString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-rose-500" />
            Live Status Progress
          </h3>
          <p className="text-xs text-slate-400">
            Real-time stage tracking maintained by Campus Safety & First Responders
          </p>
        </div>

        {/* Current status pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Current Status:</span>
          <span className="font-mono text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-full">
            {incident.status}
          </span>
        </div>
      </div>

      {/* Assigned Officer / Team Card */}
      {incident.assignedTo && (
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div className="text-xs space-y-0.5">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
              Assigned Response Unit
            </span>
            <p className="font-bold text-white text-sm">{incident.assignedTo.name}</p>
            <p className="text-slate-400">{incident.assignedTo.unit}</p>
            {incident.assignedTo.phone && (
              <a
                href={`tel:${incident.assignedTo.phone}`}
                className="text-rose-400 hover:text-rose-300 font-semibold inline-block pt-1"
              >
                Dispatch Contact: {incident.assignedTo.phone}
              </a>
            )}
          </div>
        </div>
      )}

      {/* Resolution Card if resolved */}
      {incident.status === 'RESOLVED' && incident.resolutionDetails && (
        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-xs space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold">
              Resolution Confirmed
            </span>
            <p className="text-slate-200 font-medium leading-relaxed">
              {incident.resolutionDetails.resolutionNotes}
            </p>
            <p className="text-slate-400 text-[11px]">
              Resolved by {incident.resolutionDetails.resolvedBy} •{' '}
              {formatTimestamp(incident.resolutionDetails.resolvedAt)}
            </p>
          </div>
        </div>
      )}

      {/* Vertical Animated Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {STAGES.map((stage, idx) => {
          const isCompleted = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;

          const timelineEvent: IncidentTimelineEvent | undefined = incident.timeline?.find(
            (t) => t.status === stage.status
          );

          const timestamp = formatTimestamp(timelineEvent?.timestamp);
          const Icon = stage.icon;

          return (
            <motion.div
              key={stage.status}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="relative"
            >
              {/* Dot / Icon on timeline wire */}
              <div
                className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                  isCompleted
                    ? 'bg-emerald-500 text-white ring-4 ring-slate-900 shadow-md shadow-emerald-500/30'
                    : isCurrent
                    ? 'bg-rose-600 text-white ring-4 ring-rose-500/20 scale-110 shadow-lg shadow-rose-600/40'
                    : 'bg-slate-800 text-slate-500 border border-slate-700 ring-4 ring-slate-900'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                ) : (
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                )}
              </div>

              {/* Stage content */}
              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-slate-800/80 border-rose-500/40 shadow-lg'
                    : isCompleted
                    ? 'bg-slate-950/40 border-slate-800/80'
                    : 'bg-slate-950/20 border-slate-800/40 opacity-50'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold tracking-tight ${
                        isCurrent
                          ? 'text-rose-400 font-extrabold'
                          : isCompleted
                          ? 'text-white'
                          : 'text-slate-400'
                      }`}
                    >
                      {stage.label}
                    </span>
                    {isCurrent && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                      </span>
                    )}
                  </div>

                  {timestamp && (
                    <span className="text-[11px] font-mono text-slate-400">{timestamp}</span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {timelineEvent?.notes || stage.defaultDescription}
                </p>

                {timelineEvent?.actorName && (
                  <p className="text-[10px] text-slate-400 mt-1 font-mono">
                    Updated by: <span className="text-slate-300">{timelineEvent.actorName}</span>
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
