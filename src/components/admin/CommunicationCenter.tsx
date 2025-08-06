'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { ScrollArea } from '../ui/scroll-area'
import { Textarea } from '../ui/textarea'
import { Switch } from '../ui/switch'
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Send,
  Bot,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  Play,
  Pause,
  Volume2,
  Mic,
  Calendar,
  Star,
  Users
} from 'lucide-react'

const automatedMessages = [
  {
    id: 1,
    type: "booking-confirmation",
    title: "Booking Confirmation",
    trigger: "New reservation made",
    template: "Hello {guest_name}! Your reservation at International Hotel is confirmed. Room {room_number} from {check_in} to {check_out}. We look forward to hosting you!",
    enabled: true,
    channels: ["whatsapp", "email"]
  },
  {
    id: 2,
    type: "check-in-reminder",
    title: "Check-in Reminder",
    trigger: "24 hours before check-in",
    template: "Hi {guest_name}! This is a friendly reminder that your check-in is tomorrow at {check_in_time}. Room {room_number} will be ready for you!",
    enabled: true,
    channels: ["whatsapp", "sms"]
  },
  {
    id: 3,
    type: "room-ready",
    title: "Room Ready Notification",
    trigger: "Room cleaned and ready",
    template: "Great news {guest_name}! Your room {room_number} is now ready for early check-in. Please visit our front desk when convenient.",
    enabled: true,
    channels: ["whatsapp"]
  },
  {
    id: 4,
    type: "feedback-request",
    title: "Feedback Collection",
    trigger: "After checkout",
    template: "Thank you for staying with us, {guest_name}! We'd love to hear about your experience. Please rate your stay: {feedback_link}",
    enabled: true,
    channels: ["whatsapp", "email"]
  }
]

const recentMessages = [
  {
    id: 1,
    guest: "John Smith",
    room: "205",
    channel: "whatsapp",
    message: "Hi, could I get extra towels in my room?",
    response: "Of course! I'll send housekeeping to your room within 15 minutes.",
    timestamp: "2 minutes ago",
    status: "responded",
    staff: "Sarah (Front Desk)"
  },
  {
    id: 2,
    guest: "Emily Davis",
    room: "402",
    channel: "voice",
    message: "Voice call: Asking about spa services and booking",
    response: "Spa appointment booked for tomorrow 2 PM",
    timestamp: "8 minutes ago",
    status: "completed",
    staff: "AI Agent"
  },
  {
    id: 3,
    guest: "Michael Brown",
    room: "108",
    channel: "whatsapp",
    message: "What time is checkout?",
    response: "Checkout is at 11:00 AM. Late checkout available until 2 PM for $50.",
    timestamp: "15 minutes ago",
    status: "responded",
    staff: "AI Agent"
  },
  {
    id: 4,
    guest: "Sarah Johnson",
    room: "314",
    channel: "email",
    message: "Invoice request for business expense",
    response: "Invoice sent to your email address",
    timestamp: "1 hour ago",
    status: "completed",
    staff: "Tom (Accounting)"
  }
]

const voiceAgentStats = {
  totalCalls: 156,
  resolvedByAI: 124,
  transferredToStaff: 32,
  averageResponseTime: "12s",
  satisfactionRate: 4.6,
  commonQueries: [
    { query: "Booking inquiries", count: 45 },
    { query: "Room service", count: 32 },
    { query: "Spa/Amenities", count: 28 },
    { query: "Check-in/out times", count: 25 },
    { query: "Wi-Fi password", count: 20 }
  ]
}

