export interface Student {
  id: string;
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  department: string;
  yearSemester: string;
  avatarUrl?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  bloodGroup?: string;
  dormOrAddress?: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  department: string;
  yearSemester: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface AuthState {
  student: Student | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
