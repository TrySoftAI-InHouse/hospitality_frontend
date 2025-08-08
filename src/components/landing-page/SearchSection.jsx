// src/components/landing-page/SearchSection.jsx
import { useState } from 'react';
import { MapPin, Calendar, Search, ChevronDown, Check, Star } from 'lucide-react';
import { Input } from '../ui/input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const SearchSection = ({ 
  location, 
  setLocation, 
  checkInDate, 
  setCheckInDate, 
  checkOutDate, 
  setCheckOutDate, 
  isSearching, 
  handleSearch,
  filters,
  setFilters,
  showFilters,
  setShowFilters
}) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const amenitiesOptions = [
    "Free WiFi", "Breakfast", "Pool", "Gym", "Spa", "Parking", "Pet Friendly", "Airport Shuttle"
  ];

  const toggleAmenity = (amenity) => {
    setFilters(prev => {
      if (prev.amenities.includes(amenity)) {
        return {
          ...prev,
          amenities: prev.amenities.filter(a => a !== amenity)
        };
      } else {
        return {
          ...prev,
          amenities: [...prev.amenities, amenity]
        };
      }
    });
  };

  return (
    <section className="container mx-auto px-4 -mt-20 z-10 relative">
      <div className="bg-white rounded-xl p-6 shadow-2xl max-w-5xl mx-auto border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Your Perfect Stay</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
            <Input 
              placeholder="Location" 
              className="w-full pl-10 h-12"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          {/* Check-in Date */}
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              selectsStart
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={today}
              placeholderText="Check-in Date"
              className="w-full pl-10 h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              dateFormat="MMMM d, yyyy"
            />
          </div>
          
          {/* Check-out Date */}
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              selectsEnd
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={checkInDate || tomorrow}
              placeholderText="Check-out Date"
              className="w-full pl-10 h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              dateFormat="MMMM d, yyyy"
            />
          </div>
          
          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className={`h-12 rounded-md font-medium text-white transition-all ${
              isSearching 
                ? 'bg-blue-600 cursor-wait' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSearching ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Search className="w-4 h-4 mr-2" />
                Search
              </span>
            )}
          </button>
        </div>
        
        {/* Filters Section */}
        <div className="mt-4">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="text-blue-600 flex items-center text-sm"
          >
            {showFilters ? 'Hide filters' : 'Show filters'} 
            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-2">Price Range</h4>
                  <div className="flex items-center space-x-4">
                    <Input 
                      type="number" 
                      placeholder="Min" 
                      value={filters.priceRange[0]}
                      onChange={(e) => setFilters({
                        ...filters,
                        priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]]
                      })}
                    />
                    <span>-</span>
                    <Input 
                      type="number" 
                      placeholder="Max" 
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters({
                        ...filters,
                        priceRange: [filters.priceRange[0], parseInt(e.target.value) || 1000]
                      })}
                    />
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    step="50"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({
                      ...filters,
                      priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                    })}
                    className="w-full mt-2"
                  />
                </div>
                
                {/* Rating */}
                <div>
                  <h4 className="font-medium mb-2">Minimum Rating</h4>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setFilters({
                          ...filters,
                          rating: filters.rating === star ? 0 : star
                        })}
                        className={`p-1 rounded ${filters.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {filters.rating > 0 ? `${filters.rating}+ stars` : 'Any rating'}
                  </p>
                </div>
                
                {/* Amenities */}
                <div>
                  <h4 className="font-medium mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {amenitiesOptions.map((amenity) => (
                      <button
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`px-3 py-1 text-sm rounded-full flex items-center ${
                          filters.amenities.includes(amenity)
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {amenity}
                        {filters.amenities.includes(amenity) ? (
                          <Check className="w-3 h-3 ml-1" />
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};