import React from "react";
import HeaderDashboard from "./HeaderDashboard";
import SidebarComponent from "./sidebar/SidebarComponent";
import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardLayout = ({ children, messageHeader, titleHeader }) => {
  return (
    <div className="flex h-screen">
      <SidebarComponent />
      <div className="flex flex-1 flex-col gap-3 m-2 lg:m-4">
        <HeaderDashboard message={messageHeader} title={titleHeader} />
        <ScrollArea className="h-full w-full rounded-md shadow p-2 lg:p-4 bg-white">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
};

export default DashboardLayout;
