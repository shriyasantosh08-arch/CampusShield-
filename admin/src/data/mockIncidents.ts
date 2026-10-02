import { Incident } from '../types/incident';

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-2026-089',
    title: 'Hazardous Chemical Spill in Chemistry Lab',
    type: 'Fire / Hazard',
    description: 'Concentrated hydrochloric acid bottle broken during organic chemistry experiment. Fumes detected on Floor 2. Lab evacuated, ventilation units activated.',
    location: {
      building: 'Science Complex - Wing B',
      roomOrArea: 'Organic Chemistry Lab B-204',
      coordinates: { lat: 37.7749, lng: -122.4194 },
      landmark: 'Near North Emergency Eyewash Station'
    },
    priority: 'Critical',
    status: 'In Progress',
    reportedBy: {
      name: 'Dr. Evelyn Reed',
      role: 'Faculty',
      id: 'FAC-9041',
      email: 'evelyn.reed@campusshield.edu',
      phone: '+1 (555) 234-8901'
    },
    assignedSecurity: {
      id: 'SEC-101',
      name: 'Capt. Marcus Vance',
      badgeNumber: 'CS-041',
      phone: '+1 (555) 345-6789',
      assignedAt: '2026-10-02T10:14:00Z'
    },
    reportedAt: '2026-10-02T10:08:00Z',
    updatedAt: '2026-10-02T10:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        status: 'Reported',
        timestamp: '2026-10-02T10:08:00Z',
        description: 'Incident submitted via Mobile App by Dr. Evelyn Reed with photo attachment.',
        actor: 'Dr. Evelyn Reed (Faculty)',
        badge: 'FAC-9041'
      },
      {
        status: 'Assigned',
        timestamp: '2026-10-02T10:14:00Z',
        description: 'Command Center dispatched Hazmat Protocol Unit. Officer Marcus Vance assigned.',
        actor: 'Admin Dispatcher Sarah Connor',
        badge: 'ADM-001'
      },
      {
        status: 'In Progress',
        timestamp: '2026-10-02T10:18:00Z',
        description: 'Officer Vance arrived on scene. Perimeter secured. Campus EH&S hazmat team deployed neutralizer.',
        actor: 'Capt. Marcus Vance',
        badge: 'CS-041'
      }
    ],
    notes: [
      'EH&S team notified at 10:15 AM.',
      'Ventilation scrubbers operational; HVAC zoned off to prevent circulation to floors 3 and 4.'
    ]
  },
  {
    id: 'INC-2026-088',
    title: 'Severe Medical Emergency - Cardiac Collapse',
    type: 'Medical Emergency',
    description: 'Male student collapsed during intramural basketball match in recreation center. First aid responder initiated CPR; AED retrieved from reception wall.',
    location: {
      building: 'Student Recreation & Athletic Center',
      roomOrArea: 'Main Gymnasium Court 2',
      landmark: 'Courtside bleachers section D'
    },
    priority: 'Critical',
    status: 'In Progress',
    reportedBy: {
      name: 'Jordan Miller',
      role: 'Student',
      id: 'STU-2023-4410',
      email: 'jordan.m@campusshield.edu',
      phone: '+1 (555) 789-0123'
    },
    assignedSecurity: {
      id: 'SEC-104',
      name: 'Officer Elena Rostova',
      badgeNumber: 'CS-088',
      phone: '+1 (555) 678-9012',
      assignedAt: '2026-10-02T09:42:00Z'
    },
    reportedAt: '2026-10-02T09:38:00Z',
    updatedAt: '2026-10-02T09:46:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        status: 'Reported',
        timestamp: '2026-10-02T09:38:00Z',
        description: 'SOS Alert triggered via Gym Emergency Kiosk #4.',
        actor: 'Jordan Miller (Student)',
        badge: 'STU-2023-4410'
      },
      {
        status: 'Assigned',
        timestamp: '2026-10-02T09:40:00Z',
        description: 'Emergency EMT response unit and Security Unit 2 dispatched simultaneously.',
        actor: 'Admin Dispatcher Sarah Connor',
        badge: 'ADM-001'
      },
      {
        status: 'In Progress',
        timestamp: '2026-10-02T09:44:00Z',
        description: 'Officer Rostova on site. City Paramedics ambulance cleared through Gate 3.',
        actor: 'Officer Elena Rostova',
        badge: 'CS-088'
      }
    ],
    notes: [
      'City EMS Ambulance 14 arrived on scene at 09:48 AM.',
      'Student conscious and stabilized, transported to University Hospital.'
    ]
  },
  {
    id: 'INC-2026-087',
    title: 'Unauthorized Intrusion Alarm in Server Room',
    type: 'Unauthorized Access',
    description: 'Motion and badge reader discrepancy flagged in Central Library subterranean level. Keycard cloned flag raised by badge reader 04B.',
    location: {
      building: 'William Jefferson Memorial Library',
      roomOrArea: 'Basement Datacenter B-12',
      landmark: 'Behind Archives Section'
    },
    priority: 'High',
    status: 'Pending',
    reportedBy: {
      name: 'Automated Access Control System',
      role: 'Staff',
      id: 'SYS-MONITOR',
      email: 'security-telemetry@campusshield.edu',
      phone: '+1 (555) 000-9999'
    },
    reportedAt: '2026-10-02T09:12:00Z',
    updatedAt: '2026-10-02T09:12:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        status: 'Reported',
        timestamp: '2026-10-02T09:12:00Z',
        description: 'Automated telemetry trigger: invalid credential scan followed by door forced open sensor.',
        actor: 'CampusShield Telemetry Engine',
        badge: 'BOT-01'
      }
    ],
    notes: [
      'Awaiting manual guard assignment to verify physical tamper lock.'
    ]
  },
  {
    id: 'INC-2026-086',
    title: 'Main Transformer Power Outage - West Dorms',
    type: 'Facility & Utility',
    description: 'Partial blackout affecting Alder & Birch Residence Halls. Backup generator kicked in for hallway emergency lights, but elevators halted on Floor 4.',
    location: {
      building: 'West Campus Residence Complex',
      roomOrArea: 'Alder Hall & Substation 3',
      landmark: 'Quad courtyard'
    },
    priority: 'High',
    status: 'In Progress',
    reportedBy: {
      name: 'Claire Chen',
      role: 'Staff',
      id: 'STAFF-184',
      email: 'c.chen@campusshield.edu',
      phone: '+1 (555) 456-7890'
    },
    assignedSecurity: {
      id: 'SEC-102',
      name: 'Sgt. David Chen',
      badgeNumber: 'CS-012',
      phone: '+1 (555) 987-6543',
      assignedAt: '2026-10-02T08:35:00Z'
    },
    reportedAt: '2026-10-02T08:30:00Z',
    updatedAt: '2026-10-02T08:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        status: 'Reported',
        timestamp: '2026-10-02T08:30:00Z',
        description: 'Dorm Resident Advisor reported power trip and trapped students in Alder elevator #2.',
        actor: 'Claire Chen (Staff/RA)',
        badge: 'STAFF-184'
      },
      {
        status: 'Assigned',
        timestamp: '2026-10-02T08:35:00Z',
        description: 'Sgt. David Chen dispatched along with Facilities Engineering on-call tech.',
        actor: 'Admin Dispatcher Sarah Connor',
        badge: 'ADM-001'
      },
      {
        status: 'In Progress',
        timestamp: '2026-10-02T08:42:00Z',
        description: 'Elevator technician manually lowered elevator #2 to 3rd floor; 2 students safely exited without injury.',
        actor: 'Sgt. David Chen',
        badge: 'CS-012'
      }
    ],
    notes: [
      'Facilities working with Municipal Power Grid to repair transformer relay fuse.'
    ]
  },
  {
    id: 'INC-2026-085',
    title: 'Suspicious Individual Loitering Around Bicycle Lockers',
    type: 'Suspicious Activity',
    description: 'Subject wearing dark hoodie carrying angle grinder near student bike storage. When approached by passing student, subject moved behind electrical shed.',
    location: {
      building: 'Engineering Quad Building 4',
      roomOrArea: 'South Bike Corral Lockers',
      landmark: 'Adjacent to Engineering Loading Dock'
    },
    priority: 'Medium',
    status: 'In Progress',
    reportedBy: {
      name: 'Tariq Al-Mansoor',
      role: 'Student',
      id: 'STU-2024-8890',
      email: 'tariq.a@campusshield.edu',
      phone: '+1 (555) 890-1234'
    },
    assignedSecurity: {
      id: 'SEC-103',
      name: 'Officer Ronald Hicks',
      badgeNumber: 'CS-067',
      phone: '+1 (555) 432-1098',
      assignedAt: '2026-10-02T08:05:00Z'
    },
    reportedAt: '2026-10-02T07:55:00Z',
    updatedAt: '2026-10-02T08:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        status: 'Reported',
        timestamp: '2026-10-02T07:55:00Z',
        description: 'Report submitted with photo of subject near bicycle rack #7.',
        actor: 'Tariq Al-Mansoor',
        badge: 'STU-2024-8890'
      },
      {
        status: 'Assigned',
        timestamp: '2026-10-02T08:05:00Z',
        description: 'Officer Ronald Hicks assigned to investigate.',
        actor: 'Admin Dispatcher Sarah Connor',
        badge: 'ADM-001'
      },
      {
        status: 'In Progress',
        timestamp: '2026-10-02T08:12:00Z',
        description: 'Officer Hicks patrolling perimeter. Subject fled towards East gate. Security cameras reviewing footage.',
        actor: 'Officer Ronald Hicks',
        badge: 'CS-067'
      }
    ],
    notes: [
      'Two broken U-locks recovered as evidence.',
      'CCTV feed #19 saved for campus crime log.'
    ]
  },
  {
    id: 'INC-2026-084',
    title: 'Fire Alarm Triggered - Student Union Cafe',
    type: 'Fire / Hazard',
    description: 'Heavy smoke in cafeteria commercial kitchen from commercial deep fryer overheating. Fire sprinkler heads localized suppression activated.',
    location: {
      building: 'Campus Student Union',
      roomOrArea: 'Ground Floor Dining Pavilion',
      landmark: 'Main Commons kitchen'
    },
    priority: 'Critical',
    status: 'Resolved',
    reportedBy: {
      name: 'Maria Gomez',
      role: 'Staff',
      id: 'STAFF-092',
      email: 'm.gomez@campusshield.edu',
      phone: '+1 (555) 654-3210'
    },
    assignedSecurity: {
      id: 'SEC-101',
      name: 'Capt. Marcus Vance',
      badgeNumber: 'CS-041',
      phone: '+1 (555) 345-6789',
      assignedAt: '2026-10-01T16:22:00Z'
    },
    reportedAt: '2026-10-01T16:20:00Z',
    updatedAt: '2026-10-01T17:10:00Z',
    resolvedAt: '2026-10-01T17:10:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        status: 'Reported',
        timestamp: '2026-10-01T16:20:00Z',
        description: 'Commercial fire suppression system alert triggered.',
        actor: 'Maria Gomez',
        badge: 'STAFF-092'
      },
      {
        status: 'Assigned',
        timestamp: '2026-10-01T16:22:00Z',
        description: 'Capt. Marcus Vance on site alongside Fire Marshal.',
        actor: 'Sarah Connor',
        badge: 'ADM-001'
      },
      {
        status: 'In Progress',
        timestamp: '2026-10-01T16:30:00Z',
        description: 'Building safely evacuated (approx 280 occupants). Hood extinguisher discharged.',
        actor: 'Capt. Marcus Vance',
        badge: 'CS-041'
      },
      {
        status: 'Resolved',
        timestamp: '2026-10-01T17:10:00Z',
        description: 'Kitchen declared safe. Fume extraction completed. Building re-entry authorized by Campus Fire Marshal.',
        actor: 'Capt. Marcus Vance',
        badge: 'CS-041'
      }
    ],
    notes: [
      'Kitchen inspected by Health & Fire safety officers.',
      'No injuries reported.'
    ]
  },
  {
    id: 'INC-2026-083',
    title: 'Theft of University Equipment - Audio Visual Deck',
    type: 'Theft & Lost Property',
    description: 'Two professional Sony digital cameras and mixer board reported missing from Lecture Hall 101 media console. No signs of forced entry on outer door.',
    location: {
      building: 'Humanities & Arts Auditorium',
      roomOrArea: 'Lecture Hall 101 Media Booth',
      landmark: 'Balcony control room'
    },
    priority: 'Medium',
    status: 'Pending',
    reportedBy: {
      name: 'Prof. Arthur Pendelton',
      role: 'Faculty',
      id: 'FAC-3012',
      email: 'a.pendelton@campusshield.edu',
      phone: '+1 (555) 789-4321'
    },
    reportedAt: '2026-10-01T14:15:00Z',
    updatedAt: '2026-10-01T14:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        status: 'Reported',
        timestamp: '2026-10-01T14:15:00Z',
        description: 'Faculty filed official theft claim with equipment serial numbers.',
        actor: 'Prof. Arthur Pendelton',
        badge: 'FAC-3012'
      }
    ],
    notes: [
      'Serial numbers: SN-778841-A and SN-778842-A registered in asset tracker.'
    ]
  },
  {
    id: 'INC-2026-082',
    title: 'Slip and Fall on Icy Stairs - North Entrance',
    type: 'Medical Emergency',
    description: 'Student slipped on slick concrete steps near North Plaza during morning frost. Suspected wrist fracture. Student is sitting upright inside lobby.',
    location: {
      building: 'Undergraduate Sciences Hall',
      roomOrArea: 'North Plaza Steps Entrance',
      landmark: 'Outside main glass atrium'
    },
    priority: 'Medium',
    status: 'Resolved',
    reportedBy: {
      name: 'Aiden Brooks',
      role: 'Student',
      id: 'STU-2025-1102',
      email: 'aiden.b@campusshield.edu',
      phone: '+1 (555) 321-9876'
    },
    assignedSecurity: {
      id: 'SEC-104',
      name: 'Officer Elena Rostova',
      badgeNumber: 'CS-088',
      phone: '+1 (555) 678-9012',
      assignedAt: '2026-10-01T08:15:00Z'
    },
    reportedAt: '2026-10-01T08:10:00Z',
    updatedAt: '2026-10-01T09:20:00Z',
    resolvedAt: '2026-10-01T09:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        status: 'Reported',
        timestamp: '2026-10-01T08:10:00Z',
        description: 'Reported by classmate with request for campus health vehicle.',
        actor: 'Aiden Brooks',
        badge: 'STU-2025-1102'
      },
      {
        status: 'Assigned',
        timestamp: '2026-10-01T08:15:00Z',
        description: 'Officer Rostova deployed with first aid kit and salt applicator crew.',
        actor: 'Admin Dispatcher Sarah Connor',
        badge: 'ADM-001'
      },
      {
        status: 'In Progress',
        timestamp: '2026-10-01T08:22:00Z',
        description: 'Student assisted to Campus Health Center. Facilities salted all northern steps.',
        actor: 'Officer Elena Rostova',
        badge: 'CS-088'
      },
      {
        status: 'Resolved',
        timestamp: '2026-10-01T09:20:00Z',
        description: 'Student received wrist splint. Hazardous ice warning signs placed.',
        actor: 'Officer Elena Rostova',
        badge: 'CS-088'
      }
    ],
    notes: [
      'Ground maintenance crew salted area with calcium chloride.'
    ]
  },
  {
    id: 'INC-2026-081',
    title: 'Water Pipe Burst Flooding 1st Floor Hallway',
    type: 'Facility & Utility',
    description: 'High-pressure water valve ruptured in restroom ceiling; water pooling rapidly across main corridor and threatening server conduit.',
    location: {
      building: 'Mathematics & Computer Science Tower',
      roomOrArea: '1st Floor West Restroom & Corridor',
      landmark: 'Opposite Room 108'
    },
    priority: 'High',
    status: 'Resolved',
    reportedBy: {
      name: 'Jessica Thorne',
      role: 'Staff',
      id: 'STAFF-311',
      email: 'j.thorne@campusshield.edu',
      phone: '+1 (555) 901-2345'
    },
    assignedSecurity: {
      id: 'SEC-102',
      name: 'Sgt. David Chen',
      badgeNumber: 'CS-012',
      phone: '+1 (555) 987-6543',
      assignedAt: '2026-09-30T19:15:00Z'
    },
    reportedAt: '2026-09-30T19:10:00Z',
    updatedAt: '2026-09-30T20:30:00Z',
    resolvedAt: '2026-09-30T20:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        status: 'Reported',
        timestamp: '2026-09-30T19:10:00Z',
        description: 'Urgent leak reported by evening cleaning supervisor.',
        actor: 'Jessica Thorne',
        badge: 'STAFF-311'
      },
      {
        status: 'Assigned',
        timestamp: '2026-09-30T19:15:00Z',
        description: 'Sgt. Chen dispatched to secure area and shut off main wing water valve.',
        actor: 'Admin Dispatcher Sarah Connor',
        badge: 'ADM-001'
      },
      {
        status: 'In Progress',
        timestamp: '2026-09-30T19:25:00Z',
        description: 'Main shutoff valve isolated. Industrial wet vacs deployed by custodial services.',
        actor: 'Sgt. David Chen',
        badge: 'CS-012'
      },
      {
        status: 'Resolved',
        timestamp: '2026-09-30T20:30:00Z',
        description: 'Plumbing union replaced failed gasket. Water dry out complete.',
        actor: 'Sgt. David Chen',
        badge: 'CS-012'
      }
    ]
  },
  {
    id: 'INC-2026-080',
    title: 'Excessive Noise and Unauthorized Fireworks in Courtyard',
    type: 'Security Threat',
    description: 'Large gathering in Greek row courtyard lighting commercial fireworks near dry shrubbery. Multiple resident complaints of explosions.',
    location: {
      building: 'Fraternity / Sorority Park',
      roomOrArea: 'Central Quadrangle Gazebo',
      landmark: 'Between Alpha and Gamma Houses'
    },
    priority: 'Low',
    status: 'Resolved',
    reportedBy: {
      name: 'Samantha Hill',
      role: 'Student',
      id: 'STU-2024-5519',
      email: 's.hill@campusshield.edu',
      phone: '+1 (555) 443-2211'
    },
    assignedSecurity: {
      id: 'SEC-103',
      name: 'Officer Ronald Hicks',
      badgeNumber: 'CS-067',
      phone: '+1 (555) 432-1098',
      assignedAt: '2026-09-30T22:05:00Z'
    },
    reportedAt: '2026-09-30T22:00:00Z',
    updatedAt: '2026-09-30T22:45:00Z',
    resolvedAt: '2026-09-30T22:45:00Z',
    timeline: [
      {
        status: 'Reported',
        timestamp: '2026-09-30T22:00:00Z',
        description: 'Report filed by neighboring resident.',
        actor: 'Samantha Hill',
        badge: 'STU-2024-5519'
      },
      {
        status: 'Assigned',
        timestamp: '2026-09-30T22:05:00Z',
        description: 'Officer Hicks dispatched.',
        actor: 'Admin Dispatcher Sarah Connor',
        badge: 'ADM-001'
      },
      {
        status: 'Resolved',
        timestamp: '2026-09-30T22:45:00Z',
        description: 'Gathering dispersed peacefully. Remaining pyrotechnics confiscated for disposal.',
        actor: 'Officer Ronald Hicks',
        badge: 'CS-067'
      }
    ]
  }
];
