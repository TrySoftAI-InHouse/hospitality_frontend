// src/pages/BookingSearchPage.tsx
import { useState } from 'react';
import { useBooking } from '../../hooks/useBooking';
import { useNavigate } from 'react-router-dom';
import { 
  Star, Wifi, Utensils, Waves, MapPin, ShieldCheck, 
  Users, Square, Bed, Coffee, Tv, AirVent, X
} from 'lucide-react';
import { BookingSearch } from '../../components/guest/BookingSearch';
import { RoomCard } from '../../components/guest/RoomCard';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

// Extended mock data for featured rooms
const featuredRooms = [
  {
    id: 1,
    name: "Deluxe Ocean View",
    description: "Spacious room with breathtaking ocean views and private balcony. Features a king-size bed, luxurious linens, and premium bath amenities.",
    price: 299,
    image: "https://images.unsplash.com/photo-1621891334481-5c14b369d9d7?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    amenities: ["Free WiFi", "Breakfast", "Sea View", "Balcony", "Air Conditioning"],
    rating: 4.8,
    size: 45,
    beds: 1,
    maxGuests: 2,
    roomFeatures: [
      { icon: <Square className="h-4 w-4" />, text: "45 m²" },
      { icon: <Bed className="h-4 w-4" />, text: "1 King Bed" },
      { icon: <Users className="h-4 w-4" />, text: "Sleeps 2" },
      { icon: <Coffee className="h-4 w-4" />, text: "Coffee Maker" },
      { icon: <Tv className="h-4 w-4" />, text: "Smart TV" },
      { icon: <AirVent className="h-4 w-4" />, text: "AC" }
    ]
  },
  {
    id: 2,
    name: "Executive Suite",
    description: "Luxurious suite with separate living area, premium furnishings, and exclusive access to executive lounge with complimentary drinks and snacks.",
    price: 459,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    amenities: ["Free WiFi", "Breakfast", "Minibar", "Jacuzzi", "Executive Lounge"],
    rating: 4.9,
    size: 75,
    beds: 1,
    maxGuests: 2,
    roomFeatures: [
      { icon: <Square className="h-4 w-4" />, text: "75 m²" },
      { icon: <Bed className="h-4 w-4" />, text: "1 King Bed" },
      { icon: <Users className="h-4 w-4" />, text: "Sleeps 2" },
      { icon: <Coffee className="h-4 w-4" />, text: "Espresso Machine" },
      { icon: <Tv className="h-4 w-4" />, text: "2 Smart TVs" },
      { icon: <Utensils className="h-4 w-4" />, text: "Minibar" }
    ]
  }
];

// Mock data for hotel features
const hotelFeatures = [
  {
    icon: <Wifi className="h-6 w-6" />,
    title: "High-Speed WiFi",
    description: "Free high-speed internet throughout the property"
  },
  {
    icon: <Utensils className="h-6 w-6" />,
    title: "Gourmet Dining",
    description: "24/7 room service and 3 on-site restaurants"
  },
  {
    icon: <Waves className="h-6 w-6" />,
    title: "Infinity Pool",
    description: "Stunning rooftop pool with panoramic city views"
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Safety First",
    description: "Contactless check-in and enhanced cleaning protocols"
  }
];

export function BookingSearchPage() {
  const { handleSearchResults, bookingParams } = useBooking();
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<typeof featuredRooms[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResults = (rooms: Room[], params: BookingSearchParams) => {
    handleSearchResults(rooms, params);
    navigate('/booking/results');
  };

  const handleRoomClick = (room: typeof featuredRooms[0]) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleBookNow = () => {
    if (selectedRoom) {
      handleSearchResults([selectedRoom], bookingParams);
      navigate('/booking/checkout');
    }
  };

  const calculateNights = () => {
    if (!bookingParams?.checkInDate || !bookingParams?.checkOutDate) return 0;
    const checkIn = new Date(bookingParams.checkInDate);
    const checkOut = new Date(bookingParams.checkOutDate);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Room Details Modal */}
      {selectedRoom && (
        <div className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 ${isModalOpen ? 'block' : 'hidden'}`}>
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedRoom.name}</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
              <div className="lg:col-span-2">
                <div className="h-64 md:h-80 rounded-xl overflow-hidden mb-6">
                  <img
                    src={selectedRoom.image}
                    alt={selectedRoom.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">About This Room</h3>
                  <p className="text-gray-700">{selectedRoom.description}</p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Room Features</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedRoom.roomFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-full">
                          {feature.icon}
                        </div>
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedRoom.amenities.map((amenity, index) => (
                      <div key={index} className="bg-gray-100 px-4 py-2 rounded-full">
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <Card className="p-6 border-0 shadow-sm sticky top-6">
                  <h3 className="font-bold text-xl mb-4">Booking Summary</h3>
                  
                  {bookingParams?.checkInDate && bookingParams?.checkOutDate && (
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-in</span>
                        <span className="font-medium">
                          {new Date(bookingParams.checkInDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-out</span>
                        <span className="font-medium">
                          {new Date(bookingParams.checkOutDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nights</span>
                        <span className="font-medium">{calculateNights()}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Room Price</span>
                      <span className="font-medium">${selectedRoom.price}/night</span>
                    </div>
                    
                    {bookingParams?.checkInDate && bookingParams?.checkOutDate && (
                      <div className="flex justify-between items-center mt-4">
                        <span className="font-medium">Total</span>
                        <span className="text-xl font-bold">
                          ${selectedRoom.price * calculateNights()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full py-4 text-lg font-semibold"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </Button>
                  
                  <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Free cancellation up to 24 hours before check-in</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            Find Your Perfect Stay
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Discover our luxurious accommodations tailored to your preferences with world-class amenities
          </p>
        </div>

        {/* Search Card */}
        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden mb-16">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-1">
            <div className="bg-white p-6 rounded-xl">
              <BookingSearch onSearchResults={handleResults} />
            </div>
          </div>
        </Card>

        {/* Featured Rooms */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Our Featured Rooms</h2>
            <Button variant="ghost" className="text-blue-600">
              View all rooms
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRooms.map((room) => (
              <RoomCard 
                key={room.id}
                room={room}
                onSelect={() => handleRoomClick(room)}
              />
            ))}
          </div>
        </section>

        {/* Hotel Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Why Choose Our Hotel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotelFeatures.map((feature, index) => (
              <Card key={index} className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Location Section */}
        <section className="bg-white rounded-2xl shadow-sm p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Prime Location</h2>
              <p className="text-muted-foreground mb-6">
                Our hotel is situated in the heart of the city, just steps away from major attractions,
                business districts, and transportation hubs.
              </p>
              <div className="flex items-center gap-2 text-blue-600">
                <MapPin className="h-5 w-5" />
                <span>110 South Eutaw Street, Baltimore, Maryland 21201 USA</span>
              </div>
              <Button variant="outline" className="mt-6">
                View on Map
              </Button>
            </div>
            <div className="flex-1 h-64 bg-gray-100 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hotel location"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// src/components/guest/RoomCard.tsx
