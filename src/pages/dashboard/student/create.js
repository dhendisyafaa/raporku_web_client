import LoadingComponent from "@/components/common/LoadingComponent";
import LoadingOval from "@/components/common/LoadingOval";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useAllClassname } from "@/pages/api/resolver/classnameResolver";
import { useCreateStudent } from "@/pages/api/resolver/studentResolver";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const CreateStudent = () => {
  const [loadingButton, setloadingButton] = useState(false);
  const { toast } = useToast();
  const { mutateAsync: createStudentData } = useCreateStudent();
  const { data: classnames, isLoading } = useAllClassname();
  const { push } = useRouter();

  const renderClassname = () => {
    if (isLoading) return <LoadingComponent />;
    return classnames?.data.map((classname) => (
      <SelectItem key={classname.id_kelas} value={`${classname.id_kelas}`}>
        {classname.nama_kelas}
      </SelectItem>
    ));
  };

  const formSchema = z.object({
    nama_lengkap: z.string().min(2, {
      message: "Nama wajib untuk diisi",
    }),
    tempat_lahir: z.string().min(2, {
      message: "Tempat lahir wajib untuk diisi",
    }),
    jenis_kelamin: z.enum(["L", "P"]),
    tanggal_lahir: z.string().min(2, {
      message: "Tempat lahir wajib untuk diisi",
    }),
    id_kelas: z.string().min(1, {
      message: "Pilih kelas terlebih dahulu",
    }),
    nis: z.string().min(2, {
      message: "NIS wajib untuk diisi",
    }),
    nisn: z.string().min(2, {
      message: "NISN wajib untuk diisi",
    }),
    alamat: z.string().min(2, {
      message: "Alamat wajib untuk diisi",
    }),
    no_telepon: z.string().min(2, {
      message: "Nomor telepon wajib untuk diisi",
    }),
    nama_ibu: z.string().min(2, {
      message: "Nama ibu wajib untuk diisi",
    }),
    nama_ayah: z.string().min(2, {
      message: "Nama ayah wajib untuk diisi",
    }),
    tahun_masuk: z.string().min(2, {
      message: "Tahun masuk wajib untuk diisi",
    }),
    kode_tahun_ajaran: z.string().min(2, {
      message: "Tahun ajaran wajib untuk diisi",
    }),
    tahun_lulus: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_lengkap: "",
      nis: "",
      nisn: "",
      id_kelas: "",
      jenis_kelamin: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      alamat: "",
      no_telepon: "",
      nama_ibu: "",
      nama_ayah: "",
      tahun_masuk: "",
      tahun_lulus: "",
      kode_tahun_ajaran: "",
    },
  });

  const onSubmit = async (values) => {
    setloadingButton(true);
    try {
      const data = {
        nis: values.nis,
        nisn: values.nisn,
        nama_lengkap: values.nama_lengkap,
        tanggal_lahir: values.tanggal_lahir,
        alamat: values.alamat,
        jenis_kelamin: values.jenis_kelamin,
        no_telepon: values.no_telepon,
        tempat_lahir: values.tempat_lahir,
        nama_ayah: values.nama_ayah,
        nama_ibu: values.nama_ibu,
        tahun_masuk: values.tahun_masuk,
        tahun_lulus: values.tahun_lulus,
        id_kelas: values.id_kelas,
        kode_tahun_ajaran: values.kode_tahun_ajaran,
      };
      await createStudentData(data);
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
          title: `${
            error.response?.data?.error || error.response?.data?.errors[0].error
          }`,
        });
      }
    }
  };

  return (
    <DashboardLayout
      titleHeader={"Tambah data siswa"}
      messageHeader={"Pastikan data yang dimasukkan telah sesuai"}
    >
      <div className="flex w-full justify-around flex-col">
        <Toaster />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="my-4 text-foreground font-semibold">
              Informasi pribadi
              <hr />
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-3">
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
                name="jenis_kelamin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="L/P" {...field} />
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
            </div>
            <div className="my-4 text-foreground font-semibold">
              Informasi sekolah
              <hr />
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-3">
              <FormField
                control={form.control}
                name="nis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIS</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
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
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="id_kelas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kelas</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kelas" />
                        </SelectTrigger>
                        <SelectContent>{renderClassname()}</SelectContent>
                      </Select>
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
              <FormField
                control={form.control}
                name="kode_tahun_ajaran"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun Ajaran</FormLabel>
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
            <p className="text-foreground text-center text-xs mt-4">
              <span className="text-red-600">*</span>
              Terdapat beberapa bagian yang tidak dapat diubah kembali
            </p>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default CreateStudent;
