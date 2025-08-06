import { BookingForm } from '../../components/guest/BookingForm';
import { useBooking } from '../../hooks/useBooking';
import { useNavigate } from 'react-router-dom';

export function BookingFormPage() {
  const { selectedRoom, searchParams, handleBookingSuccess } = useBooking();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Complete Your Booking</h2>
        <Button variant="outline" onClick={() => navigate('/booking/results')}>
          Back to Rooms
        </Button>
      </div>
      
      <BookingForm
        room={selectedRoom!}
        searchParams={searchParams!}
        onSuccess={(booking) => {
          handleBookingSuccess(booking);
          navigate('/booking/confirmation');
        }}
        onCancel={() => navigate('/booking/results')}
      />
    </div>
  );
}