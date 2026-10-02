import React from 'react';
import { IncidentStatus } from '../../types/incident';
import { Clock, CheckCircle2, UserCheck, ShieldAlert, Activity } from 'lucide-react';

interface StatusBadgeProps {
  status: IncidentStatus;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showPulse = true,
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-4 py-1.5 gap-2 font-semibold',
  };

  const statusConfig = {
    REPORTED: {
      label: 'REPORTED',
      icon: Clock,
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      dotColor: 'bg-blue-400',
    },
    RECEIVED: {
      label: 'RECEIVED',
      icon: ShieldAlert,
      color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      dotColor: 'bg-indigo-400',
    },
    ASSIGNED: {
      label: 'ASSIGNED',
      icon: UserCheck,
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      dotColor: 'bg-amber-400',
    },
    'IN PROGRESS': {
      label: 'IN PROGRESS',
      icon: Activity,
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      dotColor: 'bg-purple-400',
    },
    RESOLVED: {
      label: 'RESOLVED',
      icon: CheckCircle2,
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      dotColor: 'bg-emerald-400',
    },
  };

  const config = statusConfig[status] || statusConfig.REPORTED;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center rounded-full border ${config.color} ${sizeClasses[size]}`}
    >
      {showPulse && status !== 'RESOLVED' ? (
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.dotColor} opacity-75`}
          />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dotColor}`} />
        </span>
      ) : (
        <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      )}
      <span>{config.label}</span>
    </span>
  );
};
