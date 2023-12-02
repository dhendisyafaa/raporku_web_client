import { Skeleton } from "../ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="lg:flex gap-3 grid">
      <div className="bg-muted/20 space-y-2 w-full lg:w-[250px] lg:min-w-fit min-h-[100px] p-3 rounded-lg">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="bg-muted/20 space-y-2 w-full lg:w-[250px] lg:min-w-fit min-h-[100px] p-3 rounded-lg">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default SkeletonCard;
