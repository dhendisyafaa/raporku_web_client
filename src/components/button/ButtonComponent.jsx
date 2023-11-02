import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const ButtonComponent = ({
  title = "Button",
  messageLoading = "Tunggu Sebentar",
  loading,
  buttonLoading,
  defaultButton,
  rightIcon,
  customStyle,
  icon,
  onClick,
}) => {
  const { toast } = useToast();
  if (buttonLoading)
    return (
      <>
        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {messageLoading}
          </Button>
        ) : (
          <Button type="submit">{title}</Button>
        )}
      </>
    );

  if (defaultButton)
    return (
      <>
        <button
          type="button"
          className={cn(
            `flex gap-3 items-center font-semibold rounded`,
            customStyle
          )}
          onClick={onClick}
        >
          {title}
          {rightIcon ? icon : null}
        </button>
      </>
    );
};

export default ButtonComponent;
