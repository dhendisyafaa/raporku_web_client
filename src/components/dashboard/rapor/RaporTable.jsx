import ThreeDotsLoading from "@/components/common/ThreeDotsLoading";
import useUserData from "@/hooks/useUserData";
import { useRaporByStudent } from "@/pages/api/resolver/raporResolver";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import { useRouter } from "next/router";

const RaporTable = ({ dataEskul, dataKehadiran, dataRapor }) => {
  const { userId } = useUserData();
  const { query } = useRouter();
  const { data: rapors, isLoading } = useRaporByStudent(userId, query.semester);
  const rapor = rapors?.data;

  if (isLoading) return <ThreeDotsLoading className={"w-full h-[80vh]"} />;

  return (
    <div className="flex flex-col gap-4 p-1">
      {rapor.bobot_nilai_akhir !== "NaN" ? (
        <>
          <Card className="text-center font-bold">
            <Text>LAPORAN HASIL BELAJAR (RAPOR)</Text>
            <Text>{`SEMESTER ${query.semester}`}</Text>
            <Text>TAHUN AJARAN {rapor?.siswa_info.kode_tahun_ajaran}</Text>
            <div className="text-left font-normal mt-3">
              <table>
                <tr>
                  <td className="w-44">
                    <Text>Nama Peserta Didik</Text>
                  </td>
                  <td>
                    <Text>: {rapor?.siswa_info.nama_lengkap}</Text>
                  </td>
                </tr>
                <tr className="w-44">
                  <td>
                    <Text>NIS</Text>
                  </td>
                  <td>
                    <Text>: {rapor?.siswa_info.nis}</Text>
                  </td>
                </tr>
                <tr className="w-44">
                  <td>
                    <Text>NISN</Text>
                  </td>
                  <td>
                    <Text>: {rapor?.siswa_info.nisn}</Text>
                  </td>
                </tr>
              </table>
            </div>
          </Card>
          <Card>
            <Title>Nilai Akademik</Title>
            <Table className="mt-5">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Mata Pelajaran</TableHeaderCell>
                  <TableHeaderCell>Bobot</TableHeaderCell>
                  <TableHeaderCell>Nilai Harian</TableHeaderCell>
                  <TableHeaderCell>Nilai Semester</TableHeaderCell>
                  <TableHeaderCell>Nilai Akhir</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rapor?.nilai_siswa &&
                  Object.entries(rapor?.nilai_siswa).map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item[0]}</TableCell>
                      <TableCell>
                        <Text>{item[1].bobot}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{item[1].nilai[0].nilai_akhir}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{item[1].nilai[0].nilai_harian}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{item[1].nilai[0].nilai_semester}</Text>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <hr />
            <Card className="w-full space-y-3 mt-4">
              <div className="flex items-center justify-between border-b pb-3">
                <Text>Rata-rata nilai</Text>
                <Text>{rapor.rata_rata_nilai}</Text>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <Text>Bobot nilai akhir</Text>
                <Text className="font-bold">{rapor.bobot_nilai_akhir}</Text>
              </div>
              <div className="flex items-center justify-between">
                <Text>Nilai akhir</Text>
                <Text>{rapor.total_hasil_akhir}</Text>
              </div>
            </Card>
          </Card>
          {/* <Card>
        <Title>Catatan Akademik</Title>
        <Text className="mt-3">
          Jokester began sneaking into the castle in the middle of the night and
          leaving jokes all over the place: under the kings pillow, in his soup,
          even in the royal toilet. The king was furious, but he couldnt seem to
          stop Jokester. And then, one day, the people of the kingdom discovered
          that the jokes left by Jokester were so funny that they couldnt help
          but laugh. And once they started laughing, they couldnt stop.
        </Text>
      </Card>
      <Card>
        <Title>Ekstrakulikuler</Title>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>No</TableHeaderCell>
              <TableHeaderCell>Kegiatan Ekstrakulikuler</TableHeaderCell>
              <TableHeaderCell>Keterangan</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataEskul?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Text>{item.kegiatanEskul}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.keterangan}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Card>
        <Title>Ketidakhadiran</Title>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>No</TableHeaderCell>
              <TableHeaderCell>Ketidakhadiran</TableHeaderCell>
              <TableHeaderCell>Jumlah</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataKehadiran?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Text>{item.ketidakhadiran}</Text>
                </TableCell>
                <TableCell>
                  <Text>{`${item.jumlah} hari`}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card> */}
        </>
      ) : (
        <div className="grid place-items-center h-[50vh]">
          <p className="text-gray-400 text-sm">
            Belum terdapat data rapor untuk semester ini
          </p>
        </div>
      )}
    </div>
  );
};

export default RaporTable;
