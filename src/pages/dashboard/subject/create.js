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
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useCreateSubject } from "@/pages/api/resolver/subjectResolver";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const CreateSubject = () => {
  const [loadingButton, setloadingButton] = useState(false);
  const { toast } = useToast();
  const { mutateAsync: createSubject } = useCreateSubject();

  const formSchema = z.object({
    code_subject: z.string().min(1, {
      message: "Kode mata pelajaran wajib untuk diisi",
    }),
    subject: z.string().min(2, {
      message: "Nama mata pelajaran wajib untuk diisi",
    }),
    weight_subject: z.string().min(1, {
      message: "Bobot mata pelajaran wajib untuk diisi",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code_subject: "",
      subject: "",
      weight_subject: "",
    },
  });

  const onSubmit = async (values) => {
    setloadingButton(true);
    try {
      await createSubject({
        kode_pelajaran: values.code_subject,
        nama_pelajaran: values.subject,
        bobot_nilai: values.weight_subject,
      });
      setloadingButton(false);
      toast({
        title: "Berhasil membuat mata pelajaran",
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
                name="code_subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode Mata Pelajaran</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Mata Pelajaran</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight_subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bobot Mata Pelajaran</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end w-full">
              <Button
                type="submit"
                disabled={loadingButton}
                className="flex gap-3 w-full md:max-w-fit"
              >
                {loadingButton && <LoadingOval />}
                Buat Mata Pelajaran
              </Button>
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

export default CreateSubject;
