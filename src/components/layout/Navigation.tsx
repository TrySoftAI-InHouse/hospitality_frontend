// src/components/layout/Navigation.tsx
import { 
  Home, 
  Calendar, 
  Utensils, 
  Star, 
  CreditCard, 
  Gift,
  ChevronDown,
  Menu
} from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '../../hooks/useCart';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const cn = (...classes: (string | undefined | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};

export function Navigation() {
  const { getTotalCartItems } = useCart();
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const isActive = (path: string) => pathname.startsWith(path);

  const navItems = [
    {
      path: '/guest/dashboard',
      icon: Home,
      label: 'Dashboard'
    },
    {
      path: '/guest/booking',
      icon: Calendar,
      label: 'Book Room'
    },
    {
      path: '/guest/food',
      icon: Utensils,
      label: 'Order Food',
      badge: getTotalCartItems()
    },
    {
      path: '/guest/feedback',
      icon: Star,
      label: 'Feedback'
    },
    {
      path: '/guest/my-bookings',
      icon: CreditCard,
      label: 'My Bookings'
    },
    {
      path: '/guest/rewards',
      icon: Gift,
      label: 'Rewards'
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-1 overflow-x-auto py-3 hide-scrollbar">
          {navItems.map((item) => (
            <Link to={item.path} key={item.path}>
              <Button
                variant={isActive(item.path) ? 'secondary' : 'ghost'}
                size="sm"
                className={cn(
                  "group relative rounded-xl transition-all duration-200 px-3",
                  isActive(item.path) 
                    ? "shadow-xs bg-gradient-to-b from-gray-100 to-gray-50 border border-gray-200" 
                    : "hover:bg-gray-50 hover:shadow-xs"
                )}
              >
                <div className="flex items-center gap-2">
                  <item.icon className={cn(
                    "h-4 w-4 transition-colors",
                    isActive(item.path) ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"
                  )} />
                  <span className={cn(
                    "whitespace-nowrap text-sm font-medium transition-colors",
                    isActive(item.path) ? "text-gray-900" : "text-gray-600 group-hover:text-gray-800"
                  )}>
                    {item.label}
                  </span>
                  {item.badge && item.badge > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    >
                      <Badge 
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white border-2 border-white shadow-sm"
                        variant="default"
                      >
                        {item.badge}
                      </Badge>
                    </motion.div>
                  )}
                </div>
                
                {isActive(item.path) && (
                  <motion.div 
                    className="absolute bottom-0 left-1/2 h-0.5 w-4/5 bg-blue-500 rounded-full -translate-x-1/2"
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Button>
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="rounded-xl px-2 text-gray-500 hover:bg-gray-50"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Current page indicator */}
          <div className="text-sm font-medium text-gray-800 px-3">
            {navItems.find(item => isActive(item.path))?.label || 'Menu'}
          </div>
          
          {/* Placeholder to balance the layout */}
          <div className="w-9"></div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-1 pb-3">
                {navItems.map((item) => (
                  <Link 
                    to={item.path} 
                    key={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive(item.path) ? 'secondary' : 'ghost'}
                      size="sm"
                      className={cn(
                        "group relative rounded-xl transition-all duration-200 px-3 w-full justify-start",
                        isActive(item.path) 
                          ? "shadow-xs bg-gradient-to-b from-gray-100 to-gray-50 border border-gray-200" 
                          : "hover:bg-gray-50 hover:shadow-xs"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className={cn(
                          "h-4 w-4 transition-colors",
                          isActive(item.path) ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"
                        )} />
                        <span className={cn(
                          "whitespace-nowrap text-sm font-medium transition-colors",
                          isActive(item.path) ? "text-gray-900" : "text-gray-600 group-hover:text-gray-800"
                        )}>
                          {item.label}
                        </span>
                        {item.badge && item.badge > 0 && (
                          <Badge 
                            className="ml-auto bg-rose-500 hover:bg-rose-600 text-white border-2 border-white shadow-sm"
                            variant="default"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </Button>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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