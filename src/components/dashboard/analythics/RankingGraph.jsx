import useUserData from "@/hooks/useUserData";
import {
  Card,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Title,
} from "@tremor/react";
import { useRouter } from "next/router";
import { useState } from "react";
import RankingTable from "../table/RankingTable";

const RankingGraph = () => {
  const { userData } = useUserData();
  const [tabRanking, setTabRanking] = useState(0);
  const { push, query } = useRouter();

  const changeTab = (tabRanking) => {
    push(`/dashboard?ranking=${tabRanking}`);
  };

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

  return (
    <Card>
      <Title className="mb-3">
        Data Ranking {userData?.wali_kelas.nama_kelas}
      </Title>
      <TabGroup index={query.ranking - 1}>
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
              <RankingTable />
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </Card>
  );
};

export default RankingGraph;
