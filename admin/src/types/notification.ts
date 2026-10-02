export type NotificationType = 
  | 'critical_incident' 
  | 'incident_assigned' 
  | 'incident_resolved' 
  | 'officer_status_update'
  | 'system_alert';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  incidentId?: string;
  priority?: 'Critical' | 'High' | 'Medium' | 'Low';
}
