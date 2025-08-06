import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar as CalendarIcon, Users, Search, ChevronDown } from 'lucide-react';
import { BookingSearchParams, Room } from '../../types/booking.types';
import { bookingService } from '../../services/bookingService';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar as DateCalendar } from '../ui/calendar';

interface BookingSearchProps {
  onSearchResults: (rooms: Room[], searchParams: BookingSearchParams) => void;
}

export function BookingSearch({ onSearchResults }: BookingSearchProps) {
  const [searchParams, setSearchParams] = useState<BookingSearchParams>({
    checkInDate: '',
    checkOutDate: '',
    adults: 2,
    children: 0,
    roomType: '',
    priceRange: undefined
  });
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  const handleInputChange = (field: keyof BookingSearchParams, value: any) => {
    setSearchParams(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      setSearchParams(prev => ({
        ...prev,
        checkInDate: format(range.from!, 'yyyy-MM-dd'),
        checkOutDate: format(range.to!, 'yyyy-MM-dd')
      }));
    }
  };

  const handleSearch = async () => {
    if (!searchParams.checkInDate || !searchParams.checkOutDate) {
      alert('Please select check-in and check-out dates');
      return;
    }

    if (new Date(searchParams.checkInDate) >= new Date(searchParams.checkOutDate)) {
      alert('Check-out date must be after check-in date');
      return;
    }

    setLoading(true);
    try {
      const rooms = await bookingService.searchRooms(searchParams);
      onSearchResults(rooms, searchParams);
    } catch (error) {
      console.error('Search failed:', error);
      alert('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Simple class name concatenation helper
  const classNames = (...classes: (string | undefined | boolean)[]) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <div>
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Search className="h-5 w-5" />
          Search Available Rooms
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Date Range Picker */}
          <div className="space-y-2">
            <Label>Stay Dates</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    !dateRange ? "text-muted-foreground" : ""
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM dd, yyyy")} -{" "}
                        {format(dateRange.to, "MMM dd, yyyy")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM dd, yyyy")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <DateCalendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={handleDateChange}
                  numberOfMonths={2}
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adults">Adults</Label>
              <Select 
                value={searchParams.adults.toString()} 
                onValueChange={(value) => handleInputChange('adults', parseInt(value))}
              >
                <SelectTrigger>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} Adult{num > 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="children">Children</Label>
              <Select 
                value={searchParams.children.toString()} 
                onValueChange={(value) => handleInputChange('children', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Child' : 'Children'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="space-y-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-0 text-primary hover:bg-transparent"
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              {showFilters ? 'Hide Filters' : 'Show More Filters'}
            </Button>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/10">
                <div className="space-y-2">
                  <Label>Room Type</Label>
                   <Select 
        value={searchParams.roomType || undefined} 
        onValueChange={(value) => handleInputChange('roomType', value || undefined)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Any room type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any room type</SelectItem>
          <SelectItem value="Standard">Standard</SelectItem>
          <SelectItem value="Deluxe">Deluxe</SelectItem>
          <SelectItem value="Suite">Suite</SelectItem>
          <SelectItem value="Presidential">Presidential</SelectItem>
        </SelectContent>
      </Select>
{/*                 
                  <Select 
                    value={searchParams.roomType || ''} 
                    onValueChange={(value) => handleInputChange('roomType', value || undefined)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any room type</SelectItem>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Deluxe">Deluxe</SelectItem>
                      <SelectItem value="Suite">Suite</SelectItem>
                      <SelectItem value="Presidential">Presidential</SelectItem>
                    </SelectContent>
                  </Select> */}
                </div>

                <div className="space-y-2">
                  <Label>Price Range (per night)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={searchParams.priceRange?.[0] || ''}
                      onChange={(e) => {
                        const min = e.target.value ? parseInt(e.target.value) : undefined;
                        const max = searchParams.priceRange?.[1];
                        handleInputChange('priceRange', min !== undefined || max !== undefined ? [min || 0, max || 1000] : undefined);
                      }}
                      min="0"
                    />
                    <span className="text-muted-foreground">to</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={searchParams.priceRange?.[1] || ''}
                      onChange={(e) => {
                        const max = e.target.value ? parseInt(e.target.value) : undefined;
                        const min = searchParams.priceRange?.[0];
                        handleInputChange('priceRange', min !== undefined || max !== undefined ? [min || 0, max || 1000] : undefined);
                      }}
                      min="0"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button 
            onClick={handleSearch} 
            className="w-full" 
            disabled={loading}
            size="lg"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search Rooms
              </div>
            )}
          </Button>
        </div>
      </CardContent>
    </div>
  );
}