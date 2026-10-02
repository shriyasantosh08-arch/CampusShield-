import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  Calendar,
  Clock,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Users,
  Activity,
  Printer,
  ChevronDown,
  Filter
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { StatsCard } from '../../components/common/StatsCard';
import { Button } from '../../components/common/Button';
import { Select } from '../../components/common/Select';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { reportService } from '../../services/reportService';
import { incidentService } from '../../services/incidentService';
import {
  AnalyticsOverview,
  IncidentTrendPoint,
  CategoryMetric,
  PriorityMetric,
  OfficerPerformance
} from '../../types/report';
import { useToast } from '../../context/ToastContext';

export const ReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);
  const [trendData, setTrendData] = useState<IncidentTrendPoint[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryMetric[]>([]);
  const [priorityData, setPriorityData] = useState<PriorityMetric[]>([]);
  const [officerPerformance, setOfficerPerformance] = useState<OfficerPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    loadReports();
  }, [dateRange]);

  const loadReports = async () => {
    setIsLoading(true);
    try {
      const [stats, trends, cats, prios, officers] = await Promise.all([
        reportService.getAnalytics(dateRange),
        reportService.getTrendData(dateRange),
        reportService.getCategoryData(),
        reportService.getPriorityData(),
        reportService.getOfficerPerformance()
      ]);

      setAnalytics(stats);
      setTrendData(trends);
      setCategoryData(cats);
      setPriorityData(prios);
      setOfficerPerformance(officers);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = async () => {
    const incidents = await incidentService.getIncidents();
    const exportData = incidents.map((i) => ({
      'Incident ID': i.id,
      'Title': i.title,
      'Category': i.type,
      'Priority': i.priority,
      'Status': i.status,
      'Building': i.location.building,
      'Area': i.location.roomOrArea,
      'Reporter': i.reportedBy.name,
      'Reporter Role': i.reportedBy.role,
      'Assigned Officer': i.assignedSecurity?.name || 'Unassigned',
      'Reported Time': i.reportedAt,
      'Resolved Time': i.resolvedAt || 'N/A'
    }));

    reportService.exportCSVReport(exportData, `campusshield_incident_report_${dateRange}.csv`);
    showToast({
      type: 'success',
      title: 'Report Exported',
      message: 'Full incidents dataset downloaded as CSV spreadsheet.'
    });
  };

  const handleDownloadPDF = () => {
    showToast({
      type: 'info',
      title: 'Generating PDF Summary',
      message: 'Compiling campus safety intelligence report with executive summary charts...'
    });
    setTimeout(() => {
      window.print();
    }, 800);
  };

  if (isLoading || !analytics) {
    return <LoadingSpinner label="Compiling analytics and safety intelligence reports..." fullHeight />;
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Export Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Campus Safety Intelligence & Reports
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Data-driven insights into incident frequency, responder efficacy, and resolution velocity.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* Date Range Selector */}
          <div className="w-36">
            <Select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              options={[
                { label: 'Today', value: 'today' },
                { label: 'Last 7 Days', value: '7days' },
                { label: 'Last 30 Days', value: '30days' },
                { label: 'This Semester', value: 'semester' },
                { label: 'Full Year', value: 'year' }
              ]}
            />
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportCSV}
            leftIcon={<FileSpreadsheet className="w-4 h-4 text-emerald-600" />}
          >
            Export CSV
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleDownloadPDF}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Download Summary
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatsCard
          title="Total Reports Logged"
          value={analytics.totalIncidents}
          icon={<Activity className="w-6 h-6 text-brand-600" />}
          trend={{ value: analytics.totalIncidentsChange, isPositive: true }}
          colorVariant="brand"
        />
        <StatsCard
          title="Clearance & Resolution Rate"
          value={`${analytics.resolutionRate}%`}
          icon={<ShieldCheck className="w-6 h-6 text-emerald-600" />}
          trend={{ value: analytics.resolutionRateChange, isPositive: true }}
          colorVariant="emerald"
        />
        <StatsCard
          title="Avg. Time to Resolution"
          value={analytics.avgResolutionTime}
          icon={<Clock className="w-6 h-6 text-blue-600" />}
          trend={{ value: '-3.2 mins faster', isPositive: true }}
          colorVariant="brand"
        />
        <StatsCard
          title="Avg. First-Response Time"
          value={analytics.avgFirstResponseTime}
          icon={<TrendingUp className="w-6 h-6 text-amber-600" />}
          trend={{ value: '< 6 min SLA achieved', isPositive: true }}
          colorVariant="amber"
        />
      </div>

      {/* Charts Section 1: Timeline Trend & Incident Breakdown by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Area Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-soft">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Incident Volume & Resolution Velocity Over Time
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparison of daily incoming incidents vs. resolved incidents
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> New Reports
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Successfully Resolved
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="totalReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="resolvedReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
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
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#totalReports)"
                  name="New Reports"
                />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#resolvedReports)"
                  name="Resolved"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Donut (1 col) */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-soft flex flex-col justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Severity Distribution
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Distribution by priority classification</p>
          </div>

          <div className="h-52 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any, name: any) => [`${val} cases`, name]}
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

          <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-100 pt-3">
            {priorityData.map((p) => (
              <div key={p.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-slate-600 font-medium">{p.name}</span>
                <span className="text-slate-400 font-mono ml-auto">{p.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section 2: Category Bar Chart & Responder Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Horizontal Bar Chart (1 col) */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-soft">
          <div className="mb-4">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Incidents by Campus Category
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Volume comparison by incident classification</p>
          </div>

          <div className="space-y-3">
            {categoryData.map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-800">{cat.name}</span>
                  <span className="font-mono text-slate-500">{cat.count} cases ({cat.percentage}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${cat.percentage * 2.5}%`,
                      backgroundColor: cat.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Responder Performance Table (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden flex flex-col">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Security Responder Response Efficacy & Performance
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluation of field dispatch handling speed, active cases, and success metrics
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">
              Active Shift Roster
            </span>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Officer Name</th>
                  <th className="py-3 px-3">Badge ID</th>
                  <th className="py-3 px-3">Incidents Handled</th>
                  <th className="py-3 px-3">Avg. Response Time</th>
                  <th className="py-3 px-3">Clearance Rate</th>
                  <th className="py-3 px-4 text-right">Duty Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {officerPerformance.map((officer) => (
                  <tr key={officer.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">{officer.name}</td>
                    <td className="py-3 px-3 font-mono text-slate-500">{officer.badgeNumber}</td>
                    <td className="py-3 px-3 font-semibold text-slate-800">
                      {officer.incidentsHandled} dispatched
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 font-mono font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                        <Clock className="w-3 h-3 text-brand-500" />
                        {officer.avgResponseTime}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-emerald-700">{officer.resolutionRate}%</span>
                        <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden hidden sm:block">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${officer.resolutionRate}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          officer.status === 'Responding'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : officer.status === 'On Patrol'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {officer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
