import { cn } from "@/lib/utils";
import { ThreeDots } from "react-loader-spinner";

const ThreeDotsLoading = ({ className }) => {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <ThreeDots
        height="20"
        width="20"
        radius="9"
        color="#FE5E44"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default ThreeDotsLoading;
