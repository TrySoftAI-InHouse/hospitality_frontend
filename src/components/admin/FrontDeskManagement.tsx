'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
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
  User,
  ChevronRight,
  MoreVertical
} from 'lucide-react';

// Mock data
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
    total: "$750",
    loyaltyPoints: 1250,
    notes: "Prefers higher floor, anniversary stay"
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
    total: "$540",
    loyaltyPoints: 420,
    notes: "Requested extra towels"
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
    total: "$200",
    loyaltyPoints: 780,
    notes: "Early departure at 6:00 AM"
  }
];

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
    arrivalTime: "3:30 PM",
    specialRequests: "Champagne in room upon arrival"
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
    arrivalTime: "4:00 PM",
    specialRequests: "Late check-out requested"
  }
];

const walkInQueue = [
  {
    id: 6,
    name: "Lisa Martinez",
    partySize: 2,
    requestedRoom: "Any Available",
    notes: "Business traveler, needs early check-in",
    waitTime: "15 min",
    priority: "high",
    contact: "+1 (555) 678-9012"
  },
  {
    id: 7,
    name: "David Chen",
    partySize: 1,
    requestedRoom: "Standard King",
    notes: "Regular guest, loyalty member",
    waitTime: "8 min",
    priority: "medium",
    contact: "+1 (555) 789-0123"
  }
];

export function FrontDeskManagement() {
  const [activeTab, setActiveTab] = useState('current-guests');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGuest, setExpandedGuest] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'checked-in':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'checking-out':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getGuestTypeColor = (type: string) => {
    switch (type) {
      case 'VIP':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Business':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const toggleGuestExpansion = (id: number) => {
    setExpandedGuest(expandedGuest === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Front Desk Management</h1>
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
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="shadow-sm">
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
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current-guests" className="flex gap-2">
              Current Guests
              <Badge variant="secondary" className="px-1.5 py-0.5 text-xs">
                {currentGuests.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending-checkins" className="flex gap-2">
              Pending Check-ins
              <Badge variant="secondary" className="px-1.5 py-0.5 text-xs">
                {pendingCheckIns.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="walk-ins" className="flex gap-2">
              Walk-in Queue
              <Badge variant="secondary" className="px-1.5 py-0.5 text-xs">
                {walkInQueue.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </motion.div>

        {/* Current Guests */}
        <TabsContent value="current-guests" className="space-y-4">
          <ScrollArea className="h-[600px] pr-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="space-y-4"
            >
              {currentGuests.map((guest) => (
                <motion.div
                  key={guest.id}
                  layout
                  transition={{ duration: 0.2 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-blue-100 text-blue-800">
                              {guest.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-medium">{guest.name}</h3>
                              <Badge className={getStatusColor(guest.status)}>
                                {guest.status.replace('-', ' ')}
                              </Badge>
                              <Badge className={getGuestTypeColor(guest.guestType)}>
                                {guest.guestType}
                              </Badge>
                              {guest.loyaltyPoints > 1000 && (
                                <Badge variant="outline" className="gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  Gold Member
                                </Badge>
                              )}
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

                            <AnimatePresence>
                              {expandedGuest === guest.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="pt-3 border-t mt-3 space-y-2"
                                >
                                  <div className="flex items-center gap-2 text-sm">
                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                    <span>{guest.email}</span>
                                  </div>
                                  <div className="text-sm">
                                    <p className="font-medium">Guest Notes:</p>
                                    <p className="text-muted-foreground">{guest.notes}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
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
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toggleGuestExpansion(guest.id)}
                          >
                            {expandedGuest === guest.id ? 'Less' : 'More'} Details
                            <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${
                              expandedGuest === guest.id ? 'rotate-90' : ''
                            }`} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </TabsContent>

        {/* Pending Check-ins */}
        <TabsContent value="pending-checkins" className="space-y-4">
          <ScrollArea className="h-[600px] pr-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="space-y-4"
            >
              {pendingCheckIns.map((guest) => (
                <motion.div
                  key={guest.id}
                  whileHover={{ scale: 1.005 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-blue-100 text-blue-800">
                              {guest.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-medium">{guest.name}</h3>
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

                            {expandedGuest === guest.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pt-3 border-t mt-3 space-y-2"
                              >
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="w-4 h-4 text-muted-foreground" />
                                  <span>{guest.email}</span>
                                </div>
                                <div className="text-sm">
                                  <p className="font-medium">Special Requests:</p>
                                  <p className="text-muted-foreground">{guest.specialRequests}</p>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button size="sm" className="gap-2">
                            <LogIn className="w-4 h-4" />
                            Check In
                          </Button>
                          <Button variant="outline" size="sm">
                            Contact Guest
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleGuestExpansion(guest.id)}
                            className="text-muted-foreground"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </TabsContent>

        {/* Walk-in Queue */}
        <TabsContent value="walk-ins" className="space-y-4">
          <ScrollArea className="h-[600px] pr-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="space-y-4"
            >
              {walkInQueue.map((guest) => (
                <motion.div
                  key={guest.id}
                  whileHover={{ scale: 1.005 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-blue-100 text-blue-800">
                              {guest.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-medium">{guest.name}</h3>
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

                            {expandedGuest === guest.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pt-3 border-t mt-3 space-y-2"
                              >
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="w-4 h-4 text-muted-foreground" />
                                  <span>{guest.contact}</span>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button size="sm" className="gap-2">
                            Process
                          </Button>
                          <Button variant="outline" size="sm">
                            Assign Room
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleGuestExpansion(guest.id)}
                            className="text-muted-foreground"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}