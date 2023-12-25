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
import { useCreateMajor } from "@/pages/api/resolver/majorResolver";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const CreateMajor = () => {
  const [loadingButton, setloadingButton] = useState(false);
  const { toast } = useToast();
  const { mutateAsync: createMajorData } = useCreateMajor();

  const formSchema = z.object({
    major: z.string().min(2, {
      message: "Nama jurusan wajib untuk diisi",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      major: "",
    },
  });

  const onSubmit = async (values) => {
    setloadingButton(true);
    try {
      await createMajorData({
        nama_jurusan: values.major,
      });
      setloadingButton(false);
      toast({
        title: "Berhasil membuat jurusan",
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
      messageHeader={"Tambahkan nama jurusan baru"}
      titleHeader={"Buat data jurusan"}
    >
      <div className="flex w-full justify-around flex-col">
        <Toaster />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 items-end gap-4 p-3">
              <FormField
                control={form.control}
                name="major"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Jurusan</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
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
                  Buat jurusan
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
