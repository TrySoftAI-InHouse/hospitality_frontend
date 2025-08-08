// import React from 'react';
// import { Card, CardContent, CardHeader } from '../ui/card';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import { 
//   Users, 
//   Bed, 
//   Square, 
//   MapPin, 
//   Wifi, 
//   Tv, 
//   Snowflake, 
//   Coffee,
//   Shield,
//   Wine,
//   DoorOpen,
//   Bath
// } from 'lucide-react';
// import { Room, BookingSearchParams } from '../../types/booking.types';
// import { ImageWithFallback } from '../figma/ImageWithFallback';

// interface RoomCardProps {
//   room: Room;
//   searchParams: BookingSearchParams;
//   onSelect: (room: Room) => void;
// }

// const amenityIcons: Record<string, React.ReactNode> = {
//   'WiFi': <Wifi className="h-4 w-4" />,
//   'TV': <Tv className="h-4 w-4" />,
//   'AC': <Snowflake className="h-4 w-4" />,
//   'Coffee Machine': <Coffee className="h-4 w-4" />,
//   'Safe': <Shield className="h-4 w-4" />,
//   'Mini Bar': <Wine className="h-4 w-4" />,
//   'Balcony': <DoorOpen className="h-4 w-4" />,
//   'Jacuzzi': <Bath className="h-4 w-4" />
// };

// export function RoomCard({ room, searchParams, onSelect }: RoomCardProps) {
//   const calculateNights = () => {
//     const checkIn = new Date(searchParams.checkInDate);
//     const checkOut = new Date(searchParams.checkOutDate);
//     return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
//   };

//   const nights = calculateNights();
//   const totalPrice = room.basePrice * nights;

//   return (
//     <Card className="overflow-hidden hover:shadow-lg transition-shadow">
//       <div className="relative">
//         <ImageWithFallback
//           src={room.images[0]}
//           alt={`Room ${room.number} - ${room.type}`}
//           className="w-full h-48 object-cover"
//         />
//         <Badge className="absolute top-3 left-3 bg-white text-black">
//           Room {room.number}
//         </Badge>
//         <Badge className="absolute top-3 right-3" variant="secondary">
//           {room.type}
//         </Badge>
//       </div>

//       <CardHeader className="pb-3">
//         <div className="flex justify-between items-start">
//           <div>
//             <h3 className="font-semibold text-lg">{room.type} Room</h3>
//             <p className="text-sm text-muted-foreground">{room.description}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-2xl font-bold">${room.basePrice}</p>
//             <p className="text-sm text-muted-foreground">per night</p>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent className="space-y-4">
//         {/* Room Details */}
//         <div className="grid grid-cols-2 gap-4 text-sm">
//           <div className="flex items-center gap-2">
//             <Users className="h-4 w-4 text-muted-foreground" />
//             <span>Up to {room.maxOccupancy} guests</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Bed className="h-4 w-4 text-muted-foreground" />
//             <span>{room.bedType} bed</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Square className="h-4 w-4 text-muted-foreground" />
//             <span>{room.area} sqft</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <MapPin className="h-4 w-4 text-muted-foreground" />
//             <span>Floor {room.floor}</span>
//           </div>
//         </div>

//         {/* Amenities */}
//         <div>
//           <p className="text-sm font-medium mb-2">Amenities</p>
//           <div className="flex flex-wrap gap-2">
//             {room.amenities.map((amenity) => (
//               <Badge key={amenity} variant="outline" className="text-xs">
//                 {amenityIcons[amenity] && (
//                   <span className="mr-1">{amenityIcons[amenity]}</span>
//                 )}
//                 {amenity}
//               </Badge>
//             ))}
//           </div>
//         </div>

//         {/* Features */}
//         {room.features.length > 0 && (
//           <div>
//             <p className="text-sm font-medium mb-2">Special Features</p>
//             <div className="space-y-1">
//               {room.features.map((feature) => (
//                 <div key={feature.id} className="flex items-center gap-2 text-sm">
//                   <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
//                   <span className="font-medium">{feature.name}</span>
//                   {feature.description && (
//                     <span className="text-muted-foreground">- {feature.description}</span>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Pricing Summary */}
//         <div className="border-t pt-4">
//           <div className="flex justify-between items-center text-sm mb-2">
//             <span>${room.basePrice} × {nights} night{nights > 1 ? 's' : ''}</span>
//             <span>${totalPrice}</span>
//           </div>
//           <div className="flex justify-between items-center font-medium">
//             <span>Total</span>
//             <span className="text-lg">${totalPrice}</span>
//           </div>
//         </div>

//         <Button onClick={() => onSelect(room)} className="w-full">
//           Select Room
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }


import { Button } from '../ui/button';
import { Star, Calendar, Moon } from 'lucide-react';
import { useBooking } from '../../hooks/useBooking';

type Room = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  amenities: string[];
  rating: number;
  maxGuests?: number;
};

export function RoomCard({ room, onSelect }: { room: Room, onSelect: () => void }) {
  const { bookingParams } = useBooking();
  
  // Safely calculate nights stay
  const calculateNights = () => {
    if (!bookingParams || !bookingParams.checkInDate || !bookingParams.checkOutDate) {
      return null;
    }
    
    const checkIn = new Date(bookingParams.checkInDate);
    const checkOut = new Date(bookingParams.checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const nights = calculateNights();
  const totalPrice = nights ? room.price * nights : room.price;

  return (
    <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="h-48 relative overflow-hidden">
        <img 
          src={room.image} 
          alt={room.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-blue-600/90 text-white px-2 py-1 rounded text-xs">
          <Star className="h-3 w-3 fill-white" />
          <span>{room.rating}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{room.name}</h3>
          {room.maxGuests && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>{room.maxGuests}</span>
              <span>guests</span>
            </div>
          )}
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{room.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
              {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              +{room.amenities.length - 3} more
            </span>
          )}
        </div>

        {nights && (
          <div className="flex items-center gap-2 text-sm mb-3 text-blue-600">
            <Calendar className="h-4 w-4" />
            <span>{nights} night{nights > 1 ? 's' : ''} selected</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold">${totalPrice}</span>
            {nights ? (
              <span className="text-muted-foreground text-sm"> total</span>
            ) : (
              <span className="text-muted-foreground text-sm"> / night</span>
            )}
          </div>
          <Button size="sm" onClick={onSelect}>
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}