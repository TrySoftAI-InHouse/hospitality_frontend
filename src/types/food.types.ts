export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: FoodCategory;
  price: number;
  image?: string;
  isAvailable: boolean;
  preparationTime: number; // in minutes
  ingredients: string[];
  allergens: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  spiceLevel?: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  calories?: number;
}

export interface FoodCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface FoodOrder {
  id: string;
  guestId: string;
  bookingId?: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'Ready' | 'Delivered' | 'Cancelled';
  orderType: 'RoomService' | 'Restaurant' | 'Takeaway';
  orderDate: string;
  estimatedDeliveryTime?: string;
  deliveryAddress?: string;
  specialInstructions?: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
}

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customizations?: string[];
  specialInstructions?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  customizations?: string[];
  specialInstructions?: string;
}