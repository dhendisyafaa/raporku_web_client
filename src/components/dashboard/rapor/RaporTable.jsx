import LoadingComponent from "@/components/common/LoadingComponent.jsx";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useUserData from "@/hooks/useUserData";
import { useRaporByStudent } from "@/pages/api/resolver/raporResolver";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import { FileEdit, Trash } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const RaporTable = () => {
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const { userId, level } = useUserData();
  const { query } = useRouter();
  let idStudent;
  if (level === "siswa") {
    idStudent = userId;
  } else if (level === "guru") {
    idStudent = query.siswa;
  }

  const { data: rapors, isLoading } = useRaporByStudent({
    id: idStudent,
    semester: query.semester,
  });

  const rapor = rapors?.data;

  const formSchema = z.object({
    major: z.string().min(2, {
      nilai_harian: "Nilai harian wajib untuk diisi",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // nilai_harian: `${infoMajor.majorName}`,
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("e", e);
  };

  if (isLoading) return <LoadingComponent />;

  return (
    <>
      <Dialog open={openDialogEdit} onOpenChange={setOpenDialogEdit}>
        <DialogContent className="max-h-[95vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ubah Nilai Siswa</DialogTitle>
            <DialogDescription>
              Anda hanya dapat mengubah pada nilai akademik
            </DialogDescription>
          </DialogHeader>
          <>
            <form onSubmit={(e) => onSubmit(e)}>
              <Table className="mt-5">
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Mata Pelajaran</TableHeaderCell>
                    <TableHeaderCell>Nilai Harian</TableHeaderCell>
                    <TableHeaderCell>Nilai Semester</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rapor?.nilai_siswa &&
                    Object.entries(rapor?.nilai_siswa).map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item[0]}</TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            defaultValue={item[1].nilai[0].nilai_harian}
                            // onChange={(e) => field.onChange(e.target.value)}
                            name={`nilai_harian_${index}`}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            defaultValue={item[1].nilai[0].nilai_semester}
                            // onChange={(e) => field.onChange(e.target.value)}
                            name={`nilai_semester_${index}`}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <Button type="submit">Simpan Perubahan</Button>
            </form>
          </>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col gap-4 pb-3">
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
              <div className="flex items-center justify-between">
                <Title>Nilai Akademik</Title>
                {/* {level === "guru" && (
                  <div className="flex gap-1 items-center">
                    <Button
                      size="sm"
                      className="hidden md:block"
                      variant="outline"
                      onClick={() => setOpenDialogEdit(true)}
                    >
                      Ubah Nilai Siswa
                    </Button>
                    <Button
                      size="sm"
                      className="hidden md:block"
                      variant="destructive"
                      onClick={() => {}}
                    >
                      Hapus Rapor
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="block md:hidden"
                      onClick={() => setOpenDialogEdit(true)}
                    >
                      <FileEdit className="mx-auto w-5 h-5" />
                    </Button>
                    <Button
                      size="icon"
                      className="block md:hidden"
                      variant="destructive"
                      onClick={() => {}}
                    >
                      <Trash className="mx-auto w-5 h-5" />
                    </Button>
                  </div>
                )} */}
              </div>
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
                          <Text>{item[1].nilai[0].nilai_harian}</Text>
                        </TableCell>
                        <TableCell>
                          <Text>{item[1].nilai[0].nilai_semester}</Text>
                        </TableCell>
                        <TableCell>
                          <Text>{item[1].nilai[0].nilai_akhir}</Text>
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
          </>
        ) : (
          <div className="grid place-items-center h-[50vh]">
            <p className="text-gray-400 text-sm">
              Belum terdapat data rapor untuk semester ini
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default RaporTable;
