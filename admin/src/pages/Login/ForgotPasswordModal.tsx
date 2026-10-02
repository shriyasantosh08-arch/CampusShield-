import React, { useState } from 'react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useToast } from '../../context/ToastContext';
import { KeyRound, Mail, CheckCircle2 } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast({
        type: 'error',
        title: 'Invalid Email',
        message: 'Please enter a valid campus administrator email address.'
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      showToast({
        type: 'success',
        title: 'Recovery Email Dispatched',
        message: `Temporary authorization token sent to ${email}.`
      });
    }, 700);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setEmail('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        <div className="flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-brand-600" />
          <span>Reset Administrative Credentials</span>
        </div>
      }
      subtitle="Security authorization reset request for CampusShield Command Center"
      size="md"
      footer={
        isSubmitted ? (
          <Button variant="primary" onClick={handleClose}>
            Back to Login
          </Button>
        ) : (
          <>
            <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit} isLoading={isLoading}>
              Send Recovery Link
            </Button>
          </>
        )
      }
    >
      {isSubmitted ? (
        <div className="text-center py-4 space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Recovery Instructions Sent</h4>
          <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
            If an administrator account exists for <span className="font-semibold text-slate-900">{email}</span>, a secure one-time cryptographic passkey has been sent. Contact the Vice Chancellor of IT Security if urgent assistance is required.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Enter your official university administrative email. An encrypted authentication link will be sent to confirm your identity.
          </p>
          <Input
            label="Administrator Email"
            type="email"
            placeholder="admin@campusshield.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
            autoFocus
          />
        </form>
      )}
    </Modal>
  );
};
