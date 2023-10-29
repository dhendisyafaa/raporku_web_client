import { BarChart3, BookCheck, LogOut, UserCog } from "lucide-react";
import { signOut } from "next-auth/react";
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
      href={""}
      icon={<BookCheck />}
      title={"Hasil Belajarmu"}
      multiLevel={true}
      level={[
        {
          href: "/dashboard/rapor/10",
          title: "Kelas 10",
        },
        {
          href: "/dashboard/rapor/11",
          title: "Kelas 11",
        },
        {
          href: "/dashboard/rapor/12",
          title: "Kelas 12",
        },
      ]}
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
          <button
            onClick={() => signOut()}
            className="w-full h-[40px] rounded-lg flex gap-3 items-center p-3 cursor-pointer"
          >
            <LogOut />
            <p className="text-sm">Keluar</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
