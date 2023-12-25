import { Card, DonutChart, Title } from "@tremor/react";

const ComparisonStudentTeacher = ({ teacher = 0, student = 0 }) => {
  const compare = [
    {
      jabatan: "Siswa",
      jumlah: student,
    },
    {
      jabatan: "Guru",
      jumlah: teacher,
    },
  ];

  return (
    <Card className="w-full">
      <Title>Perbandingan jumlah guru dan siswa</Title>
      <DonutChart
        className="mt-6"
        data={compare}
        category="jumlah"
        index="jabatan"
        colors={["rose", "fuchsia"]}
      />
    </Card>
  );
};

export default ComparisonStudentTeacher;
