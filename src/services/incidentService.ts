import { Incident, CreateIncidentDTO, IncidentStatus, IncidentTimelineEvent } from '../types/incident';
import { Student } from '../types/auth';

const INCIDENTS_KEY = 'campusshield_incidents_store';

function createInitialTimeline(status: IncidentStatus, createdAt: string): IncidentTimelineEvent[] {
  const now = new Date(createdAt);
  const timeStr = (minsAgo: number) => new Date(now.getTime() - minsAgo * 60000).toISOString();

  const stages: IncidentStatus[] = ['REPORTED', 'RECEIVED', 'ASSIGNED', 'IN PROGRESS', 'RESOLVED'];
  const currentIndex = stages.indexOf(status);

  return [
    {
      status: 'REPORTED',
      label: 'Incident Reported',
      timestamp: createdAt,
      completed: currentIndex >= 0,
      isCurrent: status === 'REPORTED',
      notes: 'Initial emergency report submitted by student via CampusShield app.',
    },
    {
      status: 'RECEIVED',
      label: 'Received & Triaged',
      timestamp: currentIndex >= 1 ? timeStr(-4) : undefined,
      completed: currentIndex >= 1,
      isCurrent: status === 'RECEIVED',
      notes: 'Campus Dispatch verified incident priority and location details.',
      actorName: 'Central Dispatch Command',
    },
    {
      status: 'ASSIGNED',
      label: 'Security Team Assigned',
      timestamp: currentIndex >= 2 ? timeStr(-12) : undefined,
      completed: currentIndex >= 2,
      isCurrent: status === 'ASSIGNED',
      notes: 'Rapid Response Unit dispatched to location.',
      actorName: 'Patrol Unit 3 (Officer Davis & Officer Lee)',
    },
    {
      status: 'IN PROGRESS',
      label: 'Action In Progress',
      timestamp: currentIndex >= 3 ? timeStr(-20) : undefined,
      completed: currentIndex >= 3,
      isCurrent: status === 'IN PROGRESS',
      notes: 'Safety perimeter established. Maintenance and security actively mitigating situation.',
      actorName: 'Rapid Response Unit 3',
    },
    {
      status: 'RESOLVED',
      label: 'Resolved & Secured',
      timestamp: currentIndex >= 4 ? timeStr(-45) : undefined,
      completed: currentIndex >= 4,
      isCurrent: status === 'RESOLVED',
      notes: 'Area inspected and secured. Hazard cleared. All systems operational.',
      actorName: 'Campus Safety Supervisor',
    },
  ];
}

const SEED_INCIDENTS: Incident[] = [
  {
    id: 'CS-2026-0042',
    studentId: 'std_alex_2026',
    studentName: 'Alex Vance',
    studentEmail: 'alex.student@campus.edu',
    studentPhone: '+1 (555) 234-5678',
    category: 'Electrical Hazard',
    title: 'Exposed live wiring in Science Complex staircase B',
    description: 'Noticed sparking wires dangling from the 2nd floor stairwell junction box near Science Block B. High student foot traffic during class switch.',
    priority: 'Critical',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      accuracy: 8,
      buildingOrArea: 'Science & Technology Complex - Block B',
      landmarkDetails: 'North stairwell between 1st and 2nd floors, adjacent to Room 214',
      isAutoDetected: true,
      detectedAt: '2026-10-02T16:15:00Z',
    },
    evidence: [
      {
        id: 'ev_seed_1',
        name: 'wiring_hazard.jpg',
        size: 1420000,
        type: 'image/jpeg',
        previewUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&auto=format&fit=crop&q=80',
        uploadedAt: '2026-10-02T16:15:20Z',
      },
    ],
    status: 'IN PROGRESS',
    createdAt: '2026-10-02T16:15:00Z',
    updatedAt: '2026-10-02T16:40:00Z',
    assignedTo: {
      name: 'Officer Marcus Sterling',
      unit: 'Facilities & Emergency Response Unit',
      phone: '+1 (555) 911-0402',
      badgeNumber: 'CS-892',
      assignedAt: '2026-10-02T16:22:00Z',
    },
    timeline: createInitialTimeline('IN PROGRESS', '2026-10-02T16:15:00Z'),
  },
  {
    id: 'CS-2026-0038',
    studentId: 'std_alex_2026',
    studentName: 'Alex Vance',
    studentEmail: 'alex.student@campus.edu',
    studentPhone: '+1 (555) 234-5678',
    category: 'Medical Emergency',
    title: 'Student faintness / heat exhaustion near Gym',
    description: 'A student collapsed during afternoon sports practice on the west running track. Administered water; campus nurse request.',
    priority: 'High',
    location: {
      latitude: 37.7758,
      longitude: -122.4182,
      accuracy: 12,
      buildingOrArea: 'Athletics Complex & Gymnasium',
      landmarkDetails: 'West running track bleachers, shaded section',
      isAutoDetected: true,
      detectedAt: '2026-09-29T14:20:00Z',
    },
    evidence: [],
    status: 'RESOLVED',
    createdAt: '2026-09-29T14:20:00Z',
    updatedAt: '2026-09-29T15:10:00Z',
    assignedTo: {
      name: 'Paramedic Sarah Jenkins',
      unit: 'Campus Health Rapid Response',
      phone: '+1 (555) 911-0112',
      badgeNumber: 'MED-104',
      assignedAt: '2026-09-29T14:24:00Z',
    },
    resolutionDetails: {
      resolvedAt: '2026-09-29T15:10:00Z',
      resolvedBy: 'Campus Health Team',
      resolutionNotes: 'Patient treated for dehydration, vitals stable, escorted safely to Campus Health Center.',
    },
    timeline: createInitialTimeline('RESOLVED', '2026-09-29T14:20:00Z'),
  },
  {
    id: 'CS-2026-0029',
    studentId: 'std_alex_2026',
    studentName: 'Alex Vance',
    studentEmail: 'alex.student@campus.edu',
    studentPhone: '+1 (555) 234-5678',
    category: 'Infrastructure Problem',
    title: 'Water pipe leak flooding basement corridor',
    description: 'High pressure water leak from ceiling line in Cedar Hall basement laundry corridor. Standing water accumulating quickly.',
    priority: 'Medium',
    location: {
      latitude: 37.7765,
      longitude: -122.4170,
      accuracy: 15,
      buildingOrArea: 'Cedar Residence Hall (North Dorms)',
      landmarkDetails: 'Basement level next to Laundry Room B',
      isAutoDetected: false,
    },
    evidence: [
      {
        id: 'ev_seed_2',
        name: 'water_pipe_leak.jpg',
        size: 980000,
        type: 'image/jpeg',
        previewUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
        uploadedAt: '2026-09-25T11:05:00Z',
      },
    ],
    status: 'RESOLVED',
    createdAt: '2026-09-25T11:00:00Z',
    updatedAt: '2026-09-25T13:30:00Z',
    assignedTo: {
      name: 'James Martinez',
      unit: 'Facilities Maintenance Dispatch',
      badgeNumber: 'FAC-404',
    },
    resolutionDetails: {
      resolvedAt: '2026-09-25T13:30:00Z',
      resolvedBy: 'Facilities Plumbing Team',
      resolutionNotes: 'Main valve isolated, ruptured coupling replaced, wet-vac extraction completed.',
    },
    timeline: createInitialTimeline('RESOLVED', '2026-09-25T11:00:00Z'),
  },
];

