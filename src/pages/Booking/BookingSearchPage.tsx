import { BookingSearch } from '../../components/guest/BookingSearch';
import { useBooking } from '../../hooks/useBooking';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/card';

export function BookingSearchPage() {
  const { handleSearchResults } = useBooking();
  const navigate = useNavigate();

  const handleResults = (rooms: Room[], params: BookingSearchParams) => {
    handleSearchResults(rooms, params);
    navigate('/booking/results');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Find Your Perfect Stay</h1>
          <p className="text-muted-foreground mt-2">
            Discover our luxurious accommodations tailored to your preferences
          </p>
        </div>
        <Card className="border-0 shadow-sm">
          <BookingSearch onSearchResults={handleResults} />
        </Card>
      </div>
    </div>
  );
}