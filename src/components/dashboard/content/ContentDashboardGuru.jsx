import SkeletonCard from "@/components/skeleton/SkeletonCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllStudent } from "@/pages/api/resolver/studentResolver";
import { Bold, Card, Text } from "@tremor/react";

const ContentDashboardGuru = () => {
  const { data: studentData, isLoading } = useAllStudent();

  if (isLoading) return <SkeletonCard />;

  const filteredGender = (jenisKelamin) => {
    const countGender = studentData?.data.filter(
      (item) => item.jenis_kelamin === jenisKelamin
    );
    return countGender.length;
  };

  const CARDS = [
    {
      title: "Jumlah Siswa",
      value: `${studentData?.data.length}`,
    },
    {
      title: "Siswa Laki-laki",
      value: `${filteredGender("L")}`,
    },
    {
      title: "Siswa Perempuan",
      value: `${filteredGender("P")}`,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="lg:flex gap-3 p-1 grid overflow-x-auto scrollbar-hide">
          {CARDS?.map((data, index) => (
            <Card
              decoration="top"
              decorationColor="red"
              className="w-full lg:w-[250px] lg:min-w-fit min-h-[100px] max-h-fit font-bold"
              key={index}
            >
              <Bold>{data.title}</Bold>
              <Text>{data.value}</Text>
            </Card>
          ))}
        </div>
        <div className="flex flex-col gap-3 p-1">test</div>
      </div>
    </>
  );
};

export default ContentDashboardGuru;
