import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mb-4 shadow-sm">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">404 - Command Center Sector Not Found</h2>
      <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-1.5 mb-6">
        The incident record, dispatch terminal, or operational sub-route you requested does not exist or has been decommissioned.
      </p>
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm" onClick={() => navigate(-1)} leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
          Go Back
        </Button>
        <Button variant="primary" size="sm" onClick={() => navigate('/')} leftIcon={<Home className="w-3.5 h-3.5" />}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};
