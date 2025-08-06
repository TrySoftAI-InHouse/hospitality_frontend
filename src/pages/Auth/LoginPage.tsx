// src/pages/auth/LoginPage.tsx
import { LoginForm } from '../../components/auth/LoginForm';
import { useAuth } from '../../hooks/useAuth';

export function LoginPage() {
  const { handleAuthSuccess } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <LoginForm onSuccess={handleAuthSuccess} />
    </div>
  );
}