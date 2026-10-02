import React, { useState, useRef, useEffect } from 'react';
import { LogOut, ShieldCheck, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

export const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dutyStatus, setDutyStatus] = useState<'On Duty' | 'Standby'>('On Duty');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    showToast({
      type: 'info',
      title: 'Logged Out',
      message: 'You have been safely signed out of CampusShield Admin.'
    });
    navigate('/login');
  };

  const toggleDuty = () => {
    const nextStatus = dutyStatus === 'On Duty' ? 'Standby' : 'On Duty';
    setDutyStatus(nextStatus);
    showToast({
      type: nextStatus === 'On Duty' ? 'success' : 'warning',
      title: `Duty Status: ${nextStatus}`,
      message: nextStatus === 'On Duty' ? 'You are receiving all live critical alerts.' : 'Alert notifications silenced for review mode.'
    });
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-navy-800 transition group focus:outline-none focus:ring-2 focus:ring-brand-500/40"
      >
        <div className="relative">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
            alt={user.name}
            className="w-8 h-8 rounded-lg object-cover ring-2 ring-brand-500/30 group-hover:ring-brand-500 transition"
          />
          <span
            className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-navy-900 ${
              dutyStatus === 'On Duty' ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
          />
        </div>
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-brand-400 transition">
            {user.name}
          </span>
          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
            {user.badgeId} • {dutyStatus}
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-dropdown border border-slate-200/90 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="p-4 border-b border-slate-100 bg-slate-50/70">
            <p className="text-sm font-bold text-slate-900">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
            <div className="mt-2.5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[11px] bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full font-medium border border-brand-100">
                <ShieldCheck className="w-3 h-3 text-brand-600" />
                {user.role} Access
              </span>
              <button
                onClick={toggleDuty}
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-md transition ${
                  dutyStatus === 'On Duty'
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                }`}
              >
                {dutyStatus}
              </button>
            </div>
          </div>

          <div className="p-2 space-y-1">
            <div className="px-3 py-2 text-xs text-slate-600">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Department</span>
              {user.department}
            </div>
          </div>

          <div className="p-2 border-t border-slate-100 bg-slate-50/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition"
            >
              <LogOut className="w-4 h-4" />
              Sign Out from Admin
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
