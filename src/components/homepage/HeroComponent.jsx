import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "../ui/button";
import MarginLayout from "./MarginLayout";

const HeroComponent = () => {
  const { push } = useRouter();
  return (
    <MarginLayout>
      <div className="md:grid md:grid-cols-2 gap-3 mx-auto py-10 mt-20">
        <div className="h-full flex flex-col items-start justify-center gap-6 lg:w-[90%]">
          <p className="text-4xl lg:text-5xl font-bold text-navy leading-tight lg:leading-tight">
            <span className="text-primary">#Upgrade Diri</span> untuk menjadi
            pelajar yang lebih baik
          </p>
          <p className="text-foreground text-base lg:text-lg leading-relaxed">
            Solusi yang komprehensif dan modern untuk mengelola dan memantau
            pendidikan di sekolah
          </p>
          <Button
            size="lg"
            variant="primary"
            className="flex items-center gap-3 group"
            onClick={() => push("/dashboard")}
          >
            Masuk ke Dashboard{" "}
            <ArrowRight className="group-hover:translate-x-2 duration-200" />
          </Button>
        </div>
        <div className="hidden md:block h-[520px]">
          <Image
            src={"/images/moockup.png"}
            alt="moockup"
            width={0}
            height={0}
            sizes="100%"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </MarginLayout>
  );
};

export default HeroComponent;
