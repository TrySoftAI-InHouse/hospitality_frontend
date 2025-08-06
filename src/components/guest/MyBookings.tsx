import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { 
  Calendar, 
  MapPin, 
  Users, 
  CreditCard, 
  Download, 
  X,
  LogIn,
  LogOut,
  Clock,
  Phone,
  Mail,
  Plus,
  Hotel,
  Wifi,
  Coffee,
  Utensils,
  Dumbbell,
  ShoppingBag,
  Loader2,
  ChevronRight,
  Star
} from 'lucide-react';
import { Booking, Invoice } from '../../types/booking.types';
import { bookingService } from '../../services/bookingService';
import { authService } from '../../services/authService';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';

// Mock data for bookings
const mockBookings: Booking[] = [
  {
    id: '1',
    confirmationNumber: 'HOTEL-2023-001',
    status: 'Confirmed',
    checkInDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now
    checkOutDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0], // 5 days from now
    adults: 2,
    children: 1,
    totalAmount: 1200,
    specialRequests: 'Need a crib for the baby',
    room: {
      id: '101',
      number: '101',
      type: 'Deluxe King',
      images: ['https://source.unsplash.com/random/300x200/?hotel,room'],
      amenities: ['Free WiFi', 'Air Conditioning', 'Mini Bar'],
      pricePerNight: 300
    },
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: '2',
    confirmationNumber: 'HOTEL-2023-002',
    status: 'CheckedIn',
    checkInDate: new Date().toISOString().split('T')[0], // Today
    checkOutDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], // 3 days from now
    adults: 1,
    children: 0,
    totalAmount: 750,
    specialRequests: 'Early check-in if possible',
    room: {
      id: '202',
      number: '202',
      type: 'Standard Queen',
      images: ['https://source.unsplash.com/random/300x200/?hotel,room,standard'],
      amenities: ['Free WiFi', 'Coffee Maker'],
      pricePerNight: 250
    },
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: '3',
    confirmationNumber: 'HOTEL-2023-003',
    status: 'CheckedOut',
    checkInDate: new Date(Date.now() - 86400000 * 7).toISOString().split('T')[0], // 7 days ago
    checkOutDate: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0], // 2 days ago
    adults: 2,
    children: 0,
    totalAmount: 1800,
    specialRequests: 'Anniversary decoration requested',
    room: {
      id: '301',
      number: '301',
      type: 'Executive Suite',
      images: ['https://source.unsplash.com/random/300x200/?hotel,suite'],
      amenities: ['Free WiFi', 'Jacuzzi', 'Balcony', 'Mini Bar'],
      pricePerNight: 600
    },
    createdAt: new Date(Date.now() - 86400000 * 14).toISOString()
  },
  {
    id: '4',
    confirmationNumber: 'HOTEL-2023-004',
    status: 'Cancelled',
    checkInDate: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0], // 14 days from now
    checkOutDate: new Date(Date.now() + 86400000 * 21).toISOString().split('T')[0], // 21 days from now
    adults: 4,
    children: 2,
    totalAmount: 3600,
    specialRequests: 'Connecting rooms needed',
    room: {
      id: '401',
      number: '401',
      type: 'Family Suite',
      images: ['https://source.unsplash.com/random/300x200/?hotel,family'],
      amenities: ['Free WiFi', 'Kitchenette', 'Sofa Bed'],
      pricePerNight: 600
    },
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  }
];

