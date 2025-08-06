'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import {
  Building2,
  Users,
  Bed,
  Calendar,
  ClipboardList,
  UtensilsCrossed,
  Package,
  MessageSquare,
  Calculator,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  User,
  Phone,
  Wifi,
  ChevronLeft,
  Menu,
} from 'lucide-react'

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, badge: null },
  { id: 'front-desk', label: 'Front Desk', icon: Users, badge: '3' },
  { id: 'rooms', label: 'Room Management', icon: Bed, badge: '2' },
  { id: 'reservations', label: 'Reservations', icon: Calendar, badge: '12' },
  { id: 'staff', label: 'Staff Management', icon: User, badge: null },
  { id: 'housekeeping', label: 'Housekeeping', icon: ClipboardList, badge: '5' },
  { id: 'restaurant', label: 'Restaurant', icon: UtensilsCrossed, badge: '8' },
  { id: 'inventory', label: 'Inventory', icon: Package, badge: '2' },
  { id: 'guest-experience', label: 'Guest Experience', icon: MessageSquare, badge: null },
  { id: 'billing', label: 'Billing & Accounting', icon: Calculator, badge: null },
  { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3, badge: null },
  { id: 'communications', label: 'WhatsApp & Voice', icon: Phone, badge: '15' },
]

const userRoles = {
  admin: { name: 'Admin', color: 'bg-red-500' },
  manager: { name: 'Manager', color: 'bg-blue-500' },
  receptionist: { name: 'Receptionist', color: 'bg-green-500' },
  housekeeping: { name: 'Housekeeping', color: 'bg-purple-500' },
  kitchen: { name: 'Kitchen Staff', color: 'bg-orange-500' },
  guest: { name: 'Guest', color: 'bg-gray-500' },
}

interface HotelSidebarProps {
  activeModule: string
  onModuleChange: (module: string) => void
  currentUser?: {
    name: string
    role: keyof typeof userRoles
    avatar?: string | null
  } | null
}

