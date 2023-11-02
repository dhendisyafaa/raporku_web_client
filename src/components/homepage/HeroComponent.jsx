import React from "react";
import MarginLayout from "./MarginLayout";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ButtonComponent from "../button/ButtonComponent";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const HeroComponent = () => {
  const { push } = useRouter();
  return (
    <MarginLayout>
      <div className="md:grid md:grid-cols-2 gap-3 mx-auto py-10 mt-20">
        <div className="h-full flex flex-col items-start justify-center gap-6">
          <p className="text-4xl lg:text-5xl font-bold text-navy leading-tight lg:leading-tight">
            <span className="text-orange">#Upgrade Diri</span> untuk menjadi
            pelajar yang lebih baik
          </p>
          <p className="text-grey text-base lg:text-lg leading-relaxed">
            Solusi yang komprehensif dan modern untuk mengelola dan memantau
            pendidikan di sekolah
          </p>
          <ButtonComponent
            defaultButton={true}
            title="Masuk ke Dashboard"
            rightIcon={true}
            customStyle="text-white bg-orange group w-[240px] shadow-lg shadow-orange/40 px-6 py-3 hover:bg-orange/90"
            icon={<ArrowRight className="group-hover:ml-1 duration-200" />}
            onClick={() => push("/dashboard")}
          />
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
