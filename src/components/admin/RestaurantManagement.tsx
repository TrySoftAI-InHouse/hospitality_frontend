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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { 
  UtensilsCrossed, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  User,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  Filter,
  PlayCircle,
  PauseCircle,
  ChefHat,
  Truck,
  Bell
} from 'lucide-react'

interface MenuItem {
  id: string
  name: string
  description: string
  category: 'appetizer' | 'main' | 'dessert' | 'beverage' | 'breakfast' | 'lunch' | 'dinner'
  price: number
  ingredients: string[]
  allergens: string[]
  preparationTime: number
  available: boolean
  popularity: number
  image?: string
}

interface Order {
  id: string
  type: 'dine-in' | 'room-service' | 'takeout'
  guestName?: string
  roomNumber?: string
  tableNumber?: string
  items: OrderItem[]
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  orderTime: Date
  requestedTime?: Date
  totalAmount: number
  specialInstructions?: string
  assignedChef?: string
  estimatedCompletion?: Date
}

interface OrderItem {
  menuItemId: string
  menuItemName: string
  quantity: number
  unitPrice: number
  modifications?: string
  specialRequests?: string
}

interface KitchenStation {
  id: string
  name: string
  type: 'grill' | 'fryer' | 'salad' | 'pastry' | 'beverage'
  status: 'available' | 'busy' | 'maintenance'
  currentOrders: string[]
  chef: string
  efficiency: number
}

const mockMenuItems: MenuItem[] = [
  {
    id: 'MENU001',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with herbs and lemon',
    category: 'main',
    price: 28.99,
    ingredients: ['Salmon', 'Lemon', 'Herbs', 'Olive Oil'],
    allergens: ['Fish'],
    preparationTime: 25,
    available: true,
    popularity: 4.7
  },
  {
    id: 'MENU002',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with parmesan and croutons',
    category: 'appetizer',
    price: 12.99,
    ingredients: ['Romaine', 'Parmesan', 'Croutons', 'Caesar Dressing'],
    allergens: ['Dairy', 'Gluten'],
    preparationTime: 10,
    available: true,
    popularity: 4.2
  },
  {
    id: 'MENU003',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center',
    category: 'dessert',
    price: 8.99,
    ingredients: ['Chocolate', 'Butter', 'Eggs', 'Flour'],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    preparationTime: 15,
    available: true,
    popularity: 4.9
  },
  {
    id: 'MENU004',
    name: 'Club Sandwich',
    description: 'Triple-decker sandwich with turkey, bacon, and avocado',
    category: 'lunch',
    price: 16.99,
    ingredients: ['Turkey', 'Bacon', 'Avocado', 'Lettuce', 'Tomato', 'Bread'],
    allergens: ['Gluten'],
    preparationTime: 12,
    available: true,
    popularity: 4.4
  }
]

const mockOrders: Order[] = [
  {
    id: 'ORD001',
    type: 'room-service',
    guestName: 'John Smith',
    roomNumber: '205',
    items: [
      {
        menuItemId: 'MENU001',
        menuItemName: 'Grilled Salmon',
        quantity: 1,
        unitPrice: 28.99,
        modifications: 'No herbs'
      },
      {
        menuItemId: 'MENU002',
        menuItemName: 'Caesar Salad',
        quantity: 1,
        unitPrice: 12.99
      }
    ],
    status: 'preparing',
    orderTime: new Date('2024-01-15 12:30'),
    requestedTime: new Date('2024-01-15 13:00'),
    totalAmount: 41.98,
    specialInstructions: 'Please call before delivery',
    assignedChef: 'Chef Williams',
    estimatedCompletion: new Date('2024-01-15 12:55')
  },
  {
    id: 'ORD002',
    type: 'dine-in',
    guestName: 'Sarah Johnson',
    tableNumber: '12',
    items: [
      {
        menuItemId: 'MENU004',
        menuItemName: 'Club Sandwich',
        quantity: 2,
        unitPrice: 16.99
      },
      {
        menuItemId: 'MENU003',
        menuItemName: 'Chocolate Lava Cake',
        quantity: 1,
        unitPrice: 8.99
      }
    ],
    status: 'ready',
    orderTime: new Date('2024-01-15 13:15'),
    totalAmount: 42.97,
    assignedChef: 'Chef Williams',
    estimatedCompletion: new Date('2024-01-15 13:30')
  }
]

const mockKitchenStations: KitchenStation[] = [
  {
    id: 'STATION001',
    name: 'Grill Station',
    type: 'grill',
    status: 'busy',
    currentOrders: ['ORD001'],
    chef: 'Chef Williams',
    efficiency: 92
  },
  {
    id: 'STATION002',
    name: 'Salad Station',
    type: 'salad',
    status: 'available',
    currentOrders: [],
    chef: 'Chef Maria',
    efficiency: 88
  },
  {
    id: 'STATION003',
    name: 'Pastry Station',
    type: 'pastry',
    status: 'busy',
    currentOrders: ['ORD002'],
    chef: 'Chef Anna',
    efficiency: 95
  }
]

