import SkeletonCard from "@/components/skeleton/SkeletonCard";
import useUserData from "@/hooks/useUserData";
import { useAllStudent } from "@/pages/api/resolver/studentResolver";
import { useAllTeacher } from "@/pages/api/resolver/teacherResolver";
import { Bold, Card, Text } from "@tremor/react";
import ComparisonStudentTeacher from "../analythics/ComparisonStudentTeacher";

const ContentDashboardAdmin = () => {
  const { isLoading, userData } = useUserData();
  const { data: teachers, isLoading: loadTeachers } = useAllStudent();
  const { data: students, isLoading: loadStudents } = useAllTeacher();

  if (loadTeachers || loadStudents) return <SkeletonCard />;

  const CARDS = [
    {
      title: "Jumlah Siswa",
      value: `${teachers?.data.length}`,
    },
    {
      title: "Jumlah Guru",
      value: `${students?.data.length}`,
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
        <div className="flex flex-col gap-3 p-1">
          <ComparisonStudentTeacher
            teacher={teachers?.data.length}
            student={students?.data.length}
          />
        </div>
      </div>
    </>
  );
};

export default ContentDashboardAdmin;
