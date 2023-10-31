import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const ButtonComponent = ({
  title = "Button",
  messageLoading = "Tunggu Sebentar",
  loading,
}) => {
  const { toast } = useToast();
  return loading ? (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {messageLoading}
    </Button>
  ) : (
    <>
      <Button type="submit">{title}</Button>
    </>
  );
};

export default ButtonComponent;
