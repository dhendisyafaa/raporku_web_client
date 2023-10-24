import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MulokGraph from "@/components/dashboard/analythics/MulokGraph";
import RankingGraph from "@/components/dashboard/analythics/RankingGraph";
import { Card, Title } from "@tremor/react";

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

  // function sortDataByRanking(data) {
  //   // Menggunakan metode `sort` untuk mengurutkan data berdasarkan peringkat (Ranking).
  //   const sortedData = data.sort((a, b) => b.Ranking - a.Ranking);
  //   return sortedData;
  // }

  // const sortedChartRanking = sortDataByRanking(chartRanking);

  // const valueFormatter = (number) => number.sort().reverse();

  // const reversedData = chartRanking.slice().reverse();

  return (
    <DashboardLayout messageHeader={""} titleHeader={""}>
      <div className="flex flex-col gap-3">
        <div class="lg:flex gap-3 p-1 grid overflow-x-auto scrollbar-hide">
          {cards.map((data, index) => (
            <Card
              className="w-full lg:w-[250px] lg:min-w-fit min-h-[100px] max-h-fit"
              key={index}
            >
              <Title className="font-bold">{data.title}</Title>
              <p className="font-bold text-2xl">{data.value}</p>
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
