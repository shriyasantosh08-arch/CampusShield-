import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Users as UsersIcon,
  UserPlus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Shield,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Building,
  Mail,
  Phone,
  Power
} from 'lucide-react';
import { User, UserRole, UserStatus } from '../../types/user';
import { userService } from '../../services/userService';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { AddUserModal } from '../../components/users/AddUserModal';
import { EditUserModal } from '../../components/users/EditUserModal';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

export const UsersPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>(searchParams.get('role') || 'All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserAdded = (newUser: User) => {
    setUsers((prev) => [newUser, ...prev]);
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  const handleToggleStatus = async (user: User) => {
    try {
      const updated = await userService.toggleUserStatus(user.id);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      showToast({
        type: updated.status === 'Active' ? 'success' : 'warning',
        title: `Status: ${updated.status}`,
        message: `${user.name}'s account is now ${updated.status}.`
      });
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Action Failed',
        message: 'Could not toggle user status.'
      });
    }
  };

  const handleDeleteUser = async () => {
    if (!deletingUser) return;
    setIsDeleting(true);
    try {
      await userService.deleteUser(deletingUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));
      showToast({
        type: 'info',
        title: 'User Removed',
        message: `${deletingUser.name} has been removed from the platform.`
      });
      setIsDeleteOpen(false);
      setDeletingUser(null);
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Delete Failed',
        message: 'Could not delete user account.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = u.name.toLowerCase().includes(q);
        const matchEmail = u.email.toLowerCase().includes(q);
        const matchDept = u.department?.toLowerCase().includes(q) || false;
        const matchId = u.id.toLowerCase().includes(q);
        const matchBadge = u.badgeNumber?.toLowerCase().includes(q) || false;
        const matchStudent = u.studentId?.toLowerCase().includes(q) || false;
        if (!matchName && !matchEmail && !matchDept && !matchId && !matchBadge && !matchStudent) {
          return false;
        }
      }

      if (selectedRole !== 'All' && u.role !== selectedRole) {
        return false;
      }

      if (selectedStatus !== 'All' && u.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [users, searchQuery, selectedRole, selectedStatus]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            User & Personnel Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Provision, manage, and audit student accounts, security officers, and command staff.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsAddOpen(true)}
          leftIcon={<UserPlus className="w-4 h-4" />}
        >
          Add New User
        </Button>
      </div>

      {/* Role Stats Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-soft flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase text-slate-400">Total Users</p>
            <p className="text-xl font-bold text-slate-900">{users.length}</p>
          </div>
          <div className="p-2 rounded-xl bg-slate-100 text-slate-600">
            <UsersIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-soft flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase text-slate-400">Security Staff</p>
            <p className="text-xl font-bold text-blue-600">
              {users.filter((u) => u.role === 'Security').length}
            </p>
          </div>
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
            <Shield className="w-5 h-5" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-soft flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase text-slate-400">Students</p>
            <p className="text-xl font-bold text-emerald-600">
              {users.filter((u) => u.role === 'Student').length}
            </p>
          </div>
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-soft flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase text-slate-400">Administrators</p>
            <p className="text-xl font-bold text-purple-600">
              {users.filter((u) => u.role === 'Admin').length}
            </p>
          </div>
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
            <Shield className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Card */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-soft flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search by name, campus email, badge or student ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="w-full sm:w-48">
          <Select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            options={[
              { label: 'All Roles', value: 'All' },
              { label: 'Students', value: 'Student' },
              { label: 'Security Officers', value: 'Security' },
              { label: 'Administrators', value: 'Admin' }
            ]}
          />
        </div>

        <div className="w-full sm:w-44">
          <Select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            options={[
              { label: 'All Statuses', value: 'All' },
              { label: 'Active', value: 'Active' },
              { label: 'Inactive', value: 'Inactive' },
              { label: 'Suspended', value: 'Suspended' }
            ]}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden">
        {isLoading ? (
          <LoadingSpinner label="Fetching user registry..." fullHeight />
        ) : filteredUsers.length === 0 ? (
          <EmptyState
            title="No Users Found"
            description="No user records matched your criteria."
            actionLabel="Reset Search"
            onAction={() => {
              setSearchQuery('');
              setSelectedRole('All');
              setSelectedStatus('All');
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-3">Role</th>
                  <th className="py-3.5 px-3">Department / Program</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-3">Joined Date</th>
                  <th className="py-3.5 px-3">Last Active</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/70 transition">
                    {/* User Info */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{user.name}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{user.email}</span>
                      </div>
                      {(user.badgeNumber || user.studentId) && (
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                          ID: {user.badgeNumber || user.studentId}
                        </div>
                      )}
                    </td>

                    {/* Role Badge */}
                    <td className="py-3.5 px-3">
                      <Badge variant="role" value={user.role} size="sm" />
                    </td>

                    {/* Department */}
                    <td className="py-3.5 px-3 text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <Building className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        <span className="truncate max-w-[170px]">{user.department || 'General'}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3">
                      <Badge variant="userStatus" value={user.status} size="sm" />
                    </td>

                    {/* Joined Date */}
                    <td className="py-3.5 px-3 font-mono text-slate-500">{user.joinedDate}</td>

                    {/* Last Active */}
                    <td className="py-3.5 px-3 text-slate-500">{user.lastActive || 'Recently'}</td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleToggleStatus(user)}
                          className={`p-1.5 rounded-lg transition ${
                            user.status === 'Active'
                              ? 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'
                              : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={user.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                        >
                          <Power className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setIsEditOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 transition"
                          title="Edit User Details"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setDeletingUser(user);
                            setIsDeleteOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddUserModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onUserAdded={handleUserAdded}
      />

      <EditUserModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={editingUser}
        onUserUpdated={handleUserUpdated}
      />

      {/* Confirm Delete Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Confirm User Account Removal"
        subtitle="This action is irreversible and removes all access privileges."
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsDeleteOpen(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteUser} isLoading={isDeleting}>
              Delete Account
            </Button>
          </>
        }
      >
        <p className="text-xs text-slate-600 leading-relaxed">
          Are you sure you want to permanently delete user{' '}
          <span className="font-bold text-slate-900">{deletingUser?.name}</span> ({deletingUser?.email})?
        </p>
      </Modal>
    </div>
  );
};
