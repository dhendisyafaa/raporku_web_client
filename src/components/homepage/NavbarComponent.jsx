import { useScrollPosition } from "@/hooks/useScrollPosition";
import { cn } from "@/lib/utils";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import SheetSidebar from "../dashboard/sidebar/SheetSidebar";
import { Button } from "../ui/button";

const NavbarComponent = () => {
  const scrollPosition = useScrollPosition();
  const { asPath, push } = useRouter();
  const { data: session } = useSession();
  return (
    <>
      <div
        className={cn(
          `bg-white flex items-center justify-between p-4 shadow-lg shadow-primary/10 rounded w-full m-auto duration-300 z-[999]`,
          scrollPosition > 0 ? "md:mt-0 md:px-16" : "md:w-[90%] md:mt-6 md:px-6"
        )}
      >
        <div className="flex items-center gap-4">
          {session && <SheetSidebar />}
          <Link href={"/"}>
            <div className="flex items-center gap-1">
              <Image
                src="/images/nomyly-logo.png"
                height={50}
                width={50}
                alt="nomyly-logo"
                className="rounded-full"
              />
              <p className="text-lg font-semibold text-navy">RAPORKU</p>
            </div>
          </Link>
        </div>
        <div className="flex gap-11 items-center ">
          <div className="md:flex items-center gap-11 hidden text-base">
            <div
              className={
                asPath === "/"
                  ? "text-primary font-semibold"
                  : "text-foreground font-normal"
              }
            >
              <Link href={"/"}>Home</Link>
            </div>
            <div
              className={
                asPath === "/#fitur"
                  ? "text-primary font-semibold"
                  : "text-foreground font-normal"
              }
            >
              <Link href="#fitur" scroll={false}>
                Fitur
              </Link>
            </div>
          </div>
          {!session && (
            <Button
              variant="primary"
              onClick={() => {
                signIn();
              }}
            >
              Masuk
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarComponent;
