import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Eye,
  Shield,
  Sliders,
  CheckCircle2,
  Calendar,
  ArrowUpDown,
  RefreshCw,
  Plus,
  MapPin,
  Clock,
  User as UserIcon
} from 'lucide-react';
import { Incident, IncidentPriority, IncidentStatus, IncidentType } from '../../types/incident';
import { incidentService } from '../../services/incidentService';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { IncidentDetailsModal } from '../../components/incidents/IncidentDetailsModal';
import { AssignSecurityModal } from '../../components/incidents/AssignSecurityModal';
import { ChangePriorityModal } from '../../components/incidents/ChangePriorityModal';
import { ChangeStatusModal } from '../../components/incidents/ChangeStatusModal';
import { useToast } from '../../context/ToastContext';

export const IncidentsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedStatus, setSelectedStatus] = useState<string>(searchParams.get('status') || 'All');
  const [selectedPriority, setSelectedPriority] = useState<string>(searchParams.get('priority') || 'All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modals
  const [detailsIncident, setDetailsIncident] = useState<Incident | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [assignIncident, setAssignIncident] = useState<Incident | null>(null);
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  const [priorityIncident, setPriorityIncident] = useState<Incident | null>(null);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);

  const [statusIncident, setStatusIncident] = useState<Incident | null>(null);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    loadIncidents();
  }, []);

  // Check for 'focus' param in URL
  useEffect(() => {
    const focusId = searchParams.get('focus');
    if (focusId && incidents.length > 0) {
      const target = incidents.find((i) => i.id === focusId);
      if (target) {
        setDetailsIncident(target);
        setIsDetailsOpen(true);
      }
    }
  }, [searchParams, incidents]);

  const loadIncidents = async () => {
    setIsLoading(true);
    try {
      const data = await incidentService.getIncidents();
      setIncidents(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncidentUpdated = (updated: Incident) => {
    setIncidents((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    if (detailsIncident?.id === updated.id) {
      setDetailsIncident(updated);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All');
    setSelectedPriority('All');
    setSelectedType('All');
    setSelectedDateRange('All');
    setSortBy('newest');
    setCurrentPage(1);
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredIncidents = useMemo(() => {
    return incidents
      .filter((inc) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchId = inc.id.toLowerCase().includes(q);
          const matchTitle = inc.title.toLowerCase().includes(q);
          const matchDesc = inc.description.toLowerCase().includes(q);
          const matchBuilding = inc.location.building.toLowerCase().includes(q);
          const matchReporter = inc.reportedBy.name.toLowerCase().includes(q);
          const matchOfficer = inc.assignedSecurity?.name.toLowerCase().includes(q) || false;
          if (!matchId && !matchTitle && !matchDesc && !matchBuilding && !matchReporter && !matchOfficer) {
            return false;
          }
        }

        // Status
        if (selectedStatus !== 'All' && inc.status !== selectedStatus) {
          return false;
        }

        // Priority
        if (selectedPriority !== 'All' && inc.priority !== selectedPriority) {
          return false;
        }

        // Type
        if (selectedType !== 'All' && inc.type !== selectedType) {
          return false;
        }

        // Date Range
        if (selectedDateRange !== 'All') {
          const incDate = new Date(inc.reportedAt).getTime();
          const now = new Date('2026-10-02T12:00:00Z').getTime(); // Based on simulated current anchor
          const oneDay = 24 * 60 * 60 * 1000;
          if (selectedDateRange === 'Today' && now - incDate > oneDay) return false;
          if (selectedDateRange === '7days' && now - incDate > 7 * oneDay) return false;
          if (selectedDateRange === '30days' && now - incDate > 30 * oneDay) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime();
        }
        if (sortBy === 'oldest') {
          return new Date(a.reportedAt).getTime() - new Date(b.reportedAt).getTime();
        }
        if (sortBy === 'priority_high') {
          const priorityWeight: Record<IncidentPriority, number> = {
            Critical: 4,
            High: 3,
            Medium: 2,
            Low: 1
          };
          return priorityWeight[b.priority] - priorityWeight[a.priority];
        }
        if (sortBy === 'priority_low') {
          const priorityWeight: Record<IncidentPriority, number> = {
            Critical: 4,
            High: 3,
            Medium: 2,
            Low: 1
          };
          return priorityWeight[a.priority] - priorityWeight[b.priority];
        }
        return 0;
      });
  }, [incidents, searchQuery, selectedStatus, selectedPriority, selectedType, selectedDateRange, sortBy]);

  // Pagination slice
  const totalPages = Math.ceil(filteredIncidents.length / itemsPerPage) || 1;
  const paginatedIncidents = filteredIncidents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Campus Incident Command & Dispatch
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time emergency dispatch queue, status verification, and officer coordination.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={loadIncidents}
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
          >
            Refresh Feed
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-soft space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <Input
              placeholder="Search by ID, keyword, building, officer..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>

          {/* Status Filter */}
          <div>
            <Select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              options={[
                { label: 'All Statuses', value: 'All' },
                { label: 'Pending', value: 'Pending' },
                { label: 'In Progress', value: 'In Progress' },
                { label: 'Resolved', value: 'Resolved' }
              ]}
            />
          </div>

          {/* Priority Filter */}
          <div>
            <Select
              value={selectedPriority}
              onChange={(e) => {
                setSelectedPriority(e.target.value);
                setCurrentPage(1);
              }}
              options={[
                { label: 'All Priorities', value: 'All' },
                { label: 'Critical', value: 'Critical' },
                { label: 'High', value: 'High' },
                { label: 'Medium', value: 'Medium' },
                { label: 'Low', value: 'Low' }
              ]}
            />
          </div>

          {/* Incident Type Filter */}
          <div>
            <Select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              options={[
                { label: 'All Categories', value: 'All' },
                { label: 'Medical Emergency', value: 'Medical Emergency' },
                { label: 'Fire / Hazard', value: 'Fire / Hazard' },
                { label: 'Security Threat', value: 'Security Threat' },
                { label: 'Facility & Utility', value: 'Facility & Utility' },
                { label: 'Theft & Lost Property', value: 'Theft & Lost Property' },
                { label: 'Unauthorized Access', value: 'Unauthorized Access' },
                { label: 'Suspicious Activity', value: 'Suspicious Activity' }
              ]}
            />
          </div>

          {/* Sort By */}
          <div>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { label: 'Newest First', value: 'newest' },
                { label: 'Oldest First', value: 'oldest' },
                { label: 'Highest Priority', value: 'priority_high' },
                { label: 'Lowest Priority', value: 'priority_low' }
              ]}
            />
          </div>
        </div>

        {/* Active Filters / Reset row */}
        {(searchQuery || selectedStatus !== 'All' || selectedPriority !== 'All' || selectedType !== 'All' || sortBy !== 'newest') && (
          <div className="pt-2 flex items-center justify-between flex-wrap gap-2 text-xs border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Filter className="w-3.5 h-3.5" />
              <span>Showing {filteredIncidents.length} matching incidents</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-brand-600 hover:text-brand-800 transition"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Main Table / Grid Container */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden">
        {isLoading ? (
          <LoadingSpinner label="Loading campus incidents..." fullHeight />
        ) : filteredIncidents.length === 0 ? (
          <EmptyState
            title="No Incidents Found"
            description="No incidents matched your query and filter criteria. Try resetting or adjusting the search term."
            actionLabel="Reset Filters"
            onAction={resetFilters}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Incident ID</th>
                  <th className="py-3.5 px-3">Type & Details</th>
                  <th className="py-3.5 px-3">Location</th>
                  <th className="py-3.5 px-3">Priority</th>
                  <th className="py-3.5 px-3">Reported By</th>
                  <th className="py-3.5 px-3">Assigned Security</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-3">Reported Time</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedIncidents.map((incident) => (
                  <tr
                    key={incident.id}
                    onClick={() => {
                      setDetailsIncident(incident);
                      setIsDetailsOpen(true);
                    }}
                    className="hover:bg-slate-50/80 transition cursor-pointer group"
                  >
                    {/* ID */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-slate-900 group-hover:text-brand-600 transition">
                        {incident.id}
                      </span>
                    </td>

                    {/* Type & Title */}
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-900 max-w-xs truncate">
                        {incident.title}
                      </div>
                      <span className="text-[11px] text-slate-500 mt-0.5 block truncate max-w-xs">
                        {incident.type}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-3 text-slate-600">
                      <div className="flex items-center gap-1 font-medium text-slate-800">
                        <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        <span className="truncate max-w-[150px]">{incident.location.building}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate max-w-[150px]">
                        {incident.location.roomOrArea}
                      </span>
                    </td>

                    {/* Priority Badge */}
                    <td className="py-3.5 px-3">
                      <Badge variant="priority" value={incident.priority} size="sm" />
                    </td>

                    {/* Reported By */}
                    <td className="py-3.5 px-3">
                      <div className="font-medium text-slate-800">{incident.reportedBy.name}</div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {incident.reportedBy.role}
                      </span>
                    </td>

                    {/* Assigned Security */}
                    <td className="py-3.5 px-3">
                      {incident.assignedSecurity ? (
                        <div>
                          <span className="font-semibold text-slate-900 block truncate max-w-[130px]">
                            {incident.assignedSecurity.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            #{incident.assignedSecurity.badgeNumber}
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setAssignIncident(incident);
                            setIsAssignOpen(true);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition"
                        >
                          <Shield className="w-3 h-3" />
                          Assign
                        </button>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3">
                      <Badge variant="status" value={incident.status} size="sm" />
                    </td>

                    {/* Date/Time */}
                    <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>
                          {new Date(incident.reportedAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {new Date(incident.reportedAt).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div
                        className="flex items-center justify-end gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            setDetailsIncident(incident);
                            setIsDetailsOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 transition"
                          title="View Full Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setAssignIncident(incident);
                            setIsAssignOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition"
                          title="Assign or Reassign Officer"
                        >
                          <Shield className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setStatusIncident(incident);
                            setIsStatusOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-slate-100 transition"
                          title="Update Status"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {filteredIncidents.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-slate-500">
              Showing <span className="font-semibold text-slate-800">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="font-semibold text-slate-800">
                {Math.min(currentPage * itemsPerPage, filteredIncidents.length)}
              </span>{' '}
              of <span className="font-semibold text-slate-800">{filteredIncidents.length}</span> incidents
            </span>

            <div className="flex items-center gap-1.5">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="px-3 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <IncidentDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        incident={detailsIncident}
        onIncidentUpdated={handleIncidentUpdated}
      />

      <AssignSecurityModal
        isOpen={isAssignOpen}
        onClose={() => setIsAssignOpen(false)}
        incident={assignIncident}
        onAssigned={handleIncidentUpdated}
      />

      <ChangePriorityModal
        isOpen={isPriorityOpen}
        onClose={() => setIsPriorityOpen(false)}
        incident={priorityIncident}
        onUpdated={handleIncidentUpdated}
      />

      <ChangeStatusModal
        isOpen={isStatusOpen}
        onClose={() => setIsStatusOpen(false)}
        incident={statusIncident}
        onUpdated={handleIncidentUpdated}
      />
    </div>
  );
};
