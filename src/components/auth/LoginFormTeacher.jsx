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
import { loginUser } from "@/pages/api/auth/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ButtonComponent from "../button/ButtonComponent";

const LoginFormTeacher = () => {
  const loginTeacher = "@guru.smk.belajar.id";
  const { push } = useRouter();
  const [loadingButton, setloadingButton] = useState(false);
  const [isError, setIsError] = useState({});

  const formSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: "Email wajib untuk diisi",
      })
      .max(50),
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
    setloadingButton(true);
    try {
      const mergeUsername = `${values.username}${loginTeacher}`;
      const dataLogin = {
        username: mergeUsername,
        password: values.password,
      };
      console.log(dataLogin);
      // await loginUser(values);
      // push("/dashboard");
    } catch (error) {
      setloadingButton(false);
      console.log(error);
      if (error.response) {
        setIsError({
          error: true,
          errorMessage: error.response.data.message,
        });
      }
    }
  };

  return (
    <Card>
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
            <ButtonComponent
              buttonLoading={true}
              title="Masuk"
              loading={loadingButton}
              error={isError.error}
              toastTitle={isError?.errorMessage || "Gagal untuk login!"}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
    // <Card>
    //   <CardHeader>
    //     <CardTitle className="p-1">Login untuk guru</CardTitle>
    //   </CardHeader>
    //   <CardContent className="space-y-2">
    //     <div className="space-y-1">
    //       <Label htmlFor="nik">Username</Label>
    //       <div className="flex gap-1">
    //         <Input id="nik" type="text" className="w-[70%]" />
    // <div className="w-[30%] border flex justify-center items-center rounded-sm">
    //   <p className="text-xs lg:text-sm">{loginTeacher}</p>
    // </div>
    //       </div>
    //     </div>
    //     <div className="space-y-1">
    //       <Label htmlFor="password">Password</Label>
    //       <Input id="password" type="password" onClick={() => {}} />
    //     </div>
    //   </CardContent>
    //   <CardFooter>
    //     <Button>Masuk</Button>
    //   </CardFooter>
    // </Card>
  );
};

export default LoginFormTeacher;
