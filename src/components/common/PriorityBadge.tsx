import React from 'react';
import { IncidentPriority } from '../../types/incident';
import { AlertOctagon, AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface PriorityBadgeProps {
  priority: IncidentPriority;
  size?: 'sm' | 'md' | 'lg';
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold',
  };

  const priorityConfig = {
    Critical: {
      label: 'Critical',
      icon: AlertOctagon,
      classes: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      iconColor: 'text-rose-400',
    },
    High: {
      label: 'High',
      icon: AlertTriangle,
      classes: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
      iconColor: 'text-orange-400',
    },
    Medium: {
      label: 'Medium',
      icon: AlertCircle,
      classes: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      iconColor: 'text-amber-400',
    },
    Low: {
      label: 'Low',
      icon: Info,
      classes: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
  };

  const config = priorityConfig[priority] || priorityConfig.Low;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center rounded-md border tracking-wide uppercase font-mono ${config.classes} ${sizeClasses[size]}`}
    >
      <Icon className={`${config.iconColor} ${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'}`} />
      <span>{config.label}</span>
    </span>
  );
};
