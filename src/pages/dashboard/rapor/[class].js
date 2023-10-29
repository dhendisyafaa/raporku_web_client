import DashboardLayout from "@/components/dashboard/DashboardLayout";
import RaporTable from "@/components/dashboard/rapor/RaporTable";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";

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

  const tabSemester = [
    {
      title: "PTS 1",
    },
    {
      title: "PAS 1",
    },
    {
      title: "PTS 2",
    },
    {
      title: "PAS 2",
    },
  ];

  return (
    <DashboardLayout
      messageHeader={"test"}
      titleHeader={"Laporan Hasil Belajar"}
    >
      <div className="w-screen h-screen md:w-full">
        <TabGroup>
          <TabList color="red" variant="solid">
            {tabSemester.map((item, index) => (
              <Tab key={index}>{item.title}</Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <RaporTable
                className="overflow-x-auto"
                dataEskul={dataEskul}
                dataKehadiran={dataKehadiran}
                dataRapor={dataRapor}
              />
              {/* <p>1</p> */}
            </TabPanel>
            <TabPanel>
              <p>2</p>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </DashboardLayout>
  );
};

export default RaporPage;
