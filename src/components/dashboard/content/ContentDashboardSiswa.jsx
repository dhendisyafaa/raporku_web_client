import MulokGraph from "@/components/dashboard/analythics/MulokGraph";
import RankingGraph from "@/components/dashboard/analythics/RankingGraph";
import SkeletonCard from "@/components/skeleton/SkeletonCard";
import useUserData from "@/hooks/useUserData";
import { Bold, Card, Text } from "@tremor/react";

const ContentDashboardSiswa = () => {
  const { isLoading, userData } = useUserData();

  if (isLoading) return <SkeletonCard />;

  const CARDS = [
    {
      title: "Nomor Induk Siswa Nasional (NISN)",
      value: `${userData?.nisn}`,
    },
    {
      title: "Tahun masuk - lulus",
      value: `${userData?.tahun_masuk} - ${userData?.tahun_lulus}`,
    },
  ];

  return (
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
      <div className="flex flex-col gap-3 p-1">
        <MulokGraph />
        {/* <RankingGraph /> */}
      </div>
    </div>
  );
};

export default ContentDashboardSiswa;
