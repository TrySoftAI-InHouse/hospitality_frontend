import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import { LoginPage } from '../pages/auth/LoginPage';
import  RegisterPage  from '../pages/auth/RegisterPage';
import { DashboardPage } from '../pages/guest/DashboardPage';
import { BookingSearchPage } from '../pages/booking/BookingSearchPage';
import { RoomResultsPage } from '../pages/booking/RoomResultsPage';
import { BookingFormPage } from '../pages/booking/BookingFormPage';
import { BookingConfirmationPage } from '../pages/booking/BookingConfirmationPage';
import { FoodMenuPage } from '../pages/food/FoodMenuPage';
import { FoodCartPage } from '../pages/food/FoodCartPage';
import { FoodOrderConfirmationPage } from '../pages/food/FoodOrderConfirmationPage';
import { MyBookingsPage } from '../pages/guest/MyBookingsPage';
import { FeedbackPage } from '../pages/guest/FeedbackPage';
import { RewardsPage } from '../pages/guest/RewardsPage';
import  {AdminDashboard}  from '../pages/Admin/AdminDashboard.jsx';
import { ProtectedRoute } from './ProtectedRoute';
import { GuestApp } from '../app/GuestApp';
import { AdminApp } from '../app/AdminApp';
import { RootApp } from '../app/RootApp';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootApp />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'admin',
        element: <ProtectedRoute allowedRoles={['admin']} />,
        children: [
          {
            element: <AdminApp />,
            children: [
              {
                path: 'dashboard',
                element: <AdminDashboard />,
              },
            ],
          },
        ],
      },
      {
        path: 'guest',
        element: <ProtectedRoute allowedRoles={['guest']} />,
        children: [
          {
            element: <GuestApp />,
            children: [
              {
                path: 'dashboard',
                element: <DashboardPage />,
              },
              {
                path: 'booking',
                children: [
                  { index: true, element: <BookingSearchPage /> },
                  { path: 'results', element: <RoomResultsPage /> },
                  { path: 'form', element: <BookingFormPage /> },
                  { path: 'confirmation', element: <BookingConfirmationPage /> },
                ],
              },
              {
                path: 'food',
                children: [
                  { index: true, element: <FoodMenuPage /> },
                  { path: 'cart', element: <FoodCartPage /> },
                  { path: 'confirmation', element: <FoodOrderConfirmationPage /> },
                ],
              },
              { path: 'my-bookings', element: <MyBookingsPage /> },
              { path: 'feedback', element: <FeedbackPage /> },
              { path: 'rewards', element: <RewardsPage /> },
            ],
          },
        ],
      },
    ],
  },
]);