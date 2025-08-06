export interface Feedback {
  id: string;
  guestId: string;
  bookingId?: string;
  rating: number; // 1-5 stars
  category: FeedbackCategory;
  title: string;
  comment: string;
  isAnonymous: boolean;
  status: 'Pending' | 'Reviewed' | 'Resolved';
  createdDate: string;
  response?: FeedbackResponse;
  images?: string[];
}

export interface FeedbackCategory {
  id: string;
  name: string;
  description?: string;
}

export interface FeedbackResponse {
  id: string;
  message: string;
  respondedBy: string;
  responseDate: string;
}

export interface GuestRequest {
  id: string;
  guestId: string;
  bookingId?: string;
  type: RequestType;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'InProgress' | 'Resolved' | 'Closed';
  createdDate: string;
  resolvedDate?: string;
  assignedTo?: string;
}

export interface RequestType {
  id: string;
  name: string;
  category: 'Housekeeping' | 'Maintenance' | 'Concierge' | 'FoodService' | 'Other';
  icon?: string;
}

export interface Notification {
  id: string;
  guestId: string;
  title: string;
  message: string;
  type: 'Info' | 'Success' | 'Warning' | 'Error';
  isRead: boolean;
  createdDate: string;
  actionUrl?: string;
  actionText?: string;
}

export interface LoyaltyProgram {
  guestId: string;
  currentPoints: number;
  totalEarned: number;
  totalRedeemed: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  nextTierPoints?: number;
  benefits: LoyaltyBenefit[];
  transactions: LoyaltyTransaction[];
}

export interface LoyaltyBenefit {
  id: string;
  name: string;
  description: string;
  tier: string;
  isActive: boolean;
}

export interface LoyaltyTransaction {
  id: string;
  type: 'Earned' | 'Redeemed';
  points: number;
  description: string;
  date: string;
  bookingId?: string;
}