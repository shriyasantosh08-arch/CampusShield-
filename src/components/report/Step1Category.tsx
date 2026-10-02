import React from 'react';
import { IncidentCategory } from '../../types/incident';
import {
  HeartPulse,
  Flame,
  Car,
  ShieldAlert,
  Zap,
  Hammer,
  AlertTriangle,
  HelpCircle,
  Check,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Step1CategoryProps {
  selectedCategory: IncidentCategory | null;
  onSelect: (category: IncidentCategory) => void;
  onNext: () => void;
}

interface CategoryOption {
  title: IncidentCategory;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  badge?: string;
  color: string;
  hoverBorder: string;
}

const CATEGORIES: CategoryOption[] = [
  {
    title: 'Medical Emergency',
    icon: HeartPulse,
    description: 'Sudden illness, fainting, severe injury, or paramedic request.',
    badge: 'Urgent',
    color: 'text-red-400 bg-red-500/10 border-red-500/20',
    hoverBorder: 'hover:border-red-500/50',
  },
  {
    title: 'Fire',
    icon: Flame,
    description: 'Smoke, open fire, alarm activation, or explosion hazard.',
    badge: 'Critical',
    color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    hoverBorder: 'hover:border-orange-500/50',
  },
  {
    title: 'Accident',
    icon: Car,
    description: 'Vehicle collision, bike crash, parking lot scrape, pedestrian incident.',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    hoverBorder: 'hover:border-amber-500/50',
  },
  {
    title: 'Security Issue',
    icon: ShieldAlert,
    description: 'Suspicious individual, theft, altercation, harassment, or trespassing.',
    badge: 'Security',
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    hoverBorder: 'hover:border-rose-500/50',
  },
  {
    title: 'Electrical Hazard',
    icon: Zap,
    description: 'Sparking wiring, blackout, exposed lines, panel overheating.',
    color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    hoverBorder: 'hover:border-yellow-500/50',
  },
  {
    title: 'Infrastructure Problem',
    icon: Hammer,
    description: 'Water leak, broken elevator, collapsed ceiling, door lock failure.',
    color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    hoverBorder: 'hover:border-cyan-500/50',
  },
  {
    title: 'Safety Concern',
    icon: AlertTriangle,
    description: 'Poor night lighting, slippery ice patch, chemical odor, blocked exit.',
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    hoverBorder: 'hover:border-emerald-500/50',
  },
  {
    title: 'Other',
    icon: HelpCircle,
    description: 'Any other safety or operational emergency not listed above.',
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    hoverBorder: 'hover:border-purple-500/50',
  },
];

export const Step1Category: React.FC<Step1CategoryProps> = ({
  selectedCategory,
  onSelect,
  onNext,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Select Incident Category
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Choose the option that best matches the situation so dispatch can triage correctly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.title;

          return (
            <motion.button
              key={cat.title}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(cat.title)}
              className={`relative text-left p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between h-full ${
                isSelected
                  ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/30 shadow-lg shadow-rose-950/50'
                  : `bg-slate-900/80 border-slate-800 ${cat.hoverBorder} hover:bg-slate-850 shadow-md`
              }`}
            >
              {/* Selected Checkmark Indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center ${cat.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  {cat.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {cat.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-white">{cat.title}</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span
                  className={`text-[11px] font-semibold ${
                    isSelected ? 'text-rose-400' : 'text-slate-500'
                  }`}
                >
                  {isSelected ? 'Selected' : 'Select'}
                </span>
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-rose-500' : 'bg-slate-700'
                  }`}
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          type="button"
          disabled={!selectedCategory}
          onClick={onNext}
          className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold text-sm tracking-wide shadow-lg shadow-rose-600/20 transition-all flex items-center gap-2"
        >
          <span>Continue to Details</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
