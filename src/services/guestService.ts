import { 
  Feedback, 
  FeedbackCategory, 
  GuestRequest, 
  RequestType, 
  Notification, 
  LoyaltyProgram,
  LoyaltyBenefit,
  LoyaltyTransaction 
} from '../types/guest.types';

// Mock feedback categories
const mockFeedbackCategories: FeedbackCategory[] = [
  { id: '1', name: 'Room Quality', description: 'Feedback about room conditions and amenities' },
  { id: '2', name: 'Service Quality', description: 'Staff service and hospitality feedback' },
  { id: '3', name: 'Food & Dining', description: 'Restaurant and room service feedback' },
  { id: '4', name: 'Facilities', description: 'Hotel facilities and amenities feedback' },
  { id: '5', name: 'Overall Experience', description: 'General feedback about your stay' }
];

// Mock request types
const mockRequestTypes: RequestType[] = [
  { id: '1', name: 'Extra Towels', category: 'Housekeeping', icon: '🛁' },
  { id: '2', name: 'Room Cleaning', category: 'Housekeeping', icon: '🧹' },
  { id: '3', name: 'Maintenance Issue', category: 'Maintenance', icon: '🔧' },
  { id: '4', name: 'Restaurant Reservation', category: 'Concierge', icon: '🍽️' },
  { id: '5', name: 'Transportation', category: 'Concierge', icon: '🚗' },
  { id: '6', name: 'Room Service', category: 'FoodService', icon: '🍴' },
  { id: '7', name: 'Wake-up Call', category: 'Other', icon: '⏰' }
];

// Mock data
const mockFeedback: Feedback[] = [];
const mockRequests: GuestRequest[] = [];
const mockNotifications: Notification[] = [
  {
    id: '1',
    guestId: '1',
    title: 'Welcome to International Hotel!',
    message: 'Thank you for choosing us. Your room is ready for check-in.',
    type: 'Info',
    isRead: false,
    createdDate: '2025-01-27T10:00:00Z',
    actionUrl: '/bookings',
    actionText: 'View Booking'
  },
  {
    id: '2',
    guestId: '1',
    title: 'Special Offer',
    message: 'Enjoy 20% off your next spa booking as a Gold member!',
    type: 'Success',
    isRead: false,
    createdDate: '2025-01-26T15:30:00Z'
  }
];

// Mock loyalty benefits
const mockLoyaltyBenefits: LoyaltyBenefit[] = [
  { id: '1', name: 'Free WiFi', description: 'Complimentary high-speed internet', tier: 'Bronze', isActive: true },
  { id: '2', name: 'Late Checkout', description: 'Check out up to 2 PM', tier: 'Silver', isActive: true },
  { id: '3', name: 'Room Upgrade', description: 'Subject to availability', tier: 'Gold', isActive: true },
  { id: '4', name: 'Airport Transfer', description: 'Complimentary airport pickup', tier: 'Platinum', isActive: false }
];

const mockLoyaltyTransactions: LoyaltyTransaction[] = [
  {
    id: '1',
    type: 'Earned',
    points: 250,
    description: 'Room booking - Deluxe Room',
    date: '2025-01-20',
    bookingId: '1'
  },
  {
    id: '2',
    type: 'Earned',
    points: 50,
    description: 'Restaurant dining',
    date: '2025-01-21'
  }
];

export class GuestService {
  private static instance: GuestService;

  static getInstance(): GuestService {
    if (!GuestService.instance) {
      GuestService.instance = new GuestService();
    }
    return GuestService.instance;
  }

  // Feedback methods
  async getFeedbackCategories(): Promise<FeedbackCategory[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockFeedbackCategories;
  }

  async submitFeedback(feedbackData: Omit<Feedback, 'id' | 'createdDate' | 'status'>): Promise<Feedback> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const newFeedback: Feedback = {
      ...feedbackData,
      id: Math.random().toString(36).substr(2, 9),
      createdDate: new Date().toISOString(),
      status: 'Pending'
    };

    mockFeedback.push(newFeedback);
    return newFeedback;
  }

  async getGuestFeedback(guestId: string): Promise<Feedback[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockFeedback
      .filter(feedback => feedback.guestId === guestId)
      .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
  }

  // Request methods
  async getRequestTypes(): Promise<RequestType[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockRequestTypes;
  }

  async submitRequest(requestData: Omit<GuestRequest, 'id' | 'createdDate' | 'status'>): Promise<GuestRequest> {
    await new Promise(resolve => setTimeout(resolve, 700));

    const newRequest: GuestRequest = {
      ...requestData,
      id: Math.random().toString(36).substr(2, 9),
      createdDate: new Date().toISOString(),
      status: 'Open'
    };

    mockRequests.push(newRequest);
    return newRequest;
  }

  async getGuestRequests(guestId: string): Promise<GuestRequest[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockRequests
      .filter(request => request.guestId === guestId)
      .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
  }

  async updateRequestStatus(requestId: string, status: GuestRequest['status']): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const request = mockRequests.find(r => r.id === requestId);
    if (request) {
      request.status = status;
      if (status === 'Resolved' || status === 'Closed') {
        request.resolvedDate = new Date().toISOString();
      }
    }
  }

  // Notification methods
  async getNotifications(guestId: string): Promise<Notification[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockNotifications
      .filter(notification => notification.guestId === guestId)
      .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const notification = mockNotifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
    }
  }

  async markAllNotificationsAsRead(guestId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    mockNotifications
      .filter(n => n.guestId === guestId)
      .forEach(n => n.isRead = true);
  }

  // Loyalty program methods
  async getLoyaltyProgram(guestId: string): Promise<LoyaltyProgram> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const currentTier = 'Gold'; // This would come from user data
    const currentPoints = 1250;

    return {
      guestId,
      currentPoints,
      totalEarned: 2100,
      totalRedeemed: 850,
      tier: currentTier,
      nextTierPoints: currentTier === 'Platinum' ? undefined : 2500,
      benefits: mockLoyaltyBenefits.filter(benefit => 
        this.getTierLevel(benefit.tier) <= this.getTierLevel(currentTier)
      ),
      transactions: mockLoyaltyTransactions
    };
  }

  private getTierLevel(tier: string): number {
    const levels = { 'Bronze': 1, 'Silver': 2, 'Gold': 3, 'Platinum': 4 };
    return levels[tier as keyof typeof levels] || 0;
  }

  async redeemPoints(guestId: string, points: number, description: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const transaction: LoyaltyTransaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'Redeemed',
      points,
      description,
      date: new Date().toISOString().split('T')[0]
    };

    mockLoyaltyTransactions.push(transaction);
  }
}

export const guestService = GuestService.getInstance();