import { StudentNotification } from '../types/notification';

const NOTIFICATIONS_KEY = 'campusshield_notifications_store';

const SEED_NOTIFICATIONS: StudentNotification[] = [
  {
    id: 'notif_1',
    studentId: 'std_alex_2026',
    incidentId: 'CS-2026-0042',
    title: 'Incident In Progress',
    message: 'Facilities & Emergency Response Unit (Officer Marcus) is actively resolving the electrical hazard at Science Complex Block B.',
    type: 'incident_in_progress',
    read: false,
    createdAt: '2026-10-02T16:30:00Z',
    actionUrl: '/incidents/CS-2026-0042',
  },
  {
    id: 'notif_2',
    studentId: 'std_alex_2026',
    incidentId: 'CS-2026-0042',
    title: 'Incident Assigned',
    message: 'Your report CS-2026-0042 has been assigned to Rapid Response Unit 3.',
    type: 'incident_assigned',
    read: false,
    createdAt: '2026-10-02T16:22:00Z',
    actionUrl: '/incidents/CS-2026-0042',
  },
  {
    id: 'notif_3',
    studentId: 'std_alex_2026',
    incidentId: 'CS-2026-0042',
    title: 'Report Received',
    message: 'Your emergency report regarding exposed live wiring has been received and verified by Campus Dispatch.',
    type: 'incident_received',
    read: true,
    createdAt: '2026-10-02T16:16:00Z',
    actionUrl: '/incidents/CS-2026-0042',
  },
  {
    id: 'notif_4',
    studentId: 'std_alex_2026',
    incidentId: 'CS-2026-0038',
    title: 'Incident Resolved',
    message: 'Your incident CS-2026-0038 (Medical Emergency at Athletics Complex) has been marked as resolved.',
    type: 'incident_resolved',
    read: true,
    createdAt: '2026-09-29T15:10:00Z',
    actionUrl: '/incidents/CS-2026-0038',
  },
  {
    id: 'notif_5',
    studentId: 'std_alex_2026',
    title: 'Campus Weather Advisory',
    message: 'High wind warnings reported for West Quad. High-voltage exterior pathways have safety escorts available tonight.',
    type: 'campus_alert',
    read: true,
    createdAt: '2026-09-28T09:00:00Z',
  },
];

function getStoredNotifications(): StudentNotification[] {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY);
    if (!raw) {
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(SEED_NOTIFICATIONS));
      return SEED_NOTIFICATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_NOTIFICATIONS;
  }
}

function saveNotifications(notifications: StudentNotification[]): void {
  try {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  } catch (e) {
    console.error('Failed to save notifications:', e);
  }
}

export const notificationService = {
  async getNotifications(studentId: string): Promise<StudentNotification[]> {
    await new Promise((r) => setTimeout(r, 250));
    const all = getStoredNotifications();
    return all.filter((n) => n.studentId === studentId);
  },

  async markNotificationAsRead(notificationId: string): Promise<void> {
    const all = getStoredNotifications();
    const updated = all.map((n) => (n.id === notificationId ? { ...n, read: true } : n));
    saveNotifications(updated);
  },

  async markAllNotificationsAsRead(studentId: string): Promise<void> {
    const all = getStoredNotifications();
    const updated = all.map((n) => (n.studentId === studentId ? { ...n, read: true } : n));
    saveNotifications(updated);
  },

  async addNotification(notification: Omit<StudentNotification, 'id' | 'createdAt'>): Promise<StudentNotification> {
    const newNotif: StudentNotification = {
      ...notification,
      id: `notif_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const all = getStoredNotifications();
    saveNotifications([newNotif, ...all]);
    return newNotif;
  },
};
