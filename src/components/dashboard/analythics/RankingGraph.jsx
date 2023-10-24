import { AreaChart, Card, Title } from "@tremor/react";

const RankingGraph = () => {
  const chartRanking = [
    {
      semester: "Semester 1",
      Ranking: 2,
    },
    {
      semester: "Semester 2",
      Ranking: 1,
    },
    {
      semester: "Semester 3",
      Ranking: 1,
    },
    {
      semester: "Semester 4",
      Ranking: 6,
    },
    {
      semester: "Semester 5",
      Ranking: 9,
    },
    {
      semester: "Semester 6",
      Ranking: 5,
    },
  ];
  return (
    <Card>
      <Title>Grafik Analitik Rankingmu</Title>
      <AreaChart
        className="mt-6"
        data={chartRanking}
        index="semester"
        categories={["Ranking"]}
        colors={["indigo", "cyan"]}
        // valueFormatter={valueFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default RankingGraph;
