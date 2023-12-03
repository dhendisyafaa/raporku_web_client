import LoadingOval from "@/components/common/LoadingOval";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import useUserData from "@/hooks/useUserData";
import { useCreateRapor } from "@/pages/api/resolver/raporResolver";
import { useStudentById } from "@/pages/api/resolver/studentResolver";
import { useAllSubject } from "@/pages/api/resolver/subjectResolver";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const CreateRapor = () => {
  const [loadingButton, setloadingButton] = useState(false);
  const [nilaiMataPelajaran, setNilaiMataPelajaran] = useState([]);
  const { toast } = useToast();
  const { query, push } = useRouter();
  const { data: student, isLoading } = useStudentById(query.idSiswa);
  const { data: subjects, isLoading: loadSubjects } = useAllSubject();
  const { userId } = useUserData();
  const detailStudent = student?.data;
  const subject = subjects?.data;
  const { mutateAsync: createRapor } = useCreateRapor();

  const handleInputChange = (idMataPelajaran, type, value) => {
    const index = nilaiMataPelajaran.findIndex(
      (item) => item.id_mata_pelajaran === idMataPelajaran
    );

    if (index !== -1) {
      const updatedItem = { ...nilaiMataPelajaran[index], [type]: value };
      const updatedArray = [...nilaiMataPelajaran];
      updatedArray[index] = updatedItem;
      setNilaiMataPelajaran(updatedArray);
    } else {
      // Jika mata pelajaran belum ada dalam nilaiMataPelajaran, tambahkan mata pelajaran baru
      setNilaiMataPelajaran((prev) => [
        ...prev,
        {
          id_mata_pelajaran: idMataPelajaran,
          nilai_harian: type === "dailyGrade" ? value : "",
          nilai_semester: type === "semesterGrade" ? value : "",
        },
      ]);
    }
  };

  const renderTableRow = () => {
    return subject?.map((item) => (
      <TableRow key={item.id_mata_pelajaran}>
        <TableCell className="font-medium">{item.nama_pelajaran}</TableCell>
        <TableCell>
          <Input
            type="number"
            onChange={(e) =>
              handleInputChange(
                item.id_mata_pelajaran,
                "nilai_harian",
                e.target.value
              )
            }
          />
        </TableCell>
        <TableCell>
          <Input
            type="number"
            onChange={(e) =>
              handleInputChange(
                item.id_mata_pelajaran,
                "nilai_semester",
                e.target.value
              )
            }
          />
        </TableCell>
      </TableRow>
    ));
  };

  const formSchema = z.object({
    nama_semester: z.enum(["1", "2", "3", "4", "5", "6"]),
    kode_tahun_ajaran: z.string().min(2, {
      message: "Tahun ajaran wajib untuk diisi",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kode_tahun_ajaran: "",
    },
  });

  const onSubmit = async (values) => {
    setloadingButton(true);
    try {
      const data = {
        id_siswa: detailStudent.id_siswa,
        id_guru: userId,
        id_kelas: detailStudent.id_kelas,
        nama_semester: values.nama_semester,
        kode_tahun_ajaran: values.kode_tahun_ajaran,
        nilai_mata_pelajaran: nilaiMataPelajaran,
      };
      await createRapor(data);
      setloadingButton(false);
      toast({
        title: "Berhasil membuat rapor",
      });
      push("/dashboard/rapor/create");
    } catch (error) {
      setloadingButton(false);
      console.log("error catch", error);
      if (error.response) {
        toast({
          variant: "destructive",
          title: "Gagal membuat rapor",
        });
      }
    }
  };

  if (isLoading) return <p className="text-5xl">load...</p>;

  return (
    <DashboardLayout titleHeader={"test"} messageHeader={"test"}>
      <Toaster />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid lg:flex items-center grid-cols-1 gap-4 p-3">
            <Avatar className="w-20 h-20 border-primary border-2">
              <AvatarImage
                className="object-cover"
                alt={`avatar from @${detailStudent?.nama_lengkap}`}
                src={detailStudent?.avatar}
              />
              <AvatarFallback>{detailStudent?.nama_lengkap}</AvatarFallback>
            </Avatar>
            <div className="grid grid-cols-2 w-full gap-3 items-center">
              <div className="space-y-3">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="fullname">Nama lengkap</Label>
                  <Input value={`${detailStudent?.nama_lengkap}`} disabled />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="fullname">NIS / NISN</Label>
                  <Input
                    value={`${detailStudent?.nis} / ${detailStudent?.nisn}`}
                    disabled
                  />
                </div>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="nama_semester"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Semester</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih semester" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="6">6</SelectItem>
                          </SelectContent>
                        </Select>
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
                      <FormLabel>Tahun ajaran</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Mata Pelajaran</TableHead>
                <TableHead>Nilai Harian</TableHead>
                <TableHead>Nilai Semester</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{renderTableRow()}</TableBody>
          </Table>
          <div className="flex w-full justify-end">
            <Button
              type="submit"
              disabled={loadingButton}
              className="flex gap-3 w-full md:max-w-fit"
            >
              {loadingButton && <LoadingOval />}
              Upload rapor
            </Button>
          </div>
        </form>
      </Form>
    </DashboardLayout>
  );
};

export default CreateRapor;
