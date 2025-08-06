import type { LoginCredentials, RegisterData, User } from '../types/auth.types';

const demoUsers = {
  admin: {
    id: 'demo-admin-123',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin' as const,
    phone: '+1234567890',
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    loyaltyPoints: 0,
    membershipTier: 'Admin',
    preferences: {}
  },
  guest: {
    id: 'demo-user-123',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'guest' as const,
    phone: '+1234567890',
    avatar: 'https://randomuser.me/api/portraits/lego/2.jpg',
    dateOfBirth: '1990-05-15',
    nationality: 'American',
    passportNumber: 'US123456789',
    loyaltyPoints: 1250,
    membershipTier: 'Gold',
    preferences: {
      roomType: 'Deluxe',
      bedType: 'King',
      smokingPreference: 'Non-smoking',
      floorPreference: 'High',
      dietaryRestrictions: ['Vegetarian'],
      specialRequests: 'Late checkout if possible'
    }
  }
};

export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let user: User;
    
    if (credentials.email === demoUsers.admin.email) {
      user = demoUsers.admin;
    } else if (credentials.email === demoUsers.guest.email) {
      user = demoUsers.guest;
    } else {
      throw new Error('Invalid email or password');
    }

    this.currentUser = user;
    const token = `demo-token-${user.id}`;
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));

    return user;
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser;
    
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        this.currentUser = JSON.parse(storedUser);
        return this.currentUser;
      } catch {
        return null;
      }
    }
    
    return null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken') && !!this.getCurrentUser();
  }

  async register(data: RegisterData): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    throw new Error('Registration disabled in demo mode');
  }
}

export const authService = AuthService.getInstance();