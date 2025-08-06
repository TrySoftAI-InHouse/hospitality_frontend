
// export function DashboardPage() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Welcome to Your Dashboard</h1>
//     </div>
//   );
// }

import { GuestDashboard } from '../../components/guest/GuestDashboard';

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Calendar, Utensils, Star, Gift, Hotel, UtensilsCrossed } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

export function DashboardPage() {
  return (
    <>
   <GuestDashboard />

 <div className="space-y-6">
      <div className="flex items-center justify-between">
        {/* <h1 className="text-3xl font-bold tracking-tight">Welcome Back!</h1> */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Last updated: Just now</span>
        </div>
      </div>
{/* 
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow duration-300 border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Book a Room</CardTitle>
            <div className="p-2 rounded-lg bg-blue-100/50">
              <Hotel className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">+ Book Now</div>
            <p className="text-xs text-gray-500 mt-2">
              Find available rooms for your stay
            </p>
            <Link to="/booking">
              <Button size="sm" className="mt-4 bg-blue-600 hover:bg-blue-700">
                Book Room
                <Calendar className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-300 border-0 shadow-sm bg-gradient-to-br from-green-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Order Food</CardTitle>
            <div className="p-2 rounded-lg bg-green-100/50">
              <UtensilsCrossed className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">+ Order Now</div>
            <p className="text-xs text-gray-500 mt-2">
              Browse our restaurant menu
            </p>
            <Link to="/food">
              <Button size="sm" className="mt-4 bg-green-600 hover:bg-green-700">
                View Menu
                <Utensils className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-300 border-0 shadow-sm bg-gradient-to-br from-amber-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Leave Feedback</CardTitle>
            <div className="p-2 rounded-lg bg-amber-100/50">
              <Star className="h-5 w-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">+ Feedback</div>
            <p className="text-xs text-gray-500 mt-2">
              Share your experience with us
            </p>
            <Link to="/feedback">
              <Button size="sm" className="mt-4 bg-amber-600 hover:bg-amber-700">
                Give Feedback
                <Star className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-300 border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Loyalty Rewards</CardTitle>
            <div className="p-2 rounded-lg bg-purple-100/50">
              <Gift className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">+ Rewards</div>
            <p className="text-xs text-gray-500 mt-2">
              Check your loyalty points
            </p>
            <Link to="/rewards">
              <Button size="sm" className="mt-4 bg-purple-600 hover:bg-purple-700">
                View Rewards
                <Gift className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div> */}

      {/* Additional Dashboard Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              You don't have any recent bookings. Start by booking a room!
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Special Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Check back later for special offers and discounts!
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    
    </>
   
  );
}