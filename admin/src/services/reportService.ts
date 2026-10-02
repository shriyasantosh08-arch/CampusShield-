import { 
  INITIAL_ANALYTICS, 
  TREND_DATA_14_DAYS, 
  CATEGORY_METRICS, 
  PRIORITY_METRICS, 
  OFFICER_PERFORMANCE_DATA 
} from '../data/mockReports';
import { AnalyticsOverview, IncidentTrendPoint, CategoryMetric, PriorityMetric, OfficerPerformance } from '../types/report';

export const reportService = {
  getAnalytics: async (_dateRange?: string): Promise<AnalyticsOverview> => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return INITIAL_ANALYTICS;
  },

  getTrendData: async (_dateRange?: string): Promise<IncidentTrendPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return TREND_DATA_14_DAYS;
  },

  getCategoryData: async (): Promise<CategoryMetric[]> => {
    return CATEGORY_METRICS;
  },

  getPriorityData: async (): Promise<PriorityMetric[]> => {
    return PRIORITY_METRICS;
  },

  getOfficerPerformance: async (): Promise<OfficerPerformance[]> => {
    return OFFICER_PERFORMANCE_DATA;
  },

  exportCSVReport: (data: any[], filename = 'campusshield_report.csv'): void => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((item) => 
      Object.values(item).map((val) => `"${String(val).replace(/"/g, '""')}"`).join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
