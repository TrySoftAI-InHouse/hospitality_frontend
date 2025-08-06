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
  Package, 
  Plus, 
  Search, 
  AlertTriangle,
  TrendingDown,
  Truck,
  DollarSign,
  Calendar
} from 'lucide-react'
import { mockInventory, mockPurchaseOrders, mockSuppliers } from '../inventory/mockData'
import { getStatusColor, getCategoryColor, getStockLevel, calculateInventoryStats } from '../inventory/utils'
import type { InventoryItem } from '../inventory/types'

export function InventoryManagement() {
  const [inventory] = useState<InventoryItem[]>(mockInventory)
  const [purchaseOrders] = useState(mockPurchaseOrders)
  const [suppliers] = useState(mockSuppliers)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [activeTab, setActiveTab] = useState('inventory')

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const inventoryStats = calculateInventoryStats(inventory)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Inventory Management</h1>
          <p className="text-muted-foreground">
            Track stock levels, manage suppliers, and process purchase orders
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Truck className="w-4 h-4" />
            New Order
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl">{inventoryStats.totalItems}</div>
            <div className="text-sm text-muted-foreground">Total Items</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl">{inventoryStats.lowStock}</div>
            <div className="text-sm text-muted-foreground">Low Stock</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingDown className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl">{inventoryStats.outOfStock}</div>
            <div className="text-sm text-muted-foreground">Out of Stock</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl">${inventoryStats.totalValue.toFixed(0)}</div>
            <div className="text-sm text-muted-foreground">Total Value</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl">{inventoryStats.expiringSoon}</div>
            <div className="text-sm text-muted-foreground">Expiring Soon</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search items by name or supplier..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="amenities">Amenities</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="low-stock">Low Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInventory.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4>{item.name}</h4>
                      <div className="flex gap-1">
                        <Badge className={getCategoryColor(item.category)}>
                          {item.category}
                        </Badge>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Current Stock:</span>
                        <span className={item.currentStock <= item.minStock ? 'text-red-600' : ''}>
                          {item.currentStock} {item.unit}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Min Stock:</span>
                        <span>{item.minStock} {item.unit}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Cost per Unit:</span>
                        <span>${item.costPerUnit}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Value:</span>
                        <span>${(item.currentStock * item.costPerUnit).toFixed(2)}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Stock Level:</span>
                        <span>{Math.round(getStockLevel(item))}%</span>
                      </div>
                      <Progress value={getStockLevel(item)} className="h-2" />
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <div>Supplier: {item.supplier}</div>
                      <div>Location: {item.location}</div>
                      <div>Last Restocked: {item.lastRestocked.toLocaleDateString()}</div>
                      {item.expiryDate && (
                        <div className="text-orange-600">
                          Expires: {item.expiryDate.toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    {item.currentStock <= item.minStock && (
                      <div className="bg-red-50 border border-red-200 rounded p-2">
                        <div className="flex items-center gap-2 text-red-800 text-sm">
                          <AlertTriangle className="w-4 h-4" />
                          Low Stock Alert
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Reorder
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

        {/* Other tabs placeholder */}
        <TabsContent value="purchase-orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                <Truck className="w-12 h-12 mx-auto mb-4" />
                <p>Purchase order management would be implemented here</p>
                <p className="text-sm">Features: Order creation, approval workflow, delivery tracking</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-4" />
                <p>Supplier management would be implemented here</p>
                <p className="text-sm">Features: Supplier profiles, performance tracking, contract management</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                <DollarSign className="w-12 h-12 mx-auto mb-4" />
                <p>Inventory analytics and reporting would be implemented here</p>
                <p className="text-sm">Features: Usage patterns, cost analysis, reorder predictions</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}