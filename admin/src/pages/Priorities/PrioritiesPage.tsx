import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sliders,
  Clock,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Edit2,
  ArrowRight,
  Info,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { PriorityConfig } from '../../types/priority';
import { priorityService } from '../../services/priorityService';
import { incidentService } from '../../services/incidentService';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EditPriorityModal } from '../../components/priorities/EditPriorityModal';

export const PrioritiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [priorities, setPriorities] = useState<PriorityConfig[]>([]);
  const [activeCounts, setActiveCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [editingPriority, setEditingPriority] = useState<PriorityConfig | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [list, incidents] = await Promise.all([
        priorityService.getPriorities(),
        incidentService.getIncidents()
      ]);

      // Calculate live active counts from current incidents
      const counts: Record<string, number> = {
        Critical: 0,
        High: 0,
        Medium: 0,
        Low: 0
      };

      incidents.forEach((inc) => {
        if (inc.status !== 'Resolved') {
          counts[inc.priority] = (counts[inc.priority] || 0) + 1;
        }
      });

      setPriorities(list);
      setActiveCounts(counts);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrioritySaved = (updated: PriorityConfig) => {
    setPriorities((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  if (isLoading) {
    return <LoadingSpinner label="Loading Priority SLA Matrix..." fullHeight />;
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Incident Priority & SLA Protocol Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure emergency dispatch response deadlines, severity classifications, and automated escalation pathways.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/incidents')}
            leftIcon={<ShieldAlert className="w-3.5 h-3.5" />}
          >
            Review Active Queue
          </Button>
        </div>
      </div>

      {/* SLA Policy Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 flex-shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div className="text-xs leading-relaxed text-slate-600">
          <h4 className="font-bold text-slate-900 text-sm mb-0.5">
            Campus Emergency Response Standard Operating Procedures (SOP)
          </h4>
          <p>
            Response targets represent the maximum elapsed time from the moment a student or staff submits an incident until an on-duty tactical officer acknowledges and marks themselves on-scene. Escalation rules automatically execute if timers exceed thresholds.
          </p>
        </div>
      </div>

      {/* Priority Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {priorities.map((item) => {
          const liveActive = activeCounts[item.level] ?? item.activeIncidentsCount;

          return (
            <div
              key={item.id}
              className={`
                bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-soft
                ${item.borderClass} transition-all duration-200 hover:shadow-card flex flex-col justify-between
              `}
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${item.badgeBg}`}>
                        {item.level} Severity
                      </span>
                      <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Tier {item.level === 'Critical' ? '1' : item.level === 'High' ? '2' : item.level === 'Medium' ? '3' : '4'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-2">{item.label}</h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Active Incidents
                    </span>
                    <span
                      className={`text-xl font-extrabold font-mono ${
                        liveActive > 0 ? (item.level === 'Critical' ? 'text-red-600' : 'text-slate-900') : 'text-slate-400'
                      }`}
                    >
                      {liveActive}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Response Target & SLA Box */}
                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                      Target Response Time
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5 font-bold text-slate-900">
                      <Clock className="w-3.5 h-3.5 text-brand-600" />
                      <span>{item.responseTimeSLA}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                      Max Threshold SLA
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5 font-bold text-slate-900 font-mono">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>{item.responseTargetMinutes} minutes</span>
                    </div>
                  </div>
                </div>

                {/* Escalation Rule */}
                <div className="text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold mb-1">
                    Automated Escalation Rule
                  </span>
                  <p className="text-slate-700 bg-slate-50/50 p-2.5 rounded-lg border border-slate-200/60 leading-normal text-[11px]">
                    {item.escalationRule}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => navigate(`/incidents?priority=${item.level}`)}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1 transition"
                >
                  <span>Filter {item.level} incidents</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setEditingPriority(item);
                    setIsEditOpen(true);
                  }}
                  leftIcon={<Edit2 className="w-3.5 h-3.5 text-slate-500" />}
                >
                  Configure SLA
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Priority Modal */}
      <EditPriorityModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        priority={editingPriority}
        onSaved={handlePrioritySaved}
      />
    </div>
  );
};
