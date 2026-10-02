import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { StatusTimeline } from '../common/StatusTimeline';
import { Incident } from '../../types/incident';
import {
  MapPin,
  Clock,
  User,
  Shield,
  Phone,
  Mail,
  AlertTriangle,
  Sliders,
  CheckCircle2,
  Image as ImageIcon,
  Compass,
  FileText
} from 'lucide-react';
import { AssignSecurityModal } from './AssignSecurityModal';
import { ChangePriorityModal } from './ChangePriorityModal';
import { ChangeStatusModal } from './ChangeStatusModal';

interface IncidentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: Incident | null;
  onIncidentUpdated: (updated: Incident) => void;
}

export const IncidentDetailsModal: React.FC<IncidentDetailsModalProps> = ({
  isOpen,
  onClose,
  incident,
  onIncidentUpdated
}) => {
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  if (!incident) return null;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-sm px-2.5 py-1 rounded-lg bg-navy-900 text-white font-semibold">
              {incident.id}
            </span>
            <span className="text-base font-bold text-slate-900">{incident.title}</span>
          </div>
        }
        subtitle={
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="priority" value={incident.priority} size="sm" />
            <Badge variant="status" value={incident.status} size="sm" />
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-xs text-slate-500 font-medium">{incident.type}</span>
          </div>
        }
        size="2xl"
        footer={
          <div className="flex items-center justify-between w-full flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Sliders className="w-3.5 h-3.5 text-slate-500" />}
                onClick={() => setIsPriorityOpen(true)}
              >
                Change Priority
              </Button>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />}
                onClick={() => setIsStatusOpen(true)}
              >
                Change Status
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Shield className="w-3.5 h-3.5" />}
                onClick={() => setIsAssignOpen(true)}
              >
                {incident.assignedSecurity ? 'Reassign Security' : 'Assign Security'}
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Visual Status Progress Flow */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <StatusTimeline
              currentStatus={incident.status}
              timelineEvents={incident.timeline}
              hasAssignedOfficer={Boolean(incident.assignedSecurity)}
            />
          </div>

          {/* Description & Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left 2 Cols: Description, Location, Photo Attachment */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Incident Summary & Brief
                </h4>
                <p className="text-sm text-slate-800 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200 shadow-soft">
                  {incident.description}
                </p>
              </div>

              {/* Exact Location Card */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-600" />
                  Incident Location
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Building</span>
                    <span className="font-semibold text-slate-900">{incident.location.building}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Room / Area</span>
                    <span className="font-semibold text-slate-900">{incident.location.roomOrArea}</span>
                  </div>
                  {incident.location.landmark && (
                    <div className="col-span-2 pt-1">
                      <span className="text-slate-400 block text-[10px] uppercase font-medium">Landmark / Note</span>
                      <span className="text-slate-700">{incident.location.landmark}</span>
                    </div>
                  )}
                  {incident.location.coordinates && (
                    <div className="col-span-2 pt-1 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                      <Compass className="w-3.5 h-3.5 text-brand-500" />
                      GPS: {incident.location.coordinates.lat.toFixed(4)}, {incident.location.coordinates.lng.toFixed(4)}
                    </div>
                  )}
                </div>
              </div>

              {/* Incident Image / Photographic Evidence */}
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5" />
                  Incident Image / Photographic Evidence
                </h4>
                {incident.imageUrl ? (
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-soft max-h-56 group bg-slate-900">
                    <img
                      src={incident.imageUrl}
                      alt="Incident Evidence"
                      className="w-full h-52 object-cover transition duration-300 group-hover:scale-105 opacity-90"
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] text-white font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-brand-400" />
                      Uploaded at report time
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-400 bg-slate-50">
                    No image attachment submitted with this report.
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Reporter and Assigned Security Info */}
            <div className="space-y-4">
              {/* Reporter Info */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-soft">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-brand-600" />
                  Reported By
                </h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">
                      {incident.reportedBy.name}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Role: {incident.reportedBy.role} ({incident.reportedBy.id})
                    </span>
                  </div>
                  <div className="pt-1 space-y-1">
                    <a
                      href={`mailto:${incident.reportedBy.email}`}
                      className="flex items-center gap-2 text-slate-600 hover:text-brand-600 transition"
                    >
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{incident.reportedBy.email}</span>
                    </a>
                    <a
                      href={`tel:${incident.reportedBy.phone}`}
                      className="flex items-center gap-2 text-slate-600 hover:text-brand-600 transition font-mono"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{incident.reportedBy.phone}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Assigned Security Officer */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-soft">
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-blue-600" />
                    Assigned Responder
                  </h4>
                  {incident.assignedSecurity && (
                    <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold border border-emerald-200">
                      Dispatched
                    </span>
                  )}
                </div>

                {incident.assignedSecurity ? (
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">
                        {incident.assignedSecurity.name}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Badge #{incident.assignedSecurity.badgeNumber}
                      </span>
                    </div>
                    <div className="pt-1 flex items-center gap-2 text-slate-600 font-mono">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{incident.assignedSecurity.phone}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 pt-1">
                      Assigned: {new Date(incident.assignedSecurity.assignedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-center">
                    <p className="text-xs font-semibold text-amber-800">No officer assigned</p>
                    <p className="text-[10px] text-amber-700 mt-0.5">
                      This incident is in queue awaiting dispatch.
                    </p>
                    <Button
                      variant="primary"
                      size="sm"
                      className="mt-2 text-xs py-1"
                      onClick={() => setIsAssignOpen(true)}
                    >
                      Assign Now
                    </Button>
                  </div>
                )}
              </div>

              {/* Timestamp metadata */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Reported:</span>
                  <span className="font-mono">
                    {new Date(incident.reportedAt).toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Update:</span>
                  <span className="font-mono">
                    {new Date(incident.updatedAt).toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                {incident.resolvedAt && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Resolved:</span>
                    <span className="font-mono">
                      {new Date(incident.resolvedAt).toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Sub Modals */}
      <AssignSecurityModal
        isOpen={isAssignOpen}
        onClose={() => setIsAssignOpen(false)}
        incident={incident}
        onAssigned={(updated) => {
          onIncidentUpdated(updated);
        }}
      />

      <ChangePriorityModal
        isOpen={isPriorityOpen}
        onClose={() => setIsPriorityOpen(false)}
        incident={incident}
        onUpdated={(updated) => {
          onIncidentUpdated(updated);
        }}
      />

      <ChangeStatusModal
        isOpen={isStatusOpen}
        onClose={() => setIsStatusOpen(false)}
        incident={incident}
        onUpdated={(updated) => {
          onIncidentUpdated(updated);
        }}
      />
    </>
  );
};
