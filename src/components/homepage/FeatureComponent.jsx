import { BarChart3, FileText, Gauge, MonitorCheck } from "lucide-react";
import CardFeature from "./CardFeature";

const FeatureComponent = () => {
  const dataCardFeature = [
    {
      header: "Kemudahan Akses",
      content:
        "Data nilai, ranking, dan informasi lainnya menjadi lebih mudah diakses kapan saja dan di mana saja, serta transparan",
      icon: <Gauge />,
    },
    {
      header: "Visualisasi Data yang Menarik",
      content:
        "Membantu siswa untuk memahami kemajuan mereka dan memotivasi mereka untuk meningkatkan prestasi",
      icon: <BarChart3 />,
    },
    {
      header: "Efisiensi dalam Manajemen Data",
      content:
        "Siswa dapat melihat perkembangan nilai mereka selama semester dan guru dapat memasukkan nilai dengan lebih mudah",
      icon: <FileText />,
    },
    {
      header: "Pemantauan Kinerja Guru",
      content:
        "Memantau kinerja guru dengan lebih baik. Admin sekolah dapat melihat bagaimana guru memberikan nilai siswa",
      icon: <MonitorCheck />,
    },
  ];
  return (
    <div
      id="fitur"
      className="grid lg:grid-cols-2 items-center mx-auto gap-8 md:min-h-screen py-10"
    >
      <div className="space-y-4">
        <p className="text-navy text-2xl lg:text-4xl font-medium lg:font-semibold">
          Kenapa harus pakai{" "}
          <span className="underline decoration-orange">Raporku</span>?
        </p>
        <p className="text-lg text-grey leading-snug">
          Aplikasi ini memberikan kemudahan akses data bagi siswa, guru, dan
          admin sekolah. Memungkinkan visualisasi yang jelas tentang
          perkembangan siswa, serta meningkatkan efisiensi manajemen data
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {dataCardFeature.map((item, index) => (
          <CardFeature
            key={index}
            content={item.content}
            header={item.header}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureComponent;
