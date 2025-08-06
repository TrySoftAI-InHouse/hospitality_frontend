// import { useAuth } from '../hooks/useAuth';
// import { AdminApp } from './AdminApp';
// import { GuestApp } from './GuestApp';
// import  LandingPage  from '../pages/LandingPage';

// export function RootApp() {
//   const { currentUser, isLoading } = useAuth();

//   if (isLoading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   if (!currentUser) {
//     return <LandingPage />;
//   }

//   return currentUser.role === 'admin' ? <AdminApp /> : <GuestApp />;
// }


import { Outlet } from 'react-router-dom';
// import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';

export function RootApp() {
  const { currentUser } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-1">
        <Outlet />
      </main>
      {!currentUser && <Footer />}
    </div>
  );
}