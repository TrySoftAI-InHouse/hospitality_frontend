import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { User as UserType } from '../types/auth.types';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const user = authService.getCurrentUser();
        setCurrentUser(user);
        setError(null);
      } catch (err) {
        setCurrentUser(null);
        setError(err instanceof Error ? err.message : 'Authentication error');
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthState();
  }, []);

  const handleAuthSuccess = (user: UserType) => {
    setCurrentUser(user);
    setError(null);
    if (user.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/guest/dashboard');
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setCurrentUser(null);
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    }
  };

  const isDemoUser = () => {
    return currentUser?.email === 'john.doe@example.com';
  };

  return { 
    currentUser,
    isLoading,
    error,
    isDemoUser,
    handleAuthSuccess,
    handleLogout
  };
}


export interface GuestPreferences {
  roomType: 'Standard' | 'Deluxe' | 'Suite' | 'Presidential';
  bedType: 'Single' | 'Double' | 'King' | 'Twin';
  smokingPreference: 'Non-smoking' | 'Smoking';
  floorPreference: 'Low' | 'High' | 'Any';
  dietaryRestrictions?: string[];
  specialRequests?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'guest';
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  nationality?: string;
  passportNumber?: string;
  preferences?: GuestPreferences;
  loyaltyPoints?: number;
  membershipTier?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends Omit<User, 'id' | 'role' | 'preferences'> {
  password: string;
  confirmPassword: string;
}

export interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isDemoUser: () => boolean;
}