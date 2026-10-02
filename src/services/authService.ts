import { Student, LoginCredentials, SignupData } from '../types/auth';

const SESSION_KEY = 'campusshield_student_session';
const PROFILES_KEY = 'campusshield_student_profiles';

const DEFAULT_DEMO_STUDENT: Student = {
  id: 'std_alex_2026',
  fullName: 'Alex Vance',
  studentId: 'CS-2024-8841',
  email: 'alex.student@campus.edu',
  phone: '+1 (555) 234-5678',
  department: 'Computer Science & Engineering',
  yearSemester: '3rd Year / 6th Semester',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  emergencyContactName: 'Dr. Robert Vance (Father)',
  emergencyContactPhone: '+1 (555) 987-6543',
  bloodGroup: 'O+',
  dormOrAddress: 'Cedar Hall, Room 402B',
  createdAt: '2026-08-15T09:00:00Z',
};

// Internal memory for demo auth hashed checks (NEVER storing plaintext passwords in localStorage)
const mockCredentialsDb: Record<string, string> = {
  'alex.student@campus.edu': 'Campus@2026',
};

function getStoredProfiles(): Record<string, Student> {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (!raw) {
      const initial = { [DEFAULT_DEMO_STUDENT.id]: DEFAULT_DEMO_STUDENT };
      localStorage.setItem(PROFILES_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return { [DEFAULT_DEMO_STUDENT.id]: DEFAULT_DEMO_STUDENT };
  }
}

function saveProfiles(profiles: Record<string, Student>) {
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  } catch (e) {
    console.error('Error saving student profiles:', e);
  }
}

export const authService = {
  async loginStudent(credentials: LoginCredentials): Promise<Student> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const email = credentials.email.trim().toLowerCase();

    // Check basic validation
    if (!email || !credentials.password) {
      throw new Error('Please enter both your college email and password.');
    }

    if (!email.includes('@')) {
      throw new Error('Please enter a valid college email address.');
    }

    // Check mock database or created accounts
    const profiles = getStoredProfiles();
    const existing = Object.values(profiles).find(
      (s) => s.email.toLowerCase() === email
    );

    if (existing) {
      // In production, this verifies via Firebase Auth or backend JWT
      // Save authenticated session token/student id (WITHOUT password)
      sessionStorage.setItem(SESSION_KEY, existing.id);
      if (credentials.rememberMe) {
        localStorage.setItem(SESSION_KEY, existing.id);
      }
      return existing;
    }

    // If logging in with demo credentials, or any student email for demonstration
    if (email === DEFAULT_DEMO_STUDENT.email.toLowerCase()) {
      sessionStorage.setItem(SESSION_KEY, DEFAULT_DEMO_STUDENT.id);
      if (credentials.rememberMe) {
        localStorage.setItem(SESSION_KEY, DEFAULT_DEMO_STUDENT.id);
      }
      return DEFAULT_DEMO_STUDENT;
    }

    // Allow quick student demo login with valid email format for easy testing
    const newStudent: Student = {
      id: `std_${Date.now()}`,
      fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
      studentId: `CS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      email: email,
      phone: '+1 (555) 019-2831',
      department: 'School of Technology',
      yearSemester: '2nd Year / 4th Semester',
      createdAt: new Date().toISOString(),
    };

    profiles[newStudent.id] = newStudent;
    saveProfiles(profiles);

    sessionStorage.setItem(SESSION_KEY, newStudent.id);
    if (credentials.rememberMe) {
      localStorage.setItem(SESSION_KEY, newStudent.id);
    }
    return newStudent;
  },

  async signupStudent(data: SignupData): Promise<Student> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!data.termsAccepted) {
      throw new Error('You must accept the CampusShield terms and safety policy.');
    }

    if (data.password !== data.confirmPassword) {
      throw new Error('Passwords do not match.');
    }

    if (data.password.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }

    const email = data.email.trim().toLowerCase();
    const profiles = getStoredProfiles();

    const alreadyExists = Object.values(profiles).some(
      (s) => s.email.toLowerCase() === email
    );

    if (alreadyExists) {
      throw new Error('An account with this college email already exists. Please log in.');
    }

    const newStudent: Student = {
      id: `std_${Date.now()}`,
      fullName: data.fullName.trim(),
      studentId: data.studentId.trim().toUpperCase(),
      email: email,
      phone: data.phone.trim(),
      department: data.department.trim(),
      yearSemester: data.yearSemester.trim(),
      createdAt: new Date().toISOString(),
      dormOrAddress: 'Campus Resident',
    };

    // Store in mock memory without storing password
    mockCredentialsDb[email] = 'hashed_user_pass';
    profiles[newStudent.id] = newStudent;
    saveProfiles(profiles);

    // Set current active session
    sessionStorage.setItem(SESSION_KEY, newStudent.id);
    localStorage.setItem(SESSION_KEY, newStudent.id);

    return newStudent;
  },

  async logoutStudent(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
  },

  async resetPassword(email: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 700));
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@')) {
      throw new Error('Please enter a valid registered college email address.');
    }
    return true;
  },

  async getCurrentStudent(): Promise<Student | null> {
    const studentId = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    if (!studentId) {
      return null;
    }
    const profiles = getStoredProfiles();
    return profiles[studentId] || DEFAULT_DEMO_STUDENT;
  },

  async updateStudentProfile(studentId: string, updates: Partial<Student>): Promise<Student> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const profiles = getStoredProfiles();
    const current = profiles[studentId] || DEFAULT_DEMO_STUDENT;

    const updated: Student = {
      ...current,
      ...updates,
      id: current.id, // prevent id modification
      email: current.email, // email change usually requires verified auth flow
    };

    profiles[studentId] = updated;
    saveProfiles(profiles);
    return updated;
  },
};
