export type UserType = "parent" | "official" | "third-party-guardian";

export interface User {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  verified: boolean;
  governmentId?: string;
  phone?: string;
  profileImage?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  userType: UserType;
  phone: string;
  governmentId?: string;
}

// Mock authentication functions
export const login = async (credentials: LoginCredentials): Promise<User> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const mockUser: User = {
    id: "1",
    email: credentials.email,
    name: "Sarah Johnson",
    userType: "parent",
    verified: true,
    governmentId: "DL-1234567890",
    phone: "+1-555-0123",
    profileImage: "/placeholder.svg",
    createdAt: new Date("2024-01-15"),
    lastLogin: new Date(),
  };

  return mockUser;
};

export const register = async (data: RegistrationData): Promise<User> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const mockUser: User = {
    id: Date.now().toString(),
    email: data.email,
    name: data.name,
    userType: data.userType,
    verified: false,
    governmentId: data.governmentId,
    phone: data.phone,
    createdAt: new Date(),
  };

  return mockUser;
};

export const logout = async (): Promise<void> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
};

export const verifyGovernmentId = async (idData: string): Promise<boolean> => {
  // Simulate ID verification
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return Math.random() > 0.2; // 80% success rate for demo
};

export const sendEmailVerification = async (email: string): Promise<void> => {
  // Simulate sending verification email
  await new Promise((resolve) => setTimeout(resolve, 1000));
};
