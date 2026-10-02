export type IncidentPriority = 'Critical' | 'High' | 'Medium' | 'Low';

export type IncidentStatus = 
  | 'REPORTED'
  | 'RECEIVED'
  | 'ASSIGNED'
  | 'IN PROGRESS'
  | 'RESOLVED';

export type IncidentCategory =
  | 'Medical Emergency'
  | 'Fire'
  | 'Accident'
  | 'Security Issue'
  | 'Electrical Hazard'
  | 'Infrastructure Problem'
  | 'Safety Concern'
  | 'Other';

export interface LocationData {
  latitude: number | null;
  longitude: number | null;
  accuracy?: number | null;
  buildingOrArea: string;
  landmarkDetails?: string;
  isAutoDetected: boolean;
  detectedAt?: string;
}

export interface EvidenceItem {
  id: string;
  name: string;
  size: number;
  type: string;
  previewUrl: string;
  uploadedAt: string;
}

export interface IncidentTimelineEvent {
  status: IncidentStatus;
  label: string;
  timestamp?: string;
  completed: boolean;
  isCurrent: boolean;
  notes?: string;
  actorName?: string;
}

export interface Incident {
  id: string; // e.g. "CS-2026-0042"
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  category: IncidentCategory;
  title: string;
  description: string;
  priority: IncidentPriority;
  location: LocationData;
  evidence: EvidenceItem[];
  status: IncidentStatus;
  createdAt: string;
  updatedAt: string;
  assignedTo?: {
    name: string;
    unit: string;
    phone?: string;
    badgeNumber?: string;
    assignedAt?: string;
  };
  resolutionDetails?: {
    resolvedAt: string;
    resolvedBy: string;
    resolutionNotes: string;
  };
  timeline: IncidentTimelineEvent[];
}

export interface CreateIncidentDTO {
  category: IncidentCategory;
  title: string;
  description: string;
  priority: IncidentPriority;
  location: LocationData;
  evidence: EvidenceItem[];
}
