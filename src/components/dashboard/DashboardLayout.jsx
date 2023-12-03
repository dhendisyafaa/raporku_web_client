import HeaderDashboard from "./HeaderDashboard";
import SidebarComponent from "./sidebar/SidebarComponent";

const DashboardLayout = ({ children, messageHeader, titleHeader }) => {
  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <SidebarComponent />
      <div className="flex w-full flex-col gap-3 lg:m-4 max-w-full">
        <HeaderDashboard message={messageHeader} title={titleHeader} />
        <div className="h-full w-full rounded-md shadow p-2 lg:p-4 bg-white overflow-auto scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
