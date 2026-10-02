import React from 'react';
import { IncidentPriority } from '../../types/incident';
import { AlertOctagon, AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface Step2DetailsProps {
  title: string;
  description: string;
  priority: IncidentPriority;
  setTitle: (val: string) => void;
  setDescription: (val: string) => void;
  setPriority: (val: IncidentPriority) => void;
  onNext: () => void;
  onBack: () => void;
}

const PRIORITIES: {
  level: IncidentPriority;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  badgeClass: string;
  selectedBorder: string;
  selectedBg: string;
}[] = [
  {
    level: 'Critical',
    label: 'Critical Priority',
    icon: AlertOctagon,
    description: 'Imminent danger to human life, ongoing violence, active fire, severe trauma.',
    badgeClass: 'text-rose-400 bg-rose-500/15 border-rose-500/30',
    selectedBorder: 'border-rose-500 ring-2 ring-rose-500/30',
    selectedBg: 'bg-rose-950/40',
  },
  {
    level: 'High',
    label: 'High Priority',
    icon: AlertTriangle,
    description: 'Significant safety risk, major infrastructure breakdown, urgent medical need.',
    badgeClass: 'text-orange-400 bg-orange-500/15 border-orange-500/30',
    selectedBorder: 'border-orange-500 ring-2 ring-orange-500/30',
    selectedBg: 'bg-orange-950/40',
  },
  {
    level: 'Medium',
    label: 'Medium Priority',
    icon: AlertCircle,
    description: 'Moderate disruption, non-severe property damage, suspicious activity report.',
    badgeClass: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
    selectedBorder: 'border-amber-500 ring-2 ring-amber-500/30',
    selectedBg: 'bg-amber-950/40',
  },
  {
    level: 'Low',
    label: 'Low Priority',
    icon: Info,
    description: 'Minor maintenance request, broken sign, lost item, general suggestion.',
    badgeClass: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
    selectedBorder: 'border-emerald-500 ring-2 ring-emerald-500/30',
    selectedBg: 'bg-emerald-950/40',
  },
];

export const Step2Details: React.FC<Step2DetailsProps> = ({
  title,
  description,
  priority,
  setTitle,
  setDescription,
  setPriority,
  onNext,
  onBack,
}) => {
  const isTitleValid = title.trim().length >= 5;
  const isDescValid = description.trim().length >= 10;
  const canProceed = isTitleValid && isDescValid;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Describe the Incident
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Provide accurate details to assist campus dispatchers and first responders.
        </p>
      </div>

      {/* Incident Title */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="incident-title" className="text-sm font-semibold text-slate-200">
            Incident Headline / Title <span className="text-rose-400">*</span>
          </label>
          <span className="text-xs text-slate-500">{title.length}/100</span>
        </div>
        <input
          id="incident-title"
          type="text"
          maxLength={100}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Sparks emitting from power panel near Library West Entrance"
          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-white placeholder-slate-500 text-sm outline-none transition-all"
        />
        {!isTitleValid && title.length > 0 && (
          <p className="text-xs text-rose-400">Please enter a descriptive title (at least 5 characters).</p>
        )}
      </div>

      {/* Priority Selection with strong visual distinction */}
      <div className="space-y-2.5">
        <label className="text-sm font-semibold text-slate-200 block">
          Priority Level <span className="text-rose-400">*</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRIORITIES.map((p) => {
            const Icon = p.icon;
            const isSelected = priority === p.level;

            return (
              <button
                key={p.level}
                type="button"
                onClick={() => setPriority(p.level)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? `${p.selectedBg} ${p.selectedBorder} shadow-lg`
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Icon
                      className={`w-5 h-5 ${
                        p.level === 'Critical'
                          ? 'text-rose-400'
                          : p.level === 'High'
                          ? 'text-orange-400'
                          : p.level === 'Medium'
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    />
                    <span className="font-bold text-sm text-white">{p.label}</span>
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${p.badgeClass}`}
                  >
                    {p.level}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Description */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="incident-desc" className="text-sm font-semibold text-slate-200">
            Full Description of the Event <span className="text-rose-400">*</span>
          </label>
          <span className="text-xs text-slate-500">{description.length}/1000</span>
        </div>
        <textarea
          id="incident-desc"
          rows={4}
          maxLength={1000}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Explain what happened, any persons involved or injured, immediate hazards, and any steps already taken..."
          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-white placeholder-slate-500 text-sm outline-none transition-all resize-y"
        />
        {!isDescValid && description.length > 0 && (
          <p className="text-xs text-rose-400">Please provide more detail (at least 10 characters).</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          disabled={!canProceed}
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold text-sm tracking-wide shadow-lg shadow-rose-600/20 transition-all flex items-center gap-2"
        >
          <span>Continue to Location</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
