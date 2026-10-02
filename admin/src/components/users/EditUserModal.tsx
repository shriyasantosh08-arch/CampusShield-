import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { User, UserRole, UserStatus } from '../../types/user';
import { userService } from '../../services/userService';
import { useToast } from '../../context/ToastContext';
import { Edit2, User as UserIcon, Mail, Phone, Building, Shield } from 'lucide-react';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onUserUpdated: (updatedUser: User) => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  user,
  onUserUpdated
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

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setDepartment(user.department || '');
      setPhone(user.phone || '');
      setBadgeOrStudentId(user.badgeNumber || user.studentId || '');
      setStatus(user.status);
      setErrors({});
    }
  }, [user, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!name.trim()) {
      setErrors({ name: 'Full name is required' });
      return;
    }

    setIsSubmitting(true);
    try {
      const updated = await userService.updateUser(user.id, {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role,
        department: department.trim(),
        phone: phone.trim() || undefined,
        status,
        badgeNumber: role === 'Security' ? badgeOrStudentId : undefined,
        studentId: role === 'Student' ? badgeOrStudentId : undefined
      });

      showToast({
        type: 'success',
        title: 'User Profile Updated',
        message: `${updated.name}'s details were successfully saved.`
      });

      onUserUpdated(updated);
      onClose();
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Update Failed',
        message: 'Could not update user details.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Edit2 className="w-5 h-5 text-brand-600" />
          <span>Edit User Account</span>
        </div>
      }
      subtitle={`User ID: ${user.id} • Registered on ${user.joinedDate}`}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
            Save Changes
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            leftIcon={<UserIcon className="w-4 h-4" />}
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Select
            label="Role"
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
            label="Department / Program"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            leftIcon={<Building className="w-4 h-4" />}
          />

          <Input
            label={role === 'Security' ? 'Badge Number' : 'Student / Admin ID'}
            value={badgeOrStudentId}
            onChange={(e) => setBadgeOrStudentId(e.target.value)}
            leftIcon={<Shield className="w-4 h-4" />}
          />

          <div className="sm:col-span-2">
            <Input
              label="Phone Number"
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
