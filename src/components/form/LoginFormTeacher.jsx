import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import LoadingOval from "../common/LoadingOval";
import { Button } from "../ui/button";
import { Toaster } from "../ui/toaster";
import { useToast } from "../ui/use-toast";

const LoginFormTeacher = () => {
  const loginTeacher = "@guru.smk.belajar.id";
  const { push, query } = useRouter();
  const [loadingButton, setloadingButton] = useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Email wajib untuk diisi",
    }),
    password: z
      .string()
      .min(2, {
        message: "Kata sandi wajib untuk diisi",
      })
      .min(5, {
        message: "Kata sandi minimal 5 karakter",
      }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    console.log("values", values);
    setloadingButton(true);
    try {
      const callbackUrl = query.callbackUrl || "/";
      const signInData = await signIn("credentials", {
        username: `${values.username}${loginTeacher}`,
        password: values.password,
        redirect: false,
        callbackUrl: callbackUrl,
      });
      if (!signInData?.error) {
        toast({
          title: "Yeay, berhasil login!",
          description: "Anda akan langsung diarahkan ke halaman dashboard",
        });
        setloadingButton(false);
        push("/dashboard");
      } else {
        setloadingButton(false);
        console.log("signInData?.error", signInData?.error);
        toast({
          variant: "destructive",
          title: "Gagal untuk login!",
          description: "NIS atau kata sandi salah",
        });
      }
    } catch (error) {
      setloadingButton(false);
      console.log("error catch", error);
      if (error.response) {
        toast({
          variant: "destructive",
          title: "Gagal untuk login!",
          description: "NIS atau kata sandi salah",
        });
      }
    }
  };

  return (
    <Card>
      <Toaster />
      <CardHeader>
        <CardTitle className="p-1">Login untuk guru</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <div className="flex gap-1">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Email"
                        className="w-[60%]"
                        {...field}
                      />
                    </FormControl>
                    <div className="w-[40%] border flex justify-center items-center rounded-md">
                      <p className="text-xs lg:text-sm">{loginTeacher}</p>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kata Sandi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan Kata Sandi"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loadingButton} className="flex gap-3">
              {loadingButton && <LoadingOval />}
              Masuk
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
    // <Card>
    //   <CardHeader>
    //     <CardTitle className="p-1">Login untuk guru</CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     <Form {...form}>
    //       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
    // <FormField
    //   control={form.control}
    //   name="username"
    //   render={({ field }) => (
    //     <FormItem>
    //       <FormLabel>Email</FormLabel>
    //       <div className="flex gap-1">
    //         <FormControl>
    //           <Input
    //             type="text"
    //             placeholder="Email"
    //             className="w-[60%]"
    //             {...field}
    //           />
    //         </FormControl>
    //         <div className="w-[40%] border flex justify-center items-center rounded-md">
    //           <p className="text-xs lg:text-sm">{loginTeacher}</p>
    //         </div>
    //       </div>
    //       <FormMessage />
    //     </FormItem>
    //   )}
    // />
    //         <FormField
    //           control={form.control}
    //           name="password"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Kata Sandi</FormLabel>
    //               <FormControl>
    //                 <Input
    //                   placeholder="Masukkan Kata Sandi"
    //                   type="password"
    //                   {...field}
    //                 />
    //               </FormControl>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />
    //         <Button disabled={loadingButton} className="flex gap-3">
    //           {loadingButton && <LoadingOval />}
    //           Masuk
    //         </Button>
    //       </form>
    //     </Form>
    //   </CardContent>
    // </Card>
  );
};

export default LoginFormTeacher;