export function RestaurantManagement() {
  const [menuItems] = useState<MenuItem[]>(mockMenuItems)
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [kitchenStations] = useState<KitchenStation[]>(mockKitchenStations)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterOrderStatus, setFilterOrderStatus] = useState('all')
  const [activeTab, setActiveTab] = useState('orders')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'preparing':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'ready':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'delivered':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'dine-in':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'room-service':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'takeout':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'appetizer':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'main':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'dessert':
        return 'bg-pink-100 text-pink-800 border-pink-200'
      case 'beverage':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'breakfast':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'lunch':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'dinner':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStationStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'busy':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'maintenance':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus as any } : order
    ))
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.guestName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.roomNumber?.includes(searchTerm) ||
                         order.tableNumber?.includes(searchTerm)
    
    const matchesStatus = filterOrderStatus === 'all' || order.status === filterOrderStatus
    
    return matchesSearch && matchesStatus
  })

  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory
    
    return matchesSearch && matchesCategory
  })

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    revenue: orders.reduce((sum, o) => sum + o.totalAmount, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Restaurant Management</h1>
          <p className="text-muted-foreground">
            Manage menu, orders, kitchen operations, and dining services
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <ChefHat className="w-4 h-4" />
            Kitchen View
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Order
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <UtensilsCrossed className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl">{orderStats.total}</div>
            <div className="text-sm text-muted-foreground">Total Orders</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl">{orderStats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <PlayCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl">{orderStats.preparing}</div>
            <div className="text-sm text-muted-foreground">Preparing</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl">{orderStats.ready}</div>
            <div className="text-sm text-muted-foreground">Ready</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl">${orderStats.revenue.toFixed(0)}</div>
            <div className="text-sm text-muted-foreground">Revenue</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by order ID, guest name, or room number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterOrderStatus} onValueChange={setFilterOrderStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Orders List */}
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <UtensilsCrossed className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="flex items-center gap-2">
                              Order {order.id}
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                              <Badge className={getTypeColor(order.type)}>
                                {order.type}
                              </Badge>
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {order.guestName} • {order.roomNumber ? `Room ${order.roomNumber}` : `Table ${order.tableNumber}`}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {order.status === 'pending' && (
                            <Button 
                              size="sm" 
                              onClick={() => updateOrderStatus(order.id, 'preparing')}
                              className="gap-2"
                            >
                              <PlayCircle className="w-4 h-4" />
                              Start Preparing
                            </Button>
                          )}
                          {order.status === 'preparing' && (
                            <Button 
                              size="sm" 
                              onClick={() => updateOrderStatus(order.id, 'ready')}
                              className="gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Mark Ready
                            </Button>
                          )}
                          {order.status === 'ready' && (
                            <Button 
                              size="sm" 
                              onClick={() => updateOrderStatus(order.id, 'delivered')}
                              className="gap-2"
                            >
                              <Truck className="w-4 h-4" />
                              Mark Delivered
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Order Time</div>
                          <div>{order.orderTime.toLocaleTimeString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Total Amount</div>
                          <div>${order.totalAmount.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Assigned Chef</div>
                          <div>{order.assignedChef || 'Not assigned'}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Est. Completion</div>
                          <div>{order.estimatedCompletion?.toLocaleTimeString() || 'N/A'}</div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Items:</div>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{item.quantity}x</Badge>
                                <span className="text-sm">{item.menuItemName}</span>
                                {item.modifications && (
                                  <Badge variant="outline" className="text-xs">
                                    Modified
                                  </Badge>
                                )}
                              </div>
                              <span className="text-sm">${(item.quantity * item.unitPrice).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Special Instructions */}
                      {order.specialInstructions && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                          <div className="flex items-center gap-2 text-yellow-800 text-sm">
                            <Bell className="w-4 h-4" />
                            Special Instructions: {order.specialInstructions}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Menu Tab */}
        <TabsContent value="menu" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="appetizer">Appetizer</SelectItem>
                    <SelectItem value="main">Main Course</SelectItem>
                    <SelectItem value="dessert">Dessert</SelectItem>
                    <SelectItem value="beverage">Beverage</SelectItem>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMenuItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4>{item.name}</h4>
                      <Badge className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg">${item.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">{item.popularity}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Prep Time:</span>
                        <span>{item.preparationTime} min</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Available:</span>
                        <Badge variant={item.available ? "default" : "secondary"}>
                          {item.available ? "Yes" : "No"}
                        </Badge>
                      </div>
                    </div>

                    {item.allergens.length > 0 && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Allergens:</div>
                        <div className="flex flex-wrap gap-1">
                          {item.allergens.map((allergen, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-red-50">
                              {allergen}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Kitchen Tab */}
        <TabsContent value="kitchen" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kitchenStations.map((station) => (
              <Card key={station.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="flex items-center gap-2">
                        <ChefHat className="w-5 h-5" />
                        {station.name}
                      </h4>
                      <Badge className={getStationStatusColor(station.status)}>
                        {station.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Chef:</span>
                        <span>{station.chef}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Efficiency:</span>
                        <span>{station.efficiency}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Active Orders:</span>
                        <span>{station.currentOrders.length}</span>
                      </div>
                    </div>

                    {station.currentOrders.length > 0 && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Current Orders:</div>
                        <div className="space-y-1">
                          {station.currentOrders.map((orderId, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {orderId}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Assign
                      </Button>
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
              <CardTitle>Restaurant Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                <UtensilsCrossed className="w-12 h-12 mx-auto mb-4" />
                <p>Restaurant analytics and reporting would be implemented here</p>
                <p className="text-sm">Features: Sales analytics, popular items, kitchen efficiency</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}