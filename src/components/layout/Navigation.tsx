import { 
  Home, 
  Calendar, 
  Utensils, 
  Star, 
  CreditCard, 
  Gift,
  ShoppingCart 
} from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '../../hooks/useCart';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from '../ui/badge';

export function Navigation() {
  const { getTotalCartItems } = useCart();
  const { pathname } = useLocation();
  
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-100 px-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-1 overflow-x-auto py-2 hide-scrollbar">
          <Link to="/guest/dashboard">
            <Button
              variant={isActive('/guest/dashboard') ? 'secondary' : 'ghost'}
              size="sm"
              className={`rounded-lg transition-all duration-200 ${isActive('/dashboard') ? 'shadow-sm' : 'hover:bg-gray-50'}`}
            >
              <Home className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">Dashboard</span>
            </Button>
          </Link>
          
          <Link to="/guest/booking">
            <Button
              variant={isActive('/booking') ? 'secondary' : 'ghost'}
              size="sm"
              className={`rounded-lg transition-all duration-200 ${isActive('/booking') ? 'shadow-sm' : 'hover:bg-gray-50'}`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">Book Room</span>
            </Button>
          </Link>
          
          <Link to="/guest/food">
            <Button
              variant={isActive('/food') ? 'secondary' : 'ghost'}
              size="sm"
              className={`relative rounded-lg transition-all duration-200 ${isActive('/food') ? 'shadow-sm' : 'hover:bg-gray-50'}`}
            >
              <Utensils className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">Order Food</span>
              {getTotalCartItems() > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white"
                  variant="default"
                >
                  {getTotalCartItems()}
                </Badge>
              )}
            </Button>
          </Link>
          
          <Link to="/guest/feedback">
            <Button
              variant={isActive('/feedback') ? 'secondary' : 'ghost'}
              size="sm"
              className={`rounded-lg transition-all duration-200 ${isActive('/feedback') ? 'shadow-sm' : 'hover:bg-gray-50'}`}
            >
              <Star className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">Feedback</span>
            </Button>
          </Link>
          
          <Link to="/guest/my-bookings">
            <Button
              variant={isActive('/my-bookings') ? 'secondary' : 'ghost'}
              size="sm"
              className={`rounded-lg transition-all duration-200 ${isActive('/my-bookings') ? 'shadow-sm' : 'hover:bg-gray-50'}`}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">My Bookings</span>
            </Button>
          </Link>
          
          <Link to="/guest/rewards">
            <Button
              variant={isActive('/rewards') ? 'secondary' : 'ghost'}
              size="sm"
              className={`rounded-lg transition-all duration-200 ${isActive('/rewards') ? 'shadow-sm' : 'hover:bg-gray-50'}`}
            >
              <Gift className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">Rewards</span>
            </Button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
}