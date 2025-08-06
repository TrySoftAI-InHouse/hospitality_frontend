import { useState } from 'react';
import { Room, BookingSearchParams, Booking } from '../types/booking.types';

export function useBooking() {
  const [searchResults, setSearchResults] = useState<Room[]>([]);
  const [searchParams, setSearchParams] = useState<BookingSearchParams | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);

  const handleSearchResults = (rooms: Room[], params: BookingSearchParams) => {
    setSearchResults(rooms);
    setSearchParams(params);
  };

  const handleRoomSelection = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleBookingSuccess = (booking: Booking) => {
    setCompletedBooking(booking);
    setSelectedRoom(null);
    setSearchResults([]);
  };

  return {
    searchResults,
    searchParams,
    selectedRoom,
    completedBooking,
    handleSearchResults,
    handleRoomSelection,
    handleBookingSuccess,
  };
}