import Image from "next/image";

import UserAuthForm from "@/components/form/UserAuthForm";
import { useRouter } from "next/router";
import { phoneNumberAdminAvenir } from "@/configs/config";

const LoginPage = () => {
  const { push } = useRouter();
  return (
    <>
      <div className="h-screen lg:flex">
        <div className="w-full h-full bg-zinc-900 hidden relative lg:block lg:w-[50%] text-center text-white">
          <div className="absolute h-full w-full flex justify-center items-center">
            <div className="text-left mx-auto w-[80%] space-y-2">
              <p className="text-4xl font-bold">Selamat Datang!</p>
              <p className="text-lg font-semibold">
                Anda harus login untuk akses dashboard dengan akunmu yang telah
                didaftarkan
              </p>
            </div>
          </div>
          <Image
            src="/images/gradient-auth.png"
            width={1280}
            height={0}
            alt="Authentication"
            className="object-cover h-full"
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
              onClick={() => push(`${phoneNumberAdminAvenir}`)}
              className="underline underline-offset-4 decoration-primary hover:text-primary"
            >
              Hubungi admin.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
