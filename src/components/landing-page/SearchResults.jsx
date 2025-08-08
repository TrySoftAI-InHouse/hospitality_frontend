// src/components/landing-page/SearchResults.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { MapPin, Star, Heart } from 'lucide-react';

export const SearchResults = ({ searchResults }) => (
  <section id="search-results" className="container mx-auto px-4 py-12">
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold">
        {searchResults.length} properties found
      </h2>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Sort by:</span>
        <select className="border rounded-md px-3 py-1 text-sm">
          <option>Recommended</option>
          <option>Price (low to high)</option>
          <option>Price (high to low)</option>
          <option>Rating</option>
        </select>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {searchResults.map((room) => (
        <Card key={room.id} className="hover:shadow-xl transition-shadow h-full flex flex-col">
          <div className="relative h-48">
            <img 
              src={room.image} 
              alt={room.name} 
              className="w-full h-full object-cover rounded-t-lg"
            />
            <div className="absolute top-3 right-3 flex space-x-2">
              <button className="bg-white/90 p-2 rounded-full hover:bg-white transition">
                <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
              </button>
            </div>
            {!room.available && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-medium bg-red-500 px-3 py-1 rounded-full text-sm">
                  Booked
                </span>
              </div>
            )}
          </div>
          <CardContent className="flex-grow p-4 flex flex-col">
            <div className="flex-grow">
              <h3 className="font-bold text-lg mb-1">{room.name}</h3>
              <p className="text-sm text-gray-600 mb-2 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {room.location}
              </p>
              <div className="flex items-center mb-3">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium ml-1">{room.rating}</span>
                <span className="text-xs text-gray-500 ml-1">({room.reviews} reviews)</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-800 mb-4">
                {room.amenities.slice(0, 3).map((amenity, i) => (
                  <span key={i} className="bg-gray-100 px-2 py-1 rounded-full">{amenity}</span>
                ))}
                {room.amenities.length > 3 && (
                  <span className="bg-gray-100 px-2 py-1 rounded-full">+{room.amenities.length - 3}</span>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-auto pt-3 border-t">
              <div>
                <span className="text-xl font-bold text-[#1e3a8a]">${room.price}</span>
                <span className="text-sm text-gray-500"> /night</span>
              </div>
              <Button 
                variant="outline" 
                className="text-[#1e3a8a] border-[#1e3a8a] hover:bg-[#1e3a8a]/10"
                disabled={!room.available}
              >
                {room.available ? 'Book Now' : 'Unavailable'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);