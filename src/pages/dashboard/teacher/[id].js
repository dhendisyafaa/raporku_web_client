import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useRouter } from "next/router";

import LoadingComponent from "@/components/common/LoadingComponent.jsx";
import FormDeleteTeacher from "@/components/form/FormDeleteTeacher";
import FormEditTeacher from "@/components/form/FormEditTeacher";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTeacherById } from "@/pages/api/resolver/teacherResolver";

const DetailTeacher = () => {
  const router = useRouter();
  const teacherId = router.query.id;
  return (
    <DashboardLayout
      titleHeader={`Infomasi detail data guru`}
      messageHeader={"Anda dapat mengubah dan menghapus data guru"}
    >
      <ProfileForm teacherId={teacherId} />
    </DashboardLayout>
  );
};

const ProfileForm = ({ teacherId }) => {
  const { data: teachers, isSuccess } = useTeacherById(teacherId);
  const teacher = teachers?.data;
  const { push } = useRouter();

  if (!isSuccess) return <LoadingComponent />;
  return (
    <div>
      <div className="grid lg:flex items-center grid-cols-1 gap-4 p-3">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="w-20 h-20 border-primary border-2">
            <AvatarImage
              className="object-cover"
              alt={`avatar from @${teacher?.nama_lengkap}`}
              src={teacher?.avatar}
            />
            <AvatarFallback>{teacher?.nama_lengkap}</AvatarFallback>
          </Avatar>
          {teacher?.wali_kelas && (
            <Badge>Wali Kelas {teacher?.wali_kelas?.nama_kelas}</Badge>
          )}
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="fullname">Nama lengkap</Label>
              <Input
                id="fullname"
                value={`${teacher?.nama_lengkap}`}
                disabled
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="gender">NIP</Label>
              <Input id="gender" value={`${teacher?.nip}`} disabled />
            </div>
          </div>
          <div className="space-y-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="gender">Jenis Kelamin</Label>
              <Input id="gender" value={`${teacher?.jenis_kelamin}`} disabled />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="phone">Nomor telepon</Label>
              <Input id="phone" value={`${teacher?.no_telepon}`} disabled />
            </div>
          </div>
          <div className="space-y-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="phone">Pendidikan Tertinggi</Label>
              <Input
                id="phone"
                value={`${teacher?.pendidikan_tertinggi}`}
                disabled
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="phone">Email Guru</Label>
              <Input id="phone" value={`${teacher?.email}`} disabled />
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Tempat dan tanggal lahir</AccordionTrigger>
            <AccordionContent>
              {`${teacher?.tempat_lahir} / ${teacher?.tanggal_lahir}`}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Alamat</AccordionTrigger>
            <AccordionContent>{`${teacher?.alamat}`}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="space-y-5 mt-5">
        <div className="p-5 border border-input rounded-xl flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Update Data Guru</h3>
            <p className="text-sm text-muted-foreground">
              Terdapat beberapa bagian yang tidak dapat diubah
              <span className="text-red-600">*</span>
            </p>
          </div>
          <Dialog>
            <DialogTrigger>
              <Button type="button" variant="outline">
                Update data
              </Button>
            </DialogTrigger>
            <DialogContent className="h-fit max-w-4xl overflow-y-auto">
              <FormEditTeacher teacher={teacher} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="p-5 border border-destructive rounded-xl flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Hapus Data Guru</h3>
            <p className="text-sm text-muted-foreground">
              Anda dapat menghapus data dari guru ini
            </p>
          </div>
          <Dialog>
            <DialogTrigger>
              <Button type="button" variant="destructive">
                Hapus data
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  Hapus guru {`${teacher.nama_lengkap}`} ?
                </DialogTitle>
                <DialogDescription>
                  Untuk melanjutkan, ketik &quot;
                  <span>{`${teacher.nama_lengkap}`}</span>
                  &quot; dalam kotak dibawah
                </DialogDescription>
                <FormDeleteTeacher
                  namaLengkap={teacher?.nama_lengkap}
                  idTeacher={teacherId}
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default DetailTeacher;
