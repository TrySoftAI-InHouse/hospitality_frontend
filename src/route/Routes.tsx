import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import { LoginPage } from '../pages/Auth/LoginPage';
import  RegisterPage  from '../pages/Auth/RegisterPage';
import { DashboardPage } from '../pages/Guest/DashboardPage';
import { BookingSearchPage } from '../pages/Booking/BookingSearchPage';
import { RoomResultsPage } from '../pages/Booking/RoomResultsPage';
import { BookingFormPage } from '../pages/Booking/BookingFormPage';
import { BookingConfirmationPage } from '../pages/Booking/BookingConfirmationPage';
import { FoodMenuPage } from '../pages/Food/FoodMenuPage';
import { FoodCartPage } from '../pages/Food/FoodCartPage';
import { FoodOrderConfirmationPage } from '../pages/Food/FoodOrderConfirmationPage';
import { MyBookingsPage } from '../pages/Guest/MyBookingsPage';
import { FeedbackPage } from '../pages/Guest/FeedbackPage';
import { RewardsPage } from '../pages/Guest/RewardsPage';
import  {AdminDashboard}  from '../pages/Admin/AdminDashboard.jsx';
import { ProtectedRoute } from './ProtectedRoute';
import { GuestApp } from '../app/GuestApp';
import { AdminApp } from '../app/AdminApp';
import { RootApp } from '../app/RootApp';
import { CheckoutPage } from '../pages/CheckoutPage';
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
      },{
          path: 'booking/checkout',
        element: <CheckoutPage />,
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
        children: [
          { index: true, element: <BookingSearchPage /> },
          { path: 'results', element: <RoomResultsPage /> },
          { path: 'checkout', element: <CheckoutPage /> },
          // ... other booking routes ...
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
                  { path: 'checkout', element: <CheckoutPage  /> },
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
