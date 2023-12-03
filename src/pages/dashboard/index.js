import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ContentDashboardAdmin from "@/components/dashboard/content/ContentDashboardAdmin";
import ContentDashboardGuru from "@/components/dashboard/content/ContentDashboardGuru";
import ContentDashboardSiswa from "@/components/dashboard/content/ContentDashboardSiswa";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { getUserById } from "../api/services/userApi";
import { useUserStateFunction } from "@/constate/provider/useUserProfile";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserById } from "../api/resolver/userResolver";
import ThreeDotsLoading from "@/components/common/ThreeDotsLoading";
import useUserData from "@/hooks/useUserData";

const DashboardPage = () => {
  const { isLoading, level, gender, username } = useUserData();

  const content = {
    siswa: <ContentDashboardSiswa />,
    guru: <ContentDashboardGuru />,
    admin: <ContentDashboardAdmin />,
  };

  if (isLoading)
    return (
      <div className="w-full h-screen">
        <ThreeDotsLoading />
      </div>
    );

  let sayHai;
  if (level === "siswa") {
    sayHai = gender === "L" ? "Kang" : "Teh";
  } else if (level === "guru") {
    sayHai = gender === "L" ? "Pak" : "Bu";
  } else {
    sayHai = "admin";
  }

  return (
    <DashboardLayout
      titleHeader={"Dashboard Raporku"}
      messageHeader={`Selamat datang ${sayHai} ${
        level !== "admin" ? username : ""
      }`}
    >
      {content[level]}
    </DashboardLayout>
  );
};

export default DashboardPage;
