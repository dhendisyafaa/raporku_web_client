import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const NavigationSidebar = ({ title, icon, href = "/" }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <div
        className={cn(
          `w-full h-[40px] rounded-lg flex gap-3 items-center p-3`,
          href === router.asPath
            ? "bg-red-600/10 text-red-600 font-semibold border-l-4 border-red-600"
            : null
        )}
      >
        {icon}
        <p className="text-sm">{title}</p>
      </div>
    </Link>
  );
};

export default NavigationSidebar;
