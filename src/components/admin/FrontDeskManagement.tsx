'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { ScrollArea } from '../ui/scroll-area'
import { 
  Search, 
  UserPlus, 
  LogIn, 
  LogOut, 
  Clock,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Star,
  AlertCircle,
  CheckCircle,
  Calendar,
  User
} from 'lucide-react'

const currentGuests = [
  {
    id: 1,
    name: "John Smith",
    room: "205",
    checkIn: "2024-01-15",
    checkOut: "2024-01-18",
    status: "checked-in",
    guestType: "VIP",
    phone: "+1 (555) 123-4567",
    email: "john.smith@email.com",
    nights: 3,
    rate: "$250/night",
    total: "$750"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    room: "314",
    checkIn: "2024-01-14",
    checkOut: "2024-01-17",
    status: "checked-in",
    guestType: "Regular",
    phone: "+1 (555) 987-6543",
    email: "sarah.j@email.com",
    nights: 3,
    rate: "$180/night",
    total: "$540"
  },
  {
    id: 3,
    name: "Michael Brown",
    room: "108",
    checkIn: "2024-01-15",
    checkOut: "2024-01-16",
    status: "checking-out",
    guestType: "Business",
    phone: "+1 (555) 456-7890",
    email: "m.brown@company.com",
    nights: 1,
    rate: "$200/night",
    total: "$200"
  }
]

const pendingCheckIns = [
  {
    id: 4,
    name: "Emily Davis",
    room: "402",
    checkIn: "2024-01-15",
    checkOut: "2024-01-20",
    status: "pending",
    guestType: "VIP",
    phone: "+1 (555) 234-5678",
    email: "emily.davis@email.com",
    nights: 5,
    rate: "$300/night",
    total: "$1,500",
    arrivalTime: "3:30 PM"
  },
  {
    id: 5,
    name: "Robert Wilson",
    room: "156",
    checkIn: "2024-01-15",
    checkOut: "2024-01-17",
    status: "pending",
    guestType: "Regular",
    phone: "+1 (555) 345-6789",
    email: "r.wilson@email.com",
    nights: 2,
    rate: "$180/night",
    total: "$360",
    arrivalTime: "4:00 PM"
  }
]

const walkInQueue = [
  {
    id: 6,
    name: "Lisa Martinez",
    partySize: 2,
    requestedRoom: "Any Available",
    notes: "Business traveler, needs early check-in",
    waitTime: "15 min",
    priority: "high"
  },
  {
    id: 7,
    name: "David Chen",
    partySize: 1,
    requestedRoom: "Standard King",
    notes: "Regular guest, loyalty member",
    waitTime: "8 min",
    priority: "medium"
  }
]

export function FrontDeskManagement() {
  const [activeTab, setActiveTab] = useState('current-guests')
  const [searchTerm, setSearchTerm] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'checked-in':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'checking-out':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getGuestTypeColor = (type: string) => {
    switch (type) {
      case 'VIP':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Business':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Front Desk Management</h1>
          <p className="text-muted-foreground">
            Manage guest check-ins, check-outs, and walk-in requests
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2">
            <UserPlus className="w-4 h-4" />
            New Reservation
          </Button>
          <Button variant="outline" className="gap-2">
            <User className="w-4 h-4" />
            Walk-in Guest
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search guests by name, room number, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current-guests">Current Guests</TabsTrigger>
          <TabsTrigger value="pending-checkins">Pending Check-ins</TabsTrigger>
          <TabsTrigger value="walk-ins">Walk-in Queue</TabsTrigger>
        </TabsList>

        {/* Current Guests */}
        <TabsContent value="current-guests" className="space-y-4">
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {currentGuests.map((guest) => (
                <Card key={guest.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>
                            {guest.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-3">
                            <h3>{guest.name}</h3>
                            <Badge className={getStatusColor(guest.status)}>
                              {guest.status.replace('-', ' ')}
                            </Badge>
                            <Badge className={getGuestTypeColor(guest.guestType)}>
                              {guest.guestType}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>Room {guest.room}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>{guest.checkIn} - {guest.checkOut}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span>{guest.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-muted-foreground" />
                              <span>{guest.total}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {guest.status === 'checked-in' && (
                          <Button variant="outline" size="sm" className="gap-2">
                            <LogOut className="w-4 h-4" />
                            Check Out
                          </Button>
                        )}
                        {guest.status === 'checking-out' && (
                          <Button size="sm" className="gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Complete
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Pending Check-ins */}
        <TabsContent value="pending-checkins" className="space-y-4">
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {pendingCheckIns.map((guest) => (
                <Card key={guest.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>
                            {guest.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-3">
                            <h3>{guest.name}</h3>
                            <Badge className={getGuestTypeColor(guest.guestType)}>
                              {guest.guestType}
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              <Clock className="w-3 h-3" />
                              {guest.arrivalTime}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>Room {guest.room}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>{guest.nights} nights</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span>{guest.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-muted-foreground" />
                              <span>{guest.total}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="gap-2">
                          <LogIn className="w-4 h-4" />
                          Check In
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact Guest
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Walk-in Queue */}
        <TabsContent value="walk-ins" className="space-y-4">
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {walkInQueue.map((guest) => (
                <Card key={guest.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>
                            {guest.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-3">
                            <h3>{guest.name}</h3>
                            <Badge className={getPriorityColor(guest.priority)}>
                              {guest.priority} priority
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              <Clock className="w-3 h-3" />
                              {guest.waitTime}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span>Party of {guest.partySize}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>{guest.requestedRoom}</span>
                            </div>
                            <div className="col-span-2 lg:col-span-1">
                              <p className="text-muted-foreground">{guest.notes}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="gap-2">
                          Process
                        </Button>
                        <Button variant="outline" size="sm">
                          Assign Room
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}