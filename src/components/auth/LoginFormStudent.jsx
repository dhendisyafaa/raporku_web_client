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
import ButtonComponent from "../button/ButtonComponent";
import { Toaster } from "../ui/toaster";

const LoginFormStudent = () => {
  const { push, query } = useRouter();
  const [loadingButton, setloadingButton] = useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: "NIS wajib untuk diisi",
      })
      .min(10, {
        message: "NIS harus 10 - 12 karakter",
      })
      .max(12, {
        message: "NIS harus 10 - 12 karakter",
      }),
    password: z
      .string()
      .min(2, {
        message: "Kata sandi wajib untuk diisi",
      })
      .min(8, {
        message: "Kata sandi minimal 8 karakter",
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
        ...values,
        redirect: false,
        callbackUrl: callbackUrl,
      });
      if (!signInData?.error) {
        setloadingButton(false);
        push("/dashboard");
      } else {
        console.log("signInData?.error", signInData?.error);
        setloadingButton(false);
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
        <CardTitle className="p-1">Login untuk siswa</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIS</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="NIS" {...field} />
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
            <ButtonComponent
              buttonLoading={true}
              title="Masuk"
              loading={loadingButton}
            />
          </form>
        </Form>
      </CardContent>
      {/* <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="nik">NIS</Label>
          <Input id="nik" type="number" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
      </CardContent> */}
      {/* <CardFooter>
        <Button>Masuk</Button>
      </CardFooter> */}
    </Card>
  );
};

export default LoginFormStudent;
