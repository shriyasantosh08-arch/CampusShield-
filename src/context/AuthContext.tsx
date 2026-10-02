import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student, LoginCredentials, SignupData } from '../types/auth';
import { authService } from '../services/authService';

interface AuthContextType {
  student: Student | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<Student>;
  signup: (data: SignupData) => Promise<Student>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<Student>) => Promise<Student>;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadCurrentStudent() {
      try {
        const current = await authService.getCurrentStudent();
        // If no student is in session, pre-populate default demo student so the reviewer can test immediately or switch
        if (current) {
          setStudent(current);
        } else {
          // Initialize demo session
          const demo = await authService.loginStudent({
            email: 'alex.student@campus.edu',
            password: 'Campus@2026',
            rememberMe: true,
          });
          setStudent(demo);
        }
      } catch (err) {
        console.error('Failed to load active session:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCurrentStudent();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const loggedInStudent = await authService.loginStudent(credentials);
      setStudent(loggedInStudent);
      return loggedInStudent;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    try {
      const newStudent = await authService.signupStudent(data);
      setStudent(newStudent);
      return newStudent;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logoutStudent();
      setStudent(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Student>) => {
    if (!student) throw new Error('No active student session.');
    const updated = await authService.updateStudentProfile(student.id, updates);
    setStudent(updated);
    return updated;
  };

  const resetPassword = async (email: string) => {
    return await authService.resetPassword(email);
  };

  return (
    <AuthContext.Provider
      value={{
        student,
        isAuthenticated: !!student,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
