import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { User as UserType } from '../types/auth.types';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = () => {
    setIsLoading(true);
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    setIsLoading(false);
    return user;
  };

  const handleAuthSuccess = () => {
    const user = checkAuthState();
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/guest/dashboard');
      }
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    checkAuthState();
    navigate('/');
  };

  const isDemoUser = () => {
    return currentUser?.email === 'john.doe@example.com';
  };

  return { 
    currentUser,
    isLoading,
    isDemoUser,
    handleAuthSuccess,
    handleLogout,
    checkAuthState
  };
}