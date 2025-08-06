import { useState } from "react";
import { HotelSidebar } from "../../components/admin/HotelSidebar";
import { DashboardOverview } from "../../components/admin/DashboardOverview";
import { FrontDeskManagement } from "../../components/admin/FrontDeskManagement";
import { RoomManagement } from "../../components/admin/RoomManagement";
import { ReservationManagement } from "../../components/admin/ReservationManagement";
import { StaffManagement } from "../../components/admin/StaffManagement";
import { HousekeepingManagement } from "../../components/admin/HousekeepingManagement";
import { RestaurantManagement } from "../../components/admin/RestaurantManagement";
import { InventoryManagement } from "../../components/admin/InventoryManagement";
import { GuestExperienceManagement } from "../../components/admin/GuestExperienceManagement";
import { BillingAccountingManagement } from "../../components/admin/BillingAccountingManagement";
import { AnalyticsReports } from "../../components/admin/AnalyticsReports";
import { CommunicationCenter } from "../../components/admin/CommunicationCenter";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/ui/loading-spinner";

export function AdminDashboard() {
  const [activeModule, setActiveModule] = useState("dashboard");
  const { currentUser, isLoading } = useAuth();

  // Redirect if not authenticated or not admin
  if (!isLoading && (!currentUser || currentUser.role !== 'admin')) {
    return <Navigate to="/login" replace />;
  }

  const renderActiveModule = () => {
    switch (activeModule) {
      case "dashboard": return <DashboardOverview />;
      case "front-desk": return <FrontDeskManagement />;
      case "rooms": return <RoomManagement />;
      case "reservations": return <ReservationManagement />;
      case "staff": return <StaffManagement />;
      case "housekeeping": return <HousekeepingManagement />;
      case "restaurant": return <RestaurantManagement />;
      case "inventory": return <InventoryManagement />;
      case "guest-experience": return <GuestExperienceManagement />;
      case "billing": return <BillingAccountingManagement />;
      case "analytics": return <AnalyticsReports />;
      case "communications": return <CommunicationCenter />;
      default: return <DashboardOverview />;
    }
  };

  // Show loading state while checking auth
  if (isLoading || !currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <HotelSidebar
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        currentUser={currentUser}
      />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          {renderActiveModule()}
        </div>
      </main>
    </div>
  );
}