export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'SuperAdmin';
  avatar?: string;
  badgeId: string;
  title: string;
  department: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  token?: string;
}
