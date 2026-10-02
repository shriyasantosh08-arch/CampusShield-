import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import {
  Shield,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  Radio,
  KeyRound
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@campusshield.edu');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please fill in both your administrator email and password.');
      return;
    }

    setIsLoggingIn(true);
    try {
      const user = await login(email.trim(), password, rememberMe);
      showToast({
        type: 'success',
        title: 'Authentication Successful',
        message: `Welcome back, ${user.name}. EOC dispatch console initialized.`
      });
      navigate('/');
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please verify credentials.');
      showToast({
        type: 'error',
        title: 'Access Denied',
        message: 'Invalid credentials. You may use demo: admin@campusshield.edu / admin123'
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@campusshield.edu');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center relative overflow-hidden selection:bg-brand-500 selection:text-white">
      {/* Background Ambience / Subtle Grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(59, 130, 246, 0.25) 1px, transparent 1px), radial-gradient(rgba(14, 165, 233, 0.15) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
          backgroundPosition: '0 0, 18px 18px'
        }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-8">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-xl shadow-brand-500/25 ring-4 ring-brand-500/10 mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            CampusShield
          </h2>
          <p className="text-xs uppercase tracking-widest text-brand-400 font-bold mt-1">
            Emergency Operations Command
          </p>
          <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-navy-900 border border-navy-700/80 text-[11px] text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Radio className="w-3 h-3 text-emerald-400" />
            <span>Secure Admin Portal • Member 3 Module</span>
          </div>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-modal border border-slate-200">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">Administrator Sign In</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter your credentials to access dispatch management and analytics.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Admin Email / Username"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@campusshield.edu"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <div className="relative">
              <Input
                label="Security Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                leftIcon={<Lock className="w-4 h-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                required
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 h-4 w-4"
                />
                <span className="text-xs text-slate-600">Remember on this device</span>
              </label>

              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-xs text-brand-600 hover:text-brand-700 font-semibold transition"
              >
                Forgot password?
              </button>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoggingIn}
                leftIcon={<KeyRound className="w-4 h-4" />}
              >
                Sign In to Command Center
              </Button>
            </div>
          </form>

          {/* Quick Demo Credentials Pill */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col items-center gap-2">
            <span className="text-[11px] text-slate-400 font-medium">Quick Demo Preset:</span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold border border-slate-200 transition flex items-center gap-2"
            >
              <span>admin@campusshield.edu</span>
              <span className="text-slate-400">•</span>
              <span>admin123</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-slate-500 mt-6 flex items-center justify-center gap-2">
          <span>CampusShield v2.4</span>
          <span>•</span>
          <span>256-bit TLS Encrypted</span>
          <span>•</span>
          <span>Authoritative Dispatch</span>
        </p>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </div>
  );
};
