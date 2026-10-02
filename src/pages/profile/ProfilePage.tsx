import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  Hash,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Save,
  X,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  Heart,
  Home,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ProfilePage: React.FC = () => {
  const { student, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: student?.fullName || '',
    phone: student?.phone || '',
    department: student?.department || 'Computer Science & Engineering',
    yearSemester: student?.yearSemester || '3rd Year / 6th Semester',
    emergencyContactName: student?.emergencyContactName || '',
    emergencyContactPhone: student?.emergencyContactPhone || '',
    bloodGroup: student?.bloodGroup || 'O+',
    dormOrAddress: student?.dormOrAddress || 'Cedar Residence Hall, Room 402B',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!formData.fullName.trim()) {
      setErrorMessage('Full name is required.');
      return;
    }

    if (!formData.phone.trim()) {
      setErrorMessage('Phone number is required for dispatch callbacks.');
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile(formData);
      setSuccessMessage('Student safety profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(null), 3500);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (student) {
      setFormData({
        fullName: student.fullName,
        phone: student.phone,
        department: student.department,
        yearSemester: student.yearSemester,
        emergencyContactName: student.emergencyContactName || '',
        emergencyContactPhone: student.emergencyContactPhone || '',
        bloodGroup: student.bloodGroup || 'O+',
        dormOrAddress: student.dormOrAddress || '',
      });
    }
    setIsEditing(false);
    setErrorMessage(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Student Safety Profile
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Keep your contact & emergency responder info updated for campus security dispatch
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-semibold transition-colors self-start sm:self-auto"
          >
            <Edit2 className="w-4 h-4 text-rose-400" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {/* Feedback Messages */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center gap-3"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p>{successMessage}</p>
        </motion.div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-8">
        {/* Top Header: Avatar & Key University Badges */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-800">
          <div className="relative group">
            <img
              src={
                student?.avatarUrl ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  student?.fullName || 'Student'
                )}&background=e11d48&color=fff&size=200&bold=true`
              }
              alt={student?.fullName}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-slate-800 shadow-xl"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-lg">
              <Shield className="w-4 h-4" />
            </div>
          </div>

          <div className="text-center sm:text-left space-y-1.5 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {student?.fullName}
              </h2>
              <span className="inline-flex items-center gap-1 font-mono text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 rounded-full w-fit mx-auto sm:mx-0">
                <Hash className="w-3 h-3" />
                {student?.studentId}
              </span>
            </div>

            <p className="text-sm text-slate-400">{student?.email}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700 font-medium">
                {student?.department}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700 font-medium">
                {student?.yearSemester}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                Verified Student Identity
              </span>
            </div>
          </div>
        </div>

        {/* Profile Information Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="prof-fullname"
                className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="prof-fullname"
                  type="text"
                  name="fullName"
                  disabled={!isEditing}
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 disabled:opacity-60 text-white text-sm outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* Student ID (ReadOnly University Record) */}
            <div>
              <label
                htmlFor="prof-studentid"
                className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1"
              >
                University Student ID (Official)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Hash className="w-4 h-4" />
                </div>
                <input
                  id="prof-studentid"
                  type="text"
                  disabled
                  value={student?.studentId}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/40 border border-slate-800/80 text-slate-400 font-mono text-sm cursor-not-allowed"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="prof-email"
                className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1"
              >
                College Email (Verified)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="prof-email"
                  type="email"
                  disabled
                  value={student?.email}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/40 border border-slate-800/80 text-slate-400 text-sm cursor-not-allowed"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="prof-phone"
                className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1"
              >
                Mobile Phone (Dispatch Reachable)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="prof-phone"
                  type="tel"
                  name="phone"
                  disabled={!isEditing}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 disabled:opacity-60 text-white text-sm outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label
                htmlFor="prof-dept"
                className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1"
              >
                Department / Major
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <select
                  id="prof-dept"
                  name="department"
                  disabled={!isEditing}
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 disabled:opacity-60 text-white text-sm outline-none focus:border-rose-500"
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

            {/* Year / Semester */}
            <div>
              <label
                htmlFor="prof-year"
                className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1"
              >
                Academic Year / Semester
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Calendar className="w-4 h-4" />
                </div>
                <select
                  id="prof-year"
                  name="yearSemester"
                  disabled={!isEditing}
                  value={formData.yearSemester}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 disabled:opacity-60 text-white text-sm outline-none focus:border-rose-500"
                >
                  <option value="1st Year / 1st-2nd Sem">1st Year / 1st-2nd Sem</option>
                  <option value="2nd Year / 3rd-4th Sem">2nd Year / 3rd-4th Sem</option>
                  <option value="3rd Year / 5th-6th Sem">3rd Year / 5th-6th Sem</option>
                  <option value="4th Year / 7th-8th Sem">4th Year / 7th-8th Sem</option>
                  <option value="Graduate / Post-Grad">Graduate / Post-Grad</option>
                </select>
              </div>
            </div>

            {/* Dorm / Campus Residence */}
            <div>
              <label
                htmlFor="prof-dorm"
                className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1"
              >
                Campus Residence / Dorm Room
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Home className="w-4 h-4" />
                </div>
                <input
                  id="prof-dorm"
                  type="text"
                  name="dormOrAddress"
                  disabled={!isEditing}
                  value={formData.dormOrAddress}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 disabled:opacity-60 text-white text-sm outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* Blood Group */}
            <div>
              <label
                htmlFor="prof-blood"
                className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1"
              >
                Blood Group (Emergency Medical Data)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Heart className="w-4 h-4 text-red-500" />
                </div>
                <select
                  id="prof-blood"
                  name="bloodGroup"
                  disabled={!isEditing}
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 disabled:opacity-60 text-white text-sm outline-none focus:border-rose-500 font-mono"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
          </div>

          {/* Emergency Contact Information Section */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Emergency Contact Person
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="prof-emg-name"
                  className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1"
                >
                  Contact Name & Relation
                </label>
                <input
                  id="prof-emg-name"
                  type="text"
                  name="emergencyContactName"
                  disabled={!isEditing}
                  value={formData.emergencyContactName}
                  onChange={handleInputChange}
                  placeholder="e.g. Dr. Robert Vance (Father)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 disabled:opacity-60 text-white text-sm outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label
                  htmlFor="prof-emg-phone"
                  className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1"
                >
                  Emergency Contact Phone
                </label>
                <input
                  id="prof-emg-phone"
                  type="tel"
                  name="emergencyContactPhone"
                  disabled={!isEditing}
                  value={formData.emergencyContactPhone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 987-6543"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 disabled:opacity-60 text-white text-sm outline-none focus:border-rose-500"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons in Edit Mode */}
          {isEditing && (
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
