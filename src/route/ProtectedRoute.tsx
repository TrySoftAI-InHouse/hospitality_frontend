import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type ProtectedRouteProps = {
  allowedRoles?: string[];
};

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}