export type UserRole = 'Student' | 'Security' | 'Admin';

export type UserStatus = 'Active' | 'Inactive' | 'Suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinedDate: string;
  department?: string;
  phone?: string;
  badgeNumber?: string; // For Security personnel
  studentId?: string;   // For Students
  assignedIncidentsCount?: number;
  lastActive?: string;
}

export interface SecurityOfficer {
  id: string;
  name: string;
  badgeNumber: string;
  rank: string;
  phone: string;
  email: string;
  status: 'Available' | 'Responding' | 'On Patrol' | 'Off Duty';
  assignedZone: string;
  activeIncidents: number;
}
