import {
  avenirTechWebUrl,
  instagramUrl,
  linkedinUrl,
  phoneNumberAdminAvenir,
} from "@/configs/config";
import { InstagramIcon, Linkedin, MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MarginLayout from "./MarginLayout";

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();
  return (
    <MarginLayout>
      <div className="py-6 space-y-5">
        <div className="min-h-[50vh] grid lg:grid-cols-2">
          <div className="flex flex-col gap-3 w-full justify-center">
            <Image
              src="/images/nomyly-logo.png"
              height={60}
              width={60}
              alt="nomyly-logo"
              className="rounded-full"
            />
            <p className="text-lg font-semibold">RAPORKU</p>
            <p className="text-foreground text-sm lg:text-lg leading-relaxed">
              Sebuah aplikasi yang membantu memudahkan proses pendidikan,
              meningkatkan transparansi, menginspirasi siswa untuk meraih
              prestasi lebih baik, dan memfasilitasi pengambilan keputusan yang
              lebih baik dalam lingkungan sekolah
            </p>
          </div>
          <div className="w-full flex flex-col gap-3 justify-center md:items-end">
            <p className="text-lg font-semibold">
              Tetap{" "}
              <span className="decoration-primary underline ">Terhubung</span>
            </p>
            <p className="text-foreground text-base">
              Ikuti kami pada media sosial berikut:
            </p>
            <div className="flex items-center gap-5">
              <Link href={`${instagramUrl}`} target="_blank">
                <div className="p-2 bg-white shadow-sm hover:bg-primary/20 rounded-full text-primary duration-150">
                  <InstagramIcon />
                </div>
              </Link>
              <Link href={`${phoneNumberAdminAvenir}`} target="_blank">
                <div className="p-2 bg-white shadow-sm hover:bg-primary/20 rounded-full text-primary duration-150">
                  <MessageCircleIcon />
                </div>
              </Link>
              <Link href={`${linkedinUrl}`} target="_blank">
                <div className="p-2 bg-white shadow-sm hover:bg-primary/20 rounded-full text-primary duration-150">
                  <Linkedin />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="text-foreground text-xs uppercase text-center">
          copyright &copy; {currentYear} by{" "}
          <Link
            className="underline-offset-2 underline decoration-primary"
            href={`${avenirTechWebUrl}`}
            target="_blank"
          >
            avenir tech
          </Link>
          , design by{" "}
          <Link
            className="underline-offset-2 underline decoration-primary"
            href={"https://twitter.com/mhdnauvalazhar"}
            target="_blank"
          >
            nauval
          </Link>
        </div>
      </div>
    </MarginLayout>
  );
};

export default FooterComponent;
