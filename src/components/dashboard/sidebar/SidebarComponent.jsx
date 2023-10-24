import { cn } from "@/lib/utils";
import { BarChart3, BookCheck, LogOut, UserCog } from "lucide-react";
import NavigationSidebar from "./NavigationSidebar";
import ProfileSidebar from "./ProfileSidebar";

const SidebarComponent = ({
  style = "bg-white w-[300px] h-full shadow p-3 hidden lg:flex flex-col gap-5",
}) => {
  const navSidebar = [
    <NavigationSidebar
      key={1}
      href={"/dashboard"}
      icon={<BarChart3 />}
      title={"Grafik Pencapaian"}
    />,
    <NavigationSidebar
      key={2}
      href={"/dashboard/rapor"}
      icon={<BookCheck />}
      title={"Hasil Belajarmu"}
    />,
    <NavigationSidebar
      key={3}
      href={"/dashboard/settings"}
      icon={<UserCog />}
      title={"Pengaturan"}
    />,
  ];
  return (
    <div className={`${style}`}>
      <ProfileSidebar />
      <hr />
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2">{navSidebar}</div>
        <div>
          <hr className="mb-3" />
          <NavigationSidebar icon={<LogOut />} title={"Keluar"} />
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
