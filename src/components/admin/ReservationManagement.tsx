'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { ScrollArea } from '../ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  User, 
  Phone, 
  Mail,
  CreditCard,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter
} from 'lucide-react'
import { format } from 'date-fns'

interface Reservation {
  id: string
  guestName: string
  email: string
  phone: string
  checkIn: Date
  checkOut: Date
  roomType: string
  roomNumber?: string
  guests: number
  status: 'confirmed' | 'pending' | 'cancelled' | 'checked-in' | 'checked-out'
  totalAmount: number
  paymentStatus: 'paid' | 'pending' | 'failed'
  specialRequests?: string
  source: 'website' | 'phone' | 'walk-in' | 'booking-site'
  createdAt: Date
}

const mockReservations: Reservation[] = [
  {
    id: 'RES001',
    guestName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    checkIn: new Date('2024-01-15'),
    checkOut: new Date('2024-01-18'),
    roomType: 'Standard King',
    roomNumber: '205',
    guests: 2,
    status: 'confirmed',
    totalAmount: 750,
    paymentStatus: 'paid',
    specialRequests: 'Late check-in requested',
    source: 'website',
    createdAt: new Date('2024-01-10')
  },
  {
    id: 'RES002',
    guestName: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 987-6543',
    checkIn: new Date('2024-01-16'),
    checkOut: new Date('2024-01-19'),
    roomType: 'Deluxe Queen',
    guests: 1,
    status: 'pending',
    totalAmount: 600,
    paymentStatus: 'pending',
    specialRequests: 'Ground floor room preferred',
    source: 'phone',
    createdAt: new Date('2024-01-12')
  },
  {
    id: 'RES003',
    guestName: 'Michael Brown',
    email: 'm.brown@company.com',
    phone: '+1 (555) 456-7890',
    checkIn: new Date('2024-01-17'),
    checkOut: new Date('2024-01-20'),
    roomType: 'Suite',
    guests: 4,
    status: 'confirmed',
    totalAmount: 1200,
    paymentStatus: 'paid',
    source: 'booking-site',
    createdAt: new Date('2024-01-13')
  }
]

