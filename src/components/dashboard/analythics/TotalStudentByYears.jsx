import React from "react";
import { Card, LineChart, Title } from "@tremor/react";
import { useTotalStudentByYears } from "@/pages/api/resolver/graphResolver";

const TotalStudentByYears = () => {
  const { data: totalStudents } = useTotalStudentByYears();

  return (
    <Card>
      <Title>Grafik Jumlah Siswa Berdasarkan Tahun Angkatan</Title>
      <LineChart
        className="mt-6"
        data={totalStudents?.data}
        index="kode_tahun_ajaran"
        categories={["jumlah_peserta_didik"]}
        colors={["rose"]}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default TotalStudentByYears;
