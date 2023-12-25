import { Card, DonutChart, Title } from "@tremor/react";

const TotalStudentByGender = ({ student }) => {
  const studentTotalGender = student?.map((item) => item.jenis_kelamin);

  const filteredGender = (jenisKelamin) => {
    const countGender = studentTotalGender.filter(
      (item) => item === jenisKelamin
    );
    return countGender.length;
  };

  const genderStudent = [
    { gender: "Laki-laki", total: filteredGender("L") },
    { gender: "Perempuan", total: filteredGender("P") },
  ];

  return (
    <Card className="w-full">
      <Title>Perbandingan Jumlah Jenis Kelamin Siswa</Title>
      <DonutChart
        className="mt-6"
        data={genderStudent}
        category="total"
        index="gender"
        colors={["indigo", "pink"]}
      />
    </Card>
  );
};

export default TotalStudentByGender;
