import { PriorityConfig } from '../types/priority';
import { INITIAL_PRIORITIES } from '../data/mockPriorities';
import { storage } from './storage';

const PRIORITIES_STORAGE_KEY = 'campusshield_priorities';

export const priorityService = {
  getPriorities: async (): Promise<PriorityConfig[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return storage.get<PriorityConfig[]>(PRIORITIES_STORAGE_KEY, INITIAL_PRIORITIES);
  },

  updatePriority: async (id: string, updates: Partial<PriorityConfig>): Promise<PriorityConfig> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const priorities = storage.get<PriorityConfig[]>(PRIORITIES_STORAGE_KEY, INITIAL_PRIORITIES);
    const index = priorities.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Priority not found');

    const updated = { ...priorities[index], ...updates };
    priorities[index] = updated;
    storage.set(PRIORITIES_STORAGE_KEY, priorities);
    return updated;
  }
};
