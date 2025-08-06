// src/services/bookingService.ts
import { 
  Booking, 
  BookingSearchParams, 
  Room, 
  Invoice,
  BookingServiceItem as ServiceItem,
  RoomFeature
} from '../types/booking.types';

// Mock room data
const mockRooms: Room[] = [
  {
    id: '1',
    number: '101',
    type: 'Standard',
    description: 'Comfortable standard room with city view',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Safe'],
    images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'],
    basePrice: 150,
    maxOccupancy: 2,
    bedType: 'Double',
    area: 25,
    floor: 1,
    isAvailable: true,
    features: [
      { id: '1', name: 'City View', icon: 'building', description: 'Beautiful city skyline view' },
      { id: '2', name: 'Free WiFi', icon: 'wifi', description: 'High-speed internet access' }
    ]
  },
  {
    id: '2',
    number: '201',
    type: 'Deluxe',
    description: 'Spacious deluxe room with ocean view',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Safe', 'Balcony', 'Coffee Machine'],
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'],
    basePrice: 250,
    maxOccupancy: 3,
    bedType: 'King',
    area: 35,
    floor: 2,
    isAvailable: true,
    features: [
      { id: '3', name: 'Ocean View', icon: 'waves', description: 'Stunning ocean views' },
      { id: '4', name: 'Balcony', icon: 'door-open', description: 'Private balcony access' }
    ]
  }
];

// Mock booking data
const mockBookings: Booking[] = [
  {
    id: '1',
    guestId: '1',
    roomId: '2',
    room: mockRooms[1],
    checkInDate: '2025-02-01',
    checkOutDate: '2025-02-05',
    numberOfGuests: 2,
    adults: 2,
    children: 0,
    totalAmount: 1000,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    specialRequests: 'Late checkout requested',
    bookingDate: '2025-01-20',
    confirmationNumber: 'HTL001',
    services: [
      { id: '1', name: 'Airport Transfer', price: 50, quantity: 2 },
      { id: '2', name: 'Spa Package', price: 150, quantity: 1 }
    ]
  }
];

export class BookingService {
  private static instance: BookingService;

  static getInstance(): BookingService {
    if (!BookingService.instance) {
      BookingService.instance = new BookingService();
    }
    return BookingService.instance;
  }

  async searchRooms(params: BookingSearchParams): Promise<Room[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return mockRooms.filter(room => {
      const isAvailable = room.isAvailable;
      const canAccommodate = room.maxOccupancy >= (params.adults + params.children);
      const matchesType = !params.roomType || room.type === params.roomType;
      
      let matchesPrice = true;
      if (params.priceRange) {
        const [min, max] = params.priceRange;
        matchesPrice = room.basePrice >= min && room.basePrice <= max;
      }

      return isAvailable && canAccommodate && matchesType && matchesPrice;
    });
  }

  async getRoomById(roomId: string): Promise<Room | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockRooms.find(room => room.id === roomId) || null;
  }

  async createBooking(bookingData: Omit<Booking, 'id' | 'bookingDate' | 'confirmationNumber' | 'status' | 'paymentStatus'>): Promise<Booking> {
    await new Promise(resolve => setTimeout(resolve, 1200));

    const newBooking: Booking = {
      ...bookingData,
      id: Math.random().toString(36).substr(2, 9),
      bookingDate: new Date().toISOString().split('T')[0],
      confirmationNumber: `HTL${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      status: 'Pending',
      paymentStatus: 'Pending'
    };

    mockBookings.push(newBooking);
    return newBooking;
  }

  async getGuestBookings(guestId: string): Promise<Booking[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockBookings.filter(booking => booking.guestId === guestId);
  }

  async getBookingById(bookingId: string): Promise<Booking | null> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockBookings.find(booking => booking.id === bookingId) || null;
  }

  async cancelBooking(bookingId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const booking = mockBookings.find(b => b.id === bookingId);
    if (booking) booking.status = 'Cancelled';
  }

  async checkIn(bookingId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const booking = mockBookings.find(b => b.id === bookingId);
    if (booking) booking.status = 'CheckedIn';
  }

  async checkOut(bookingId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const booking = mockBookings.find(b => b.id === bookingId);
    if (booking) booking.status = 'CheckedOut';
  }

  async getInvoice(bookingId: string): Promise<Invoice> {
    await new Promise(resolve => setTimeout(resolve, 600));

    const booking = mockBookings.find(b => b.id === bookingId);
    if (!booking) throw new Error('Booking not found');

    return {
      id: Math.random().toString(36).substr(2, 9),
      bookingId: booking.id,
      guestId: booking.guestId,
      invoiceNumber: `INV-${booking.confirmationNumber}`,
      issueDate: booking.checkOutDate || new Date().toISOString().split('T')[0],
      dueDate: booking.checkOutDate || new Date().toISOString().split('T')[0],
      totalAmount: booking.totalAmount,
      paidAmount: booking.paymentStatus === 'Paid' ? booking.totalAmount : 0,
      status: booking.paymentStatus === 'Paid' ? 'Paid' : 'Sent',
      items: [
        {
          id: '1',
          description: `Room ${booking.room.number} (${booking.room.type})`,
          quantity: 1,
          unitPrice: booking.room.basePrice,
          totalPrice: booking.room.basePrice,
          date: booking.checkInDate
        },
        ...booking.services.map(service => ({
          id: service.id,
          description: service.name,
          quantity: service.quantity,
          unitPrice: service.price,
          totalPrice: service.price * service.quantity,
          date: booking.checkInDate
        }))
      ],
      taxes: [
        { name: 'Service Tax', rate: 0.1, amount: booking.totalAmount * 0.1 },
        { name: 'City Tax', rate: 0.05, amount: booking.totalAmount * 0.05 }
      ]
    };
  }
}

export const bookingService = BookingService.getInstance();