function getStoredIncidents(): Incident[] {
  try {
    const raw = localStorage.getItem(INCIDENTS_KEY);
    if (!raw) {
      localStorage.setItem(INCIDENTS_KEY, JSON.stringify(SEED_INCIDENTS));
      return SEED_INCIDENTS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_INCIDENTS;
  }
}

function saveIncidents(incidents: Incident[]): void {
  try {
    localStorage.setItem(INCIDENTS_KEY, JSON.stringify(incidents));
  } catch (e) {
    console.error('Failed to save incidents to storage:', e);
  }
}

let nextIncidentCounter = 48;

export const incidentService = {
  async getStudentIncidents(studentId: string): Promise<Incident[]> {
    await new Promise((r) => setTimeout(r, 350));
    const all = getStoredIncidents();
    // Return only incidents belonging to current authenticated student
    return all.filter((inc) => inc.studentId === studentId);
  },

  async getIncidentById(incidentId: string, studentId: string): Promise<Incident | null> {
    await new Promise((r) => setTimeout(r, 250));
    const all = getStoredIncidents();
    const found = all.find((inc) => inc.id === incidentId);
    if (!found) return null;
    // Security check: ensure student only accesses their own incidents
    if (found.studentId !== studentId) {
      throw new Error('Access denied. You can only view your own incident reports.');
    }
    return found;
  },

  async createIncident(dto: CreateIncidentDTO, student: Student): Promise<Incident> {
    await new Promise((r) => setTimeout(r, 700));

    const idNumber = String(nextIncidentCounter++).padStart(4, '0');
    const incidentId = `CS-2026-${idNumber}`;
    const nowIso = new Date().toISOString();

    const timeline: IncidentTimelineEvent[] = [
      {
        status: 'REPORTED',
        label: 'Incident Reported',
        timestamp: nowIso,
        completed: true,
        isCurrent: true,
        notes: `Emergency report submitted by student ${student.fullName}. Campus Security dispatch alerted.`,
        actorName: student.fullName,
      },
      {
        status: 'RECEIVED',
        label: 'Triage & Verification',
        completed: false,
        isCurrent: false,
        notes: 'Awaiting Campus Security Dispatch acknowledgement.',
      },
      {
        status: 'ASSIGNED',
        label: 'Security Team Assigned',
        completed: false,
        isCurrent: false,
        notes: 'Pending unit allocation.',
      },
      {
        status: 'IN PROGRESS',
        label: 'Response In Progress',
        completed: false,
        isCurrent: false,
        notes: 'Pending on-scene response.',
      },
      {
        status: 'RESOLVED',
        label: 'Resolved & Secured',
        completed: false,
        isCurrent: false,
        notes: 'Pending final safety inspection.',
      },
    ];

    const newIncident: Incident = {
      id: incidentId,
      studentId: student.id,
      studentName: student.fullName,
      studentEmail: student.email,
      studentPhone: student.phone,
      category: dto.category,
      title: dto.title.trim(),
      description: dto.description.trim(),
      priority: dto.priority,
      location: dto.location,
      evidence: dto.evidence,
      status: 'REPORTED',
      createdAt: nowIso,
      updatedAt: nowIso,
      timeline,
    };

    const all = getStoredIncidents();
    const updated = [newIncident, ...all];
    saveIncidents(updated);

    return newIncident;
  },
};
