'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { ScrollArea } from '../ui/scroll-area'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Progress } from '../ui/progress'
import { 
  MessageSquare, 
  Star, 
  Plus, 
  Search, 
  User,
  Calendar,
  Heart,
  Gift,
  TrendingUp,
  Award,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

interface Guest {
  id: string
  name: string
  email: string
  phone: string
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum'
  totalStays: number
  totalSpent: number
  lastStay: Date
  preferences: string[]
  feedbackCount: number
  averageRating: number
  joinDate: Date
  profileComplete: boolean
}

interface Feedback {
  id: string
  guestId: string
  guestName: string
  roomNumber: string
  checkOutDate: Date
  overallRating: number
  ratings: {
    cleanliness: number
    service: number
    amenities: number
    location: number
    value: number
  }
  comments: string
  category: 'positive' | 'neutral' | 'negative'
  status: 'new' | 'reviewed' | 'responded' | 'resolved'
  response?: string
  respondedBy?: string
  respondedAt?: Date
}

interface LoyaltyProgram {
  tier: string
  benefits: string[]
  pointsRequired: number
  discount: number
  color: string
}

const mockGuests: Guest[] = [
  {
    id: 'G001',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    loyaltyTier: 'gold',
    totalStays: 15,
    totalSpent: 12500,
    lastStay: new Date('2024-01-15'),
    preferences: ['Ocean view', 'Late checkout', 'Extra pillows'],
    feedbackCount: 8,
    averageRating: 4.6,
    joinDate: new Date('2022-03-15'),
    profileComplete: true
  },
  {
    id: 'G002',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 987-6543',
    loyaltyTier: 'platinum',
    totalStays: 28,
    totalSpent: 35000,
    lastStay: new Date('2024-01-10'),
    preferences: ['Ground floor', 'Business center access', 'Spa services'],
    feedbackCount: 15,
    averageRating: 4.8,
    joinDate: new Date('2021-08-20'),
    profileComplete: true
  },
  {
    id: 'G003',
    name: 'Michael Brown',
    email: 'm.brown@company.com',
    phone: '+1 (555) 456-7890',
    loyaltyTier: 'silver',
    totalStays: 6,
    totalSpent: 4200,
    lastStay: new Date('2024-01-08'),
    preferences: ['Business amenities', 'Early breakfast'],
    feedbackCount: 3,
    averageRating: 4.3,
    joinDate: new Date('2023-06-10'),
    profileComplete: false
  }
]

const mockFeedback: Feedback[] = [
  {
    id: 'FB001',
    guestId: 'G001',
    guestName: 'John Smith',
    roomNumber: '205',
    checkOutDate: new Date('2024-01-15'),
    overallRating: 5,
    ratings: {
      cleanliness: 5,
      service: 5,
      amenities: 4,
      location: 5,
      value: 4
    },
    comments: 'Excellent stay! Staff was very accommodating and the room was spotless. The ocean view was breathtaking.',
    category: 'positive',
    status: 'responded',
    response: 'Thank you for your wonderful feedback, John! We\'re delighted you enjoyed your stay.',
    respondedBy: 'Guest Relations Manager',
    respondedAt: new Date('2024-01-16')
  },
  {
    id: 'FB002',
    guestId: 'G002',
    guestName: 'Sarah Johnson',
    roomNumber: '314',
    checkOutDate: new Date('2024-01-10'),
    overallRating: 3,
    ratings: {
      cleanliness: 4,
      service: 3,
      amenities: 3,
      location: 4,
      value: 2
    },
    comments: 'The room was clean but the AC was too loud and kept me awake. Also, the Wi-Fi was slow.',
    category: 'neutral',
    status: 'new'
  },
  {
    id: 'FB003',
    guestId: 'G003',
    guestName: 'Michael Brown',
    roomNumber: '108',
    checkOutDate: new Date('2024-01-08'),
    overallRating: 2,
    ratings: {
      cleanliness: 3,
      service: 2,
      amenities: 2,
      location: 4,
      value: 1
    },
    comments: 'Very disappointed with the service. Front desk was unhelpful and room service took 2 hours.',
    category: 'negative',
    status: 'reviewed'
  }
]

const loyaltyPrograms: LoyaltyProgram[] = [
  {
    tier: 'Bronze',
    benefits: ['5% discount', 'Late checkout', 'Welcome amenity'],
    pointsRequired: 0,
    discount: 5,
    color: 'bg-orange-100 text-orange-800 border-orange-200'
  },
  {
    tier: 'Silver',
    benefits: ['10% discount', 'Room upgrade', 'Priority support', 'Spa discount'],
    pointsRequired: 5,
    discount: 10,
    color: 'bg-gray-100 text-gray-800 border-gray-200'
  },
  {
    tier: 'Gold',
    benefits: ['15% discount', 'Free breakfast', 'Concierge service', 'Airport transfer'],
    pointsRequired: 15,
    discount: 15,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  {
    tier: 'Platinum',
    benefits: ['20% discount', 'Suite upgrade', '24/7 support', 'Personal butler'],
    pointsRequired: 25,
    discount: 20,
    color: 'bg-purple-100 text-purple-800 border-purple-200'
  }
]

export function GuestExperienceManagement() {
  const [guests] = useState<Guest[]>(mockGuests)
  const [feedback, setFeedback] = useState<Feedback[]>(mockFeedback)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTier, setFilterTier] = useState('all')
  const [filterFeedbackStatus, setFilterFeedbackStatus] = useState('all')
  const [activeTab, setActiveTab] = useState('guests')

  const getLoyaltyTierColor = (tier: string) => {
    const program = loyaltyPrograms.find(p => p.tier.toLowerCase() === tier)
    return program?.color || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getFeedbackCategoryColor = (category: string) => {
    switch (category) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'neutral':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getFeedbackStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'reviewed':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'responded':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'resolved':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTier = filterTier === 'all' || guest.loyaltyTier === filterTier
    return matchesSearch && matchesTier
  })

  const filteredFeedback = feedback.filter(fb => {
    const matchesSearch = fb.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fb.roomNumber.includes(searchTerm)
    const matchesStatus = filterFeedbackStatus === 'all' || fb.status === filterFeedbackStatus
    return matchesSearch && matchesStatus
  })

  const guestStats = {
    total: guests.length,
    bronze: guests.filter(g => g.loyaltyTier === 'bronze').length,
    silver: guests.filter(g => g.loyaltyTier === 'silver').length,
    gold: guests.filter(g => g.loyaltyTier === 'gold').length,
    platinum: guests.filter(g => g.loyaltyTier === 'platinum').length,
    averageRating: feedback.reduce((sum, fb) => sum + fb.overallRating, 0) / feedback.length
  }

  const feedbackStats = {
    total: feedback.length,
    positive: feedback.filter(fb => fb.category === 'positive').length,
    neutral: feedback.filter(fb => fb.category === 'neutral').length,
    negative: feedback.filter(fb => fb.category === 'negative').length,
    pending: feedback.filter(fb => fb.status === 'new').length
  }

  const renderStarRating = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const starSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Guest Experience & Feedback</h1>
          <p className="text-muted-foreground">
            Manage guest relationships, loyalty programs, and feedback
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Gift className="w-4 h-4" />
            Loyalty Program
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Guest
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <User className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl">{guestStats.total}</div>
            <div className="text-sm text-muted-foreground">Total Guests</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl">{guestStats.bronze}</div>
            <div className="text-sm text-muted-foreground">Bronze</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <div className="text-2xl">{guestStats.silver}</div>
            <div className="text-sm text-muted-foreground">Silver</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl">{guestStats.gold}</div>
            <div className="text-sm text-muted-foreground">Gold</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl">{guestStats.platinum}</div>
            <div className="text-sm text-muted-foreground">Platinum</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl">{guestStats.averageRating.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="guests">Guest Profiles</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty Program</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Guest Profiles Tab */}
        <TabsContent value="guests" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search guests by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterTier} onValueChange={setFilterTier}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tiers</SelectItem>
                    <SelectItem value="bronze">Bronze</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Guest List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGuests.map((guest) => (
              <Card key={guest.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className={getLoyaltyTierColor(guest.loyaltyTier)}>
                            {guest.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4>{guest.name}</h4>
                          <Badge className={getLoyaltyTierColor(guest.loyaltyTier)}>
                            {guest.loyaltyTier}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        {renderStarRating(guest.averageRating)}
                        <div className="text-sm text-muted-foreground">
                          {guest.averageRating.toFixed(1)}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs">{guest.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs">{guest.phone}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Total Stays</div>
                        <div>{guest.totalStays}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Total Spent</div>
                        <div>${guest.totalSpent.toLocaleString()}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-muted-foreground text-sm mb-1">Preferences:</div>
                      <div className="flex flex-wrap gap-1">
                        {guest.preferences.slice(0, 2).map((pref, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {pref}
                          </Badge>
                        ))}
                        {guest.preferences.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{guest.preferences.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <MessageSquare className="w-3 h-3" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-4">
          {/* Feedback Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl">{feedbackStats.total}</div>
                <div className="text-sm text-muted-foreground">Total Feedback</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl">{feedbackStats.positive}</div>
                <div className="text-sm text-muted-foreground">Positive</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl">{feedbackStats.negative}</div>
                <div className="text-sm text-muted-foreground">Negative</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl">{feedbackStats.pending}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </CardContent>
            </Card>
          </div>

          {/* Feedback List */}
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredFeedback.map((fb) => (
                <Card key={fb.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>
                              {fb.guestName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4>{fb.guestName}</h4>
                            <div className="flex items-center gap-2">
                              <Badge className={getFeedbackCategoryColor(fb.category)}>
                                {fb.category}
                              </Badge>
                              <Badge className={getFeedbackStatusColor(fb.status)}>
                                {fb.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {renderStarRating(fb.overallRating, 'md')}
                          <div className="text-sm text-muted-foreground">
                            Room {fb.roomNumber} • {fb.checkOutDate.toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm">{fb.comments}</p>
                      </div>

                      <div className="grid grid-cols-5 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-muted-foreground">Cleanliness</div>
                          <div className="flex items-center justify-center gap-1">
                            {renderStarRating(fb.ratings.cleanliness)}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground">Service</div>
                          <div className="flex items-center justify-center gap-1">
                            {renderStarRating(fb.ratings.service)}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground">Amenities</div>
                          <div className="flex items-center justify-center gap-1">
                            {renderStarRating(fb.ratings.amenities)}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground">Location</div>
                          <div className="flex items-center justify-center gap-1">
                            {renderStarRating(fb.ratings.location)}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground">Value</div>
                          <div className="flex items-center justify-center gap-1">
                            {renderStarRating(fb.ratings.value)}
                          </div>
                        </div>
                      </div>

                      {fb.response && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <div className="text-sm text-blue-800">
                            <strong>Response:</strong> {fb.response}
                          </div>
                          <div className="text-xs text-blue-600 mt-1">
                            by {fb.respondedBy} • {fb.respondedAt?.toLocaleDateString()}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {!fb.response && (
                          <Button size="sm" className="gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Respond
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
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

        {/* Loyalty Program Tab */}
        <TabsContent value="loyalty" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loyaltyPrograms.map((program) => (
              <Card key={program.tier} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="text-center">
                      <Badge className={program.color} size="lg">
                        {program.tier}
                      </Badge>
                      <div className="mt-2">
                        <div className="text-2xl">{program.discount}%</div>
                        <div className="text-sm text-muted-foreground">Discount</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Benefits:</div>
                      <div className="space-y-1">
                        {program.benefits.map((benefit, index) => (
                          <div key={index} className="text-sm flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                      {program.pointsRequired > 0 ? (
                        `Requires ${program.pointsRequired} stays`
                      ) : (
                        'Starting tier'
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Guest Experience Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                <p>Guest experience analytics would be implemented here</p>
                <p className="text-sm">Features: Satisfaction trends, loyalty metrics, feedback analysis</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}