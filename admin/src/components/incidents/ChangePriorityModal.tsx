import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Incident, IncidentPriority } from '../../types/incident';
import { incidentService } from '../../services/incidentService';
import { useToast } from '../../context/ToastContext';
import { Sliders, AlertTriangle } from 'lucide-react';

interface ChangePriorityModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: Incident | null;
  onUpdated: (updated: Incident) => void;
}

const PRIORITIES: Array<{ level: IncidentPriority; label: string; sla: string; desc: string; color: string }> = [
  {
    level: 'Critical',
    label: 'Critical - Level 1',
    sla: '< 5 Mins SLA',
    desc: 'Immediate life safety threat, active fire, armed danger, major injury.',
    color: 'border-red-500 bg-red-50/40 text-red-900'
  },
  {
    level: 'High',
    label: 'High - Level 2',
    sla: '< 15 Mins SLA',
    desc: 'Significant hazard, power outage, intrusion alarm, water pipe rupture.',
    color: 'border-orange-500 bg-orange-50/40 text-orange-900'
  },
  {
    level: 'Medium',
    label: 'Medium - Level 3',
    sla: '< 45 Mins SLA',
    desc: 'Equipment theft, suspicious loitering, non-critical facility glitch.',
    color: 'border-amber-500 bg-amber-50/40 text-amber-900'
  },
  {
    level: 'Low',
    label: 'Low - Level 4',
    sla: '< 2 Hours SLA',
    desc: 'Lost & found, noise complaint, unauthorized parking, minor query.',
    color: 'border-emerald-500 bg-emerald-50/40 text-emerald-900'
  }
];

export const ChangePriorityModal: React.FC<ChangePriorityModalProps> = ({
  isOpen,
  onClose,
  incident,
  onUpdated
}) => {
  const [selectedPriority, setSelectedPriority] = useState<IncidentPriority>('Medium');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (incident) {
      setSelectedPriority(incident.priority);
      setReason('');
    }
  }, [incident, isOpen]);

  const handleSubmit = async () => {
    if (!incident) return;
    setIsSubmitting(true);
    try {
      const updated = await incidentService.updatePriority(
        incident.id,
        selectedPriority,
        reason.trim() || undefined
      );

      showToast({
        type: 'success',
        title: 'Priority Reclassified',
        message: `Incident ${incident.id} priority changed to ${selectedPriority}.`
      });

      onUpdated(updated);
      onClose();
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Update Failed',
        message: 'Could not update priority level.'
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
          <Sliders className="w-5 h-5 text-brand-600" />
          <span>Adjust Incident Priority</span>
        </div>
      }
      subtitle={`Incident ${incident.id}: ${incident.title}`}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
            Save Classification
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Target Escalation Tier
          </label>
          <div className="space-y-2">
            {PRIORITIES.map((p) => {
              const isSelected = selectedPriority === p.level;
              return (
                <div
                  key={p.level}
                  onClick={() => setSelectedPriority(p.level)}
                  className={`
                    p-3 rounded-xl border transition cursor-pointer flex items-start justify-between gap-3
                    ${
                      isSelected
                        ? `${p.color} ring-2 ring-brand-500/20 shadow-sm border-2`
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }
                  `}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">{p.label}</span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/80 border border-slate-200">
                        {p.sla}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-normal">{p.desc}</p>
                  </div>
                  <input
                    type="radio"
                    name="priority_select"
                    checked={isSelected}
                    onChange={() => setSelectedPriority(p.level)}
                    className="mt-1 text-brand-600 focus:ring-brand-500"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Reason for Escalation / De-escalation
          </label>
          <textarea
            rows={2}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g., Hazmat team arrived and neutralized spill; downgraded to Medium."
            className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 placeholder-slate-400"
          />
        </div>
      </div>
    </Modal>
  );
};
