import { IncidentPriority } from './incident';

export interface PriorityConfig {
  id: string;
  level: IncidentPriority;
  label: string;
  description: string;
  responseTimeSLA: string; // e.g. "< 5 minutes"
  responseTargetMinutes: number;
  color: string;
  badgeBg: string;
  badgeText: string;
  borderClass: string;
  escalationRule: string;
  activeIncidentsCount: number;
}
