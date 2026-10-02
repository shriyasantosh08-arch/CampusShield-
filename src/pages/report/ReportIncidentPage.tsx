import React, { useState } from 'react';
import { useIncidents } from '../../context/IncidentContext';
import {
  IncidentCategory,
  IncidentPriority,
  LocationData,
  EvidenceItem,
  CreateIncidentDTO,
  Incident,
} from '../../types/incident';
import { StepWizardHeader } from '../../components/report/StepWizardHeader';
import { Step1Category } from '../../components/report/Step1Category';
import { Step2Details } from '../../components/report/Step2Details';
import { Step3Location } from '../../components/report/Step3Location';
import { Step4Evidence } from '../../components/report/Step4Evidence';
import { Step5Review } from '../../components/report/Step5Review';
import { IncidentSuccess } from '../../components/report/IncidentSuccess';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { id: 1, title: 'Category', subtitle: 'Incident Type' },
  { id: 2, title: 'Details', subtitle: 'Title & Priority' },
  { id: 3, title: 'Location', subtitle: 'GPS & Campus Zone' },
  { id: 4, title: 'Evidence', subtitle: 'Media & Photos' },
  { id: 5, title: 'Review', subtitle: 'Verify & Transmit' },
];

export const ReportIncidentPage: React.FC = () => {
  const { createIncident } = useIncidents();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<IncidentCategory | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<IncidentPriority>('Medium');

  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
    accuracy: null,
    buildingOrArea: '',
    landmarkDetails: '',
    isAutoDetected: false,
  });

  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submittedIncident, setSubmittedIncident] = useState<Incident | null>(null);

  const handleSubmit = async () => {
    if (!selectedCategory) return;
    setIsSubmitting(true);
    setSubmissionError(null);

    const dto: CreateIncidentDTO = {
      category: selectedCategory,
      title,
      description,
      priority,
      location,
      evidence: evidenceList,
    };

    try {
      const created = await createIncident(dto);
      setSubmittedIncident(created);
    } catch (err: any) {
      setSubmissionError(err?.message || 'Failed to submit incident report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedIncident) {
    return (
      <div className="py-6 sm:py-10">
        <IncidentSuccess incident={submittedIncident} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 px-2 sm:px-4">
      {/* Wizard Header Stepper */}
      <StepWizardHeader
        currentStep={currentStep}
        totalSteps={5}
        steps={STEPS}
        onStepClick={(step) => setCurrentStep(step)}
      />

      {submissionError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
          {submissionError}
        </div>
      )}

      {/* Step Views with smooth transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {currentStep === 1 && (
            <Step1Category
              selectedCategory={selectedCategory}
              onSelect={(cat) => setSelectedCategory(cat)}
              onNext={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 2 && (
            <Step2Details
              title={title}
              description={description}
              priority={priority}
              setTitle={setTitle}
              setDescription={setDescription}
              setPriority={setPriority}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <Step3Location
              location={location}
              setLocation={setLocation}
              onNext={() => setCurrentStep(4)}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && (
            <Step4Evidence
              evidenceList={evidenceList}
              setEvidenceList={setEvidenceList}
              onNext={() => setCurrentStep(5)}
              onBack={() => setCurrentStep(3)}
            />
          )}

          {currentStep === 5 && selectedCategory && (
            <Step5Review
              data={{
                category: selectedCategory,
                title,
                description,
                priority,
                location,
                evidence: evidenceList,
              }}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              onEditStep={(step) => setCurrentStep(step)}
              onBack={() => setCurrentStep(4)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
