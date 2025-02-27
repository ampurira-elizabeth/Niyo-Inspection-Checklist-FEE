import { createContext, useState, useEffect, ReactNode } from 'react';
// import { useRouter } from 'next/router';
import { useRouter } from "next/navigation";

import axios from 'axios';

interface User {
  id?: string;
  name?: string;
  email?: string;
  [key: string]: any; // For any additional user properties
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  register: (userData: RegisterUserData) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  [key: string]: any; // For any additional registration fields
}

interface AuthResponse {
  success: boolean;
  token: string;
  data: User;
  error?: string;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  
  useEffect(() => {
    checkUserLoggedIn();
  }, []);
  
  // Register user
  const register = async (userData: RegisterUserData): Promise<void> => {
    try {
      setLoading(true);
      const res = await axios.post<AuthResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, 
        userData
      );
      
      if (res.data.success) {
        setIsAuthenticated(true);
        setUser(res.data.data);
        localStorage.setItem('token', res.data.token);
        setLoading(false);
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
      setLoading(false);
      setIsAuthenticated(false);
    }
  };
  
  // Login user
  const login = async ({ email, password }: LoginCredentials): Promise<void> => {
    try {
      setLoading(true);
      const res = await axios.post<AuthResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, 
        { email, password }
      );
      
      if (res.data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('token', res.data.token);
        await loadUserData();
        setLoading(false);
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid credentials');
      setLoading(false);
      setIsAuthenticated(false);
    }
  };
  
  // Logout user
  const logout = (): void => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  };
  
  // Check if user is logged in
  const checkUserLoggedIn = async (): Promise<void> => {
    const token = localStorage.getItem('token');
    
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await loadUserData();
    } else {
      setLoading(false);
    }
  };
  
  // Load user data
  const loadUserData = async (): Promise<void> => {
    try {
      const res = await axios.get<{ data: User }>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`
      );
      setUser(res.data.data);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (err) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;