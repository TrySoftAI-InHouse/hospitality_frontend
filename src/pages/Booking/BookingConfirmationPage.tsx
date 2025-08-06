import { Calendar } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useBooking } from '../../hooks/useBooking';
import { useNavigate } from 'react-router-dom';

export function BookingConfirmationPage() {
  const { completedBooking } = useBooking();
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto text-center space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-green-800 mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-green-600 mb-4">
          Your reservation has been successfully created.
        </p>
        <div className="bg-white rounded-lg p-4 text-left max-w-md mx-auto">
          <p className="font-medium">Confirmation Number:</p>
          <p className="text-lg text-blue-600 font-mono">{completedBooking?.confirmationNumber}</p>
          <p className="font-medium mt-2">Room:</p>
          <p>{completedBooking?.room.number} - {completedBooking?.room.type}</p>
          <p className="font-medium mt-2">Total Amount:</p>
          <p className="text-lg">${completedBooking?.totalAmount}</p>
        </div>
      </div>
      
      <div className="flex gap-4 justify-center">
        <Button onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>
        <Button variant="outline" onClick={() => navigate('/booking')}>
          Book Another Room
        </Button>
      </div>
    </div>
  );
}