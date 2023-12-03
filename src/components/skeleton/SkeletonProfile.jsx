import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonProfile = () => {
  return (
    <div className="w-full h-[30vh] lg:h-[40vh] flex flex-col justify-center items-center gap-3">
      <Skeleton className={"w-20 h-20 rounded-full"} />
      <Skeleton className={"w-44 h-3"} />
      <Skeleton className={"w-28 h-3"} />
      <Skeleton className={"w-20 h-3"} />
    </div>
  );
};

export default SkeletonProfile;
