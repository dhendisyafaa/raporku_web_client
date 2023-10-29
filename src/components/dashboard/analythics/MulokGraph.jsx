import { AreaChart, Card, Title } from "@tremor/react";

const MulokGraph = () => {
  const ChartMulokData = [
    {
      mapel: "PAI",
      "Kelas 10": 79,
      "Kelas 11": 82,
      "Kelas 12": 89,
    },
    {
      mapel: "PPKn",
      "Kelas 10": 90,
      "Kelas 11": 77,
      "Kelas 12": 89,
    },
    {
      mapel: "Bahasa Indonesia",
      "Kelas 10": 85,
      "Kelas 11": 80,
      "Kelas 12": 88,
    },
    {
      mapel: "PJOK",
      "Kelas 10": 80,
      "Kelas 11": 82,
      "Kelas 12": 78,
    },
    {
      mapel: "Sejarah Indonesia",
      "Kelas 10": 92,
      "Kelas 11": 80,
      "Kelas 12": 88,
    },
    {
      mapel: "Seni dan Budaya",
      "Kelas 10": 90,
      "Kelas 11": 98,
      "Kelas 12": 94,
    },
  ];

  return (
    <Card>
      <Title className="font-bold">Grafik Nilai Muatan Lokal</Title>
      <AreaChart
        className="mt-6"
        data={ChartMulokData}
        index="mapel"
        categories={["Kelas 10", "Kelas 11", "Kelas 12"]}
        colors={["indigo", "cyan", "red"]}
        maxValue={100}
        minValue={60}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default MulokGraph;
