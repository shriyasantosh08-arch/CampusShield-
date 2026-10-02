import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Plus, FileText, Bell, User } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const MobileNav: React.FC = () => {
  const { unreadCount } = useNotifications();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {/* Home */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-14 py-1 text-[11px] font-medium transition-colors ${
              isActive ? 'text-rose-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </NavLink>

        {/* My Incidents */}
        <NavLink
          to="/incidents"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-14 py-1 text-[11px] font-medium transition-colors ${
              isActive ? 'text-rose-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          <FileText className="w-5 h-5 mb-0.5" />
          <span>Incidents</span>
        </NavLink>

        {/* Central Floating Emergency Report Action */}
        <div className="relative -top-5">
          <NavLink
            to="/report"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-13 h-13 rounded-full shadow-lg transition-transform active:scale-95 ${
                isActive
                  ? 'bg-rose-500 text-white shadow-rose-600/40 ring-4 ring-rose-500/20'
                  : 'bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-rose-600/30'
              }`
            }
            aria-label="Report Emergency Incident"
          >
            <span className="relative flex items-center justify-center">
              <Plus className="w-7 h-7 stroke-[2.5]" />
            </span>
          </NavLink>
          <span className="text-[10px] font-bold text-rose-400 tracking-wider text-center block mt-1 uppercase">
            Report
          </span>
        </div>

        {/* Notifications */}
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center w-14 py-1 text-[11px] font-medium transition-colors ${
              isActive ? 'text-rose-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          <div className="relative">
            <Bell className="w-5 h-5 mb-0.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-2 inline-flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-bold text-white bg-rose-500 rounded-full animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>
          <span>Alerts</span>
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-14 py-1 text-[11px] font-medium transition-colors ${
              isActive ? 'text-rose-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};
