import React, { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Calendar } from 'lucide-react';

export const WelcomeSection: React.FC = () => {
  const { student } = useAuth();

  const { greeting, currentDate } = useMemo(() => {
    const d = new Date();
    const hour = d.getHours();
    let g = 'Good evening';
    if (hour < 12) g = 'Good morning';
    else if (hour < 18) g = 'Good afternoon';

    const formatted = d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return { greeting: g, currentDate: formatted };
  }, []);

  const firstName = student?.fullName ? student.fullName.split(' ')[0] : 'Student';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-800/80 border border-slate-800 p-6 sm:p-8 shadow-xl">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Student Portal Active
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
              <Calendar className="w-3 h-3 text-slate-500" />
              {currentDate}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {greeting}, <span className="text-rose-400">{firstName}</span> 👋
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Stay safe. CampusShield is here when you need it. Report hazards, track responses, and access 24/7 campus emergency services.
          </p>
        </div>

        {/* Student Quick Badge */}
        <div className="hidden sm:flex flex-col items-end justify-center bg-slate-950/60 border border-slate-800/80 px-4 py-3 rounded-xl backdrop-blur-sm self-start md:self-auto">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
            Enrolled Student ID
          </span>
          <span className="text-sm font-bold text-white font-mono mt-0.5">
            {student?.studentId || 'CS-2024-8841'}
          </span>
          <span className="text-[11px] text-slate-400 truncate max-w-[180px] mt-0.5">
            {student?.department || 'Computer Science'}
          </span>
        </div>
      </div>
    </div>
  );
};