export function HotelSidebar({
  activeModule,
  onModuleChange,
  currentUser,
}: HotelSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const safeUser = currentUser ?? {
    name: 'John Manager',
    role: 'manager',
    avatar: null,
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setSidebarOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen)
    } else {
      setIsCollapsed(!isCollapsed)
    }
  }

  return (
    <>
      {/* Mobile Toggle Button - Floating Action Button Style */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed z-30 top-4 left-4 p-2 rounded-full bg-white shadow-lg md:hidden hover:shadow-xl transition-all duration-200"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
      )}

      {/* Mobile Overlay with Smooth Transition */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 "
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar with Glass Morphism Effect */}
      <aside
        className={`
          fixed md:relative z-20 h-screen bg-white/95 backdrop-blur-lg border-r border-gray-200 flex flex-col transition-all duration-300
          ${isMobile
            ? `${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-72 shadow-xl`
            : `${isCollapsed ? 'w-20' : 'w-72'} shadow-sm`
          }
        `}
      >
        {/* Header with Gradient Background */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            {(!isCollapsed || isMobile) && (
              <div>
                <h2 className="text-lg font-semibold text-white">International Hotel</h2>
                <p className="text-xs text-white/80">Maryland Branch</p>
              </div>
            )}
          </div>
        </div>

        {/* User Info with Hover Effect */}
        <div className="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-white shadow">
              {safeUser.avatar ? (
                <AvatarImage src={safeUser.avatar} />
              ) : null}
              <AvatarFallback className={`${userRoles[safeUser.role]?.color || 'bg-gray-300'} text-white font-medium`}>
                {(safeUser.name ?? 'Unknown')
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {(!isCollapsed || isMobile) && (
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">{safeUser.name}</h3>
                <Badge variant="outline" className="text-xs mt-1 bg-white">
                  {userRoles[safeUser.role]?.name || 'Unknown'}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* System Status Cards */}
        {(!isCollapsed || isMobile) && (
          <div className="p-4 border-b border-gray-200 space-y-3">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-600">System Status</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-green-600">Online</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-xs">
                <p className="text-xs text-gray-500">Occupancy</p>
                <p className="text-sm font-semibold">78%</p>
              </div>
              <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-xs">
                <p className="text-xs text-gray-500">Active Staff</p>
                <p className="text-sm font-semibold">24/28</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation with Subtle Hover Effects */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeModule === item.id ? 'secondary' : 'ghost'}
              className={`
                w-full justify-start gap-3 transition-all duration-200
                ${isCollapsed && !isMobile ? 'px-2' : 'px-3'}
                ${activeModule === item.id 
                  ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200' 
                  : 'hover:bg-gray-50 text-gray-700'
                }
              `}
              onClick={() => {
                onModuleChange(item.id)
                if (isMobile) setSidebarOpen(false)
              }}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${activeModule === item.id ? 'text-blue-600' : 'text-gray-500'}`} />
              {(!isCollapsed || isMobile) && (
                <>
                  <span className="flex-1 text-left font-medium text-sm">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      variant={activeModule === item.id ? 'default' : 'secondary'} 
                      className="text-xs px-1.5 py-0.5"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          ))}
        </nav>

        {/* Collapse Toggle with Modern Icon */}
        <div className="p-3 border-t border-gray-200 bg-white/50">
          <Button
            variant="ghost"
            size="sm"
            className="w-full hover:bg-gray-100 text-gray-600"
            onClick={toggleSidebar}
          >
            {isMobile ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <div className="flex items-center justify-center gap-2">
                {!isCollapsed && <span className="text-xs">Collapse</span>}
                <div className={`w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center ${isCollapsed ? 'rotate-180' : ''} transition-transform duration-300`}>
                  <ChevronLeft className="w-3 h-3 text-white" />
                </div>
              </div>
            )}
          </Button>
        </div>
      </aside>
    </>
  )
}


// 'use client'

// import { useState, useEffect } from 'react'
// import { Card, CardContent } from '../ui/card'
// import { Button } from '../ui/button'
// import { Badge } from '../ui/badge'
// import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
// import { 
//   Building2, 
//   Users, 
//   Bed, 
//   Calendar, 
//   ClipboardList,
//   UtensilsCrossed,
//   Package,
//   MessageSquare,
//   Calculator,
//   BarChart3,
//   Settings,
//   Bell,
//   LogOut,
//   User,
//   Phone,
//   Wifi,
//   ChevronLeft,
//   Menu
// } from 'lucide-react'

// const menuItems = [
//   { id: 'dashboard', label: 'Dashboard', icon: BarChart3, badge: null },
//   { id: 'front-desk', label: 'Front Desk', icon: Users, badge: '3' },
//   { id: 'rooms', label: 'Room Management', icon: Bed, badge: '2' },
//   { id: 'reservations', label: 'Reservations', icon: Calendar, badge: '12' },
//   { id: 'staff', label: 'Staff Management', icon: User, badge: null },
//   { id: 'housekeeping', label: 'Housekeeping', icon: ClipboardList, badge: '5' },
//   { id: 'restaurant', label: 'Restaurant', icon: UtensilsCrossed, badge: '8' },
//   { id: 'inventory', label: 'Inventory', icon: Package, badge: '2' },
//   { id: 'guest-experience', label: 'Guest Experience', icon: MessageSquare, badge: null },
//   { id: 'billing', label: 'Billing & Accounting', icon: Calculator, badge: null },
//   { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3, badge: null },
//   { id: 'communications', label: 'WhatsApp & Voice', icon: Phone, badge: '15' }
// ]

// const userRoles = {
//   admin: { name: 'Admin', color: 'bg-red-500' },
//   manager: { name: 'Manager', color: 'bg-blue-500' },
//   receptionist: { name: 'Receptionist', color: 'bg-green-500' },
//   housekeeping: { name: 'Housekeeping', color: 'bg-purple-500' },
//   kitchen: { name: 'Kitchen Staff', color: 'bg-orange-500' },
//   guest: { name: 'Guest', color: 'bg-gray-500' }
// }

// interface HotelSidebarProps {
//   activeModule: string
//   onModuleChange: (module: string) => void
//   currentUser?: {
//     name: string
//     role: keyof typeof userRoles
//     avatar?: string
//   }
// }

// export function HotelSidebar({ 
//   activeModule, 
//   onModuleChange, 
//   currentUser = { name: 'John Manager', role: 'manager' }
// }: HotelSidebarProps) {
//   const [isCollapsed, setIsCollapsed] = useState(false)
//   const [isMobile, setIsMobile] = useState(false)
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768)
//       if (window.innerWidth >= 768) {
//         setSidebarOpen(false)
//       }
//     }

//     handleResize()
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   const toggleSidebar = () => {
//     if (isMobile) {
//       setSidebarOpen(!sidebarOpen)
//     } else {
//       setIsCollapsed(!isCollapsed)
//     }
//   }

//   return (
//     <>
//       {/* Mobile Toggle Button (only shows on mobile) */}
//       {isMobile && (
//         <button 
//           onClick={toggleSidebar}
//           className="fixed z-30 top-4 left-4 p-2 rounded-md bg-white shadow-md md:hidden"
//         >
//           <Menu className="w-5 h-5" />
//         </button>
//       )}

//       {/* Overlay for mobile (only shows when sidebar is open on mobile) */}
//       {isMobile && sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-20"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside 
//         className={`
//           fixed md:relative z-20 h-screen bg-white border-r border-border flex flex-col transition-all duration-300
//           ${isMobile ? 
//             `${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64` : 
//             `${isCollapsed ? 'w-16' : 'w-64'}`
//           }
//         `}
//       >
//         {/* Hotel Header */}
//         <div className="p-4 border-b border-border">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
//               <Building2 className="w-6 h-6 text-white" />
//             </div>
//             {(!isCollapsed || isMobile) && (
//               <div>
//                 <h2 className="text-lg">International Hotel</h2>
//                 <p className="text-xs text-muted-foreground">Maryland Branch</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* User Profile */}
//         <div className="p-4 border-b border-border">
//           <div className="flex items-center gap-3">
//             <Avatar className="w-10 h-10">
//               <AvatarImage src={currentUser.avatar} />
//               <AvatarFallback className={userRoles[currentUser.role].color}>
//                 {currentUser.name.split(' ').map(n => n[0]).join('')}
//               </AvatarFallback>
//             </Avatar>
//             {(!isCollapsed || isMobile) && (
//               <div className="flex-1 min-w-0">
//                 <h3 className="text-sm truncate">{currentUser.name}</h3>
//                 <Badge variant="outline" className="text-xs">
//                   {userRoles[currentUser.role].name}
//                 </Badge>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* System Status */}
//         {(!isCollapsed || isMobile) && (
//           <div className="p-4 border-b border-border">
//             <div className="space-y-2">
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-muted-foreground">System Status</span>
//                 <div className="flex items-center gap-1">
//                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   <span className="text-xs text-green-600">Online</span>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-muted-foreground">Occupancy</span>
//                 <span className="text-xs">78%</span>
//               </div>
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-muted-foreground">Active Staff</span>
//                 <span className="text-xs">24/28</span>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Navigation Menu */}
//         <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
//           {menuItems.map((item) => (
//             <Button
//               key={item.id}
//               variant={activeModule === item.id ? "secondary" : "ghost"}
//               className={`w-full justify-start gap-3 ${isCollapsed && !isMobile ? 'px-2' : 'px-3'}`}
//               onClick={() => {
//                 onModuleChange(item.id)
//                 if (isMobile) setSidebarOpen(false)
//               }}
//             >
//               <item.icon className="w-5 h-5 flex-shrink-0" />
//               {(!isCollapsed || isMobile) && (
//                 <>
//                   <span className="flex-1 text-left">{item.label}</span>
//                   {item.badge && (
//                     <Badge variant="secondary" className="text-xs">
//                       {item.badge}
//                     </Badge>
//                   )}
//                 </>
//               )}
//             </Button>
//           ))}
//         </nav>

//         {/* Quick Actions */}
//         {/* <div className="p-4 border-t border-border space-y-2">
//           <Button variant="outline" size="sm" className={`w-full gap-2 ${isCollapsed && !isMobile ? 'px-2' : ''}`}>
//             <Bell className="w-4 h-4" />
//             {(!isCollapsed || isMobile) && 'Notifications'}
//           </Button>
//           <Button variant="outline" size="sm" className={`w-full gap-2 ${isCollapsed && !isMobile ? 'px-2' : ''}`}>
//             <Settings className="w-4 h-4" />
//             {(!isCollapsed || isMobile) && 'Settings'}
//           </Button>
//           <Button variant="outline" size="sm" className={`w-full gap-2 ${isCollapsed && !isMobile ? 'px-2' : ''}`}>
//             <LogOut className="w-4 h-4" />
//             {(!isCollapsed || isMobile) && 'Logout'}
//           </Button>
//         </div> */}

//         {/* Collapse Toggle */}
//         <div className="p-4 border-t border-border">
//           <Button 
//             variant="ghost" 
//             size="sm" 
//             className="w-full"
//             onClick={toggleSidebar}
//           >
//             {isMobile ? (
//               <ChevronLeft className="w-4 h-4" />
//             ) : (
//               <Wifi className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-90' : ''}`} />
//             )}
//           </Button>
//         </div>
//       </aside>
//     </>
//   )
// }