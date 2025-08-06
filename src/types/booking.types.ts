// src/types/booking.types.ts
export interface RoomFeature {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface Room {
  id: string;
  number: string;
  type: 'Standard' | 'Deluxe' | 'Suite' | 'Presidential';
  description: string;
  amenities: string[];
  images: string[];
  basePrice: number;
  maxOccupancy: number;
  bedType: 'Single' | 'Double' | 'King' | 'Twin';
  area: number;
  floor: number;
  isAvailable: boolean;
  features: RoomFeature[];
}

export interface BookingServiceItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  date?: string;
}

export interface Booking {
  id: string;
  guestId: string;
  roomId: string;
  room: Room;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  adults: number;
  children: number;
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'CheckedIn' | 'CheckedOut' | 'Cancelled';
  paymentStatus: 'Pending' | 'Paid' | 'Refunded' | 'Failed';
  specialRequests?: string;
  bookingDate: string;
  confirmationNumber: string;
  services: BookingServiceItem[];
}

export interface BookingSearchParams {
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  roomType?: string;
  priceRange?: [number, number];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  date: string;
}

export interface TaxItem {
  name: string;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  bookingId: string;
  guestId: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Cancelled';
  items: InvoiceItem[];
  taxes: TaxItem[];
  paymentMethod?: string;
}