"use client";

import { useState, useEffect } from "react";
import { HotelSidebar } from "../components/admin/HotelSidebar";
import { DashboardOverview } from "../components/admin/DashboardOverview";
import { FrontDeskManagement } from "../components/admin/FrontDeskManagement";
import { RoomManagement } from "../components/admin/RoomManagement";
import { ReservationManagement } from "../components/admin/ReservationManagement";
import { StaffManagement } from "../components/admin/StaffManagement";
import { HousekeepingManagement } from "../components/admin/HousekeepingManagement";
import { RestaurantManagement } from "../components/admin/RestaurantManagement";
import { InventoryManagement } from "../components/admin/InventoryManagement";
import { GuestExperienceManagement } from "../components/admin/GuestExperienceManagement";
import { BillingAccountingManagement } from "../components/admin/BillingAccountingManagement";
import { AnalyticsReports } from "../components/admin/AnalyticsReports";
import { CommunicationCenter } from "../components/admin/CommunicationCenter";

export default function App() {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState({
    name: "John Manager",
    role: "manager" as const,
    avatar: undefined,
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // This would be replaced with actual WebSocket or real-time updates
      console.log("Checking for updates...");
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const renderActiveModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <DashboardOverview />;
      case "front-desk":
        return <FrontDeskManagement />;
      case "rooms":
        return <RoomManagement />;
      case "reservations":
        return <ReservationManagement />;
      case "staff":
        return <StaffManagement />;
      case "housekeeping":
        return <HousekeepingManagement />;
      case "restaurant":
        return <RestaurantManagement />;
      case "inventory":
        return <InventoryManagement />;
      case "guest-experience":
        return <GuestExperienceManagement />;
      case "billing":
        return <BillingAccountingManagement />;
      case "analytics":
        return <AnalyticsReports />;
      case "communications":
        return <CommunicationCenter />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Hotel Management Sidebar */}
      <HotelSidebar
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        currentUser={currentUser}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">{renderActiveModule()}</div>
      </main>
    </div>
  );
}