export function ReservationManagement() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isNewReservationOpen, setIsNewReservationOpen] = useState(false)
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null)

  const [newReservation, setNewReservation] = useState({
    guestName: '',
    email: '',
    phone: '',
    checkIn: new Date(),
    checkOut: new Date(),
    roomType: '',
    guests: 1,
    specialRequests: '',
    source: 'website' as const
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'checked-in':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'checked-out':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'website':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'phone':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'walk-in':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'booking-site':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.phone.includes(searchTerm) ||
                         reservation.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || reservation.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const handleCreateReservation = () => {
    const reservation: Reservation = {
      id: `RES${String(reservations.length + 1).padStart(3, '0')}`,
      ...newReservation,
      status: 'confirmed',
      totalAmount: 0, // Would be calculated based on room rates
      paymentStatus: 'pending',
      createdAt: new Date()
    }
    
    setReservations([...reservations, reservation])
    setIsNewReservationOpen(false)
    setNewReservation({
      guestName: '',
      email: '',
      phone: '',
      checkIn: new Date(),
      checkOut: new Date(),
      roomType: '',
      guests: 1,
      specialRequests: '',
      source: 'website'
    })
  }

  const handleUpdateReservation = (id: string, updates: Partial<Reservation>) => {
    setReservations(reservations.map(res => 
      res.id === id ? { ...res, ...updates } : res
    ))
  }

  const handleDeleteReservation = (id: string) => {
    setReservations(reservations.filter(res => res.id !== id))
  }

  const reservationStats = {
    total: reservations.length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    pending: reservations.filter(r => r.status === 'pending').length,
    checkedIn: reservations.filter(r => r.status === 'checked-in').length,
    revenue: reservations.reduce((sum, r) => sum + r.totalAmount, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Reservation Management</h1>
          <p className="text-muted-foreground">
            Manage bookings, availability, and guest reservations
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isNewReservationOpen} onOpenChange={setIsNewReservationOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Reservation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Reservation</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="guestName">Guest Name</Label>
                    <Input
                      id="guestName"
                      value={newReservation.guestName}
                      onChange={(e) => setNewReservation({...newReservation, guestName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newReservation.email}
                      onChange={(e) => setNewReservation({...newReservation, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newReservation.phone}
                      onChange={(e) => setNewReservation({...newReservation, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Select value={String(newReservation.guests)} onValueChange={(value) => setNewReservation({...newReservation, guests: parseInt(value)})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                        <SelectItem value="5">5 Guests</SelectItem>
                        <SelectItem value="6">6 Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Check-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          {format(newReservation.checkIn, 'PPP')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newReservation.checkIn}
                          onSelect={(date) => date && setNewReservation({...newReservation, checkIn: date})}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>Check-out Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          {format(newReservation.checkOut, 'PPP')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newReservation.checkOut}
                          onSelect={(date) => date && setNewReservation({...newReservation, checkOut: date})}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div>
                  <Label htmlFor="roomType">Room Type</Label>
                  <Select value={newReservation.roomType} onValueChange={(value) => setNewReservation({...newReservation, roomType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard King">Standard King</SelectItem>
                      <SelectItem value="Standard Queen">Standard Queen</SelectItem>
                      <SelectItem value="Deluxe King">Deluxe King</SelectItem>
                      <SelectItem value="Deluxe Queen">Deluxe Queen</SelectItem>
                      <SelectItem value="Suite">Suite</SelectItem>
                      <SelectItem value="Presidential Suite">Presidential Suite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    value={newReservation.specialRequests}
                    onChange={(e) => setNewReservation({...newReservation, specialRequests: e.target.value})}
                    placeholder="Any special requests or notes..."
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreateReservation} className="flex-1">
                    Create Reservation
                  </Button>
                  <Button variant="outline" onClick={() => setIsNewReservationOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-blue-600">{reservationStats.total}</div>
            <div className="text-sm text-muted-foreground">Total Reservations</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-green-600">{reservationStats.confirmed}</div>
            <div className="text-sm text-muted-foreground">Confirmed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-yellow-600">{reservationStats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-purple-600">{reservationStats.checkedIn}</div>
            <div className="text-sm text-muted-foreground">Checked In</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-green-600">${reservationStats.revenue}</div>
            <div className="text-sm text-muted-foreground">Total Revenue</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by guest name, email, phone, or reservation ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="checked-in">Checked In</SelectItem>
                <SelectItem value="checked-out">Checked Out</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reservations List */}
      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {filteredReservations.map((reservation) => (
            <Card key={reservation.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="flex items-center gap-3">
                          {reservation.guestName}
                          <Badge className={getStatusColor(reservation.status)}>
                            {reservation.status}
                          </Badge>
                          <Badge className={getPaymentStatusColor(reservation.paymentStatus)}>
                            {reservation.paymentStatus}
                          </Badge>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Reservation ID: {reservation.id}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Check In
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2 text-red-600">
                        <Trash2 className="w-4 h-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Contact:</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3 text-muted-foreground" />
                          {reservation.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          {reservation.phone}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Dates:</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>Check-in: {format(reservation.checkIn, 'MMM dd, yyyy')}</div>
                        <div>Check-out: {format(reservation.checkOut, 'MMM dd, yyyy')}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Room:</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>Type: {reservation.roomType}</div>
                        <div>Guests: {reservation.guests}</div>
                        {reservation.roomNumber && <div>Room: {reservation.roomNumber}</div>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Billing:</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>Total: ${reservation.totalAmount}</div>
                        <div>
                          <Badge className={getSourceColor(reservation.source)}>
                            {reservation.source}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  {reservation.specialRequests && (
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <AlertCircle className="w-4 h-4" />
                        Special Requests:
                      </div>
                      <p className="text-sm">{reservation.specialRequests}</p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                    <span>Created: {format(reservation.createdAt, 'MMM dd, yyyy HH:mm')}</span>
                    <span>Last updated: {format(reservation.createdAt, 'MMM dd, yyyy HH:mm')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {filteredReservations.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-muted-foreground mb-2">No reservations found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search criteria or create a new reservation
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}