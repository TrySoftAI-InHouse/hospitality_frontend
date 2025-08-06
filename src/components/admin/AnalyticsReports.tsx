'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Progress } from '../ui/progress'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign,
  Calendar,
  Download,
  Filter,
  PieChart,
  LineChart,
  Activity
} from 'lucide-react'

interface AnalyticsData {
  period: string
  occupancyRate: number
  revenue: number
  averageRate: number
  guestSatisfaction: number
  totalGuests: number
  repeatGuests: number
  newGuests: number
  departmentRevenue: {
    rooms: number
    restaurant: number
    spa: number
    other: number
  }
}

const mockAnalytics: AnalyticsData[] = [
  {
    period: 'January 2024',
    occupancyRate: 78.5,
    revenue: 145000,
    averageRate: 235,
    guestSatisfaction: 4.6,
    totalGuests: 320,
    repeatGuests: 95,
    newGuests: 225,
    departmentRevenue: {
      rooms: 98000,
      restaurant: 28000,
      spa: 15000,
      other: 4000
    }
  },
  {
    period: 'December 2023',
    occupancyRate: 82.1,
    revenue: 158000,
    averageRate: 245,
    guestSatisfaction: 4.4,
    totalGuests: 365,
    repeatGuests: 112,
    newGuests: 253,
    departmentRevenue: {
      rooms: 110000,
      restaurant: 32000,
      spa: 12000,
      other: 4000
    }
  }
]

const mockDailyData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  occupancy: Math.floor(Math.random() * 40) + 60,
  revenue: Math.floor(Math.random() * 5000) + 3000,
  guests: Math.floor(Math.random() * 20) + 10
}))

export function AnalyticsReports() {
  const [selectedPeriod, setSelectedPeriod] = useState('January 2024')
  const [activeTab, setActiveTab] = useState('overview')
  
  const currentData = mockAnalytics.find(data => data.period === selectedPeriod) || mockAnalytics[0]
  const previousData = mockAnalytics[1]
  
  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1)
  }

  const getTrendIcon = (growth: string) => {
    return parseFloat(growth) >= 0 ? <TrendingUp className="w-4 h-4 text-green-600" /> : <TrendingDown className="w-4 h-4 text-red-600" />
  }

  const getTrendColor = (growth: string) => {
    return parseFloat(growth) >= 0 ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Performance insights, trends, and business intelligence
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="January 2024">January 2024</SelectItem>
              <SelectItem value="December 2023">December 2023</SelectItem>
              <SelectItem value="November 2023">November 2023</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl">{currentData.occupancyRate}%</span>
                  <div className={`flex items-center gap-1 text-sm ${getTrendColor(calculateGrowth(currentData.occupancyRate, previousData.occupancyRate))}`}>
                    {getTrendIcon(calculateGrowth(currentData.occupancyRate, previousData.occupancyRate))}
                    {Math.abs(parseFloat(calculateGrowth(currentData.occupancyRate, previousData.occupancyRate)))}%
                  </div>
                </div>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
            <Progress value={currentData.occupancyRate} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl">${(currentData.revenue / 1000).toFixed(0)}K</span>
                  <div className={`flex items-center gap-1 text-sm ${getTrendColor(calculateGrowth(currentData.revenue, previousData.revenue))}`}>
                    {getTrendIcon(calculateGrowth(currentData.revenue, previousData.revenue))}
                    {Math.abs(parseFloat(calculateGrowth(currentData.revenue, previousData.revenue)))}%
                  </div>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Rate</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl">${currentData.averageRate}</span>
                  <div className={`flex items-center gap-1 text-sm ${getTrendColor(calculateGrowth(currentData.averageRate, previousData.averageRate))}`}>
                    {getTrendIcon(calculateGrowth(currentData.averageRate, previousData.averageRate))}
                    {Math.abs(parseFloat(calculateGrowth(currentData.averageRate, previousData.averageRate)))}%
                  </div>
                </div>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Guest Satisfaction</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl">{currentData.guestSatisfaction}</span>
                  <div className={`flex items-center gap-1 text-sm ${getTrendColor(calculateGrowth(currentData.guestSatisfaction, previousData.guestSatisfaction))}`}>
                    {getTrendIcon(calculateGrowth(currentData.guestSatisfaction, previousData.guestSatisfaction))}
                    {Math.abs(parseFloat(calculateGrowth(currentData.guestSatisfaction, previousData.guestSatisfaction)))}%
                  </div>
                </div>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="guests">Guests</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5" />
                  Daily Occupancy Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDailyData.slice(0, 10).map((day) => (
                    <div key={day.day} className="flex items-center gap-4">
                      <div className="w-12 text-sm text-muted-foreground">
                        Day {day.day}
                      </div>
                      <div className="flex-1">
                        <Progress value={day.occupancy} className="h-2" />
                      </div>
                      <div className="w-12 text-sm text-right">
                        {day.occupancy}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Revenue by Department
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Rooms</span>
                    </div>
                    <div className="text-sm">
                      ${currentData.departmentRevenue.rooms.toLocaleString()} 
                      <span className="text-muted-foreground ml-1">
                        ({Math.round((currentData.departmentRevenue.rooms / currentData.revenue) * 100)}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Restaurant</span>
                    </div>
                    <div className="text-sm">
                      ${currentData.departmentRevenue.restaurant.toLocaleString()}
                      <span className="text-muted-foreground ml-1">
                        ({Math.round((currentData.departmentRevenue.restaurant / currentData.revenue) * 100)}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Spa</span>
                    </div>
                    <div className="text-sm">
                      ${currentData.departmentRevenue.spa.toLocaleString()}
                      <span className="text-muted-foreground ml-1">
                        ({Math.round((currentData.departmentRevenue.spa / currentData.revenue) * 100)}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Other</span>
                    </div>
                    <div className="text-sm">
                      ${currentData.departmentRevenue.other.toLocaleString()}
                      <span className="text-muted-foreground ml-1">
                        ({Math.round((currentData.departmentRevenue.other / currentData.revenue) * 100)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <div className="text-2xl">{currentData.totalGuests}</div>
                <div className="text-sm text-muted-foreground">Total Guests</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <div className="text-2xl">{currentData.repeatGuests}</div>
                <div className="text-sm text-muted-foreground">Repeat Guests</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <div className="text-2xl">{currentData.newGuests}</div>
                <div className="text-sm text-muted-foreground">New Guests</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Other tabs with placeholder content */}
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                <DollarSign className="w-12 h-12 mx-auto mb-4" />
                <p>Detailed revenue analytics would be implemented here</p>
                <p className="text-sm">Features: Revenue trends, forecasting, pricing optimization</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="occupancy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                <Activity className="w-12 h-12 mx-auto mb-4" />
                <p>Occupancy analysis and forecasting would be implemented here</p>
                <p className="text-sm">Features: Seasonal trends, demand patterns, capacity planning</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Guest Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4" />
                <p>Guest behavior and satisfaction analytics would be implemented here</p>
                <p className="text-sm">Features: Guest demographics, satisfaction trends, loyalty analysis</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                <p>Department-wise performance analytics would be implemented here</p>
                <p className="text-sm">Features: Departmental KPIs, cost analysis, efficiency metrics</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}