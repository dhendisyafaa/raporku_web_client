import React from "react";
import { Card, LineChart, Title, AreaChart } from "@tremor/react";
import {
  useAverageStudentScore,
  useTotalStudentByClass,
} from "@/pages/api/resolver/graphResolver";
import useUserData from "@/hooks/useUserData";
import LoadingComponent from "@/components/common/LoadingComponent";
import EmptyStateIllustration from "@/components/common/EmptyStateIllustration";

const AverageStudentScoreByClass = () => {
  const { userData } = useUserData();
  const { data: averageStudentScores, isLoading } = useAverageStudentScore(
    userData.id_kelas
  );

  const averageStudentScore = averageStudentScores?.data;

  return (
    <Card>
      <Title>Grafik Nilai Rata-Rata Kelas Per Semester</Title>
      {!isLoading ? (
        averageStudentScore?.data.length !== 0 ? (
          <AreaChart
            className="mt-6"
            data={averageStudentScore?.data}
            index="semester"
            categories={["total_rata_rata_bobot_nilai_akhir"]}
            colors={["rose"]}
            yAxisWidth={40}
          />
        ) : (
          <EmptyStateIllustration
            headerText={"Belum terdapat visual untuk ditampilkan"}
            bodyText={"Buat rapor siswa terlebih dahulu"}
            illustration={"/images/ranking.svg"}
          />
        )
      ) : (
        <LoadingComponent />
      )}
    </Card>
  );
};

export default AverageStudentScoreByClass;
