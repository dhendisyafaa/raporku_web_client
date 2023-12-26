import React from "react";
import LoadingComponent from "@/components/common/LoadingComponent.jsx";
import useUserData from "@/hooks/useUserData";
import {
  useChartSiswa,
  useTotalStudentByYears,
} from "@/pages/api/resolver/graphResolver";
import { AreaChart, Card, Title } from "@tremor/react";
const TotalStudentBySchoolYears = () => {
  const { data: totalStudents, isLoading } = useTotalStudentByYears();
  if (isLoading) return <LoadingComponent />;
  return (
    <Card>
      <Title className="font-bold">
        Grafik Total Jumlah Siswa Berdasarkan Tahun Ajaran
      </Title>
      <AreaChart
        className="mt-6"
        data={totalStudents.data}
        index="kode_tahun_ajaran"
        categories={["jumlah_peserta_didik"]}
        colors={["red", "violet", "teal", "rose", "purple", "orange"]}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default TotalStudentBySchoolYears;
