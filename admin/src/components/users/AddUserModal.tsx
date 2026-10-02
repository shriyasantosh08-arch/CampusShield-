import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { User, UserRole, UserStatus } from '../../types/user';
import { userService } from '../../services/userService';
import { useToast } from '../../context/ToastContext';
import { UserPlus, Shield, User as UserIcon, Mail, Phone, Building } from 'lucide-react';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: (newUser: User) => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onUserAdded
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('Student');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');
  const [badgeOrStudentId, setBadgeOrStudentId] = useState('');
  const [status, setStatus] = useState<UserStatus>('Active');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { showToast } = useToast();

  const resetForm = () => {
    setName('');
    setEmail('');
    setRole('Student');
    setDepartment('');
    setPhone('');
    setBadgeOrStudentId('');
    setStatus('Active');
    setErrors({});
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!department.trim()) newErrors.department = 'Department or program is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const newUser = await userService.addUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role,
        department: department.trim(),
        phone: phone.trim() || undefined,
        status,
        badgeNumber: role === 'Security' ? badgeOrStudentId.trim() || `CS-${Math.floor(100 + Math.random() * 900)}` : undefined,
        studentId: role === 'Student' ? badgeOrStudentId.trim() || `STU-${Math.floor(1000 + Math.random() * 9000)}` : undefined
      });

      showToast({
        type: 'success',
        title: 'User Registered',
        message: `${newUser.name} has been created as ${newUser.role}.`
      });

      onUserAdded(newUser);
      resetForm();
      onClose();
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Registration Error',
        message: 'Could not create user. Please verify input.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-brand-600" />
          <span>Provision New System User</span>
        </div>
      }
      subtitle="Register students, campus security officers, or administrative dispatchers"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
            Create User Account
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Legal Name"
            placeholder="e.g. Officer Liam Zhang"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            leftIcon={<UserIcon className="w-4 h-4" />}
            required
          />

          <Input
            label="Campus Email Address"
            type="email"
            placeholder="e.g. l.zhang@campusshield.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Select
            label="Assigned System Role"
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            options={[
              { label: 'Student', value: 'Student' },
              { label: 'Security Officer', value: 'Security' },
              { label: 'Operations Admin', value: 'Admin' }
            ]}
          />

          <Select
            label="Account Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as UserStatus)}
            options={[
              { label: 'Active', value: 'Active' },
              { label: 'Inactive', value: 'Inactive' },
              { label: 'Suspended', value: 'Suspended' }
            ]}
          />

          <Input
            label="Department / Major Program"
            placeholder="e.g. Emergency Services / Computer Eng"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            error={errors.department}
            leftIcon={<Building className="w-4 h-4" />}
            required
          />

          <Input
            label={role === 'Security' ? 'Security Badge Number' : role === 'Student' ? 'Student ID Number' : 'Admin Code'}
            placeholder={role === 'Security' ? 'e.g. CS-092' : 'e.g. STU-2026-9001'}
            value={badgeOrStudentId}
            onChange={(e) => setBadgeOrStudentId(e.target.value)}
            leftIcon={<Shield className="w-4 h-4" />}
          />

          <div className="sm:col-span-2">
            <Input
              label="Contact Phone Number (Optional)"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              leftIcon={<Phone className="w-4 h-4" />}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};
