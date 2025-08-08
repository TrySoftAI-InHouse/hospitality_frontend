import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calendar, MapPin, Clock, Star, Bell, Gift, CreditCard, Utensils, ChevronRight, Hotel } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Link } from 'react-router-dom';

// Mock data types
type Booking = {
  id: string;
  room: {
    number: string;
    type: string;
  };
  status: string;
  checkInDate: string;
  checkOutDate: string;
  confirmationNumber: string;
  totalAmount: number;
};

type Notification = {
  id: string;
  title: string;
  message: string;
  createdDate: string;
  isRead: boolean;
  actionUrl?: string;
  actionText?: string;
};

type FoodOrder = {
  id: string;
  orderNumber: string;
  items: { name: string }[];
  orderType: string;
  orderDate: string;
  status: string;
  totalAmount: number;
};

export function GuestDashboard() {
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [recentOrders, setRecentOrders] = useState<FoodOrder[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mock user data
  const currentUser = {
    id: 'user-123',
    firstName: 'John Doe',
    membershipTier: 'Gold',
  };

  // Generate mock data
  useEffect(() => {
    const generateMockData = () => {
      // Current booking mock data
      setCurrentBooking({
        id: 'booking-001',
        room: {
          number: '502',
          type: 'Deluxe Suite'
        },
        status: 'CheckedIn',
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        confirmationNumber: 'CNF78945612',
        totalAmount: 1200
      });

      // Recent bookings mock data
      setRecentBookings([
        {
          id: 'booking-002',
          room: {
            number: '312',
            type: 'Standard Room'
          },
          status: 'CheckedOut',
          checkInDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          checkOutDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          confirmationNumber: 'CNF12345678',
          totalAmount: 850
        },
        {
          id: 'booking-003',
          room: {
            number: '415',
            type: 'Executive Suite'
          },
          status: 'Confirmed',
          checkInDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          checkOutDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          confirmationNumber: 'CNF98765432',
          totalAmount: 1500
        },
        {
          id: 'booking-004',
          room: {
            number: '201',
            type: 'Standard Room'
          },
          status: 'Cancelled',
          checkInDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          checkOutDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          confirmationNumber: 'CNF45612378',
          totalAmount: 650
        }
      ]);

      // Notifications mock data
      setNotifications([
        {
          id: 'notif-001',
          title: 'Your stay has been confirmed',
          message: 'Room 502 is ready for check-in. Welcome to your Deluxe Suite!',
          createdDate: new Date().toISOString(),
          isRead: false,
          actionUrl: '/booking-details',
          actionText: 'View booking'
        },
        {
          id: 'notif-002',
          title: 'Special dining offer',
          message: 'Enjoy 20% off at our rooftop restaurant tonight from 7-9 PM',
          createdDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          isRead: false
        },
        {
          id: 'notif-003',
          title: 'Loyalty points updated',
          message: `You've earned 150 points from your recent stay. Total points: 1250`,
          createdDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          isRead: true
        },
        {
          id: 'notif-004',
          title: 'Spa reservation reminder',
          message: 'Your spa appointment is in 30 minutes at the Serenity Spa',
          createdDate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          isRead: true,
          actionUrl: '/spa',
          actionText: 'View details'
        },
        {
          id: 'notif-005',
          title: 'Feedback request',
          message: 'How was your recent stay with us? We value your opinion!',
          createdDate: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
          isRead: true,
          actionUrl: '/feedback',
          actionText: 'Leave feedback'
        }
      ]);

      // Food orders mock data
      setRecentOrders([
        {
          id: 'order-001',
          orderNumber: 'ORD-78945',
          items: [
            { name: 'Margherita Pizza' },
            { name: 'Caesar Salad' },
            { name: 'Sparkling Water' }
          ],
          orderType: 'Room Service',
          orderDate: new Date().toISOString(),
          status: 'Delivered',
          totalAmount: 38.50
        },
        {
          id: 'order-002',
          orderNumber: 'ORD-12345',
          items: [
            { name: 'Breakfast Buffet' },
            { name: 'Fresh Orange Juice' },
            { name: 'Coffee' }
          ],
          orderType: 'Dining Room',
          orderDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          status: 'Delivered',
          totalAmount: 32.00
        },
        {
          id: 'order-003',
          orderNumber: 'ORD-45678',
          items: [
            { name: 'Club Sandwich' },
            { name: 'French Fries' },
            { name: 'Iced Tea' }
          ],
          orderType: 'Poolside',
          orderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Cancelled',
          totalAmount: 24.75
        }
      ]);

      // Loyalty points
      setLoyaltyPoints(1250);
      setLoading(false);
    };

    // Simulate API loading
    setTimeout(generateMockData, 1000);
  }, []);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'CheckedIn': return 'default';
      case 'Confirmed': return 'secondary';
      case 'CheckedOut': return 'outline';
      case 'Cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Preparing': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full rounded-xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome back, {currentUser.firstName}!</h1>
            <p className="opacity-90 text-blue-100">
              {currentUser.membershipTier} Member • {loyaltyPoints} Loyalty Points
            </p>
          </div>
          <Badge variant="secondary" className="mt-2 md:mt-0 bg-white/10 hover:bg-white/20">
            <Star className="h-4 w-4 mr-1" />
            {loyaltyPoints >= 1000 ? 'Platinum' : loyaltyPoints >= 500 ? 'Gold' : 'Silver'} Tier
          </Badge>
        </div>
      </div>

      {/* Current Stay Card */}
      {currentBooking && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                <MapPin className="h-5 w-5" />
              </div>
              <span>Current Stay</span>
              <Badge variant={getStatusBadgeVariant(currentBooking.status)} className="ml-auto">
                {currentBooking.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Room Details</p>
                <p className="font-medium text-lg mt-1">Room {currentBooking.room.number}</p>
                <p className="text-muted-foreground">{currentBooking.room.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stay Duration</p>
                <div className="flex items-center gap-4 mt-1">
                  <div>
                    <p className="font-medium">{new Date(currentBooking.checkInDate).toLocaleDateString()}</p>
                    <p className="text-xs text-muted-foreground">Check-in</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{new Date(currentBooking.checkOutDate).toLocaleDateString()}</p>
                    <p className="text-xs text-muted-foreground">Check-out</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="sm" className="w-full">
                  <Utensils className="h-4 w-4 mr-2" />
                  Order Room Service
                </Button>
                <Button size="sm" variant="outline" className="w-full">
                  <Bell className="h-4 w-4 mr-2" />
                  Request Service
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Calendar, title: "New Booking", color: "blue", link: "/guest/booking" },
          { icon: Utensils, title: "Order Food", color: "green", link: "/guest/food" },
          { icon: Star, title: "Leave Feedback", color: "amber", link: "/guest/feedback" },
          { icon: Gift, title: "Loyalty Rewards", color: "purple", link: "/guest/rewards" }
        ].map((action, index) => (
          <Link to={action.link} key={index}>
            <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group border-0 shadow-sm">
              <CardContent className="p-4 flex flex-col items-center">
                <div className={`p-3 rounded-lg mb-3 bg-${action.color}-100 text-${action.color}-600 group-hover:bg-${action.color}-600 group-hover:text-white transition-colors`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <p className="font-medium text-center">{action.title}</p>
                <p className="text-xs text-muted-foreground mt-1 text-center">Tap to explore</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Tabs for Recent Activity */}
      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="bookings" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Bookings
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          {recentBookings.length > 0 ? (
            recentBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                          <Hotel className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Room {booking.room.number} - {booking.room.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Confirmation: {booking.confirmationNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={getStatusBadgeVariant(booking.status)}>
                        {booking.status}
                      </Badge>
                      <p className="text-lg font-semibold">${booking.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="text-center py-8">
              <CardContent>
                <p className="text-muted-foreground">No recent bookings found</p>
                <Button variant="link" className="mt-2">
                  Make a new booking
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          {recentOrders.length > 0 ? (
            recentOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-100 text-green-600">
                          <Utensils className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Order #{order.orderNumber}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.items.map(item => item.name).join(', ')}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {order.orderType} • {new Date(order.orderDate).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge className={`${getOrderStatusColor(order.status)} px-2 py-0.5 text-xs`}>
                        {order.status}
                      </Badge>
                      <p className="text-lg font-semibold">${order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="text-center py-8">
              <CardContent>
                <p className="text-muted-foreground">No recent orders found</p>
                <Button variant="link" className="mt-2">
                  Browse menu
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`hover:shadow-md transition-shadow ${!notification.isRead ? 'border-l-4 border-blue-500' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${!notification.isRead ? 'bg-blue-100 text-blue-600' : 'bg-muted text-muted-foreground'}`}>
                      <Bell className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{notification.title}</p>
                        {!notification.isRead && (
                          <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(notification.createdDate).toLocaleString()}
                      </p>
                      {notification.actionUrl && (
                        <Button variant="link" size="sm" className="p-0 h-auto mt-2 text-blue-600">
                          {notification.actionText || 'View Details'} <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="text-center py-8">
              <CardContent>
                <p className="text-muted-foreground">No notifications found</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}