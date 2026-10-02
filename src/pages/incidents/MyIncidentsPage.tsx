import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useIncidents } from '../../context/IncidentContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import {
  Search,
  Filter,
  PlusCircle,
  Clock,
  MapPin,
  ArrowRight,
  AlertTriangle,
  FolderArchive,
  Paperclip,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const MyIncidentsPage: React.FC = () => {
  const { incidents, isLoading, error } = useIncidents();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeFilter = searchParams.get('filter') || 'all';
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All Incidents' },
    { id: 'active', label: 'Active Reports' },
    { id: 'resolved', label: 'Resolved' },
    { id: 'critical', label: 'Critical' },
    { id: 'high', label: 'High' },
    { id: 'medium', label: 'Medium' },
    { id: 'low', label: 'Low' },
  ];

  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      // Status & Priority Filter
      if (activeFilter === 'active' && incident.status === 'RESOLVED') return false;
      if (activeFilter === 'resolved' && incident.status !== 'RESOLVED') return false;
      if (['critical', 'high', 'medium', 'low'].includes(activeFilter)) {
        if (incident.priority.toLowerCase() !== activeFilter) return false;
      }

      // Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesId = incident.id.toLowerCase().includes(query);
        const matchesTitle = incident.title.toLowerCase().includes(query);
        const matchesCategory = incident.category.toLowerCase().includes(query);
        const matchesLocation = incident.location.buildingOrArea.toLowerCase().includes(query);
        return matchesId || matchesTitle || matchesCategory || matchesLocation;
      }

      return true;
    });
  }, [incidents, activeFilter, searchQuery]);

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header with Title and Report CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            My Incident Reports
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Track and monitor the status of your reported campus emergencies and hazards
          </p>
        </div>

        <Link
          to="/report"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-rose-600/30 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report New Incident</span>
        </Link>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Incident ID (e.g. CS-2026-0042), title, category, or building..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-rose-500 text-white placeholder-slate-500 text-sm outline-none"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1 text-xs text-slate-400 pr-2 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSearchParams({ filter: tab.id })}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-slate-950/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          <p>{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse" />
          ))}
        </div>
      ) : filteredIncidents.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900/40">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center mx-auto mb-3 text-slate-500">
            <FolderArchive className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-white">No Incidents Found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {searchQuery || activeFilter !== 'all'
              ? 'No incidents match your current search query or filter criteria.'
              : 'You have not reported any campus emergencies or safety concerns yet.'}
          </p>
          {(searchQuery || activeFilter !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSearchParams({ filter: 'all' });
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        /* Incidents Cards List */
        <div className="space-y-4">
          {filteredIncidents.map((incident) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 shadow-xl transition-all group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="font-mono text-xs font-extrabold text-rose-400 px-2.5 py-0.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
                      {incident.id}
                    </span>
                    <span className="text-xs font-bold text-slate-300">
                      {incident.category}
                    </span>
                    <span className="text-slate-600 hidden sm:inline">•</span>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {formatDate(incident.createdAt)}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                    {incident.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                    {incident.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span className="text-slate-300 font-medium">
                        {incident.location.buildingOrArea}
                      </span>
                    </div>

                    {incident.evidence.length > 0 && (
                      <div className="flex items-center gap-1 text-slate-400">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>{incident.evidence.length} attached media</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800 shrink-0">
                  <div className="flex items-center gap-2">
                    <PriorityBadge priority={incident.priority} size="sm" />
                    <StatusBadge status={incident.status} size="sm" />
                  </div>

                  <Link
                    to={`/incidents/${incident.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
