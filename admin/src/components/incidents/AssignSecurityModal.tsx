import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Incident } from '../../types/incident';
import { SecurityOfficer } from '../../types/user';
import { userService } from '../../services/userService';
import { incidentService } from '../../services/incidentService';
import { useToast } from '../../context/ToastContext';
import { Shield, Check, Phone, MapPin, Radio } from 'lucide-react';

interface AssignSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: Incident | null;
  onAssigned: (updated: Incident) => void;
}

export const AssignSecurityModal: React.FC<AssignSecurityModalProps> = ({
  isOpen,
  onClose,
  incident,
  onAssigned
}) => {
  const [officers, setOfficers] = useState<SecurityOfficer[]>([]);
  const [selectedOfficerId, setSelectedOfficerId] = useState<string>('');
  const [dispatchNote, setDispatchNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      loadOfficers();
      if (incident?.assignedSecurity) {
        setSelectedOfficerId(incident.assignedSecurity.id);
      } else {
        setSelectedOfficerId('');
      }
      setDispatchNote('');
    }
  }, [isOpen, incident]);

  const loadOfficers = async () => {
    const list = await userService.getSecurityOfficers();
    setOfficers(list);
  };

  const handleAssign = async () => {
    if (!incident || !selectedOfficerId) return;

    const chosenOfficer = officers.find((o) => o.id === selectedOfficerId);
    if (!chosenOfficer) return;

    setIsSubmitting(true);
    try {
      const updated = await incidentService.assignSecurity(
        incident.id,
        {
          id: chosenOfficer.id,
          name: chosenOfficer.name,
          badgeNumber: chosenOfficer.badgeNumber,
          phone: chosenOfficer.phone
        },
        dispatchNote.trim() || undefined
      );

      showToast({
        type: 'success',
        title: 'Officer Dispatched',
        message: `${chosenOfficer.name} (${chosenOfficer.badgeNumber}) has been assigned to ${incident.id}.`
      });

      onAssigned(updated);
      onClose();
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Assignment Failed',
        message: 'Could not assign officer. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!incident) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-brand-600" />
          <span>Assign Security Officer</span>
        </div>
      }
      subtitle={`Incident ${incident.id}: ${incident.title}`}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAssign}
            isLoading={isSubmitting}
            disabled={!selectedOfficerId}
          >
            Confirm Dispatch
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Select Active Security Personnel
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
            {officers.map((officer) => {
              const isSelected = selectedOfficerId === officer.id;
              const isAvailable = officer.status === 'Available' || officer.status === 'On Patrol';

              return (
                <div
                  key={officer.id}
                  onClick={() => setSelectedOfficerId(officer.id)}
                  className={`
                    p-3.5 rounded-xl border transition cursor-pointer relative text-left
                    ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        {officer.name}
                        {isSelected && <Check className="w-3.5 h-3.5 text-brand-600 stroke-[3]" />}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                        Badge #{officer.badgeNumber} • {officer.rank}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        officer.status === 'Available'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : officer.status === 'Responding'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : officer.status === 'On Patrol'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {officer.status}
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {officer.assignedZone.split('-')[0]}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Radio className="w-3 h-3 text-slate-400" />
                      {officer.activeIncidents} active
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Dispatch Instructions / Tactical Notes (Optional)
          </label>
          <textarea
            rows={3}
            value={dispatchNote}
            onChange={(e) => setDispatchNote(e.target.value)}
            placeholder="e.g., Approach cautiously via east entrance; coordinate with hazmat staff on 2nd floor."
            className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 placeholder-slate-400"
          />
        </div>
      </div>
    </Modal>
  );
};
