import DashboardLayout from "@/components/dashboard/DashboardLayout";
import RaporTable from "@/components/dashboard/rapor/RaporTable";
import { StatusOnlineIcon } from "@heroicons/react/outline";
import {
  Badge,
  Card,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RaporPage = () => {
  const dataRapor = [
    {
      mataPelajaran: "Pendidikan Agama dan Budi Pekerti",
      pengetahuan: 79,
      keterampilan: 86,
      nilaiAkhir: "83,20",
      predikat: "B+",
    },
    {
      mataPelajaran: "Pendidikan Agama dan Budi Pekerti",
      pengetahuan: 79,
      keterampilan: 86,
      nilaiAkhir: "83,20",
      predikat: "B+",
    },
    {
      mataPelajaran: "Pendidikan Agama dan Budi Pekerti",
      pengetahuan: 79,
      keterampilan: 86,
      nilaiAkhir: "83,20",
      predikat: "B+",
    },
    {
      mataPelajaran: "Pendidikan Agama dan Budi Pekerti",
      pengetahuan: 79,
      keterampilan: 86,
      nilaiAkhir: "83,20",
      predikat: "B+",
    },
    {
      mataPelajaran: "Pendidikan Agama dan Budi Pekerti",
      pengetahuan: 79,
      keterampilan: 86,
      nilaiAkhir: "83,20",
      predikat: "B+",
    },
    {
      mataPelajaran: "Pendidikan Agama dan Budi Pekerti",
      pengetahuan: 79,
      keterampilan: 86,
      nilaiAkhir: "83,20",
      predikat: "B+",
    },
    {
      mataPelajaran: "Pendidikan Agama dan Budi Pekerti",
      pengetahuan: 79,
      keterampilan: 86,
      nilaiAkhir: "83,20",
      predikat: "B+",
    },
    {
      mataPelajaran: "Pendidikan Agama dan Budi Pekerti",
      pengetahuan: 79,
      keterampilan: 86,
      nilaiAkhir: "83,20",
      predikat: "B+",
    },
    {
      mataPelajaran: "Pendidikan Agama dan Budi Pekerti",
      pengetahuan: 79,
      keterampilan: 86,
      nilaiAkhir: "83,20",
      predikat: "B+",
    },
    {
      mataPelajaran: "Pendidikan Agama dan Budi Pekerti",
      pengetahuan: 79,
      keterampilan: 86,
      nilaiAkhir: "83,20",
      predikat: "B+",
    },
    {
      mataPelajaran: "Pendidikan Agama dan Budi Pekerti",
      pengetahuan: 79,
      keterampilan: 86,
      nilaiAkhir: "83,20",
      predikat: "B+",
    },
    {
      mataPelajaran: "Pendidikan Agama dan Budi Pekerti",
      pengetahuan: 79,
      keterampilan: 86,
      nilaiAkhir: "83,20",
      predikat: "B+",
    },
  ];

  const dataEskul = [
    {
      kegiatanEskul: "Angklung",
      keterangan: "Mengikuti dengan baik",
    },
  ];

  const dataKehadiran = [
    {
      ketidakhadiran: "Sakit",
      jumlah: 7,
    },
    {
      ketidakhadiran: "Izin",
      jumlah: 1,
    },
    {
      ketidakhadiran: "Tanpa Keterangan",
      jumlah: 0,
    },
  ];

  return (
    <DashboardLayout messageHeader={""} titleHeader={"Laporan Hasil Belajar"}>
      <Card>
        <div className="text-center">
          <Text>Laporan Hasil Belajar (RAPOR)</Text>
          <Text>Dhendi Syafa Athallah Putra</Text>
          <Text>0120301340</Text>
        </div>
        {/* <Tabs defaultValue="Semester 1" className="w-screen lg:w-full">
          <TabsList>
            <TabsTrigger value="Semester 1">Semester 1</TabsTrigger>
            <TabsTrigger value="Semester 2">Semester 2</TabsTrigger>
            <TabsTrigger value="Semester 3">Semester 3</TabsTrigger>
            <TabsTrigger value="Semester 4">Semester 4</TabsTrigger>
            <TabsTrigger value="Semester 5">Semester 5</TabsTrigger>
            <TabsTrigger value="Semester 6">Semester 6</TabsTrigger>
          </TabsList>
          <TabsContent value="Semester 1">
            <RaporTable
              dataEskul={dataEskul}
              dataKehadiran={dataKehadiran}
              dataRapor={dataRapor}
            />
          </TabsContent>
          <TabsContent value="Semester 2">Semester 2</TabsContent>
        </Tabs> */}

        <TabGroup className="w-screen lg:w-full">
          <TabList className="mt-8 flex overflow-x-scroll w-max">
            <Tab>Semester 1</Tab>
            <Tab>Semester 2</Tab>
            <Tab>Semester 3</Tab>
            <Tab>Semester 4</Tab>
            <Tab>Semester 5</Tab>
            <Tab>Semester 6</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <RaporTable
                dataEskul={dataEskul}
                dataKehadiran={dataKehadiran}
                dataRapor={dataRapor}
              />
            </TabPanel>
            <TabPanel>
              <p>2</p>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </DashboardLayout>
  );
};

export default RaporPage;
