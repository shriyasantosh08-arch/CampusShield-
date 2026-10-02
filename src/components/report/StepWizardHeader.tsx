import React from 'react';
import { Check } from 'lucide-react';

interface StepWizardHeaderProps {
  currentStep: number;
  totalSteps: number;
  steps: { id: number; title: string; subtitle: string }[];
  onStepClick?: (step: number) => void;
}

export const StepWizardHeader: React.FC<StepWizardHeaderProps> = ({
  currentStep,
  totalSteps,
  steps,
  onStepClick,
}) => {
  return (
    <div className="w-full mb-8">
      {/* Mobile step bar */}
      <div className="sm:hidden mb-4 bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-rose-400 font-mono">
            STEP {currentStep} OF {totalSteps}
          </span>
          <p className="text-sm font-semibold text-white">
            {steps[currentStep - 1]?.title}
          </p>
        </div>
        <div className="flex gap-1.5">
          {steps.map((s) => (
            <div
              key={s.id}
              className={`h-2 rounded-full transition-all ${
                s.id === currentStep
                  ? 'w-6 bg-rose-500'
                  : s.id < currentStep
                  ? 'w-3 bg-emerald-500'
                  : 'w-2 bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop step stepper */}
      <div className="hidden sm:flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-slate-800 -z-0" />
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 bg-gradient-to-r from-rose-500 to-emerald-500 transition-all duration-300 -z-0"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isAccessible = step.id < currentStep;

          return (
            <button
              key={step.id}
              type="button"
              disabled={!isAccessible}
              onClick={() => isAccessible && onStepClick && onStepClick(step.id)}
              className={`relative z-10 flex flex-col items-center group focus:outline-none ${
                isAccessible ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 shadow-lg ${
                  isCompleted
                    ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                    : isCurrent
                    ? 'bg-rose-600 text-white ring-4 ring-rose-500/30 scale-110 shadow-rose-600/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[2.5]" /> : step.id}
              </div>
              <span
                className={`mt-2 text-xs font-semibold tracking-tight transition-colors ${
                  isCurrent ? 'text-white' : isCompleted ? 'text-slate-300' : 'text-slate-500'
                }`}
              >
                {step.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
