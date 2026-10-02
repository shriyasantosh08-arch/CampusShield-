import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldAlert, PhoneCall, HeartPulse, UserCheck } from 'lucide-react';

export const EmergencyActionCard: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-950/60 via-slate-900 to-slate-900 border border-rose-500/30 p-6 sm:p-8 shadow-2xl">
      {/* Background emergency strobe flare */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
            </span>
            Instant Incident Reporting
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
            Experiencing or Witnessing an Emergency?
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Report medical emergencies, hazards, suspicious activity, or accidents instantly. Dispatch verifies GPS location and alerts officers in real-time.
          </p>

          {/* Quick Helpline Chips */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <a
              href="tel:911"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
              <span>Campus Police (Ext 911)</span>
            </a>
            <a
              href="tel:5550199"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              <HeartPulse className="w-3.5 h-3.5 text-red-400" />
              <span>Medical Clinic</span>
            </a>
            <a
              href="tel:5550188"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>SafeWalk Escort</span>
            </a>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
          <Link
            to="/report"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-base tracking-wide shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <ShieldAlert className="w-6 h-6 animate-pulse" />
            <span>REPORT AN EMERGENCY</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="text-center text-[11px] text-slate-400">
            Estimated dispatch response: <strong className="text-slate-200">&lt; 3 minutes</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
