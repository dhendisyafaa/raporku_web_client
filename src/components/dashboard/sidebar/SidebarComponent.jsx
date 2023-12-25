import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { baseUrlWeb } from "@/configs/config";
import useUserData from "@/hooks/useUserData";
import {
  BarChart3,
  BookCheck,
  CalendarDays,
  GraduationCap,
  HomeIcon,
  LogOut,
  School,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { memo } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GiBookPile } from "react-icons/gi";
import { SiGoogleclassroom } from "react-icons/si";
import NavigationSidebar from "./NavigationSidebar";
import ProfileSidebar from "./ProfileSidebar";

const SidebarComponent = ({
  style = "bg-white w-[350px] h-full shadow p-3 hidden lg:flex flex-col gap-5",
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
      icon={<FaChalkboardTeacher className="w-6 h-6" />}
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
      icon={<SiGoogleclassroom className="w-6 h-6" />}
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
      icon={<GiBookPile className="w-6 h-6" />}
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
    <NavigationSidebar
      key={8}
      href={""}
      icon={<CalendarDays className="w-6 h-6" />}
      title={"Kelola Tahun Ajaran"}
      multiLevel={true}
      level={[
        {
          href: "/dashboard/school_year",
          title: "Lihat tahun ajaran",
        },
        {
          href: "/dashboard/school_year/create",
          title: "Tambah tahun ajaran",
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
          <AlertDialog>
            <AlertDialogTrigger className="w-full h-[40px] rounded-lg flex gap-3 items-center p-3 cursor-pointer">
              <LogOut />
              <p className="text-sm">Keluar</p>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Yakin ingin keluar dari dashboard?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Untuk mengakses halaman dashboard ini, Anda harus melakukan
                  login kembali
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    signOut({
                      callbackUrl: baseUrlWeb,
                    })
                  }
                >
                  Keluar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default memo(SidebarComponent);
