import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useRouter } from "next/router";

import ThreeDotsLoading from "@/components/common/ThreeDotsLoading";
import FormDeleteStudent from "@/components/form/FormDeleteStudent";
import FormEditStudent from "@/components/form/FormEditStudent";
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
import { useStudentById } from "@/pages/api/resolver/studentResolver";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";

const DetailStudent = () => {
  const router = useRouter();
  const studentId = router.query.id;
  return (
    <DashboardLayout>
      <ProfileForm studentId={studentId} />
    </DashboardLayout>
  );
};

const ProfileForm = ({ studentId }) => {
  const { data: students, isSuccess } = useStudentById(studentId);
  const student = students?.data;
  const { push } = useRouter();

  if (!isSuccess) return <ThreeDotsLoading />;
  return (
    <div>
      <div className="grid lg:flex items-center grid-cols-1 gap-4 p-3">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="w-20 h-20 border-primary border-2">
            <AvatarImage
              className="object-cover"
              alt={`avatar from @${student?.nama_lengkap}`}
              src={student?.avatar}
            />
            <AvatarFallback>{student?.nama_lengkap}</AvatarFallback>
          </Avatar>
          <Badge>{student?.kelas.nama_kelas}</Badge>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="fullname">Nama lengkap</Label>
              <Input
                id="fullname"
                value={`${student?.nama_lengkap}`}
                disabled
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="phone">Nomor telepon</Label>
              <Input id="phone" value={`${student?.no_telepon}`} disabled />
            </div>
          </div>
          <div className="space-y-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="gender">Jenis Kelamin</Label>
              <Input id="gender" value={`${student?.jenis_kelamin}`} disabled />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="gender">NIS / NISN</Label>
              <Input
                id="gender"
                value={`${student?.nis} / ${student?.nisn}`}
                disabled
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="year">Tahun masuk / keluar</Label>
              <Input
                id="year"
                value={`${student?.tahun_masuk} / ${student?.tahun_lulus}`}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Tempat dan tanggal lahir</AccordionTrigger>
            <AccordionContent>
              {`${student?.tempat_lahir} / ${student?.tanggal_lahir}`}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Alamat</AccordionTrigger>
            <AccordionContent>{`${student?.alamat}`}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Nama ibu</AccordionTrigger>
            <AccordionContent>{`${student?.nama_ibu}`}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>Nama ayah</AccordionTrigger>
            <AccordionContent>{`${student?.nama_ayah}`}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="space-y-5 mt-5">
        <div className="p-5 border border-input rounded-xl flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Update Data Siswa</h3>
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
            <DialogContent className="h-[95vh] max-w-4xl overflow-y-auto">
              <FormEditStudent student={student} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="p-5 border border-destructive rounded-xl flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Hapus Data Siswa</h3>
            <p className="text-sm text-muted-foreground">
              Anda dapat menghapus data dari siswa
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
                  Hapus data {`${student.nama_lengkap}`} ?
                </DialogTitle>
                <DialogDescription>
                  Untuk melanjutkan, ketik &quot;
                  <span>{`${student.nama_lengkap}`}</span>
                  &quot; dalam kotak dibawah
                </DialogDescription>
                <FormDeleteStudent
                  namaLengkap={student?.nama_lengkap}
                  idSiswa={studentId}
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default DetailStudent;
