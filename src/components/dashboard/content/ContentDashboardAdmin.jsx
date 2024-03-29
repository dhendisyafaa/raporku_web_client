import SkeletonCard from "@/components/skeleton/SkeletonCard";
import useUserData from "@/hooks/useUserData";
import { useAllStudent } from "@/pages/api/resolver/studentResolver";
import { useAllTeacher } from "@/pages/api/resolver/teacherResolver";
import { Bold, Card, Text } from "@tremor/react";
import ComparisonStudentTeacher from "../analythics/ComparisonStudentTeacher";
import TotalStudentByGender from "../analythics/TotalStudentByGender";
import TotalStudentBySchoolYears from "../analythics/TotalStudentBySchoolYears";
import EmptyStateIllustration from "@/components/common/EmptyStateIllustration";

const ContentDashboardAdmin = () => {
  const { isLoading, userData } = useUserData();
  const { data: students, isLoading: loadStudents } = useAllStudent();
  const { data: teachers, isLoading: loadTeachers } = useAllTeacher();
  if (loadTeachers || loadStudents) return <SkeletonCard />;
  if (students?.data?.data?.length === 0 || teachers?.data?.data?.length === 0)
    return (
      <EmptyStateIllustration
        headerText={"Belum terdapat visual untuk ditampilkan"}
        bodyText={"Buat data siswa atau guru terlebih dahulu"}
        illustration={"/images/ranking.svg"}
      />
    );

  const CARDS = [
    {
      title: "Jumlah Siswa",
      value: `${students?.data.length}`,
    },
    {
      title: "Jumlah Guru",
      value: `${teachers?.data.length}`,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="lg:flex gap-3 p-1 grid overflow-x-auto scrollbar-hide">
          {CARDS?.map((data, index) => (
            <Card
              decoration="top"
              decorationColor="red"
              className="w-full lg:w-[250px] lg:min-w-fit min-h-[100px] max-h-fit font-bold"
              key={index}
            >
              <Bold>{data.title}</Bold>
              <Text>{data.value}</Text>
            </Card>
          ))}
        </div>
        <div className="flex md:flex-row flex-col gap-3 p-1">
          <ComparisonStudentTeacher
            teacher={teachers?.data.length}
            student={students?.data.length}
          />
          <TotalStudentByGender student={students?.data} />
        </div>
        <TotalStudentBySchoolYears />
      </div>
    </>
  );
};

export default ContentDashboardAdmin;
