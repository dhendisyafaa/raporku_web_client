import DashboardLayout from "@/components/dashboard/DashboardLayout";
import RaporTable from "@/components/dashboard/rapor/RaporTable";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import { useRouter } from "next/router";

const RaporPage = () => {
  const { push, query } = useRouter();

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

  const changeTab = (semester) => {
    push(`/dashboard/rapor?semester=${semester}`);
  };

  return (
    <DashboardLayout
      titleHeader={"Laporan hasil belajar"}
      messageHeader={"Berikut semua data rapor Anda"}
    >
      <div className="w-screen h-screen md:w-full">
        <TabGroup index={query.semester - 1}>
          <TabList color="red" variant="solid">
            {TABSEMESTER.map((item, index) => (
              <Tab key={index} onClick={() => changeTab(index + 1)}>
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
