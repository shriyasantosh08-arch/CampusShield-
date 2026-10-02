import React, { useState } from 'react';
import { Menu, Search, ShieldAlert, Sparkles } from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';
import { UserDropdown } from './UserDropdown';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
  onSearch?: (query: string) => void;
  isSidebarCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileSidebar,
  onSearch,
  isSidebarCollapsed
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState('');

  // Generate Breadcrumb based on current path
  const getPageInfo = () => {
    switch (location.pathname) {
      case '/':
        return { title: 'Emergency Operations Dashboard', section: 'Overview' };
      case '/incidents':
        return { title: 'Incident Command & Dispatch', section: 'Operations' };
      case '/users':
        return { title: 'User & Personnel Management', section: 'Directory' };
      case '/priorities':
        return { title: 'Priority & SLA Protocol Matrix', section: 'Configuration' };
      case '/reports':
        return { title: 'Campus Analytics & Safety Intelligence', section: 'Reports' };
      default:
        return { title: 'Admin Center', section: 'System' };
    }
  };

  const pageInfo = getPageInfo();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchVal);
    } else {
      navigate(`/incidents?search=${encodeURIComponent(searchVal)}`);
    }
  };

  return (
    <header
      className={`
        sticky top-0 z-20 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/90
        px-4 sm:px-6 flex items-center justify-between transition-all duration-300
        ${isSidebarCollapsed ? 'lg:pl-24' : 'lg:pl-72'}
      `}
    >
      {/* Left: Mobile hamburger & Page Title / Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-brand-600 uppercase tracking-wider">
            <span>{pageInfo.section}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500 font-medium">CampusShield EOC</span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
            {pageInfo.title}
          </h1>
        </div>
      </div>

      {/* Right: Search, SOS Pill, Notification Bell, User Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:block relative w-56 lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search incidents, badges, rooms..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100/90 border border-transparent rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
          />
        </form>

        {/* Live Priority Alert Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span>2 Critical Alerts</span>
        </div>

        {/* Notifications Dropdown */}
        <NotificationDropdown />

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

        {/* User Dropdown */}
        <UserDropdown />
      </div>
    </header>
  );
};
