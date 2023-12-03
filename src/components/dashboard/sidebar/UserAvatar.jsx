import FormEditAvatar from "@/components/form/FormEditAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaEdit } from "react-icons/fa";

const UserAvatar = ({ data }) => {
  const userData = data?.userData;

  return (
    <div className="relative">
      <div className="relative group">
        {userData?.level !== "admin" && (
          <Dialog>
            <DialogTrigger>
              <div className="absolute bottom-0 left-0 group-hover:visible invisible transition-all rounded-full z-10 w-20 h-20 backdrop-blur-sm backdrop-brightness-75 grid place-items-center border-primary border-2 text-white cursor-pointer">
                <FaEdit />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-3">Ubah Foto Profile</DialogTitle>
                <DialogDescription>
                  <FormEditAvatar
                    image={userData?.avatar}
                    username={data?.username}
                    idUser={data?.userId}
                    levelUser={data?.level}
                  />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
        <Avatar className="w-20 h-20 border-primary border-2">
          <AvatarImage
            className="object-cover"
            alt={`avatar from @${userData?.nama_lengkap}`}
            src={data?.level !== "admin" ? userData?.avatar : "/images/ava.png"}
          />
          <AvatarFallback>{userData?.nama_lengkap || "admin"}</AvatarFallback>
        </Avatar>
      </div>
      <Badge className="absolute bottom-0 right-0 text-[10px] border-2 border-white z-50">
        {data?.level}
      </Badge>
    </div>
  );
};

export default UserAvatar;
