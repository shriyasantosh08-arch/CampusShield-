import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { PriorityConfig } from '../../types/priority';
import { priorityService } from '../../services/priorityService';
import { useToast } from '../../context/ToastContext';
import { Sliders, Clock, ShieldAlert } from 'lucide-react';

interface EditPriorityModalProps {
  isOpen: boolean;
  onClose: () => void;
  priority: PriorityConfig | null;
  onSaved: (updated: PriorityConfig) => void;
}

export const EditPriorityModal: React.FC<EditPriorityModalProps> = ({
  isOpen,
  onClose,
  priority,
  onSaved
}) => {
  const [description, setDescription] = useState('');
  const [responseTimeSLA, setResponseTimeSLA] = useState('');
  const [responseTargetMinutes, setResponseTargetMinutes] = useState(5);
  const [escalationRule, setEscalationRule] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (priority) {
      setDescription(priority.description);
      setResponseTimeSLA(priority.responseTimeSLA);
      setResponseTargetMinutes(priority.responseTargetMinutes);
      setEscalationRule(priority.escalationRule);
    }
  }, [priority, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!priority) return;

    setIsSubmitting(true);
    try {
      const updated = await priorityService.updatePriority(priority.id, {
        description: description.trim(),
        responseTimeSLA: responseTimeSLA.trim(),
        responseTargetMinutes: Number(responseTargetMinutes),
        escalationRule: escalationRule.trim()
      });

      showToast({
        type: 'success',
        title: 'Priority Configuration Updated',
        message: `SLA guidelines for ${priority.level} priority were updated successfully.`
      });

      onSaved(updated);
      onClose();
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Configuration Error',
        message: 'Could not update priority parameters.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!priority) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-brand-600" />
          <span>Edit {priority.level} Priority Protocol</span>
        </div>
      }
      subtitle={`Configure standard response expectations and escalation triggers`}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
            Save Configuration
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Response Expectation SLA Label"
            placeholder="e.g. < 5 Minutes"
            value={responseTimeSLA}
            onChange={(e) => setResponseTimeSLA(e.target.value)}
            leftIcon={<Clock className="w-4 h-4" />}
            required
          />

          <Input
            label="Target SLA Minutes (Numerical)"
            type="number"
            min={1}
            max={720}
            value={responseTargetMinutes}
            onChange={(e) => setResponseTargetMinutes(Number(e.target.value))}
            leftIcon={<ShieldAlert className="w-4 h-4" />}
            required
          />

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Priority Description & Scope
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Automated Escalation Rule
            </label>
            <textarea
              rows={2}
              value={escalationRule}
              onChange={(e) => setEscalationRule(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              required
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};
