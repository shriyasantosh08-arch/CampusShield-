export interface AnalyticsOverview {
  totalIncidents: number;
  totalIncidentsChange: string;
  resolutionRate: number; // e.g. 94.2%
  resolutionRateChange: string;
  avgResolutionTime: string; // e.g. "26 mins"
  avgResolutionTimeMinutes: number;
  avgFirstResponseTime: string; // e.g. "5.4 mins"
  activeDispatches: number;
}

export interface IncidentTrendPoint {
  date: string;
  total: number;
  critical: number;
  resolved: number;
}

export interface CategoryMetric {
  name: string;
  count: number;
  color: string;
  percentage: number;
}

export interface PriorityMetric {
  name: string;
  count: number;
  color: string;
}

export interface OfficerPerformance {
  id: string;
  name: string;
  badgeNumber: string;
  incidentsHandled: number;
  avgResponseTime: string;
  resolutionRate: number;
  status: string;
}
