import Image from "next/image";

import UserAuthForm from "@/components/auth/UserAuthForm";
import { useRouter } from "next/router";

const LoginPage = () => {
  const { push } = useRouter();
  return (
    <>
      <div className="h-screen lg:flex">
        <div className="w-full h-full bg-zinc-900 hidden lg:block lg:w-[50%] text-center text-white">
          <Image
            src="/images/login-img.png"
            width={1280}
            height={843}
            alt="Authentication"
            className="h-full w-full"
          />
        </div>
        <div className="flex w-full lg:w-[50%] h-full flex-col justify-evenly space-y-6 items-center">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Masuk ke Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Silakan masukkan informasi akun Anda
            </p>
          </div>
          <UserAuthForm />
          <div className="px-12 md:px-8 text-center text-xs md:text-sm text-muted-foreground">
            Belum punya akun? Terdapat masalah ketika login?{" "}
            <div
              onClick={() => push(`${phoneNumberAdmin}`)}
              className="underline underline-offset-4 hover:text-primary"
            >
              Hubungi admin
            </div>
            .
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
