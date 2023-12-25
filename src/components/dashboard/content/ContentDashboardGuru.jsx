import EmptyStateIllustration from "@/components/common/EmptyStateIllustration";
import SkeletonCard from "@/components/skeleton/SkeletonCard";
import useUserData from "@/hooks/useUserData";
import { useAllStudentByClass } from "@/pages/api/resolver/studentResolver";
import { Bold, Card, Text } from "@tremor/react";
import AverageStudentScoreByClass from "../analythics/AverageStudentScoreByClass";
import RankingGraph from "../analythics/RankingGraph";

const ContentDashboardGuru = () => {
  const { userData } = useUserData();
  const { data: studentData, isLoading } = useAllStudentByClass(
    userData?.id_kelas
  );

  if (studentData?.data.length === undefined)
    return (
      <EmptyStateIllustration
        headerText={"Belum terdapat data untuk ditampilkan"}
        bodyText={"Buat rapor siswa terlebih dahulu"}
        illustration={"/images/match_not_found.svg"}
      />
    );

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
        <RankingGraph />
        <AverageStudentScoreByClass />
      </div>
    </>
  );
};

export default ContentDashboardGuru;
