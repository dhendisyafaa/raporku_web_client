import LoadingOval from "@/components/common/LoadingOval";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDeleteMajor } from "@/pages/api/resolver/majorResolver";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const FormDeleteMajor = ({ major, idMajor }) => {
  const [loadingButton, setloadingButton] = useState(false);
  const { mutateAsync: deleteMajorData } = useDeleteMajor();
  const [notSame, setNotSame] = useState(false);

  const formSchema = z.object({
    confirm: z.string().min(2, {
      message: `Wajib untuk diisi jika ingin menghapus data`,
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirm: "",
    },
  });

  const onSubmit = async (values) => {
    setloadingButton(true);
    try {
      {
        values.confirm === major
          ? await deleteMajorData(idMajor)
          : setNotSame(true);
      }
      setloadingButton(false);
    } catch (error) {
      setloadingButton(false);
      console.log("error catch", error);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                {notSame && (
                  <p className="text-sm font-medium text-destructive">
                    Isi tidak sama dengan nama jurusan
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-end">
            {/* <button type="submit">test</button> */}
            <Button
              type="submit"
              variant="destructive"
              disabled={loadingButton}
              className="flex gap-3 w-full"
            >
              {loadingButton && <LoadingOval />}
              Hapus {`${major}`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormDeleteMajor;
