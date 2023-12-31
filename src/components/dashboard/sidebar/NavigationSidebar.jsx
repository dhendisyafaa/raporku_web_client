import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useState } from "react";

const NavigationSidebar = ({
  title,
  icon,
  href,
  multiLevel = false,
  level,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const hiddenDropdown =
    multiLevel === true && isOpen === true ? "block" : "hidden";

  const openDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Link href={href}>
        <div
          onClick={(e) => (multiLevel ? openDropdown(e) : null)}
          className={cn(
            `w-full h-[40px] rounded-lg p-3 flex gap-3 items-center justify-between transition duration-75`,
            href == router.asPath
              ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary"
              : "hover:bg-primary/10 hover:text-primary duration-100 text-zinc-600"
          )}
        >
          <div className="flex gap-3 items-center">
            {icon}
            <p className="text-sm">{title}</p>
          </div>
          <div className={cn(multiLevel === true ? "block" : "hidden")}>
            <ChevronDown
              className={
                (`text-zinc-600`,
                isOpen && "rotate-180 transition-all duration-150")
              }
            />
          </div>
        </div>
      </Link>
      <ul className={cn(`py-2 space-y-2 ${hiddenDropdown}`)}>
        {level?.map((item, index) => {
          const href = item.href;
          return (
            <li key={index}>
              <Link
                href={href}
                className={cn(
                  `w-full h-[40px] rounded-lg p-3 flex gap-3 items-center justify-between transition duration-75 pl-11 `,
                  href == router.asPath
                    ? "bg-red-600/10 text-red-600 font-semibold border-l-4 border-red-600"
                    : "hover:bg-red-600/10 text-sm hover:text-primary duration-100 text-zinc-600"
                )}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(NavigationSidebar);
