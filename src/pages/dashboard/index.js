import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MulokGraph from "@/components/dashboard/analythics/MulokGraph";
import RankingGraph from "@/components/dashboard/analythics/RankingGraph";
import { Bold, Card, Text } from "@tremor/react";

const DashboardPage = () => {
  const cards = [
    {
      title: "Semester",
      value: "5",
    },
    {
      title: "Tahun masuk - lulus",
      value: "2021 - 2024",
    },
  ];

  const gender = "";
  const name = "";

  return (
    <DashboardLayout
      messageHeader={`Selamat datang ${gender} ${name}`}
      titleHeader={"Dashboard"}
    >
      <div className="flex flex-col gap-3">
        <div className="lg:flex gap-3 p-1 grid overflow-x-auto scrollbar-hide">
          {cards.map((data, index) => (
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
          <RankingGraph />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
