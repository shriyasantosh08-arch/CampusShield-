export type IncidentStatus = 'Pending' | 'In Progress' | 'Resolved';

export type IncidentPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export type IncidentType = 
  | 'Medical Emergency'
  | 'Fire / Hazard'
  | 'Security Threat'
  | 'Facility & Utility'
  | 'Theft & Lost Property'
  | 'Unauthorized Access'
  | 'Suspicious Activity';

export interface IncidentTimelineEvent {
  status: IncidentStatus | 'Reported' | 'Assigned';
  timestamp: string;
  description: string;
  actor: string;
  badge?: string;
}

export interface Incident {
  id: string;
  title: string;
  type: IncidentType;
  description: string;
  location: {
    building: string;
    roomOrArea: string;
    coordinates?: { lat: number; lng: number };
    landmark?: string;
  };
  priority: IncidentPriority;
  status: IncidentStatus;
  reportedBy: {
    name: string;
    role: 'Student' | 'Faculty' | 'Staff' | 'Visitor';
    id: string;
    email: string;
    phone: string;
  };
  assignedSecurity?: {
    id: string;
    name: string;
    badgeNumber: string;
    phone: string;
    assignedAt: string;
  };
  reportedAt: string;
  updatedAt: string;
  resolvedAt?: string;
  imageUrl?: string;
  timeline: IncidentTimelineEvent[];
  notes?: string[];
}

export interface IncidentFilterOptions {
  search: string;
  status: IncidentStatus | 'All';
  priority: IncidentPriority | 'All';
  type: IncidentType | 'All';
  dateRange: 'All' | 'Today' | '7days' | '30days';
  sortBy: 'newest' | 'oldest' | 'priority_high' | 'priority_low';
}
