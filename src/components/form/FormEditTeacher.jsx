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
import { useUpdateteacher } from "@/pages/api/resolver/teacherResolver";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FormEditAvatar from "./FormEditAvatar";
import { useUpdateTeacher } from "@/pages/api/resolver/teacherResolver";

const FormEditTeacher = ({ teacher }) => {
  const [loadingButton, setloadingButton] = useState(false);
  const { toast } = useToast();
  const { mutateAsync: updateTeacherData } = useUpdateTeacher();
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
    pendidikan_tertinggi: z.string().min(0, {
      message: "Pendidikan tertinggi wajib untuk diisi",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_lengkap: `${teacher.nama_lengkap}`,
      nip: `${teacher.nip}`,
      email: `${teacher.email}`,
      tempat_lahir: `${teacher.tempat_lahir}`,
      tanggal_lahir: `${teacher.tanggal_lahir}`,
      jenis_kelamin: `${teacher.jenis_kelamin}`,
      alamat: `${teacher.alamat}`,
      no_telepon: `${teacher.no_telepon}`,
      pendidikan_tertinggi: `${teacher.pendidikan_tertinggi}`,
    },
  });

  const onSubmit = async (values) => {
    setloadingButton(true);
    try {
      await updateTeacherData([
        { id: teacher.id_guru },
        {
          data: {
            nama_lengkap: values.nama_lengkap || teacher.nama_lengkap,
            nip: teacher.nip,
            tanggal_lahir: values.tanggal_lahir || teacher.tanggal_lahir,
            alamat: values.alamat || teacher.alamat,
            jenis_kelamin: teacher.jenis_kelamin,
            no_telepon: values.no_telepon || teacher.no_telepon,
            tempat_lahir: values.tempat_lahir || teacher.tempat_lahir,
            id_kelas: teacher.id_kelas,
            pendidikan_tertinggi:
              values.pendidikan_tertinggi || teacher.pendidikan_tertinggi,
          },
        },
      ]);
      setloadingButton(false);
      toast({
        title: "Berhasil menyimpan perubahan",
      });
      push("/dashboard/teacher");
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
          Buat perubahan pada data <span>{teacher.nama_lengkap}</span>.
        </p>
      </div>
      <Toaster />
      <FormEditAvatar
        image={teacher?.avatar}
        username={teacher?.nama_lengkap}
        idUser={teacher?.id_guru}
        levelUser="guru"
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
              name="nip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIP</FormLabel>
                  <FormControl>
                    <Input type="number" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Guru</FormLabel>
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
                    <Input type="text" disabled {...field} />
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
              name="pendidikan_tertinggi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pendidikan Tertinggi</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
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

export default FormEditTeacher;
