import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';
import { CreditCard, Calendar, Users, MapPin, FileText } from 'lucide-react';
import { Room, BookingSearchParams, Booking } from '../../types/booking.types';
import { authService } from '../../services/authService';
import { bookingService } from '../../services/bookingService';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface BookingFormProps {
  room: Room;
  searchParams: BookingSearchParams;
  onSuccess: (booking: Booking) => void;
  onCancel: () => void;
}

export function BookingForm({ room, searchParams, onSuccess, onCancel }: BookingFormProps) {
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currentUser = authService.getCurrentUser();

  const calculateBookingDetails = () => {
    const checkIn = new Date(searchParams.checkInDate);
    const checkOut = new Date(searchParams.checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    const roomTotal = room.basePrice * nights;
    const serviceFee = roomTotal * 0.1; // 10% service fee
    const taxes = roomTotal * 0.15; // 15% taxes
    const totalAmount = roomTotal + serviceFee + taxes;

    return {
      nights,
      roomTotal,
      serviceFee,
      taxes,
      totalAmount
    };
  };

  const bookingDetails = calculateBookingDetails();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setError('You must be logged in to make a booking');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const bookingData = {
        guestId: currentUser.id,
        roomId: room.id,
        room: room,
        checkInDate: searchParams.checkInDate,
        checkOutDate: searchParams.checkOutDate,
        numberOfGuests: searchParams.adults + searchParams.children,
        adults: searchParams.adults,
        children: searchParams.children,
        totalAmount: bookingDetails.totalAmount,
        specialRequests: specialRequests || undefined,
        services: []
      };

      const booking = await bookingService.createBooking(bookingData);
      onSuccess(booking);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert>
            <AlertDescription>
              Please log in to complete your booking.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Room Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Booking Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <ImageWithFallback
              src={room.images[0]}
              alt={`Room ${room.number}`}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold">Room {room.number} - {room.type}</h3>
              <p className="text-sm text-muted-foreground">{room.description}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {bookingDetails.nights} night{bookingDetails.nights > 1 ? 's' : ''}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {searchParams.adults} adult{searchParams.adults > 1 ? 's' : ''}
                  {searchParams.children > 0 && `, ${searchParams.children} child${searchParams.children > 1 ? 'ren' : ''}`}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guest Information */}
      <Card>
        <CardHeader>
          <CardTitle>Guest Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input value={currentUser.firstName} disabled />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input value={currentUser.lastName} disabled />
            </div>
          </div>
          <div>
            <Label>Email</Label>
            <Input value={currentUser.email} disabled />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={currentUser.phone || ''} disabled />
          </div>
        </CardContent>
      </Card>

      {/* Stay Details */}
      <Card>
        <CardHeader>
          <CardTitle>Stay Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Check-in Date</Label>
              <Input value={searchParams.checkInDate} disabled />
            </div>
            <div>
              <Label>Check-out Date</Label>
              <Input value={searchParams.checkOutDate} disabled />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Adults</Label>
              <Input value={searchParams.adults} disabled />
            </div>
            <div>
              <Label>Children</Label>
              <Input value={searchParams.children} disabled />
            </div>
          </div>
          <div>
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <Textarea
              id="specialRequests"
              placeholder="Any special requests or preferences for your stay..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Pricing Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Pricing Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>${room.basePrice} × {bookingDetails.nights} night{bookingDetails.nights > 1 ? 's' : ''}</span>
              <span>${bookingDetails.roomTotal}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Service fee</span>
              <span>${bookingDetails.serviceFee}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Taxes</span>
              <span>${bookingDetails.taxes}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${bookingDetails.totalAmount}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <FileText className="h-4 w-4" />
            <AlertDescription>
              This is a demo booking system. No actual payment will be processed.
              In a real system, you would enter your payment details here.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4 opacity-50">
            <div>
              <Label>Card Number</Label>
              <Input placeholder="1234 5678 9012 3456" disabled />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Expiry Date</Label>
                <Input placeholder="MM/YY" disabled />
              </div>
              <div>
                <Label>CVV</Label>
                <Input placeholder="123" disabled />
              </div>
            </div>
            <div>
              <Label>Cardholder Name</Label>
              <Input placeholder="John Doe" disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Processing...' : `Confirm Booking - $${bookingDetails.totalAmount}`}
        </Button>
      </div>
    </form>
  );
}