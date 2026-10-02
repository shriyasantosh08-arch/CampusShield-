import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Incident, CreateIncidentDTO } from '../types/incident';
import { incidentService } from '../services/incidentService';
import { useAuth } from './AuthContext';
import { notificationService } from '../services/notificationService';

interface IncidentContextType {
  incidents: Incident[];
  isLoading: boolean;
  error: string | null;
  createIncident: (dto: CreateIncidentDTO) => Promise<Incident>;
  getIncidentById: (id: string) => Promise<Incident | null>;
  refreshIncidents: () => Promise<void>;
  activeCount: number;
  resolvedCount: number;
  totalCount: number;
}

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

export const IncidentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { student } = useAuth();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIncidents = useCallback(async () => {
    if (!student) {
      setIncidents([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await incidentService.getStudentIncidents(student.id);
      setIncidents(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch incidents.');
    } finally {
      setIsLoading(false);
    }
  }, [student]);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  const createIncident = async (dto: CreateIncidentDTO): Promise<Incident> => {
    if (!student) {
      throw new Error('You must be logged in to report an incident.');
    }
    setIsLoading(true);
    try {
      const created = await incidentService.createIncident(dto, student);
      setIncidents((prev) => [created, ...prev]);

      // Automatically push confirmation notification to student
      await notificationService.addNotification({
        studentId: student.id,
        incidentId: created.id,
        title: 'Emergency Report Dispatched',
        message: `Your incident report ${created.id} (${created.category}) was received by Campus Safety.`,
        type: 'incident_received',
        read: false,
        actionUrl: `/incidents/${created.id}`,
      });

      return created;
    } finally {
      setIsLoading(false);
    }
  };

  const getIncidentById = async (id: string): Promise<Incident | null> => {
    if (!student) return null;
    return await incidentService.getIncidentById(id, student.id);
  };

  const activeCount = incidents.filter((i) => i.status !== 'RESOLVED').length;
  const resolvedCount = incidents.filter((i) => i.status === 'RESOLVED').length;
  const totalCount = incidents.length;

  return (
    <IncidentContext.Provider
      value={{
        incidents,
        isLoading,
        error,
        createIncident,
        getIncidentById,
        refreshIncidents: fetchIncidents,
        activeCount,
        resolvedCount,
        totalCount,
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
};

export const useIncidents = (): IncidentContextType => {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncidents must be used within an IncidentProvider');
  }
  return context;
};
