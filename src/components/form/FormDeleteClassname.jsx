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
import { useDeleteClassname } from "@/pages/api/resolver/classnameResolver";
import { useDeleteMajor } from "@/pages/api/resolver/majorResolver";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const FormDeleteClassname = ({ infoClassname }) => {
  const [loadingButton, setloadingButton] = useState(false);
  const { mutateAsync: deleteClassname } = useDeleteClassname();
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
    console.log("test", values.confirm === infoClassname.classname);
    if (values.confirm !== infoClassname.classname) {
      setNotSame(true);
    } else if (values.confirm === infoClassname.classname) {
      setloadingButton(true);
      try {
        await deleteClassname(infoClassname.id_classname);
        setloadingButton(false);
      } catch (error) {
        setloadingButton(false);
        console.log("error catch", error);
      }
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
                    Isi tidak sama dengan nama kelas
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-end">
            <Button
              type="submit"
              variant="destructive"
              disabled={loadingButton}
              className="flex gap-3 w-full"
            >
              {loadingButton && <LoadingOval />}
              Hapus {`${infoClassname.classname}`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormDeleteClassname;
