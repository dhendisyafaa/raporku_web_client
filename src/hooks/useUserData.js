import { useUserById } from "@/pages/api/resolver/userResolver";
import { useSession } from "next-auth/react";

const useUserData = () => {
  const { data: session } = useSession();
  const level = session?.user.level;
  const userId = session?.user.userId;
  const { data: user, isLoading } = useUserById(level, userId);
  const userData = user?.data;
  const gender = userData?.jenis_kelamin;
  const username = userData?.nama_lengkap;
  return { userData, isLoading, level, userId, gender, username };
};

export default useUserData;
