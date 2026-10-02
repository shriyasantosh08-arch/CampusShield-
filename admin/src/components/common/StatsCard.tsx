import React, { ReactNode } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
    label?: string;
  };
  colorVariant?: 'brand' | 'amber' | 'emerald' | 'red' | 'navy';
  onClick?: () => void;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  colorVariant = 'brand',
  onClick
}) => {
  const iconBgClasses = {
    brand: 'bg-brand-50 text-brand-600 border-brand-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    red: 'bg-red-50 text-red-600 border-red-100',
    navy: 'bg-slate-100 text-slate-700 border-slate-200'
  }[colorVariant];

  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-2xl bg-white p-5 border border-slate-200/90 shadow-soft
        transition-all duration-200 hover:shadow-card hover:border-slate-300
        ${onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''}
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            {title}
          </p>
          <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">
            {value}
          </h4>
        </div>
        <div className={`p-3 rounded-xl border ${iconBgClasses} shadow-sm`}>
          {icon}
        </div>
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-1.5 text-xs">
          {trend.isNeutral ? (
            <span className="inline-flex items-center text-slate-600 font-medium">
              <Minus className="w-3.5 h-3.5 mr-0.5" /> {trend.value}
            </span>
          ) : trend.isPositive ? (
            <span className="inline-flex items-center text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded-md">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> {trend.value}
            </span>
          ) : (
            <span className="inline-flex items-center text-amber-600 font-semibold bg-amber-50 px-1.5 py-0.5 rounded-md">
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" /> {trend.value}
            </span>
          )}
          {trend.label && (
            <span className="text-slate-500 font-normal ml-1">{trend.label}</span>
          )}
        </div>
      )}
    </div>
  );
};
