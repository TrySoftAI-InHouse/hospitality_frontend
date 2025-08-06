import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Navigation } from '../components/layout/Navigation';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';
import { DemoModeBanner } from '../components/DemoModeBanner';

export function GuestApp() {
  const { currentUser, isDemoUser } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      {isDemoUser() && <DemoModeBanner />}
      {currentUser && <Navigation />}
      <main className="flex-1 container mx-auto px-6 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}