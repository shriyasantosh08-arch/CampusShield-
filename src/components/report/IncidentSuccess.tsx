import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Incident } from '../../types/incident';
import { StatusBadge } from '../common/StatusBadge';
import { PriorityBadge } from '../common/PriorityBadge';
import {
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Home,
  MapPin,
  Calendar,
  Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface IncidentSuccessProps {
  incident: Incident;
}

export const IncidentSuccess: React.FC<IncidentSuccessProps> = ({ incident }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(incident.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const parsedDate = new Date(incident.createdAt);
  const formattedDate = parsedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = parsedDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto space-y-6 text-center"
    >
      {/* Success Badge & Animation */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-xl shadow-emerald-950/40">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
          ✓ TRANSMISSION CONFIRMED
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
          INCIDENT REPORTED SUCCESSFULLY
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-md mx-auto">
          Campus Security and First Response Dispatch have received your incident details.
        </p>
      </div>

      {/* Generated Incident ID card */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between max-w-md mx-auto shadow-md">
        <div className="text-left">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
            OFFICIAL INCIDENT TRACKING ID
          </span>
          <p className="text-xl font-mono font-extrabold text-white tracking-wider">
            {incident.id}
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyId}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Summary Details Card */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 text-left space-y-3.5 shadow-xl">
        <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-800">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
              Status
            </span>
            <div className="mt-1">
              <StatusBadge status={incident.status} size="sm" />
            </div>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
              Priority
            </span>
            <div className="mt-1">
              <PriorityBadge priority={incident.priority} size="sm" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-3 border-b border-slate-800 text-xs">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono block">
              Category
            </span>
            <span className="font-semibold text-slate-200 text-sm mt-0.5 block">
              {incident.category}
            </span>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono block">
              Reported Time
            </span>
            <div className="flex items-center gap-2 text-slate-300 mt-0.5 font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                {formattedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {formattedTime}
              </span>
            </div>
          </div>
        </div>

        <div className="text-xs">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono block mb-1">
            Confirmed Location
          </span>
          <div className="flex items-start gap-2 text-slate-200">
            <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">{incident.location.buildingOrArea}</p>
              {incident.location.landmarkDetails && (
                <p className="text-xs text-slate-400 mt-0.5">{incident.location.landmarkDetails}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate(`/incidents/${incident.id}`)}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all"
        >
          <span>View Incident Details & Tracking</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 flex items-center justify-center gap-2 transition-all"
        >
          <Home className="w-4 h-4 text-slate-400" />
          <span>Back to Dashboard</span>
        </button>
      </div>
    </motion.div>
  );
};
