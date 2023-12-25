import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllClassname } from "@/pages/api/resolver/classnameResolver";
import LoadingComponent from "../common/LoadingComponent";

const DropdownKelas = () => {
  const { data: classnames, isLoading } = useAllClassname();

  const renderClassname = () => {
    if (isLoading) return <LoadingComponent />;
    return classnames?.data.map((classname) => (
      <SelectItem key={classname.id_kelas} value={classname.nama_kelas}>
        {classname.nama_kelas}
      </SelectItem>
    ));
  };
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Pilih Kelas" />
      </SelectTrigger>
      <SelectContent>{renderClassname()}</SelectContent>
    </Select>
  );
};

export default DropdownKelas;
