import LoadingOval from "@/components/common/LoadingOval";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateStudent } from "@/pages/api/resolver/studentResolver";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FormEditAvatar from "./FormEditAvatar";

const FormEditStudent = ({ student }) => {
  const [loadingButton, setloadingButton] = useState(false);
  const { toast } = useToast();
  const { mutateAsync: updateStudentData } = useUpdateStudent();
  const { push } = useRouter();

  const formSchema = z.object({
    nama_lengkap: z.string().min(2, {
      message: "Nama wajib untuk diisi",
    }),
    tempat_lahir: z.string().min(2, {
      message: "Tempat lahir wajib untuk diisi",
    }),
    tanggal_lahir: z.string(),
    alamat: z.string().min(0, {
      message: "Alamat wajib untuk diisi",
    }),
    no_telepon: z.string().min(0, {
      message: "Nomor telepon wajib untuk diisi",
    }),
    nama_ibu: z.string().min(0, {
      message: "Nama ibu wajib untuk diisi",
    }),
    nama_ayah: z.string().min(0, {
      message: "Nama ayah wajib untuk diisi",
    }),
    tahun_masuk: z.string().min(0, {
      message: "Tahun masuk wajib untuk diisi",
    }),
    tahun_lulus: z.string().min(0, {
      message: "Tahun lulus wajib untuk diisi",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_lengkap: `${student.nama_lengkap}`,
      nis: `${student.nis}`,
      nisn: `${student.nisn}`,
      nama_kelas: `${student.kelas.nama_kelas}`,
      jenis_kelamin: `${student.jenis_kelamin}`,
      tempat_lahir: `${student.tempat_lahir}`,
      tanggal_lahir: `${student.tanggal_lahir}`,
      alamat: `${student.alamat}`,
      no_telepon: `${student.no_telepon}`,
      nama_ibu: `${student.nama_ibu}`,
      nama_ayah: `${student.nama_ayah}`,
      tahun_masuk: `${student.tahun_masuk}`,
      tahun_lulus: `${student.tahun_lulus}`,
    },
  });

  const onSubmit = async (values) => {
    setloadingButton(true);
    try {
      await updateStudentData([
        { id: student.id_siswa },
        {
          data: {
            nama_lengkap: values.nama_lengkap || student.nama_lengkap,
            nis: student.nis,
            nisn: student.nisn,
            tanggal_lahir: values.tanggal_lahir || student.tanggal_lahir,
            alamat: values.alamat || student.alamat,
            jenis_kelamin: student.jenis_kelamin,
            no_telepon: values.no_telepon || student.no_telepon,
            tempat_lahir: values.tempat_lahir || student.tempat_lahir,
            nama_ayah: values.nama_ayah || student.nama_ayah,
            nama_ibu: values.nama_ibu || student.nama_ibu,
            tahun_masuk: values.tahun_masuk || student.tahun_masuk,
            tahun_lulus: values.tahun_lulus,
            id_kelas: student.id_kelas,
          },
        },
      ]);
      setloadingButton(false);
      toast({
        title: "Berhasil menyimpan perubahan",
      });
      push("/dashboard/student");
    } catch (error) {
      setloadingButton(false);
      console.log("error catch", error);
      if (error.response) {
        toast({
          variant: "destructive",
          title: "Gagal melakukan perubahan",
        });
      }
    }
  };

  return (
    <div className="flex w-full justify-around flex-col">
      <div>
        <p className="font-semibold text-lg">Edit profile</p>
        <p className="text-foreground">
          Buat perubahan pada data <span>{student.nama_lengkap}</span>.
        </p>
      </div>
      <Toaster />
      <FormEditAvatar
        image={student?.avatar}
        username={student?.nama_lengkap}
        idUser={student?.id_siswa}
        levelUser="siswa"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 py-4">
            <FormField
              control={form.control}
              name="nama_lengkap"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIS</FormLabel>
                  <FormControl>
                    <Input type="number" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nisn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NISN</FormLabel>
                  <FormControl>
                    <Input type="number" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nama_kelas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kelas</FormLabel>
                  <FormControl>
                    <Input type="text" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jenis_kelamin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="L/P" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tempat_lahir"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempat Lahir</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tanggal_lahir"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="no_telepon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telepon</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nama_ibu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Ibu</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nama_ayah"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Ayah</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tahun_masuk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tahun Masuk</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tahun_lulus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tahun Lulus</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full justify-end">
            <Button
              type="submit"
              disabled={loadingButton}
              className="flex gap-3 w-full md:max-w-fit"
            >
              {loadingButton && <LoadingOval />}
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormEditStudent;
