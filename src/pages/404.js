import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import React from "react";
import { ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  const { push } = useRouter();
  return (
    <div className="w-full h-screen grid place-items-center bg-gradient-to-br from-red-400  to-purple-500">
      <div className=" space-y-5">
        <div className="flex gap-5 text-lg text-white font-semibold">
          <p>404</p>
          <div className="border"></div>
          <p>Halaman tidak ditemukan</p>
        </div>
        <Button
          onClick={() => push("/dashboard")}
          className="flex items-center gap-2 m-auto group"
        >
          <ArrowLeft className="group-hover:-translate-x-1 duration-150" />
          Kembali ke dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
