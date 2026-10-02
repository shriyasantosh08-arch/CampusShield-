import React from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';
import { Bell, ArrowRight, CheckCircle2, ShieldAlert, Activity, AlertCircle } from 'lucide-react';
import { NotificationType } from '../../types/notification';

const formatTimeAgo = (iso: string) => {
  try {
    const diffMinutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  } catch {
    return '';
  }
};

export const RecentNotificationsCard: React.FC = () => {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const recent = notifications.slice(0, 3);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'incident_resolved':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'incident_assigned':
        return <Activity className="w-4 h-4 text-amber-400" />;
      case 'incident_in_progress':
        return <Activity className="w-4 h-4 text-purple-400" />;
      case 'incident_received':
        return <ShieldAlert className="w-4 h-4 text-blue-400" />;
      case 'campus_alert':
        return <AlertCircle className="w-4 h-4 text-rose-400" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight">Safety Updates</h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <Link
            to="/notifications"
            className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">No active alerts or incident updates.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {recent.map((notif) => (
              <div
                key={notif.id}
                onClick={() => !notif.read && markAsRead(notif.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  notif.read
                    ? 'bg-slate-950/30 border-slate-800/60 opacity-80'
                    : 'bg-slate-800/40 border-rose-500/30 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">{getIcon(notif.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-bold text-slate-200 truncate">{notif.title}</p>
                      <span className="text-[10px] text-slate-500 shrink-0">
                        {formatTimeAgo(notif.createdAt)}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                      {notif.message}
                    </p>
                  </div>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80">
        <Link
          to="/notifications"
          className="text-xs text-center block text-slate-400 hover:text-slate-300 font-medium"
        >
          Manage notification preferences & history →
        </Link>
      </div>
    </div>
  );
};