export function CommunicationCenter() {
  const [activeTab, setActiveTab] = useState('messages')
  const [newMessage, setNewMessage] = useState('')

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4 text-green-600" />
      case 'voice':
        return <Phone className="w-4 h-4 text-blue-600" />
      case 'email':
        return <Mail className="w-4 h-4 text-orange-600" />
      case 'sms':
        return <MessageSquare className="w-4 h-4 text-purple-600" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'responded':
      case 'completed':
        return 'text-green-600'
      case 'pending':
        return 'text-orange-600'
      case 'failed':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Communication Center</h1>
          <p className="text-muted-foreground">
            WhatsApp integration, voice AI agent, and automated messaging
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Settings className="w-4 h-4" />
            Configure
          </Button>
          <Button className="gap-2">
            <Bot className="w-4 h-4" />
            AI Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl">248</div>
            <div className="text-sm text-muted-foreground">WhatsApp Messages</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Phone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl">{voiceAgentStats.totalCalls}</div>
            <div className="text-sm text-muted-foreground">Voice Calls</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Bot className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl">79%</div>
            <div className="text-sm text-muted-foreground">AI Resolution Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl">{voiceAgentStats.satisfactionRate}</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rating</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="voice-agent">Voice Agent</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Recent Messages */}
        <TabsContent value="messages" className="space-y-4">
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <Card key={message.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {message.guest.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <h4>{message.guest}</h4>
                            <Badge variant="outline">Room {message.room}</Badge>
                            <div className="flex items-center gap-1">
                              {getChannelIcon(message.channel)}
                              <span className="text-xs text-muted-foreground capitalize">
                                {message.channel}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className={`w-4 h-4 ${getStatusColor(message.status)}`} />
                            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm">{message.message}</p>
                          </div>
                          {message.response && (
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <p className="text-sm">{message.response}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                by {message.staff}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Reply
                          </Button>
                          <Button size="sm" variant="outline">
                            Call Guest
                          </Button>
                          <Button size="sm" variant="outline">
                            View History
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Automation Settings */}
        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automated Message Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {automatedMessages.map((message) => (
                  <div key={message.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4>{message.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Trigger: {message.trigger}
                        </p>
                      </div>
                      <Switch checked={message.enabled} />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm">Message Template:</label>
                      <Textarea
                        value={message.template}
                        rows={3}
                        className="text-sm"
                        readOnly
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">Channels:</span>
                      <div className="flex gap-2">
                        {message.channels.map((channel) => (
                          <Badge key={channel} variant="outline" className="gap-1">
                            {getChannelIcon(channel)}
                            <span className="capitalize">{channel}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit Template
                      </Button>
                      <Button size="sm" variant="outline">
                        Test Send
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Voice Agent */}
        <TabsContent value="voice-agent" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  AI Voice Agent Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Agent Status</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Active Calls</span>
                  <span>3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Queue Length</span>
                  <span>0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Average Response Time</span>
                  <span>{voiceAgentStats.averageResponseTime}</span>
                </div>

                <div className="pt-4 space-y-2">
                  <Button className="w-full gap-2">
                    <Play className="w-4 h-4" />
                    Test Voice Agent
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Settings className="w-4 h-4" />
                    Configure Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Voice Queries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {voiceAgentStats.commonQueries.map((query, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{query.query}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{query.count}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Voice Agent Training</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Train the AI agent with common hotel scenarios and responses
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="gap-2">
                  <Mic className="w-4 h-4" />
                  Booking Scenarios
                </Button>
                <Button variant="outline" className="gap-2">
                  <Volume2 className="w-4 h-4" />
                  Service Requests
                </Button>
                <Button variant="outline" className="gap-2">
                  <Phone className="w-4 h-4" />
                  FAQ Responses
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Message Volume (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                    const volume = Math.floor(Math.random() * 50) + 20
                    return (
                      <div key={day} className="flex items-center gap-4">
                        <span className="text-sm w-8">{day}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${volume}%` }}
                          />
                        </div>
                        <span className="text-sm w-8">{volume}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">AI Agent (Instant)</span>
                    <span className="text-sm">76%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">&lt; 5 minutes</span>
                    <span className="text-sm">18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">5-15 minutes</span>
                    <span className="text-sm">4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">&gt; 15 minutes</span>
                    <span className="text-sm">2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}