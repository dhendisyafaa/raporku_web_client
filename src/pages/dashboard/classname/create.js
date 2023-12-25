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
import { useCreateClassname } from "@/pages/api/resolver/classnameResolver";
import { useAllMajor } from "@/pages/api/resolver/majorResolver";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const CreateMajor = () => {
  const [loadingButton, setloadingButton] = useState(false);
  const { data: majors, isLoading } = useAllMajor();
  const { toast } = useToast();
  const { mutateAsync: createClassname } = useCreateClassname();

  const renderMajor = () => {
    if (isLoading) return <LoadingComponent />;
    return majors?.data.map((major) => (
      <SelectItem key={major.id_jurusan} value={`${major.id_jurusan}`}>
        {major.nama_jurusan}
      </SelectItem>
    ));
  };

  const formSchema = z.object({
    classname: z.string().min(2, {
      message: "Nama kelas wajib untuk diisi",
    }),
    id_jurusan: z.string().min(1, {
      message: "Pilih jurusan terlebih dahulu",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      classname: "",
      id_jurusan: "",
    },
  });

  const onSubmit = async (values) => {
    setloadingButton(true);
    try {
      await createClassname({
        nama_kelas: values.classname,
        id_jurusan: values.id_jurusan,
      });
      setloadingButton(false);
      toast({
        title: "Berhasil membuat kelas",
      });
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
      messageHeader={"Tambahkan nama kelas baru"}
      titleHeader={"Buat data kelas"}
    >
      <div className="flex w-full justify-around flex-col">
        <Toaster />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 items-end gap-4 p-3">
              <FormField
                control={form.control}
                name="classname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Kelas</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="id_jurusan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Jurusan</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Jurusan" />
                        </SelectTrigger>
                        <SelectContent>{renderMajor()}</SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full">
                <Button
                  type="submit"
                  disabled={loadingButton}
                  className="flex gap-3 w-full md:max-w-fit"
                >
                  {loadingButton && <LoadingOval />}
                  Buat Kelas
                </Button>
              </div>
            </div>
            <p className="text-foreground text-center text-xs mt-4">
              Pastikan data yang dimasukkan sudah sesuai.
            </p>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default CreateMajor;
