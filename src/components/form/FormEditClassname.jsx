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
import { useUpdateClassname } from "@/pages/api/resolver/classnameResolver";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const FormEditClassname = ({ infoClassname }) => {
  console.log(
    "🚀 ~ file: FormEditClassname.jsx:21 ~ FormEditClassname ~ infoClassname:",
    infoClassname
  );
  const [loadingButton, setloadingButton] = useState(false);
  const { toast } = useToast();
  const { mutateAsync: updateClassname } = useUpdateClassname();

  const formSchema = z.object({
    classname: z.string().min(2, {
      message: "Nama kelas wajib untuk diisi",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      classname: `${infoClassname.classname}`,
    },
  });

  const onSubmit = async (values) => {
    setloadingButton(true);
    try {
      await updateClassname([
        { id: infoClassname.id_classname },
        {
          data: {
            nama_kelas: values.classname || infoClassname.classname,
            id_jurusan: infoClassname.id_jurusan,
          },
        },
      ]);
      setloadingButton(false);
      toast({
        title: "Berhasil menyimpan perubahan",
      });
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
        <p className="font-semibold text-lg">Edit kelas</p>
        <p className="text-foreground">
          Buat perubahan pada kelas <span>{infoClassname.classname}</span>.
        </p>
      </div>
      <Toaster />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-3 p-3">
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
            <div className="flex w-full">
              <Button
                type="submit"
                disabled={loadingButton}
                className="flex gap-3 w-full"
              >
                {loadingButton && <LoadingOval />}
                Simpan Perubahan
              </Button>
            </div>
          </div>
          <p className="text-foreground text-center text-xs mt-4">
            Pastikan data yang dimasukkan sudah sesuai.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default FormEditClassname;
