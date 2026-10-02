import { NotificationItem } from '../types/notification';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'critical_incident',
    title: '🚨 Critical Incident Triggered',
    message: 'Hazardous Chemical Spill reported in Science Complex - Wing B (Lab B-204). Hazmat response team requested.',
    timestamp: '10 minutes ago',
    read: false,
    incidentId: 'INC-2026-089',
    priority: 'Critical'
  },
  {
    id: 'notif-2',
    type: 'incident_assigned',
    title: 'Officer Assigned',
    message: 'Capt. Marcus Vance (CS-041) assigned to Chemical Spill INC-2026-089.',
    timestamp: '8 minutes ago',
    read: false,
    incidentId: 'INC-2026-089',
    priority: 'Critical'
  },
  {
    id: 'notif-3',
    type: 'critical_incident',
    title: '🚨 Medical Alert Dispatched',
    message: 'Severe Medical Emergency - Cardiac Collapse in Rec Center. Paramedics entering via Gate 3.',
    timestamp: '42 minutes ago',
    read: false,
    incidentId: 'INC-2026-088',
    priority: 'Critical'
  },
  {
    id: 'notif-4',
    type: 'officer_status_update',
    title: 'Officer Status Change',
    message: 'Officer Elena Rostova updated status to "Responding" for Zone 4 dispatch.',
    timestamp: '45 minutes ago',
    read: true,
    incidentId: 'INC-2026-088',
    priority: 'High'
  },
  {
    id: 'notif-5',
    type: 'incident_resolved',
    title: 'Incident Resolved',
    message: 'Water Pipe Burst INC-2026-081 closed by Sgt. David Chen. Maintenance repair verified.',
    timestamp: '2 hours ago',
    read: true,
    incidentId: 'INC-2026-081',
    priority: 'High'
  },
  {
    id: 'notif-6',
    type: 'system_alert',
    title: 'Emergency Power Restored',
    message: 'Alder Hall backup generator relay tests completed successfully.',
    timestamp: '5 hours ago',
    read: true,
    priority: 'Medium'
  }
];
