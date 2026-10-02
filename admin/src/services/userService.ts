import { User, SecurityOfficer } from '../types/user';
import { INITIAL_USERS, INITIAL_SECURITY_OFFICERS } from '../data/mockUsers';
import { storage } from './storage';

const USERS_STORAGE_KEY = 'campusshield_users';
const OFFICERS_STORAGE_KEY = 'campusshield_officers';

export const userService = {
  getUsers: async (): Promise<User[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return storage.get<User[]>(USERS_STORAGE_KEY, INITIAL_USERS);
  },

  getSecurityOfficers: async (): Promise<SecurityOfficer[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return storage.get<SecurityOfficer[]>(OFFICERS_STORAGE_KEY, INITIAL_SECURITY_OFFICERS);
  },

  addUser: async (userData: Omit<User, 'id' | 'joinedDate'>): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const users = storage.get<User[]>(USERS_STORAGE_KEY, INITIAL_USERS);
    const newId = `USR-${userData.role.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString().split('T')[0];

    const newUser: User = {
      ...userData,
      id: newId,
      joinedDate: now,
      lastActive: 'Just now'
    };

    users.unshift(newUser);
    storage.set(USERS_STORAGE_KEY, users);
    return newUser;
  },

  updateUser: async (id: string, updates: Partial<User>): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    const users = storage.get<User[]>(USERS_STORAGE_KEY, INITIAL_USERS);
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error('User not found');

    const updatedUser = { ...users[index], ...updates };
    users[index] = updatedUser;
    storage.set(USERS_STORAGE_KEY, users);
    return updatedUser;
  },

  toggleUserStatus: async (id: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    const users = storage.get<User[]>(USERS_STORAGE_KEY, INITIAL_USERS);
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error('User not found');

    const currentStatus = users[index].status;
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    users[index] = { ...users[index], status: newStatus };
    storage.set(USERS_STORAGE_KEY, users);
    return users[index];
  },

  deleteUser: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const users = storage.get<User[]>(USERS_STORAGE_KEY, INITIAL_USERS);
    const filtered = users.filter((u) => u.id !== id);
    storage.set(USERS_STORAGE_KEY, filtered);
  }
};
