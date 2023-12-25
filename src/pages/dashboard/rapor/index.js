import DashboardLayout from "@/components/dashboard/DashboardLayout";
import RaporTable from "@/components/dashboard/rapor/RaporTable";
import useUserData from "@/hooks/useUserData";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import { useRouter } from "next/router";

const RaporPage = () => {
  const { push, query } = useRouter();
  const { level } = useUserData();

  const TABSEMESTER = [
    {
      title: "Semester 1",
    },
    {
      title: "Semester 2",
    },
    {
      title: "Semester 3",
    },
    {
      title: "Semester 4",
    },
    {
      title: "Semester 5",
    },
    {
      title: "Semester 6",
    },
  ];

  const changeTabStudentLevel = (semester) => {
    push(`/dashboard/rapor?semester=${semester}`);
  };

  const changeTabTeacherLevel = (semester) => {
    push(`/dashboard/rapor?siswa=${query.siswa}&semester=${semester}`);
  };

  return (
    <DashboardLayout
      titleHeader={"Laporan hasil belajar"}
      messageHeader={"Berikut semua data rapor Anda"}
    >
      <div className="w-screen h-screen md:w-full">
        <TabGroup index={query.semester - 1}>
          <TabList color="red" variant="solid" className="flex flex-wrap">
            {TABSEMESTER.map((item, index) => (
              <Tab
                key={index}
                onClick={
                  level === "siswa"
                    ? () => changeTabStudentLevel(index + 1)
                    : () => changeTabTeacherLevel(index + 1)
                }
              >
                {item.title}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {TABSEMESTER.map((item, index) => (
              <TabPanel key={index}>
                <RaporTable />
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </DashboardLayout>
  );
};

export default RaporPage;
