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
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import LoadingOval from "../common/LoadingOval";
import { Button } from "../ui/button";
import { Toaster } from "../ui/toaster";

const LoginFormAdmin = () => {
  const { push, query } = useRouter();
  const [loadingButton, setloadingButton] = useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: "Username wajib untuk diisi",
      })
      .min(5, {
        message: "Username minimal 5 karakter",
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
    setloadingButton(true);
    try {
      const callbackUrl = query.callbackUrl || "/";
      const signInData = await signIn("credentials", {
        ...values,
        redirect: false,
        callbackUrl: callbackUrl,
      });
      if (!signInData?.error) {
        toast({
          title: "Yeay, berhasil login!",
          description:
            "Anda akan langsung diarahkan ke halaman dashboard admin",
        });
        setloadingButton(false);
        push("/dashboard");
      } else {
        setloadingButton(false);
        console.log("signInData?.error", signInData?.error);
        toast({
          variant: "destructive",
          title: "Gagal untuk login!",
          description: "Username atau kata sandi salah",
        });
      }
    } catch (error) {
      setloadingButton(false);
      console.log("error catch", error);
      if (error.response) {
        toast({
          variant: "destructive",
          title: "Gagal untuk login!",
          description: "Username atau kata sandi salah",
        });
      }
    }
  };
  return (
    <Card>
      <Toaster />
      <CardHeader>
        <CardTitle className="p-1">Login untuk admin</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Username" {...field} />
                  </FormControl>
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
  );
};

export default LoginFormAdmin;
