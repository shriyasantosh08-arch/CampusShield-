import { Incident, IncidentPriority, IncidentStatus, IncidentTimelineEvent } from '../types/incident';
import { INITIAL_INCIDENTS } from '../data/mockIncidents';
import { storage } from './storage';

const STORAGE_KEY = 'campusshield_incidents';

export const incidentService = {
  getIncidents: async (): Promise<Incident[]> => {
    // Simulate realistic network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return storage.get<Incident[]>(STORAGE_KEY, INITIAL_INCIDENTS);
  },

  getIncidentById: async (id: string): Promise<Incident | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const incidents = storage.get<Incident[]>(STORAGE_KEY, INITIAL_INCIDENTS);
    return incidents.find((i) => i.id === id) || null;
  },

  assignSecurity: async (
    incidentId: string,
    officer: { id: string; name: string; badgeNumber: string; phone: string },
    note?: string
  ): Promise<Incident> => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    const incidents = storage.get<Incident[]>(STORAGE_KEY, INITIAL_INCIDENTS);
    const index = incidents.findIndex((i) => i.id === incidentId);
    if (index === -1) throw new Error('Incident not found');

    const now = new Date().toISOString();
    const current = incidents[index];
    
    const timelineEvent: IncidentTimelineEvent = {
      status: 'Assigned',
      timestamp: now,
      description: `Assigned to ${officer.name} (${officer.badgeNumber}). ${note ? `Note: ${note}` : ''}`,
      actor: 'Admin Dispatcher',
      badge: 'ADM-001'
    };

    const updatedIncident: Incident = {
      ...current,
      status: current.status === 'Pending' ? 'In Progress' : current.status,
      assignedSecurity: {
        ...officer,
        assignedAt: now
      },
      updatedAt: now,
      timeline: [...current.timeline, timelineEvent],
      notes: note ? [...(current.notes || []), note] : current.notes
    };

    incidents[index] = updatedIncident;
    storage.set(STORAGE_KEY, incidents);
    return updatedIncident;
  },

  updatePriority: async (
    incidentId: string,
    priority: IncidentPriority,
    reason?: string
  ): Promise<Incident> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const incidents = storage.get<Incident[]>(STORAGE_KEY, INITIAL_INCIDENTS);
    const index = incidents.findIndex((i) => i.id === incidentId);
    if (index === -1) throw new Error('Incident not found');

    const now = new Date().toISOString();
    const current = incidents[index];

    const timelineEvent: IncidentTimelineEvent = {
      status: current.status,
      timestamp: now,
      description: `Priority reclassified from ${current.priority} to ${priority}.${reason ? ` Reason: ${reason}` : ''}`,
      actor: 'Admin Dispatcher',
      badge: 'ADM-001'
    };

    const updatedIncident: Incident = {
      ...current,
      priority,
      updatedAt: now,
      timeline: [...current.timeline, timelineEvent]
    };

    incidents[index] = updatedIncident;
    storage.set(STORAGE_KEY, incidents);
    return updatedIncident;
  },

  updateStatus: async (
    incidentId: string,
    status: IncidentStatus,
    resolutionNote?: string
  ): Promise<Incident> => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    const incidents = storage.get<Incident[]>(STORAGE_KEY, INITIAL_INCIDENTS);
    const index = incidents.findIndex((i) => i.id === incidentId);
    if (index === -1) throw new Error('Incident not found');

    const now = new Date().toISOString();
    const current = incidents[index];

    const timelineEvent: IncidentTimelineEvent = {
      status,
      timestamp: now,
      description: status === 'Resolved' 
        ? `Incident resolved. ${resolutionNote || 'All clear verified by responders.'}`
        : `Status changed to ${status}.`,
      actor: 'Admin Dispatcher',
      badge: 'ADM-001'
    };

    const updatedIncident: Incident = {
      ...current,
      status,
      resolvedAt: status === 'Resolved' ? now : current.resolvedAt,
      updatedAt: now,
      timeline: [...current.timeline, timelineEvent],
      notes: resolutionNote ? [...(current.notes || []), resolutionNote] : current.notes
    };

    incidents[index] = updatedIncident;
    storage.set(STORAGE_KEY, incidents);
    return updatedIncident;
  },

  resetDefaults: (): void => {
    storage.set(STORAGE_KEY, INITIAL_INCIDENTS);
  }
};
