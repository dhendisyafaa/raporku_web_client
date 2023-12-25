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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCreateSchoolYear } from "@/pages/api/resolver/schoolYearResolver";
import { useRouter } from "next/router";

const CreateSchoolYear = () => {
  const [loadingButton, setloadingButton] = useState(false);
  const { toast } = useToast();
  const { push } = useRouter();
  const { mutateAsync: createSchoolYear } = useCreateSchoolYear();
  const [date, setDate] = useState({
    from: new Date(),
    to: new Date(),
  });

  const formSchema = z.object({
    kode_tahun_ajaran: z.string().min(1, {
      message: "Kode tahun ajaran wajib untuk diisi",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kode_tahun_ajaran: "",
      // tanggal_mulai: "",
      // tanggal_berakhir: "",
    },
  });

  const onSubmit = async (values) => {
    setloadingButton(true);
    try {
      const newData = {
        kode_tahun_ajaran: values.kode_tahun_ajaran,
        tanggal_mulai: date?.from,
        tanggal_berakhir: date?.to,
      };

      await createSchoolYear(newData);
      setloadingButton(false);
      toast({
        title: "Berhasil membuat tahun ajaran",
      });
      await push('/dashboard/school_year')
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
      messageHeader={"Tambahkan tahun ajaran baru"}
      titleHeader={"Buat data tahun ajaran"}
    >
      <div className="flex w-full justify-around flex-col">
        <Toaster />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid items-end gap-4 p-3">
              <FormField
                control={form.control}
                name="kode_tahun_ajaran"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode Tahun Ajaran</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className={"grid gap-2"}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex justify-end w-full">
              <Button
                type="submit"
                disabled={
                  loadingButton ||
                  date?.from === undefined ||
                  date?.to === undefined
                }
                className="flex gap-3 w-full md:max-w-fit"
              >
                {loadingButton && <LoadingOval />}
                Buat tahun ajaran
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

export default CreateSchoolYear;
