import React from 'react';
import { useIncidents } from '../../context/IncidentContext';
import { Activity, CheckCircle2, FolderArchive, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StatsOverview: React.FC = () => {
  const { activeCount, resolvedCount, totalCount } = useIncidents();

  const stats = [
    {
      title: 'Active Reports',
      count: activeCount,
      description: 'Currently being handled or triaged',
      icon: Activity,
      iconColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      filterLink: '/incidents?filter=active',
    },
    {
      title: 'Resolved Reports',
      count: resolvedCount,
      description: 'Successfully secured and closed',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      filterLink: '/incidents?filter=resolved',
    },
    {
      title: 'Total Reports',
      count: totalCount,
      description: 'All-time reported incidents',
      icon: FolderArchive,
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      filterLink: '/incidents?filter=all',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Link
            key={idx}
            to={stat.filterLink}
            className="group relative overflow-hidden rounded-xl bg-slate-900/80 border border-slate-800 p-5 hover:border-slate-700 hover:bg-slate-900 transition-all shadow-md"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-11 h-11 rounded-xl ${stat.bgColor} ${stat.borderColor} border flex items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>

            <div className="mt-4">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {stat.count}
              </span>
              <h3 className="text-sm font-semibold text-slate-300 mt-1">{stat.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{stat.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
