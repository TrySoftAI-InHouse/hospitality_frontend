import type { LoginCredentials, RegisterData, User } from '../types/auth.types';


const demoUsers = {
  admin: {
    id: 'demo-admin-123',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    phone: '+1234567890',
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    loyaltyPoints: 0,
    membershipTier: 'Admin',
    preferences: {}
  },
  manager: {
    id: 'demo-manager-123',
    email: 'manager@example.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'manager',
    phone: '+1234567891',
    avatar: 'https://randomuser.me/api/portraits/lego/3.jpg',
    loyaltyPoints: 0,
    membershipTier: 'Manager',
    preferences: {}
  },
  receptionist: {
    id: 'demo-receptionist-123',
    email: 'receptionist@example.com',
    firstName: 'Michael',
    lastName: 'Brown',
    role: 'receptionist',
    phone: '+1234567892',
    avatar: 'https://randomuser.me/api/portraits/lego/4.jpg',
    loyaltyPoints: 0,
    membershipTier: 'Staff',
    preferences: {}
  },
  housekeeping: {
    id: 'demo-housekeeping-123',
    email: ' @example.com',
    firstName: 'Maria',
    lastName: 'Garcia',
    role: 'housekeeping',
    phone: '+1234567893',
    avatar: 'https://randomuser.me/api/portraits/lego/5.jpg',
    loyaltyPoints: 0,
    membershipTier: 'Staff',
    preferences: {}
  },
  kitchen: {
    id: 'demo-kitchen-123',
    email: 'kitchen@example.com',
    firstName: 'James',
    lastName: 'Wilson',
    role: 'kitchen',
    phone: '+1234567894',
    avatar: 'https://randomuser.me/api/portraits/lego/6.jpg',
    loyaltyPoints: 0,
    membershipTier: 'Staff',
    preferences: {}
  },
  guest: {
    id: 'demo-user-123',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'guest',
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
    } else if (credentials.email === demoUsers.manager.email) {
      user = demoUsers.manager;
    } else if (credentials.email === demoUsers.receptionist.email) {
      user = demoUsers.receptionist;
    } else if (credentials.email === demoUsers.housekeeping.email) {
      user = demoUsers.housekeeping;
    } else if (credentials.email === demoUsers.kitchen.email) {
      user = demoUsers.kitchen;
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