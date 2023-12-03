import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonSidebar = () => {
  return (
    <div className="space-y-3">
      <Skeleton className={"w-full h-[40px]"} />
      <Skeleton className={"w-full h-[40px]"} />
    </div>
  );
};

export default SkeletonSidebar;
