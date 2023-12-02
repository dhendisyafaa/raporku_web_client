import {
  BarChart3,
  BookCheck,
  GraduationCap,
  HomeIcon,
  LogOut,
  School,
  School2,
} from "lucide-react";
import { signOut } from "next-auth/react";
import NavigationSidebar from "./NavigationSidebar";
import ProfileSidebar from "./ProfileSidebar";
import useUserData from "@/hooks/useUserData";
import SkeletonSidebar from "@/components/skeleton/SkeletonSidebar";

const SidebarComponent = ({
  style = "bg-white w-[300px] h-full shadow p-3 hidden lg:flex flex-col gap-5",
}) => {
  const { level } = useUserData();

  const sidebarSiswa = [
    <NavigationSidebar
      key={1}
      href={"/dashboard"}
      icon={<BarChart3 />}
      title={"Grafik Pencapaian"}
    />,
    <NavigationSidebar
      key={2}
      href={"/dashboard/rapor?semester=1"}
      icon={<BookCheck />}
      title={"Hasil Belajarmu"}
    />,
    // <NavigationSidebar
    //   key={2}
    //   href={""}
    //   icon={<BookCheck />}
    //   title={"Hasil Belajarmu"}
    //   multiLevel={true}
    //   level={[
    //     {
    //       href: "/dashboard/rapor/10",
    //       title: "Kelas 10",
    //     },
    //     {
    //       href: "/dashboard/rapor/11",
    //       title: "Kelas 11",
    //     },
    //     {
    //       href: "/dashboard/rapor/12",
    //       title: "Kelas 12",
    //     },
    //   ]}
    // />,
  ];

  const sidebarGuru = [
    <NavigationSidebar
      key={1}
      href={"/dashboard"}
      icon={<BarChart3 />}
      title={"Grafik Kelas"}
    />,
    <NavigationSidebar
      key={2}
      href={"/dashboard/rapor/create"}
      icon={<BookCheck />}
      title={"Buat Laporan Nilai"}
    />,
  ];

  const sidebarAdmin = [
    <NavigationSidebar
      key={1}
      href={"/dashboard"}
      icon={<HomeIcon />}
      title={"Beranda"}
    />,
    <NavigationSidebar
      key={2}
      href={""}
      icon={<GraduationCap />}
      title={"Kelola Siswa"}
      multiLevel={true}
      level={[
        {
          href: "/dashboard/student",
          title: "Lihat semua siswa",
        },
        {
          href: "/dashboard/student/create",
          title: "Tambah data siswa",
        },
      ]}
    />,
    <NavigationSidebar
      key={3}
      href={""}
      icon={<School2 />}
      title={"Kelola Guru"}
      multiLevel={true}
      level={[
        {
          href: "/dashboard/teacher",
          title: "Lihat semua guru",
        },
        {
          href: "/dashboard/teacher/create",
          title: "Tambah data guru",
        },
      ]}
    />,
    <NavigationSidebar
      key={5}
      href={""}
      icon={<School />}
      title={"Kelola Jurusan"}
      multiLevel={true}
      level={[
        {
          href: "/dashboard/major",
          title: "Lihat semua jurusan",
        },
        {
          href: "/dashboard/major/create",
          title: "Tambah data jurusan",
        },
      ]}
    />,
    <NavigationSidebar
      key={6}
      href={""}
      icon={<School />}
      title={"Kelola Kelas"}
      multiLevel={true}
      level={[
        {
          href: "/dashboard/classname",
          title: "Lihat semua kelas",
        },
        {
          href: "/dashboard/classname/create",
          title: "Tambah data kelas",
        },
      ]}
    />,
    <NavigationSidebar
      key={7}
      href={""}
      icon={<School />}
      title={"Kelola Mata Pelajaran"}
      multiLevel={true}
      level={[
        {
          href: "/dashboard/subject",
          title: "Lihat mata pelajaran",
        },
        {
          href: "/dashboard/subject/create",
          title: "Tambah mata pelajaran",
        },
      ]}
    />,
  ];

  const SIDEBAR = {
    siswa: sidebarSiswa,
    guru: sidebarGuru,
    admin: sidebarAdmin,
  };

  return (
    <div className={`${style}`}>
      <ProfileSidebar />
      <hr />
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2 overflow-y-auto max-h-[330px] scrollbar-hide">
          {SIDEBAR[level]}
        </div>
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
