import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SheetSidebar from "./sidebar/SheetSidebar";

const HeaderDashboard = ({
  title = "Grafik Pencapaian Belajarmu",
  message = "Selamat Datang Kang Dhendi!",
}) => {
  return (
    <div className="w-full h-[70px] shadow flex gap-5 items-center p-3 bg-white rounded-md">
      <div className="lg:hidden">
        <SheetSidebar />
      </div>
      <div>
        <p className="font-bold text-lg">{title}</p>
        <p className="font-medium text-sm">{message}</p>
      </div>
    </div>
  );
};

export default HeaderDashboard;
