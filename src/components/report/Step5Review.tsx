import React, { useState } from 'react';
import { CreateIncidentDTO } from '../../types/incident';
import { PriorityBadge } from '../common/PriorityBadge';
import { Modal } from '../common/Modal';
import {
  AlertOctagon,
  MapPin,
  Paperclip,
  Loader2,
  ShieldAlert,
} from 'lucide-react';

interface Step5ReviewProps {
  data: CreateIncidentDTO;
  isSubmitting: boolean;
  onSubmit: () => Promise<void>;
  onEditStep: (stepNumber: number) => void;
  onBack: () => void;
}

export const Step5Review: React.FC<Step5ReviewProps> = ({
  data,
  isSubmitting,
  onSubmit,
  onEditStep,
  onBack,
}) => {
  const [showCriticalModal, setShowCriticalModal] = useState<boolean>(false);

  const handleSubmitClick = () => {
    if (data.priority === 'Critical') {
      setShowCriticalModal(true);
    } else {
      onSubmit();
    }
  };

  const handleConfirmCritical = () => {
    setShowCriticalModal(false);
    onSubmit();
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Review & Submit Incident Report
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Verify that all information is accurate before notifying Campus Security Dispatch.
        </p>
      </div>

      {/* Review Summary Card */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 divide-y divide-slate-800 shadow-xl overflow-hidden">
        {/* Category & Priority */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/40">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-mono">
              Incident Category
            </span>
            <div className="flex items-center gap-3 mt-1">
              <h3 className="text-lg font-bold text-white">{data.category}</h3>
              <PriorityBadge priority={data.priority} size="sm" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="text-xs text-rose-400 hover:text-rose-300 font-semibold self-start sm:self-auto"
          >
            Change Category
          </button>
        </div>

        {/* Title & Description */}
        <div className="p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-mono">
              Details
            </span>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
            >
              Edit Details
            </button>
          </div>
          <h4 className="text-base font-bold text-slate-100">{data.title}</h4>
          <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Location Details */}
        <div className="p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-mono">
              Location
            </span>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
            >
              Edit Location
            </button>
          </div>
          <div className="flex items-start gap-2 text-slate-200 text-sm">
            <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{data.location.buildingOrArea}</p>
              {data.location.landmarkDetails && (
                <p className="text-xs text-slate-400 mt-0.5">{data.location.landmarkDetails}</p>
              )}
              {data.location.latitude && data.location.longitude && (
                <p className="text-[11px] font-mono text-emerald-400 mt-1">
                  GPS: {data.location.latitude.toFixed(5)}°, {data.location.longitude.toFixed(5)}°
                  {data.location.accuracy ? ` (±${data.location.accuracy}m)` : ''}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Evidence */}
        <div className="p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-mono">
              Attached Evidence ({data.evidence.length})
            </span>
            <button
              type="button"
              onClick={() => onEditStep(4)}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
            >
              Add/Edit Media
            </button>
          </div>

          {data.evidence.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No media attachments added.</p>
          ) : (
            <div className="flex flex-wrap gap-2 pt-1">
              {data.evidence.map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono"
                >
                  <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate max-w-[140px]">{ev.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Critical Warning Alert Banner */}
      {data.priority === 'Critical' && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-200">
          <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <p className="font-bold text-rose-300 text-sm">CRITICAL EMERGENCY PROTOCOL</p>
            <p className="mt-0.5 text-rose-200/90">
              Submitting a Critical report initiates immediate rapid dispatch to your coordinates. False reports are subject to university disciplinary review.
            </p>
          </div>
        </div>
      )}

      {/* Submit Button & Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors"
        >
          ← Back
        </button>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleSubmitClick}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-xl shadow-rose-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Transmitting Dispatch Alert...</span>
            </>
          ) : (
            <>
              <ShieldAlert className="w-5 h-5" />
              <span>🚨 SUBMIT INCIDENT</span>
            </>
          )}
        </button>
      </div>

      {/* Critical Confirmation Warning Modal */}
      <Modal
        isOpen={showCriticalModal}
        onClose={() => setShowCriticalModal(false)}
        title="Confirm Critical Incident Submission"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-2">
            <AlertOctagon className="w-7 h-7 animate-pulse" />
          </div>

          <p className="text-sm text-slate-300 text-center leading-relaxed">
            You are about to transmit a <strong className="text-rose-400">CRITICAL PRIORITY</strong>{' '}
            emergency incident. Campus Police and urgent first responders will be notified immediately.
          </p>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 font-mono">
            <p><strong>Category:</strong> {data.category}</p>
            <p><strong>Location:</strong> {data.location.buildingOrArea}</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowCriticalModal(false)}
              className="flex-1 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
            >
              Cancel / Review Again
            </button>
            <button
              type="button"
              onClick={handleConfirmCritical}
              className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30"
            >
              Confirm & Dispatch
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
