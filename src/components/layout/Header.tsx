// import { Hotel, LogOut, User } from 'lucide-react';
// import { Badge } from '../ui/badge';
// import { Button } from '../ui/button';
// import { useAuth } from '../../hooks/useAuth';
// import { Link } from 'react-router-dom';

// export function Header() {
//   const { currentUser, handleLogout } = useAuth();
  
//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-4">
//       <div className="flex items-center justify-between">
//         <Link to="/" className="flex items-center gap-2">
//           <Hotel className="h-8 w-8 text-blue-600" />
//           <h1 className="text-xl font-semibold">International Hotel</h1>
//         </Link>
        
//         {currentUser ? (
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               <User className="h-5 w-5" />
//               <span className="font-medium">{currentUser.firstName} {currentUser.lastName}</span>
//               <Badge variant="secondary">{currentUser.membershipTier}</Badge>
//               {currentUser.loyaltyPoints && (
//                 <Badge variant="outline">{currentUser.loyaltyPoints} pts</Badge>
//               )}
//             </div>
//             <Button variant="outline" size="sm" onClick={handleLogout}>
//               <LogOut className="h-4 w-4 mr-2" />
//               Logout
//             </Button>
//           </div>
//         ) : (
//           <div className="flex gap-2">
//             <Link to="/login">
//               <Button variant="outline" size="sm">
//                 Login
//               </Button>
//             </Link>
//             <Link to="/register">
//               <Button size="sm">
//                 Register
//               </Button>
//             </Link>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }
// src/components/layout/Header.tsx

import { Hotel,User  } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export function Header() {
  const { currentUser, isDemoUser, handleLogout } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Hotel className="h-8 w-8 text-indigo-600" />
          <span className="text-xl font-semibold">HospitalityPro</span>
        </Link>
        
        {currentUser ? (
          <div className="flex items-center gap-4">
            {isDemoUser() && (
              <Badge variant="secondary">Demo Mode</Badge>
            )}
            <div className="flex items-center gap-2">
              <span className="font-medium">{currentUser.firstName} {currentUser.lastName}</span>
              <Badge variant="outline">{currentUser.membershipTier}</Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/login" className="flex items-center text-sm space-x-1 hover:underline">
            <User className="w-4 h-4" />
            <span>Log in</span>
          </Link>
        )}
      </div>
    </header>
  );
}