export function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [useMockData, setUseMockData] = useState(false);

  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    if (!currentUser) return;

    try {
      // In a real app, you would fetch from the API
      // const bookingsData = await bookingService.getGuestBookings(currentUser.id);
      
      // For demo purposes, we'll use mock data
      setBookings(mockBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
      setError('Failed to load bookings. Using mock data instead.');
      setUseMockData(true);
      setBookings(mockBookings);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    setActionLoading(bookingId);
    try {
      // In a real app: await bookingService.cancelBooking(bookingId);
      // For demo, we'll update the local state
      setBookings(bookings.map(b => 
        b.id === bookingId ? { ...b, status: 'Cancelled' } : b
      ));
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel booking');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCheckIn = async (bookingId: string) => {
    setActionLoading(bookingId);
    try {
      // In a real app: await bookingService.checkIn(bookingId);
      // For demo, we'll update the local state
      setBookings(bookings.map(b => 
        b.id === bookingId ? { ...b, status: 'CheckedIn' } : b
      ));
      alert('Check-in successful! Enjoy your stay.');
    } catch (error) {
      console.error('Error checking in:', error);
      alert('Failed to check in');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCheckOut = async (bookingId: string) => {
    setActionLoading(bookingId);
    try {
      // In a real app: await bookingService.checkOut(bookingId);
      // For demo, we'll update the local state
      setBookings(bookings.map(b => 
        b.id === bookingId ? { ...b, status: 'CheckedOut' } : b
      ));
      alert('Check-out successful! Thank you for staying with us.');
    } catch (error) {
      console.error('Error checking out:', error);
      alert('Failed to check out');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDownloadInvoice = async (bookingId: string) => {
    try {
      // In a real app: const invoice = await bookingService.getInvoice(bookingId);
      const invoice: Invoice = {
        id: 'INV-' + bookingId,
        invoiceNumber: 'INV-' + Math.floor(Math.random() * 10000),
        date: new Date().toISOString(),
        amount: bookings.find(b => b.id === bookingId)?.totalAmount || 0,
        items: [
          { description: 'Room Charges', amount: bookings.find(b => b.id === bookingId)?.totalAmount || 0 },
          { description: 'Taxes', amount: 120 }
        ]
      };
      alert(`Invoice ${invoice.invoiceNumber} would be downloaded`);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Failed to download invoice');
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'default';
      case 'CheckedIn': return 'secondary';
      case 'CheckedOut': return 'outline';
      case 'Cancelled': return 'destructive';
      case 'Pending': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'text-blue-600';
      case 'CheckedIn': return 'text-green-600';
      case 'CheckedOut': return 'text-gray-600';
      case 'Cancelled': return 'text-red-600';
      case 'Pending': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const isToday = (date: string) => {
    const today = new Date().toISOString().split('T')[0];
    return date === today;
  };

  const canCheckIn = (booking: Booking) => {
    return booking.status === 'Confirmed' && isToday(booking.checkInDate);
  };

  const canCheckOut = (booking: Booking) => {
    return booking.status === 'CheckedIn' && isToday(booking.checkOutDate);
  };

  const canCancel = (booking: Booking) => {
    return booking.status === 'Confirmed' || booking.status === 'Pending';
  };

  const filterBookings = (status: string) => {
    switch (status) {
      case 'active':
        return bookings.filter(b => b.status === 'Confirmed' || b.status === 'CheckedIn');
      case 'completed':
        return bookings.filter(b => b.status === 'CheckedOut');
      case 'cancelled':
        return bookings.filter(b => b.status === 'Cancelled');
      default:
        return bookings;
    }
  };

  const renderAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'free wifi': return <Wifi className="h-4 w-4" />;
      case 'air conditioning': return <Hotel className="h-4 w-4" />;
      case 'mini bar': return <ShoppingBag className="h-4 w-4" />;
      case 'coffee maker': return <Coffee className="h-4 w-4" />;
      case 'jacuzzi': return <Hotel className="h-4 w-4" />;
      case 'balcony': return <Hotel className="h-4 w-4" />;
      case 'kitchenette': return <Utensils className="h-4 w-4" />;
      case 'sofa bed': return <Hotel className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const renderBookingCard = (booking: Booking) => (
    <Card key={booking.id} className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-48 h-48 relative">
          <ImageWithFallback
            src={booking.room.images[0]}
            alt={`Room ${booking.room.number}`}
            className="w-full h-full object-cover"
            fallbackSrc="https://source.unsplash.com/random/300x200/?hotel"
          />
          {booking.status === 'CheckedIn' && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-green-600 hover:bg-green-700">
                Currently Staying
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
            <div>
              <h3 className="font-semibold text-lg">
                {booking.room.type} - Room {booking.room.number}
              </h3>
              <p className="text-muted-foreground text-sm">
                Confirmation: {booking.confirmationNumber}
              </p>
              
              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mt-2">
                {booking.room.amenities.slice(0, 3).map(amenity => (
                  <Badge key={amenity} variant="outline" className="text-xs">
                    {renderAmenityIcon(amenity)}
                    <span className="ml-1">{amenity}</span>
                  </Badge>
                ))}
                {booking.room.amenities.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{booking.room.amenities.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <Badge variant={getStatusBadgeVariant(booking.status)}>
                {booking.status}
              </Badge>
              <p className="text-lg font-semibold mt-2">${booking.totalAmount}</p>
              <p className="text-sm text-muted-foreground">
                {booking.room.pricePerNight}/night
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-full">
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm">Check-in</p>
                <p className="text-muted-foreground text-sm">
                  {new Date(booking.checkInDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-full">
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm">Check-out</p>
                <p className="text-muted-foreground text-sm">
                  {new Date(booking.checkOutDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-full">
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm">Guests</p>
                <p className="text-muted-foreground text-sm">
                  {booking.adults} adult{booking.adults > 1 ? 's' : ''}
                  {booking.children > 0 && `, ${booking.children} child${booking.children > 1 ? 'ren' : ''}`}
                </p>
              </div>
            </div>
          </div>

          {booking.specialRequests && (
            <div className="mb-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm">
                <strong className="font-medium">Special Requests:</strong> {booking.specialRequests}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {canCheckIn(booking) && (
              <Button
                size="sm"
                onClick={() => handleCheckIn(booking.id)}
                disabled={actionLoading === booking.id}
                className="gap-2"
              >
                {actionLoading === booking.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="h-4 w-4" />
                )}
                Check In
              </Button>
            )}
            
            {canCheckOut(booking) && (
              <Button
                size="sm"
                onClick={() => handleCheckOut(booking.id)}
                disabled={actionLoading === booking.id}
                className="gap-2"
              >
                {actionLoading === booking.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
                Check Out
              </Button>
            )}
            
            {booking.status === 'CheckedOut' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownloadInvoice(booking.id)}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Invoice
              </Button>
            )}
            
            {canCancel(booking) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCancelBooking(booking.id)}
                disabled={actionLoading === booking.id}
                className="gap-2 text-destructive hover:text-destructive border-destructive/50 hover:border-destructive"
              >
                {actionLoading === booking.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <X className="h-4 w-4" />
                )}
                Cancel
              </Button>
            )}

            <Button variant="outline" size="sm" className="gap-2">
              <Phone className="h-4 w-4" />
              Contact
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {['All', 'Active', 'Completed', 'Cancelled'].map((tab) => (
              <TabsTrigger key={tab} value={tab.toLowerCase()}>
                <Skeleton className="h-4 w-16" />
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <div className="flex flex-col md:flex-row">
                  <Skeleton className="w-full md:w-48 h-48" />
                  <div className="flex-1 p-6 space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex gap-2">
                      {[...Array(3)].map((_, j) => (
                        <Skeleton key={j} className="h-6 w-20" />
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {[...Array(3)].map((_, k) => (
                        <div key={k} className="space-y-2">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {[...Array(3)].map((_, l) => (
                        <Skeleton key={l} className="h-9 w-24" />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  if (error && !useMockData) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">My Bookings</h2>
          <p className="text-sm text-muted-foreground">
            {bookings.length} booking{bookings.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Booking
        </Button>
      </div>

      {useMockData && (
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertDescription className="text-yellow-700">
            Note: Currently displaying mock data. In a production environment, this would show your real bookings.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            All ({bookings.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Active ({filterBookings('active').length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({filterBookings('completed').length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({filterBookings('cancelled').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {bookings.length > 0 ? (
            bookings.map(renderBookingCard)
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't made any reservations yet.
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Make Your First Booking
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {filterBookings('active').length > 0 ? (
            filterBookings('active').map(renderBookingCard)
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Hotel className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No active bookings</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any upcoming or current stays.
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Book a Stay
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {filterBookings('completed').length > 0 ? (
            filterBookings('completed').map(renderBookingCard)
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No completed stays</h3>
                <p className="text-muted-foreground mb-4">
                  Your past stays will appear here.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {filterBookings('cancelled').length > 0 ? (
            filterBookings('cancelled').map(renderBookingCard)
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <X className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No cancelled bookings</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't cancelled any reservations.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}