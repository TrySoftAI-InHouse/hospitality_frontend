import { MenuItem, FoodCategory, FoodOrder, OrderItem, CartItem } from '../types/food.types';

// Mock food categories
const mockCategories: FoodCategory[] = [
  { id: '1', name: 'Appetizers', description: 'Start your meal right', icon: '🥗' },
  { id: '2', name: 'Main Course', description: 'Hearty main dishes', icon: '🍽️' },
  { id: '3', name: 'Desserts', description: 'Sweet endings', icon: '🍰' },
  { id: '4', name: 'Beverages', description: 'Refreshing drinks', icon: '🥤' },
  { id: '5', name: 'Breakfast', description: 'Morning favorites', icon: '🍳' }
];

// Mock menu items
const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan cheese and croutons',
    category: mockCategories[0],
    price: 15,
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400',
    isAvailable: true,
    preparationTime: 10,
    ingredients: ['Romaine lettuce', 'Parmesan cheese', 'Croutons', 'Caesar dressing'],
    allergens: ['Dairy', 'Gluten'],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    calories: 280
  },
  {
    id: '2',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with herbs and lemon',
    category: mockCategories[1],
    price: 32,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
    isAvailable: true,
    preparationTime: 25,
    ingredients: ['Atlantic salmon', 'Fresh herbs', 'Lemon', 'Olive oil'],
    allergens: ['Fish'],
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    calories: 450
  },
  {
    id: '3',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center',
    category: mockCategories[2],
    price: 12,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
    isAvailable: true,
    preparationTime: 15,
    ingredients: ['Dark chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour'],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    calories: 380
  },
  {
    id: '4',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    category: mockCategories[3],
    price: 8,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
    isAvailable: true,
    preparationTime: 5,
    ingredients: ['Fresh oranges'],
    allergens: [],
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    calories: 120
  },
  {
    id: '5',
    name: 'Eggs Benedict',
    description: 'Poached eggs on English muffin with hollandaise sauce',
    category: mockCategories[4],
    price: 18,
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400',
    isAvailable: true,
    preparationTime: 12,
    ingredients: ['Eggs', 'English muffin', 'Ham', 'Hollandaise sauce'],
    allergens: ['Eggs', 'Dairy', 'Gluten'],
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    calories: 420
  }
];

// Mock orders
const mockOrders: FoodOrder[] = [
  {
    id: '1',
    guestId: '1',
    bookingId: '1',
    orderNumber: 'ORD001',
    items: [
      {
        id: '1',
        menuItem: mockMenuItems[0],
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
        customizations: ['Extra dressing']
      }
    ],
    totalAmount: 15,
    status: 'Delivered',
    orderType: 'RoomService',
    orderDate: '2025-01-26T14:30:00Z',
    estimatedDeliveryTime: '2025-01-26T15:00:00Z',
    paymentStatus: 'Paid'
  }
];

export class FoodService {
  private static instance: FoodService;

  static getInstance(): FoodService {
    if (!FoodService.instance) {
      FoodService.instance = new FoodService();
    }
    return FoodService.instance;
  }

  async getCategories(): Promise<FoodCategory[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCategories;
  }

  async getMenuItems(categoryId?: string): Promise<MenuItem[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (categoryId) {
      return mockMenuItems.filter(item => item.category.id === categoryId && item.isAvailable);
    }
    
    return mockMenuItems.filter(item => item.isAvailable);
  }

  async getMenuItemById(itemId: string): Promise<MenuItem | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockMenuItems.find(item => item.id === itemId) || null;
  }

  async searchMenuItems(query: string): Promise<MenuItem[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const searchTerm = query.toLowerCase();
    return mockMenuItems.filter(item => 
      item.isAvailable && (
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm))
      )
    );
  }

  async createOrder(orderData: {
    guestId: string;
    bookingId?: string;
    items: CartItem[];
    orderType: 'RoomService' | 'Restaurant' | 'Takeaway';
    deliveryAddress?: string;
    specialInstructions?: string;
  }): Promise<FoodOrder> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const orderItems: OrderItem[] = orderData.items.map(cartItem => ({
      id: Math.random().toString(36).substr(2, 9),
      menuItem: cartItem.menuItem,
      quantity: cartItem.quantity,
      unitPrice: cartItem.menuItem.price,
      totalPrice: cartItem.menuItem.price * cartItem.quantity,
      customizations: cartItem.customizations,
      specialInstructions: cartItem.specialInstructions
    }));

    const totalAmount = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);

    const newOrder: FoodOrder = {
      id: Math.random().toString(36).substr(2, 9),
      guestId: orderData.guestId,
      bookingId: orderData.bookingId,
      orderNumber: `ORD${String(mockOrders.length + 1).padStart(3, '0')}`,
      items: orderItems,
      totalAmount,
      status: 'Pending',
      orderType: orderData.orderType,
      orderDate: new Date().toISOString(),
      estimatedDeliveryTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
      deliveryAddress: orderData.deliveryAddress,
      specialInstructions: orderData.specialInstructions,
      paymentStatus: 'Pending'
    };

    mockOrders.push(newOrder);
    return newOrder;
  }

  async getGuestOrders(guestId: string): Promise<FoodOrder[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockOrders
      .filter(order => order.guestId === guestId)
      .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
  }

  async getOrderById(orderId: string): Promise<FoodOrder | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockOrders.find(order => order.id === orderId) || null;
  }

  async updateOrderStatus(orderId: string, status: FoodOrder['status']): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
    }
  }

  async cancelOrder(orderId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const order = mockOrders.find(o => o.id === orderId);
    if (order && order.status === 'Pending') {
      order.status = 'Cancelled';
    } else {
      throw new Error('Order cannot be cancelled');
    }
  }
}

export const foodService = FoodService.getInstance();