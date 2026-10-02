import { AdminUser } from '../types/auth';
import { storage } from './storage';

const AUTH_USER_KEY = 'campusshield_admin_user';

export const DEFAULT_ADMIN: AdminUser = {
  id: 'USR-ADM-01',
  name: 'Chief Sarah Connor',
  email: 'admin@campusshield.edu',
  role: 'SuperAdmin',
  badgeId: 'ADM-001',
  title: 'Director of Campus Emergency Operations',
  department: 'Emergency & Safety Command',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
};

export const authService = {
  getCurrentUser: (): AdminUser | null => {
    return storage.get<AdminUser | null>(AUTH_USER_KEY, DEFAULT_ADMIN);
  },

  login: async (email: string, password: string, rememberMe = true): Promise<AdminUser> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Allow default admin credentials or any campus admin format
    if (
      (email.toLowerCase() === 'admin@campusshield.edu' && password === 'admin123') ||
      (email.includes('@campusshield.edu') && password.length >= 6)
    ) {
      const user: AdminUser = {
        ...DEFAULT_ADMIN,
        email: email.toLowerCase()
      };
      if (rememberMe) {
        storage.set(AUTH_USER_KEY, user);
      } else {
        sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      }
      return user;
    }

    throw new Error('Invalid email or password. Use admin@campusshield.edu / admin123');
  },

  logout: (): void => {
    storage.remove(AUTH_USER_KEY);
    sessionStorage.removeItem(AUTH_USER_KEY);
  },

  isAuthenticated: (): boolean => {
    const localUser = localStorage.getItem(AUTH_USER_KEY);
    const sessionUser = sessionStorage.getItem(AUTH_USER_KEY);
    return Boolean(localUser || sessionUser);
  }
};
