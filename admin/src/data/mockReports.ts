import { AnalyticsOverview, IncidentTrendPoint, CategoryMetric, PriorityMetric, OfficerPerformance } from '../types/report';

export const INITIAL_ANALYTICS: AnalyticsOverview = {
  totalIncidents: 148,
  totalIncidentsChange: '+8.4% vs last month',
  resolutionRate: 94.6,
  resolutionRateChange: '+2.1% improvement',
  avgResolutionTime: '24.2 mins',
  avgResolutionTimeMinutes: 24.2,
  avgFirstResponseTime: '5.8 mins',
  activeDispatches: 4
};

export const TREND_DATA_14_DAYS: IncidentTrendPoint[] = [
  { date: 'Sep 19', total: 6, critical: 1, resolved: 6 },
  { date: 'Sep 20', total: 9, critical: 2, resolved: 8 },
  { date: 'Sep 21', total: 4, critical: 0, resolved: 4 },
  { date: 'Sep 22', total: 8, critical: 1, resolved: 8 },
  { date: 'Sep 23', total: 12, critical: 3, resolved: 11 },
  { date: 'Sep 24', total: 7, critical: 1, resolved: 7 },
  { date: 'Sep 25', total: 5, critical: 0, resolved: 5 },
  { date: 'Sep 26', total: 11, critical: 2, resolved: 10 },
  { date: 'Sep 27', total: 14, critical: 3, resolved: 13 },
  { date: 'Sep 28', total: 8, critical: 1, resolved: 8 },
  { date: 'Sep 29', total: 10, critical: 2, resolved: 9 },
  { date: 'Sep 30', total: 13, critical: 2, resolved: 12 },
  { date: 'Oct 01', total: 11, critical: 2, resolved: 10 },
  { date: 'Oct 02', total: 7, critical: 2, resolved: 3 }
];

export const CATEGORY_METRICS: CategoryMetric[] = [
  { name: 'Medical Emergency', count: 38, color: '#ef4444', percentage: 26 },
  { name: 'Fire / Hazard', count: 22, color: '#f97316', percentage: 15 },
  { name: 'Security Threat', count: 29, color: '#eab308', percentage: 20 },
  { name: 'Facility & Utility', count: 32, color: '#3b82f6', percentage: 22 },
  { name: 'Theft & Lost', count: 18, color: '#8b5cf6', percentage: 12 },
  { name: 'Unauthorized Access', count: 9, color: '#06b6d4', percentage: 5 }
];

export const PRIORITY_METRICS: PriorityMetric[] = [
  { name: 'Critical', count: 18, color: '#dc2626' },
  { name: 'High', count: 42, color: '#ea580c' },
  { name: 'Medium', count: 64, color: '#d97706' },
  { name: 'Low', count: 24, color: '#16a34a' }
];

export const STATUS_METRICS = [
  { name: 'Resolved', count: 126, color: '#10b981' },
  { name: 'In Progress', count: 14, color: '#2563eb' },
  { name: 'Pending', count: 8, color: '#f59e0b' }
];

export const OFFICER_PERFORMANCE_DATA: OfficerPerformance[] = [
  {
    id: 'SEC-101',
    name: 'Capt. Marcus Vance',
    badgeNumber: 'CS-041',
    incidentsHandled: 42,
    avgResponseTime: '4.2 mins',
    resolutionRate: 98.0,
    status: 'Responding'
  },
  {
    id: 'SEC-104',
    name: 'Officer Elena Rostova',
    badgeNumber: 'CS-088',
    incidentsHandled: 39,
    avgResponseTime: '4.8 mins',
    resolutionRate: 97.4,
    status: 'Responding'
  },
  {
    id: 'SEC-102',
    name: 'Sgt. David Chen',
    badgeNumber: 'CS-012',
    incidentsHandled: 36,
    avgResponseTime: '6.1 mins',
    resolutionRate: 94.4,
    status: 'On Patrol'
  },
  {
    id: 'SEC-103',
    name: 'Officer Ronald Hicks',
    badgeNumber: 'CS-067',
    incidentsHandled: 27,
    avgResponseTime: '7.5 mins',
    resolutionRate: 92.6,
    status: 'Available'
  },
  {
    id: 'SEC-105',
    name: 'Officer Maya Patel',
    badgeNumber: 'CS-095',
    incidentsHandled: 18,
    avgResponseTime: '6.9 mins',
    resolutionRate: 94.1,
    status: 'Available'
  }
];
