import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const SafetyStatusBanner: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 shadow-lg shadow-emerald-950/20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white">
              Campus Safety Status: Normal Operations
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            All campus facilities, dormitories, and security dispatch posts are operating under normal status.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 self-end sm:self-auto text-[11px] text-slate-400 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/50">
        <Info className="w-3.5 h-3.5 text-slate-400" />
        <span>Updated 4 mins ago</span>
      </div>
    </div>
  );
};
