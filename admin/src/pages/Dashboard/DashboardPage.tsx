import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Users,
  BarChart3,
  ArrowRight,
  Shield,
  Eye,
  Activity,
  PlusCircle,
  Radio,
  MapPin,
  ExternalLink
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { StatsCard } from '../../components/common/StatsCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Incident } from '../../types/incident';
import { SecurityOfficer } from '../../types/user';
import { incidentService } from '../../services/incidentService';
import { userService } from '../../services/userService';
import { reportService } from '../../services/reportService';
import { IncidentDetailsModal } from '../../components/incidents/IncidentDetailsModal';
import { AssignSecurityModal } from '../../components/incidents/AssignSecurityModal';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [officers, setOfficers] = useState<SecurityOfficer[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [priorityData, setPriorityData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [assignTargetIncident, setAssignTargetIncident] = useState<Incident | null>(null);
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [incList, offList, trends, cats, prios] = await Promise.all([
        incidentService.getIncidents(),
        userService.getSecurityOfficers(),
        reportService.getTrendData(),
        reportService.getCategoryData(),
        reportService.getPriorityData()
      ]);

      setIncidents(incList);
      setOfficers(offList);
      setTrendData(trends);
      setCategoryData(cats);
      setPriorityData(prios);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncidentUpdate = (updated: Incident) => {
    setIncidents((prev) => prev.map((inc) => (inc.id === updated.id ? updated : inc)));
    if (selectedIncident?.id === updated.id) {
      setSelectedIncident(updated);
    }
  };

  // KPIs
  const totalCount = incidents.length;
  const pendingCount = incidents.filter((i) => i.status === 'Pending').length;
  const inProgressCount = incidents.filter((i) => i.status === 'In Progress').length;
  const resolvedCount = incidents.filter((i) => i.status === 'Resolved').length;

  if (isLoading) {
    return <LoadingSpinner label="Initializing Emergency Operations Command..." fullHeight />;
  }

  return (
    <div className="space-y-6">
      {/* Top Banner Alert / EOC Status */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 text-white shadow-card border border-navy-700/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-400/40 flex items-center justify-center text-brand-400 flex-shrink-0">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                Active Campus Emergency Operations Center
              </h2>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold uppercase tracking-wider border border-emerald-500/30">
                Live Telemetry
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Monitoring all 5 campus sectors. Response units on high alert for Science Complex B.
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/incidents')}
            leftIcon={<AlertTriangle className="w-3.5 h-3.5" />}
          >
            View Incidents
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/users')}
            leftIcon={<Users className="w-3.5 h-3.5" />}
          >
            Manage Users
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/reports')}
            leftIcon={<BarChart3 className="w-3.5 h-3.5" />}
          >
            Analytics
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatsCard
          title="Total Incidents"
          value={totalCount}
          icon={<Shield className="w-6 h-6 text-brand-600" />}
          trend={{ value: '+8.4%', isPositive: true, label: 'this cycle' }}
          colorVariant="brand"
          onClick={() => navigate('/incidents')}
        />
        <StatsCard
          title="Pending Assignment"
          value={pendingCount}
          icon={<AlertTriangle className="w-6 h-6 text-amber-600" />}
          trend={{ value: '-2 vs yesterday', isPositive: true, label: 'queue clearing' }}
          colorVariant="amber"
          onClick={() => navigate('/incidents?status=Pending')}
        />
        <StatsCard
          title="Active In Progress"
          value={inProgressCount}
          icon={<Clock className="w-6 h-6 text-blue-600" />}
          trend={{ value: '4 Dispatched', isNeutral: true, label: 'tactical units' }}
          colorVariant="brand"
          onClick={() => navigate('/incidents?status=In Progress')}
        />
        <StatsCard
          title="Resolved Cases"
          value={resolvedCount}
          icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />}
          trend={{ value: '94.2%', isPositive: true, label: 'clearance rate' }}
          colorVariant="emerald"
          onClick={() => navigate('/incidents?status=Resolved')}
        />
      </div>

      {/* Charts Section: Trend Chart & Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incident Trend (2 Cols) */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-soft">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand-600" />
                Incident Frequency Trend (Last 14 Days)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Daily total reports vs. high/critical priority dispatches
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-500" /> Total
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Critical
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="totalColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="critColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#e2e8f0" />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} stroke="#e2e8f0" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#totalColor)"
                  name="Total Incidents"
                />
                <Area
                  type="monotone"
                  dataKey="critical"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#critColor)"
                  name="Critical Priority"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown (1 Col) */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-soft flex flex-col">
          <div className="mb-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Incidents by Category
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Distribution across incident types</p>
          </div>

          <div className="h-48 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="count"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any, name: any) => [`${val} reports`, name]}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Mini Category Legend list */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
            {categoryData.slice(0, 4).map((cat) => (
              <div key={cat.name} className="flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="truncate text-slate-600">{cat.name}</span>
                <span className="text-slate-400 font-mono ml-auto">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Row: Recent Incidents Table & Security Officer Status Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Incidents Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Recent Incident Log
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time feed of latest campus reports and dispatch status
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/incidents')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Full Queue
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">ID & Title</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Priority</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Responder</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {incidents.slice(0, 5).map((incident) => (
                  <tr
                    key={incident.id}
                    className="hover:bg-slate-50/80 transition cursor-pointer group"
                    onClick={() => {
                      setSelectedIncident(incident);
                      setIsDetailsOpen(true);
                    }}
                  >
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-brand-700">{incident.id}</div>
                      <div className="font-semibold text-slate-900 max-w-xs truncate mt-0.5">
                        {incident.title}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        <span className="truncate max-w-[140px]">{incident.location.building}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {incident.location.roomOrArea}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant="priority" value={incident.priority} size="sm" />
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant="status" value={incident.status} size="sm" />
                    </td>
                    <td className="py-3 px-3 text-slate-700">
                      {incident.assignedSecurity ? (
                        <div className="truncate max-w-[130px] font-medium text-slate-900">
                          {incident.assignedSecurity.name}
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setAssignTargetIncident(incident);
                            setIsAssignOpen(true);
                          }}
                          className="text-[11px] font-semibold text-brand-600 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 px-2 py-0.5 rounded transition"
                        >
                          + Assign
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedIncident(incident);
                          setIsDetailsOpen(true);
                        }}
                        className="p-1 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 transition"
                        title="View Incident Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Personnel Availability Summary (1 Col) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden flex flex-col">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Security Personnel Deployment
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Live duty status across zones</p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-navy-900 text-white px-2 py-0.5 rounded">
              {officers.filter((o) => o.status !== 'Off Duty').length} / {officers.length} On Duty
            </span>
          </div>

          <div className="p-3 sm:p-4 space-y-2.5 overflow-y-auto max-h-[380px]">
            {officers.map((officer) => (
              <div
                key={officer.id}
                className="p-3 rounded-xl border border-slate-200/80 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{officer.name}</h5>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                      Badge #{officer.badgeNumber} • {officer.rank}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      officer.status === 'Available'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : officer.status === 'Responding'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 animate-pulse'
                        : officer.status === 'On Patrol'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {officer.status}
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
                  <span className="truncate max-w-[170px] text-slate-500">
                    {officer.assignedZone}
                  </span>
                  <span className="font-mono text-brand-700 font-semibold">
                    {officer.activeIncidents} active
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center mt-auto">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => navigate('/users?role=Security')}
            >
              Open Security Roster
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <IncidentDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        incident={selectedIncident}
        onIncidentUpdated={handleIncidentUpdate}
      />

      <AssignSecurityModal
        isOpen={isAssignOpen}
        onClose={() => setIsAssignOpen(false)}
        incident={assignTargetIncident}
        onAssigned={(updated) => {
          handleIncidentUpdate(updated);
        }}
      />
    </div>
  );
};
