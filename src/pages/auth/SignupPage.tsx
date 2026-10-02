import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../../components/common/Modal';
import {
  Shield,
  User,
  Hash,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    phone: '',
    department: 'Computer Science & Engineering',
    yearSemester: '3rd Year / 6th Semester',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  // Password strength calculations
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score; // 0 to 4
  };

  const strength = calculateStrength(formData.password);

  const getStrengthLabel = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-400' };
      case 2:
        return { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-400' };
      case 3:
        return { label: 'Good', color: 'bg-blue-500', text: 'text-blue-400' };
      case 4:
        return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-400' };
      default:
        return { label: 'Weak', color: 'bg-slate-700', text: 'text-slate-500' };
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (strength < 2) {
      setErrorMessage('Please create a stronger password (at least 8 chars with mixed cases or numbers).');
      return;
    }

    if (!formData.termsAccepted) {
      setErrorMessage('Please accept the CampusShield terms and safety protocols.');
      return;
    }

    setIsLoading(true);
    try {
      await signup(formData);
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMessage(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-xl relative z-10 px-4">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center shadow-xl shadow-rose-600/30 mb-2">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Register for Campus<span className="text-rose-500">Shield</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Create your student safety profile to send rapid alerts and receive campus updates
          </p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
        >
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <p>{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name & Student ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="signup-name"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1"
                >
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="signup-name"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex Vance"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:border-rose-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-id"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1"
                >
                  Student ID <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Hash className="w-4 h-4" />
                  </div>
                  <input
                    id="signup-id"
                    name="studentId"
                    type="text"
                    required
                    value={formData.studentId}
                    onChange={handleInputChange}
                    placeholder="e.g. CS-2024-8841"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:border-rose-500 outline-none font-mono uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1"
                >
                  College Email <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="signup-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@campus.edu"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:border-rose-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-phone"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1"
                >
                  Phone Number <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    id="signup-phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 234-5678"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:border-rose-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Department & Year/Semester */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="signup-department"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1"
                >
                  Department <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <select
                    id="signup-department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:border-rose-500 outline-none"
                  >
                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Business & Management">Business & Management</option>
                    <option value="Biomedical Sciences">Biomedical Sciences</option>
                    <option value="Architecture & Design">Architecture & Design</option>
                    <option value="Law & Public Policy">Law & Public Policy</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-year"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1"
                >
                  Year / Semester <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <select
                    id="signup-year"
                    name="yearSemester"
                    value={formData.yearSemester}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:border-rose-500 outline-none"
                  >
                    <option value="1st Year / 1st-2nd Sem">1st Year / 1st-2nd Sem</option>
                    <option value="2nd Year / 3rd-4th Sem">2nd Year / 3rd-4th Sem</option>
                    <option value="3rd Year / 5th-6th Sem">3rd Year / 5th-6th Sem</option>
                    <option value="4th Year / 7th-8th Sem">4th Year / 7th-8th Sem</option>
                    <option value="Graduate / Post-Grad">Graduate / Post-Grad</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Password & Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1"
                >
                  Password <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="signup-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Min 8 characters"
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:border-rose-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-500 hover:text-slate-300"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-confirm-password"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1"
                >
                  Confirm Password <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="signup-confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Repeat password"
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:border-rose-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-500 hover:text-slate-300"
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Strength Meter */}
            {formData.password && (
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Password Strength:</span>
                  <span className={`font-bold ${getStrengthLabel(strength).text}`}>
                    {getStrengthLabel(strength).label}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 h-1.5">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-full rounded-full transition-all ${
                        strength >= level
                          ? getStrengthLabel(strength).color
                          : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-1 pt-1 text-[10px] text-slate-400">
                  <span className={formData.password.length >= 8 ? 'text-emerald-400' : ''}>
                    ✓ 8+ Characters
                  </span>
                  <span className={/[A-Z]/.test(formData.password) ? 'text-emerald-400' : ''}>
                    ✓ Uppercase letter
                  </span>
                  <span className={/[0-9]/.test(formData.password) ? 'text-emerald-400' : ''}>
                    ✓ Number digit
                  </span>
                  <span className={/[^A-Za-z0-9]/.test(formData.password) ? 'text-emerald-400' : ''}>
                    ✓ Special symbol
                  </span>
                </div>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="mt-0.5 w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-700 bg-slate-900"
                />
                <span className="text-xs text-slate-300 leading-normal">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setTermsModalOpen(true)}
                    className="text-rose-400 hover:text-rose-300 underline font-semibold"
                  >
                    Campus Safety & Emergency Protocol terms
                  </button>
                  . I understand false emergency reporting is prohibited by university regulations.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !formData.termsAccepted}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Student Account...</span>
                </>
              ) : (
                <span>Complete Student Registration</span>
              )}
            </button>
          </form>

          {/* Login link */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-rose-400 hover:text-rose-300 ml-1">
                Sign in to student portal →
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Terms and Conditions Modal */}
      <Modal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        title="CampusShield Emergency Protocols & Terms"
        description="University Student Code of Conduct & Emergency System Guidelines"
        maxWidth="lg"
      >
        <div className="space-y-3 text-xs text-slate-300 max-h-80 overflow-y-auto pr-2">
          <p>
            1. <strong>Purpose:</strong> CampusShield is designated exclusively for campus emergencies, safety hazards, medical urgent care requests, and student security welfare.
          </p>
          <p>
            2. <strong>Responsible Use:</strong> Malicious or intentional false reports constitute an obstruction of campus police operations and may result in immediate suspension and disciplinary proceedings under the University Code.
          </p>
          <p>
            3. <strong>Location Sharing:</strong> When reporting an active emergency, your GPS coordinates will be communicated strictly to verified campus safety officers and first responders.
          </p>
          <p>
            4. <strong>Confidentiality:</strong> Student welfare reports are handled with high confidentiality adhering to campus privacy protections.
          </p>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={() => {
              setFormData((prev) => ({ ...prev, termsAccepted: true }));
              setTermsModalOpen(false);
            }}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg"
          >
            I Understand & Accept
          </button>
        </div>
      </Modal>
    </div>
  );
};
