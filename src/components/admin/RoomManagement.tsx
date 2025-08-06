'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Progress } from '../ui/progress'
import { 
  Bed, 
  Search, 
  Filter,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Wifi,
  Car,
  Coffee,
  Tv,
  Bath,
  AirVent,
  Phone,
  Star,
  MoreHorizontal
} from 'lucide-react'

const rooms = [
  {
    id: "101",
    floor: 1,
    type: "Standard King",
    status: "available",
    guest: null,
    rate: 180,
    amenities: ["wifi", "tv", "ac", "phone"],
    lastCleaned: "2024-01-15 10:30",
    maintenanceIssues: [],
    capacity: 2
  },
  {
    id: "102",
    floor: 1,
    type: "Standard Queen",
    status: "occupied",
    guest: "John Smith",
    rate: 160,
    amenities: ["wifi", "tv", "ac"],
    lastCleaned: "2024-01-15 11:00",
    maintenanceIssues: [],
    capacity: 2,
    checkOut: "2024-01-18"
  },
  {
    id: "201",
    floor: 2,
    type: "Deluxe King",
    status: "maintenance",
    guest: null,
    rate: 220,
    amenities: ["wifi", "tv", "ac", "phone", "minibar"],
    lastCleaned: "2024-01-14 15:30",
    maintenanceIssues: ["AC not working", "Bathroom faucet dripping"],
    capacity: 2
  },
  {
    id: "205",
    floor: 2,
    type: "Standard King",
    status: "occupied",
    guest: "Sarah Johnson",
    rate: 180,
    amenities: ["wifi", "tv", "ac", "phone"],
    lastCleaned: "2024-01-15 09:45",
    maintenanceIssues: [],
    capacity: 2,
    checkOut: "2024-01-17"
  },
  {
    id: "301",
    floor: 3,
    type: "Suite",
    status: "dirty",
    guest: null,
    rate: 350,
    amenities: ["wifi", "tv", "ac", "phone", "minibar", "balcony"],
    lastCleaned: "2024-01-14 16:00",
    maintenanceIssues: [],
    capacity: 4,
    lastCheckOut: "2024-01-15 11:00"
  },
  {
    id: "314",
    floor: 3,
    type: "Deluxe Queen",
    status: "out-of-order",
    guest: null,
    rate: 200,
    amenities: ["wifi", "tv", "ac", "phone"],
    lastCleaned: "2024-01-13 14:20",
    maintenanceIssues: ["Electrical issues", "Window won't close"],
    capacity: 2
  },
  {
    id: "401",
    floor: 4,
    type: "Presidential Suite",
    status: "reserved",
    guest: "Emily Davis",
    rate: 500,
    amenities: ["wifi", "tv", "ac", "phone", "minibar", "balcony", "jacuzzi"],
    lastCleaned: "2024-01-15 12:00",
    maintenanceIssues: [],
    capacity: 6,
    checkIn: "2024-01-15 15:30"
  }
]

const amenityIcons = {
  wifi: Wifi,
  tv: Tv,
  ac: AirVent,
  phone: Phone,
  minibar: Coffee,
  balcony: Settings,
  jacuzzi: Bath,
  parking: Car
}

export function RoomManagement() {
  const [viewMode, setViewMode] = useState('grid')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterFloor, setFilterFloor] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'occupied':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'maintenance':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'dirty':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'out-of-order':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'reserved':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-4 h-4" />
      case 'occupied':
        return <Users className="w-4 h-4" />
      case 'maintenance':
      case 'out-of-order':
        return <AlertTriangle className="w-4 h-4" />
      case 'dirty':
        return <Clock className="w-4 h-4" />
      case 'reserved':
        return <Bed className="w-4 h-4" />
      default:
        return <Settings className="w-4 h-4" />
    }
  }

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.id.includes(searchTerm) || 
                         room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (room.guest && room.guest.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = filterStatus === 'all' || room.status === filterStatus
    const matchesFloor = filterFloor === 'all' || room.floor.toString() === filterFloor
    
    return matchesSearch && matchesStatus && matchesFloor
  })

  const roomStatusCounts = rooms.reduce((acc, room) => {
    acc[room.status] = (acc[room.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Room Management</h1>
          <p className="text-muted-foreground">
            Monitor room status, manage availability, and track maintenance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Settings className="w-4 h-4" />
            Room Settings
          </Button>
          <Button className="gap-2">
            <AlertTriangle className="w-4 h-4" />
            Report Issue
          </Button>
        </div>
      </div>

      {/* Room Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { status: 'available', label: 'Available', color: 'text-green-600' },
          { status: 'occupied', label: 'Occupied', color: 'text-blue-600' },
          { status: 'maintenance', label: 'Maintenance', color: 'text-orange-600' },
          { status: 'dirty', label: 'Dirty', color: 'text-yellow-600' },
          { status: 'out-of-order', label: 'Out of Order', color: 'text-red-600' },
          { status: 'reserved', label: 'Reserved', color: 'text-purple-600' }
        ].map(({ status, label, color }) => (
          <Card key={status}>
            <CardContent className="p-4 text-center">
              <div className={`text-2xl ${color}`}>
                {roomStatusCounts[status] || 0}
              </div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by room number, type, or guest name..."
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
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="dirty">Dirty</SelectItem>
                <SelectItem value="out-of-order">Out of Order</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterFloor} onValueChange={setFilterFloor}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Floor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Floors</SelectItem>
                <SelectItem value="1">Floor 1</SelectItem>
                <SelectItem value="2">Floor 2</SelectItem>
                <SelectItem value="3">Floor 3</SelectItem>
                <SelectItem value="4">Floor 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Room {room.id}</CardTitle>
                <Badge className={getStatusColor(room.status)}>
                  {getStatusIcon(room.status)}
                  <span className="ml-1">{room.status}</span>
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{room.type}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Guest Information */}
              {room.guest && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{room.guest}</span>
                  </div>
                  {room.checkOut && (
                    <div className="text-xs text-muted-foreground">
                      Check-out: {room.checkOut}
                    </div>
                  )}
                  {room.checkIn && (
                    <div className="text-xs text-muted-foreground">
                      Check-in: {room.checkIn}
                    </div>
                  )}
                </div>
              )}

              {/* Room Details */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rate:</span>
                  <span>${room.rate}/night</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Capacity:</span>
                  <span>{room.capacity} guests</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Floor:</span>
                  <span>{room.floor}</span>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <div className="text-sm text-muted-foreground mb-2">Amenities:</div>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => {
                    const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Settings
                    return (
                      <div key={amenity} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                        <IconComponent className="w-3 h-3" />
                        <span className="capitalize">{amenity}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Maintenance Issues */}
              {room.maintenanceIssues.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-orange-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Maintenance Issues:</span>
                  </div>
                  {room.maintenanceIssues.map((issue, index) => (
                    <div key={index} className="text-xs text-muted-foreground bg-orange-50 p-2 rounded">
                      {issue}
                    </div>
                  ))}
                </div>
              )}

              {/* Last Cleaned */}
              <div className="text-xs text-muted-foreground">
                Last cleaned: {room.lastCleaned}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Details
                </Button>
                <Button size="sm" variant="outline">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Bed className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-muted-foreground mb-2">No rooms found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}