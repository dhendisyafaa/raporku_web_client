import SkeletonProfile from "@/components/skeleton/SkeletonProfile";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useUserData from "@/hooks/useUserData";
import UserAvatar from "./UserAvatar";

const ProfileSidebar = () => {
  const { isLoading, userData, level, username, userId } = useUserData();

  if (isLoading) return <SkeletonProfile />;

  return (
    <div className="flex justify-center items-center flex-col h-[30vh] lg:h-[40vh]">
      <UserAvatar
        data={{
          userData,
          level,
          username,
          userId,
        }}
      />
      <div className="text-center">
        <div className="my-2">
          {level !== "admin" ? (
            <>
              <p className="font-bold text-sm">{userData?.nama_lengkap}</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <p className="font-medium text-xs">
                      {level === "siswa"
                        ? `${userData?.nis}`
                        : `${userData?.nip}`}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{level === "siswa" ? "NIS" : "NIP"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          ) : (
            <p className="py-1 px-3 bg-gradient-to-r from-red-400 via-primary to-purple-500 text-white font-semibold text-xs rounded-lg">
              DASHBOARD ADMIN
            </p>
          )}
        </div>
        {level === "siswa" && <Badge>{userData?.kelas.nama_kelas}</Badge>}
        {level === "guru" && (
          <Badge>{`Wali kelas ${userData?.wali_kelas.nama_kelas}`}</Badge>
        )}
      </div>
    </div>
  );
};

export default ProfileSidebar;
