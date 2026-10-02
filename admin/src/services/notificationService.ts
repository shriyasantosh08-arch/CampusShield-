import { NotificationItem } from '../types/notification';
import { INITIAL_NOTIFICATIONS } from '../data/mockNotifications';
import { storage } from './storage';

const NOTIFICATIONS_STORAGE_KEY = 'campusshield_notifications';

export const notificationService = {
  getNotifications: async (): Promise<NotificationItem[]> => {
    return storage.get<NotificationItem[]>(NOTIFICATIONS_STORAGE_KEY, INITIAL_NOTIFICATIONS);
  },

  markAsRead: async (id: string): Promise<NotificationItem[]> => {
    const list = storage.get<NotificationItem[]>(NOTIFICATIONS_STORAGE_KEY, INITIAL_NOTIFICATIONS);
    const updated = list.map((item) => (item.id === id ? { ...item, read: true } : item));
    storage.set(NOTIFICATIONS_STORAGE_KEY, updated);
    return updated;
  },

  markAllAsRead: async (): Promise<NotificationItem[]> => {
    const list = storage.get<NotificationItem[]>(NOTIFICATIONS_STORAGE_KEY, INITIAL_NOTIFICATIONS);
    const updated = list.map((item) => ({ ...item, read: true }));
    storage.set(NOTIFICATIONS_STORAGE_KEY, updated);
    return updated;
  }
};
