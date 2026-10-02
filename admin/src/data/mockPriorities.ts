import { PriorityConfig } from '../types/priority';

export const INITIAL_PRIORITIES: PriorityConfig[] = [
  {
    id: 'prio-crit',
    level: 'Critical',
    label: 'Critical - Level 1 Priority',
    description: 'Imminent threat to life safety, severe injury, armed intruder, active structural fire, or toxic chemical hazard requiring immediate campus containment.',
    responseTimeSLA: '< 5 Minutes',
    responseTargetMinutes: 5,
    color: '#dc2626',
    badgeBg: 'bg-red-50 text-red-700 border-red-200',
    badgeText: 'text-red-700',
    borderClass: 'border-l-4 border-l-red-600',
    escalationRule: 'Auto-dispatch nearest patrol unit, notify local City 911 EMS/Fire, blast emergency broadcast to campus sirens within 120 seconds.',
    activeIncidentsCount: 3
  },
  {
    id: 'prio-high',
    level: 'High',
    label: 'High - Level 2 Priority',
    description: 'Significant safety risk, major facility failure (blackout, flood), ongoing unauthorized access, physical confrontation, or medical emergency requiring first aid.',
    responseTimeSLA: '< 15 Minutes',
    responseTargetMinutes: 15,
    color: '#ea580c',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    badgeText: 'text-orange-700',
    borderClass: 'border-l-4 border-l-orange-500',
    escalationRule: 'Direct dispatch to sector security supervisor and Facilities Engineering lead if unassigned after 8 minutes.',
    activeIncidentsCount: 2
  },
  {
    id: 'prio-med',
    level: 'Medium',
    label: 'Medium - Level 3 Priority',
    description: 'Property theft, suspicious loitering, elevator glitch with no occupants trapped, minor plumbing issues, or non-violent safety hazard.',
    responseTimeSLA: '< 45 Minutes',
    responseTargetMinutes: 45,
    color: '#d97706',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    badgeText: 'text-amber-700',
    borderClass: 'border-l-4 border-l-amber-500',
    escalationRule: 'Routed to standard patrol queue. Escalates to High if unacknowledged after 60 minutes.',
    activeIncidentsCount: 2
  },
  {
    id: 'prio-low',
    level: 'Low',
    label: 'Low - Level 4 Priority',
    description: 'Lost and found personal items, parking violations, noise complaints, minor vandalism/graffiti, non-urgent maintenance inquiries.',
    responseTimeSLA: '< 2 Hours',
    responseTargetMinutes: 120,
    color: '#16a34a',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    badgeText: 'text-emerald-700',
    borderClass: 'border-l-4 border-l-emerald-500',
    escalationRule: 'Assigned to roving shift patrol or scheduled facilities ticket within regular daytime operating hours.',
    activeIncidentsCount: 0
  }
];
