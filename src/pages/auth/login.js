import Image from "next/image";
import Link from "next/link";

import UserAuthForm from "@/components/auth/UserAuthForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LoginPage = () => {
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
              Nice to see you again
            </h1>
            <p className="text-sm text-muted-foreground">lorem</p>
          </div>
          <UserAuthForm />
          <p className="px-12 md:px-8 text-center text-xs md:text-sm text-muted-foreground">
            Belum punya akun ? Terdapat masalah ketika login ? atau{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Hubungi gurumu
            </Link>{" "}
            <Link
              href="/register"
              className="underline underline-offset-4 hover:text-primary"
            >
              Hubungi admin
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
