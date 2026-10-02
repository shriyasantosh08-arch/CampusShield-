import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Incident, IncidentStatus } from '../../types/incident';
import { incidentService } from '../../services/incidentService';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface ChangeStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: Incident | null;
  onUpdated: (updated: Incident) => void;
}

const STATUSES: Array<{ status: IncidentStatus; label: string; desc: string; icon: any }> = [
  {
    status: 'Pending',
    label: 'Pending Assignment',
    desc: 'Incident logged, awaiting officer dispatch or verification.',
    icon: AlertCircle
  },
  {
    status: 'In Progress',
    label: 'In Progress / Active Response',
    desc: 'Officer or emergency unit deployed on site actively resolving the situation.',
    icon: Clock
  },
  {
    status: 'Resolved',
    label: 'Resolved & Closed',
    desc: 'Hazard neutralized, medical patient assisted, or all clear verified.',
    icon: CheckCircle2
  }
];

export const ChangeStatusModal: React.FC<ChangeStatusModalProps> = ({
  isOpen,
  onClose,
  incident,
  onUpdated
}) => {
  const [selectedStatus, setSelectedStatus] = useState<IncidentStatus>('Pending');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (incident) {
      setSelectedStatus(incident.status);
      setNote('');
    }
  }, [incident, isOpen]);

  const handleSubmit = async () => {
    if (!incident) return;
    setIsSubmitting(true);
    try {
      const updated = await incidentService.updateStatus(
        incident.id,
        selectedStatus,
        note.trim() || undefined
      );

      showToast({
        type: selectedStatus === 'Resolved' ? 'success' : 'info',
        title: 'Status Updated',
        message: `Incident ${incident.id} marked as ${selectedStatus}.`
      });

      onUpdated(updated);
      onClose();
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Status Update Failed',
        message: 'Could not change status.'
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
      title="Update Incident Lifecycle Status"
      subtitle={`Incident ${incident.id}: ${incident.title}`}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant={selectedStatus === 'Resolved' ? 'success' : 'primary'}
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Confirm Status Update
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Target Status
          </label>
          <div className="space-y-2">
            {STATUSES.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedStatus === item.status;

              return (
                <div
                  key={item.status}
                  onClick={() => setSelectedStatus(item.status)}
                  className={`
                    p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3
                    ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/40 ring-2 ring-brand-500/20 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        item.status === 'Resolved'
                          ? 'bg-emerald-100 text-emerald-700'
                          : item.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{item.label}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="status_select"
                    checked={isSelected}
                    onChange={() => setSelectedStatus(item.status)}
                    className="text-brand-600 focus:ring-brand-500"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            {selectedStatus === 'Resolved' ? 'Resolution Notes & Verification Log' : 'Internal Dispatch Note'}
          </label>
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={
              selectedStatus === 'Resolved'
                ? 'Describe resolution actions taken, responder signoff, and safety clearance notes...'
                : 'Add optional note on current action status...'
            }
            className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 placeholder-slate-400"
          />
        </div>
      </div>
    </Modal>
  );
};
