import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import SidebarComponent from "./SidebarComponent";

const SheetSidebar = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent>
          <SidebarComponent style={"flex flex-col gap-5 h-full"} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetSidebar;
