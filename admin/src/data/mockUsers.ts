import { User, SecurityOfficer } from '../types/user';

export const INITIAL_SECURITY_OFFICERS: SecurityOfficer[] = [
  {
    id: 'SEC-101',
    name: 'Capt. Marcus Vance',
    badgeNumber: 'CS-041',
    rank: 'Captain / Tactical Lead',
    phone: '+1 (555) 345-6789',
    email: 'marcus.vance@campusshield.edu',
    status: 'Responding',
    assignedZone: 'Zone 1 - Science & Engineering Complex',
    activeIncidents: 2
  },
  {
    id: 'SEC-102',
    name: 'Sgt. David Chen',
    badgeNumber: 'CS-012',
    rank: 'Sergeant / Field Dispatch',
    phone: '+1 (555) 987-6543',
    email: 'david.chen@campusshield.edu',
    status: 'On Patrol',
    assignedZone: 'Zone 2 - Residential Halls & Dining',
    activeIncidents: 1
  },
  {
    id: 'SEC-103',
    name: 'Officer Ronald Hicks',
    badgeNumber: 'CS-067',
    rank: 'Patrol Officer',
    phone: '+1 (555) 432-1098',
    email: 'ronald.hicks@campusshield.edu',
    status: 'Available',
    assignedZone: 'Zone 3 - Athletic Complex & Greek Park',
    activeIncidents: 1
  },
  {
    id: 'SEC-104',
    name: 'Officer Elena Rostova',
    badgeNumber: 'CS-088',
    rank: 'Senior First Responder / EMT',
    phone: '+1 (555) 678-9012',
    email: 'elena.rostova@campusshield.edu',
    status: 'Responding',
    assignedZone: 'Zone 4 - Library & Central Administration',
    activeIncidents: 1
  },
  {
    id: 'SEC-105',
    name: 'Officer Maya Patel',
    badgeNumber: 'CS-095',
    rank: 'Patrol Officer',
    phone: '+1 (555) 555-0144',
    email: 'maya.patel@campusshield.edu',
    status: 'Available',
    assignedZone: 'Zone 5 - Perimeter Gates & Parking Decks',
    activeIncidents: 0
  },
  {
    id: 'SEC-106',
    name: 'Officer James Sterling',
    badgeNumber: 'CS-103',
    rank: 'Night Shift Patrol',
    phone: '+1 (555) 555-0199',
    email: 'james.sterling@campusshield.edu',
    status: 'Off Duty',
    assignedZone: 'Zone 2 - Residential Halls',
    activeIncidents: 0
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'USR-ADM-01',
    name: 'Chief Sarah Connor',
    email: 'admin@campusshield.edu',
    role: 'Admin',
    status: 'Active',
    joinedDate: '2024-01-15',
    department: 'Campus Safety & Emergency Operations',
    phone: '+1 (555) 010-0001',
    badgeNumber: 'ADM-001',
    lastActive: 'Just now'
  },
  {
    id: 'USR-ADM-02',
    name: 'Director Thomas Vance',
    email: 't.vance@campusshield.edu',
    role: 'Admin',
    status: 'Active',
    joinedDate: '2024-03-10',
    department: 'Vice Chancellor Safety Affairs',
    phone: '+1 (555) 010-0002',
    badgeNumber: 'ADM-002',
    lastActive: '2 hours ago'
  },
  {
    id: 'USR-SEC-01',
    name: 'Capt. Marcus Vance',
    email: 'marcus.vance@campusshield.edu',
    role: 'Security',
    status: 'Active',
    joinedDate: '2024-02-01',
    department: 'Emergency Tactical Response',
    phone: '+1 (555) 345-6789',
    badgeNumber: 'CS-041',
    assignedIncidentsCount: 14,
    lastActive: '3 mins ago'
  },
  {
    id: 'USR-SEC-02',
    name: 'Sgt. David Chen',
    email: 'david.chen@campusshield.edu',
    role: 'Security',
    status: 'Active',
    joinedDate: '2024-02-15',
    department: 'Campus Patrol Division',
    phone: '+1 (555) 987-6543',
    badgeNumber: 'CS-012',
    assignedIncidentsCount: 19,
    lastActive: '12 mins ago'
  },
  {
    id: 'USR-SEC-03',
    name: 'Officer Elena Rostova',
    email: 'elena.rostova@campusshield.edu',
    role: 'Security',
    status: 'Active',
    joinedDate: '2024-05-20',
    department: 'Campus Medical First Response',
    phone: '+1 (555) 678-9012',
    badgeNumber: 'CS-088',
    assignedIncidentsCount: 22,
    lastActive: '5 mins ago'
  },
  {
    id: 'USR-SEC-04',
    name: 'Officer Ronald Hicks',
    email: 'ronald.hicks@campusshield.edu',
    role: 'Security',
    status: 'Active',
    joinedDate: '2024-06-11',
    department: 'Campus Patrol Division',
    phone: '+1 (555) 432-1098',
    badgeNumber: 'CS-067',
    assignedIncidentsCount: 8,
    lastActive: '25 mins ago'
  },
  {
    id: 'USR-STU-01',
    name: 'Jordan Miller',
    email: 'jordan.m@campusshield.edu',
    role: 'Student',
    status: 'Active',
    joinedDate: '2025-08-20',
    department: 'Mechanical Engineering (Year 3)',
    phone: '+1 (555) 789-0123',
    studentId: 'STU-2023-4410',
    lastActive: '1 hour ago'
  },
  {
    id: 'USR-STU-02',
    name: 'Tariq Al-Mansoor',
    email: 'tariq.a@campusshield.edu',
    role: 'Student',
    status: 'Active',
    joinedDate: '2025-08-22',
    department: 'Computer Science (Year 2)',
    phone: '+1 (555) 890-1234',
    studentId: 'STU-2024-8890',
    lastActive: '3 hours ago'
  },
  {
    id: 'USR-STU-03',
    name: 'Samantha Hill',
    email: 's.hill@campusshield.edu',
    role: 'Student',
    status: 'Active',
    joinedDate: '2025-08-25',
    department: 'Business Administration (Year 2)',
    phone: '+1 (555) 443-2211',
    studentId: 'STU-2024-5519',
    lastActive: 'Yesterday'
  },
  {
    id: 'USR-STU-04',
    name: 'Aiden Brooks',
    email: 'aiden.b@campusshield.edu',
    role: 'Student',
    status: 'Active',
    joinedDate: '2026-01-10',
    department: 'Biochemistry (Year 1)',
    phone: '+1 (555) 321-9876',
    studentId: 'STU-2025-1102',
    lastActive: 'Yesterday'
  },
  {
    id: 'USR-STU-05',
    name: 'Brandon Cole',
    email: 'b.cole@campusshield.edu',
    role: 'Student',
    status: 'Suspended',
    joinedDate: '2024-09-01',
    department: 'Civil Engineering (Year 4)',
    phone: '+1 (555) 998-1122',
    studentId: 'STU-2022-7721',
    lastActive: '2 weeks ago'
  }
];
