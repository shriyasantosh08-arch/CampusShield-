export type NotificationType = 'incident_received' | 'incident_assigned' | 'incident_in_progress' | 'incident_resolved' | 'campus_alert' | 'system';

export interface StudentNotification {
  id: string;
  studentId: string;
  incidentId?: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}
