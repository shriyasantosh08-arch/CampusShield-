import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  AlertTriangle,
  Users,
  Sliders,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Shield,
  LogOut,
  Radio
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  pendingIncidentsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  pendingIncidentsCount = 3
}) => {
  const { user, logout } = useAuth();

  const navItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
    },
    {
      name: 'Incidents',
      path: '/incidents',
      icon: <AlertTriangle className="w-5 h-5 flex-shrink-0" />,
      badge: pendingIncidentsCount > 0 ? pendingIncidentsCount : undefined,
      badgeColor: 'bg-red-500'
    },
    {
      name: 'Users',
      path: '/users',
      icon: <Users className="w-5 h-5 flex-shrink-0" />
    },
    {
      name: 'Priorities',
      path: '/priorities',
      icon: <Sliders className="w-5 h-5 flex-shrink-0" />
    },
    {
      name: 'Reports & Analytics',
      path: '/reports',
      icon: <BarChart3 className="w-5 h-5 flex-shrink-0" />
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-navy-900 border-r border-navy-800 text-slate-200">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-navy-800/80 bg-navy-950/40">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-md shadow-brand-500/20 flex-shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col transition-opacity duration-200">
              <span className="font-bold text-white text-base tracking-tight flex items-center gap-1.5">
                CampusShield
              </span>
              <span className="text-[10px] uppercase tracking-wider text-brand-400 font-semibold">
                Admin Command Center
              </span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Live System Operations Status Pill */}
      {!isCollapsed && (
        <div className="mx-3.5 mt-3.5 p-2.5 rounded-xl bg-navy-850/80 border border-navy-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-medium text-slate-300">Live Dispatch Active</span>
          </div>
          <span className="text-[10px] text-brand-400 font-mono bg-navy-800 px-1.5 py-0.5 rounded border border-navy-700">
            v2.4
          </span>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            onClick={onCloseMobile}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative
              ${
                isActive
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25 font-semibold'
                  : 'text-slate-300 hover:bg-navy-800/80 hover:text-white'
              }
              ${isCollapsed ? 'justify-center px-2' : ''}
            `}
            title={isCollapsed ? item.name : undefined}
          >
            {item.icon}
            {!isCollapsed && <span className="truncate">{item.name}</span>}
            {item.badge && !isCollapsed && (
              <span
                className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${item.badgeColor} animate-pulse`}
              >
                {item.badge}
              </span>
            )}
            {item.badge && isCollapsed && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-navy-900" />
            )}
          </NavLink>
        ))}
      </nav>

      {/* Emergency Radio / Broadcast Quick Action */}
      {!isCollapsed && (
        <div className="p-3 mx-3 mb-3 rounded-xl bg-gradient-to-r from-navy-850 to-navy-800 border border-navy-700/60">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-slate-200">
            <Radio className="w-4 h-4 text-brand-400 animate-pulse" />
            <span>Emergency Broadcast</span>
          </div>
          <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
            Direct audio & SMS alert to all on-duty officers & campus alert towers.
          </p>
          <button
            onClick={() => alert('Emergency Broadcast Channel Active: Standby frequency ready.')}
            className="w-full py-1 px-2 text-[11px] font-semibold bg-navy-750 hover:bg-navy-700 text-brand-300 hover:text-white rounded-lg border border-brand-500/20 transition flex items-center justify-center gap-1.5"
          >
            Open Radio Link
          </button>
        </div>
      )}

      {/* Admin Profile Footer */}
      <div className="p-3 border-t border-navy-800 bg-navy-950/40">
        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'justify-between'
          } gap-2`}
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'}
              alt={user?.name || 'Admin'}
              className="w-8 h-8 rounded-lg object-cover ring-2 ring-brand-500/40 flex-shrink-0"
            />
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-white truncate">
                  {user?.name}
                </span>
                <span className="text-[10px] text-slate-400 truncate">
                  {user?.title || 'Administrator'}
                </span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-navy-800 transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:block transition-all duration-300 ease-in-out fixed inset-y-0 left-0 z-30 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-navy-900 z-50 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
