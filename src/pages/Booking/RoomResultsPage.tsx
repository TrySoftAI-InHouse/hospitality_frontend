import { RoomCard } from '../../components/guest/RoomCard';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { useBooking } from '../../hooks/useBooking';
import { useNavigate } from 'react-router-dom';

export function RoomResultsPage() {
  const { searchResults, searchParams } = useBooking();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Available Rooms</h2>
        <Button variant="outline" onClick={() => navigate('/booking')}>
          Modify Search
        </Button>
      </div>
      
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {searchResults.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              searchParams={searchParams!}
              onSelect={() => {
                navigate('/booking/form');
              }}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              No rooms available for your selected dates and preferences.
            </p>
            <Button onClick={() => navigate('/booking')}>
              Try Different Dates
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}