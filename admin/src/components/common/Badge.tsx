import React from 'react';
import { IncidentPriority, IncidentStatus } from '../../types/incident';
import { UserRole, UserStatus } from '../../types/user';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'priority' | 'status' | 'role' | 'userStatus' | 'default';
  value?: IncidentPriority | IncidentStatus | UserRole | UserStatus | string;
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  value,
  size = 'md',
  dot = true,
  className = ''
}) => {
  const content = children || value;
  const valStr = String(value || children);

  let styleClasses = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';

  if (variant === 'priority' || ['Critical', 'High', 'Medium', 'Low'].includes(valStr)) {
    switch (valStr) {
      case 'Critical':
        styleClasses = 'bg-red-50 text-red-700 border-red-200/80 font-semibold';
        dotColor = 'bg-red-600 animate-pulse';
        break;
      case 'High':
        styleClasses = 'bg-orange-50 text-orange-700 border-orange-200/80 font-medium';
        dotColor = 'bg-orange-500';
        break;
      case 'Medium':
        styleClasses = 'bg-amber-50 text-amber-800 border-amber-200/80 font-medium';
        dotColor = 'bg-amber-500';
        break;
      case 'Low':
        styleClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200/80 font-medium';
        dotColor = 'bg-emerald-500';
        break;
    }
  } else if (variant === 'status' || ['Pending', 'In Progress', 'Resolved'].includes(valStr)) {
    switch (valStr) {
      case 'Pending':
        styleClasses = 'bg-amber-50 text-amber-700 border-amber-200/80';
        dotColor = 'bg-amber-500';
        break;
      case 'In Progress':
        styleClasses = 'bg-blue-50 text-blue-700 border-blue-200/80';
        dotColor = 'bg-blue-600';
        break;
      case 'Resolved':
        styleClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
        dotColor = 'bg-emerald-600';
        break;
    }
  } else if (variant === 'role' || ['Admin', 'Security', 'Student'].includes(valStr)) {
    switch (valStr) {
      case 'Admin':
        styleClasses = 'bg-purple-50 text-purple-700 border-purple-200';
        dotColor = 'bg-purple-600';
        break;
      case 'Security':
        styleClasses = 'bg-blue-50 text-blue-700 border-blue-200';
        dotColor = 'bg-blue-600';
        break;
      case 'Student':
        styleClasses = 'bg-slate-100 text-slate-700 border-slate-200';
        dotColor = 'bg-slate-500';
        break;
    }
  } else if (variant === 'userStatus' || ['Active', 'Inactive', 'Suspended'].includes(valStr)) {
    switch (valStr) {
      case 'Active':
        styleClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        dotColor = 'bg-emerald-500';
        break;
      case 'Inactive':
        styleClasses = 'bg-slate-100 text-slate-600 border-slate-200';
        dotColor = 'bg-slate-400';
        break;
      case 'Suspended':
        styleClasses = 'bg-rose-50 text-rose-700 border-rose-200';
        dotColor = 'bg-rose-500';
        break;
    }
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5'
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${styleClasses} ${sizeClasses} transition-colors select-none ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />}
      <span>{content}</span>
    </span>
  );
};
