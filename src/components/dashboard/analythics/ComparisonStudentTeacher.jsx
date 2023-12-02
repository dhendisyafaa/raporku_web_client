import { Card, DonutChart, Title } from "@tremor/react";

const ComparisonStudentTeacher = ({ teacher, student }) => {
  console.log("teacher", teacher);
  console.log("student", student);
  const compare = [
    {
      jabatan: "Siswa",
      jumlah: teacher,
    },
    {
      jabatan: "Guru",
      jumlah: student,
    },
  ];

  const cities = [
    {
      name: "New York",
      sales: 9800,
    },
    {
      name: "London",
      sales: 4567,
    },
    {
      name: "Hong Kong",
      sales: 3908,
    },
    {
      name: "San Francisco",
      sales: 2400,
    },
    {
      name: "Singapore",
      sales: 1908,
    },
    {
      name: "Zurich",
      sales: 1398,
    },
  ];

  return (
    <Card className="max-w-sm">
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
