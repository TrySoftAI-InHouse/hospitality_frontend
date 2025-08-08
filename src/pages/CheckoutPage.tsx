// src/pages/CheckoutPage.tsx
import { useBooking } from '../hooks/useBooking';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ArrowLeft, CreditCard, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CheckoutPage() {
  const { bookingData } = useBooking();
  const navigate = useNavigate();

  if (!bookingData?.rooms?.length) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <h2 className="text-2xl font-bold mb-4">No Booking Selected</h2>
        <p className="text-muted-foreground mb-6">
          Please select a room before proceeding to checkout.
        </p>
        <Button onClick={() => navigate('/booking')}>
          Back to Booking
        </Button>
      </div>
    );
  }

  const room = bookingData.rooms[0];
  const params = bookingData.params;
  
  const nights = params ? Math.ceil(
    (new Date(params.checkOutDate).getTime() - 
     new Date(params.checkInDate).getTime()) / (1000 * 3600 * 24))
    : 1;

  const subtotal = room.price * nights;
  const taxes = subtotal * 0.15;
  const total = subtotal + taxes;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Room Details</h2>
            <div className="flex gap-6">
              <div className="w-32 h-24 rounded-lg overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{room.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {nights} night{nights > 1 ? 's' : ''}
                </p>
                <p className="text-sm">${room.price.toFixed(2)} per night</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Guest Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
            
            {params && (
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-in</span>
                  <span>{new Date(params.checkInDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-out</span>
                  <span>{new Date(params.checkOutDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nights</span>
                  <span>{nights}</span>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between mb-2">
                <span>Room Price</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes & Fees</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full py-4 text-lg font-semibold">
              <CreditCard className="h-5 w-5 mr-2" />
              Complete Payment
            </Button>

            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              <span>Secure payment processing</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}