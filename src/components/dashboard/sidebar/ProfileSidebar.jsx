import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const ProfileSidebar = () => {
  return (
    <div className="flex justify-center items-center flex-col h-[30vh] lg:h-[40vh]">
      <div className="relative">
        <Avatar className="w-20 h-20">
          <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Badge className="absolute bottom-0 right-0 text-[10px] border-2 border-white">
          Siswa
        </Badge>
      </div>
      <div className="text-center">
        <div className="my-2">
          <p className="font-bold text-sm">Dhendi Syafa Athallah Putra</p>
          <p className="font-medium text-xs">0120301340</p>
        </div>
        <Badge>XII RPL 1</Badge>
      </div>
    </div>
  );
};

export default ProfileSidebar;
