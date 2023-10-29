import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import SidebarComponent from "./sidebar/SidebarComponent";

const HeaderDashboard = ({
  title = "Grafik Pencapaian Belajarmu",
  message = "Selamat Datang Kang Dhendi!",
}) => {
  return (
    <div className="w-full h-[70px] shadow flex justify-between items-center p-3 bg-white rounded-md">
      <div>
        <p className="font-bold text-lg">{title}</p>
        <p className="font-medium text-sm">{message}</p>
      </div>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent>
            <SidebarComponent style={"flex flex-col gap-5 h-full"} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default HeaderDashboard;
