import LoadingComponent from "@/components/common/LoadingComponent.jsx";
import useUserData from "@/hooks/useUserData";
import { useChartSiswa } from "@/pages/api/resolver/graphResolver";
import { AreaChart, Card, Title } from "@tremor/react";

const MulokGraph = () => {
  const { userId } = useUserData();
  const { data: gradeStudent, isLoading } = useChartSiswa(userId);
  const chartStudent = gradeStudent?.data;

  if (isLoading) return <LoadingComponent />;

  return (
    <Card>
      <Title className="font-bold">Grafik Nilai Semua Mata Pelajaran</Title>
      <AreaChart
        className="mt-6"
        data={chartStudent.nilai_siswa}
        index="mapel"
        categories={[
          "Semester 1",
          "Semester 2",
          "Semester 3",
          "Semester 4",
          "Semester 5",
          "Semester 6",
        ]}
        colors={["red", "violet", "teal", "rose", "purple", "orange"]}
        maxValue={100}
        minValue={60}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default MulokGraph;
