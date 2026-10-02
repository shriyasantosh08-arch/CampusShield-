import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  Shield,
  Bell,
  AlertTriangle,
  User,
  LogOut,
  PlusCircle,
  FileText,
  Home,
  PhoneCall,
  X,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { student, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: Home },
    { label: 'Report Incident', path: '/report', icon: PlusCircle, isEmergency: true },
    { label: 'My Incidents', path: '/incidents', icon: FileText },
    { label: 'Notifications', path: '/notifications', icon: Bell, badge: unreadCount },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate('/login');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center shadow-lg shadow-rose-600/20 group-hover:scale-105 transition-transform duration-200">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-lg tracking-tight text-white">
                      Campus<span className="text-rose-500">Shield</span>
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-full">
                      Student
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                    Emergency & Incident Response
                  </p>
                </div>
              </Link>

              {/* Campus Live Status Indicator */}
              <div className="hidden lg:flex items-center gap-2 ml-6 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-slate-300 font-medium">Campus Status: Normal</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                if (item.isEmergency) {
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-md ${
                        isActive
                          ? 'bg-rose-600 text-white shadow-rose-600/30 ring-2 ring-rose-500/40'
                          : 'bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 border border-rose-500/30'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4 animate-pulse text-rose-400" />
                      <span>Report</span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-white bg-slate-800/80 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span>{item.label}</span>
                    {typeof item.badge === 'number' && item.badge > 0 && (
                      <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold text-white bg-rose-500 rounded-full animate-bounce">
                        {item.badge > 99 ? '99+' : item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side: SOS Trigger & User Avatar */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Instant Emergency Call Modal Button */}
              <button
                type="button"
                onClick={() => setShowSosModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-semibold rounded-lg transition-all"
                title="Immediate Campus Emergency Hotlines"
              >
                <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 animate-pulse" />
                <span className="hidden sm:inline">Emergency SOS</span>
                <span className="sm:hidden">SOS</span>
              </button>

              {/* Student User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-700 focus:outline-none"
                  aria-expanded={dropdownOpen}
                >
                  <img
                    src={
                      student?.avatarUrl ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        student?.fullName || 'Student'
                      )}&background=e11d48&color=fff&bold=true`
                    }
                    alt={student?.fullName || 'Student profile'}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-slate-700"
                  />
                  <div className="hidden xl:block text-left text-xs leading-tight">
                    <p className="font-semibold text-slate-200 truncate max-w-[120px]">
                      {student?.fullName || 'Alex Vance'}
                    </p>
                    <p className="text-slate-400 text-[10px] font-mono">
                      {student?.studentId || 'CS-2024-8841'}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 divide-y divide-slate-800"
                    >
                      <div className="px-3 py-2.5">
                        <p className="text-xs font-semibold text-white truncate">
                          {student?.fullName}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">{student?.email}</p>
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">
                          <span>ID:</span>
                          <span className="font-semibold text-rose-400">{student?.studentId}</span>
                        </div>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          <span>Student Profile</span>
                        </Link>
                        <Link
                          to="/incidents"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span>My Incident Reports</span>
                        </Link>
                        <Link
                          to="/notifications"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center justify-between px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <span className="flex items-center gap-2.5">
                            <Bell className="w-4 h-4 text-slate-400" />
                            <span>Notifications</span>
                          </span>
                          {unreadCount > 0 && (
                            <span className="px-1.5 py-0.5 text-[10px] bg-rose-500 text-white rounded-full font-bold">
                              {unreadCount}
                            </span>
                          )}
                        </Link>
                      </div>

                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Emergency SOS Hotlines Modal */}
      <AnimatePresence>
        {showSosModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSosModal(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-slate-900 border border-rose-500/40 rounded-2xl p-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center">
                    <PhoneCall className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Emergency Contacts</h3>
                    <p className="text-xs text-slate-400">24/7 Rapid Response Hotlines</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSosModal(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <a
                  href="tel:911"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 hover:bg-rose-500/25 transition-all text-white group"
                >
                  <div>
                    <p className="font-bold text-rose-400 group-hover:text-rose-300 text-sm">
                      Campus Police & Dispatch
                    </p>
                    <p className="text-xs text-slate-300">Immediate armed & security response</p>
                  </div>
                  <span className="font-mono font-bold text-base bg-rose-500 text-white px-3 py-1 rounded-lg">
                    Ext: 911
                  </span>
                </a>

                <a
                  href="tel:5550199"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:bg-slate-800 transition-all text-white"
                >
                  <div>
                    <p className="font-semibold text-slate-200 text-sm">Campus Medical Clinic</p>
                    <p className="text-xs text-slate-400">First aid, ambulance, urgent care</p>
                  </div>
                  <span className="font-mono text-xs bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg">
                    (555) 019-9111
                  </span>
                </a>

                <a
                  href="tel:5550188"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:bg-slate-800 transition-all text-white"
                >
                  <div>
                    <p className="font-semibold text-slate-200 text-sm">Night Escort & SafeWalk</p>
                    <p className="text-xs text-slate-400">Campus security walking companion</p>
                  </div>
                  <span className="font-mono text-xs bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg">
                    (555) 019-WALK
                  </span>
                </a>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowSosModal(false)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
