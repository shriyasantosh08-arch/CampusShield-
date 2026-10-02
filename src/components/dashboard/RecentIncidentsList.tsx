import React from 'react';
import { Link } from 'react-router-dom';
import { useIncidents } from '../../context/IncidentContext';
import { StatusBadge } from '../common/StatusBadge';
import { PriorityBadge } from '../common/PriorityBadge';
import { ArrowRight, Clock, MapPin, AlertCircle } from 'lucide-react';

export const RecentIncidentsList: React.FC = () => {
  const { incidents, isLoading } = useIncidents();

  // Show only 4 most recent
  const recentList = incidents.slice(0, 4);

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('en-US', {
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
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">Recent Incidents</h2>
          <p className="text-xs text-slate-400 mt-0.5">Your submitted safety and hazard reports</p>
        </div>
        <Link
          to="/incidents"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
        >
          <span>View All ({incidents.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3 py-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-slate-800/50 animate-pulse" />
          ))}
        </div>
      ) : recentList.length === 0 ? (
        <div className="text-center py-10 px-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/40">
          <AlertCircle className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-slate-300">No Incidents Reported Yet</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            When you report safety concerns or campus emergencies, their live progress will show up here.
          </p>
          <Link
            to="/report"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg transition-colors"
          >
            Report Your First Incident
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {recentList.map((incident) => (
            <Link
              key={incident.id}
              to={`/incidents/${incident.id}`}
              className="group block p-4 rounded-xl bg-slate-950/40 hover:bg-slate-800/60 border border-slate-800/80 hover:border-slate-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <span className="font-mono text-xs font-bold text-rose-400 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                      {incident.id}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-rose-400 transition-colors line-clamp-1">
                      {incident.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-400">
                      <span className="text-slate-300 font-medium">{incident.category}</span>
                      <span className="text-slate-600">•</span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {formatDate(incident.createdAt)}
                      </span>
                      {incident.location.buildingOrArea && (
                        <>
                          <span className="text-slate-600">•</span>
                          <span className="flex items-center gap-1 text-[11px] truncate max-w-[200px]">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            {incident.location.buildingOrArea}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                  <PriorityBadge priority={incident.priority} size="sm" />
                  <StatusBadge status={incident.status} size="sm" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
