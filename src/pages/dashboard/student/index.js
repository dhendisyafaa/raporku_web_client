import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAllStudent } from "@/pages/api/resolver/studentResolver";
import { useState } from "react";

import ThreeDotsLoading from "@/components/common/ThreeDotsLoading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AllStudent = () => {
  const { data: students, isLoading } = useAllStudent();
  const [loadingButton, setloadingButton] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDetail, setIsViewDetail] = useState(false);

  const renderTable = () => {
    return students?.data.map((student) => (
      <TableRow key={student.id_siswa}>
        <TableCell className="font-semibold">{student.nama_lengkap}</TableCell>
        <TableCell>{`${student.nis} / \n${student.nisn}`}</TableCell>
        <TableCell>{student.kelas.nama_kelas}</TableCell>
        <TableCell>{student.jenis_kelamin}</TableCell>
        <TableCell>{`${student.tempat_lahir} / \n${student.tanggal_lahir}`}</TableCell>
        {/* <TableCell>{student.alamat}</TableCell>
        <TableCell>{student.no_telepon}</TableCell>
        <TableCell>{student.nama_ayah}</TableCell>
        <TableCell>{student.nama_ibu}</TableCell> */}
        <TableCell>{`${student.tahun_masuk} / \n${student.tahun_lulus}`}</TableCell>
        <TableCell>
          <Link href={`student/${student.id_siswa}`}>
            <Button size="sm">Detail</Button>
          </Link>
        </TableCell>
        {/* <TableCell>
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="h-[95vh] max-w-4xl overflow-y-auto">
              <FormEditStudent student={student} />
            </DialogContent>
          </Dialog>
          <Dialog open={isViewDetail} onOpenChange={setIsViewDetail}>
            <DialogContent className="h-[95vh] max-w-4xl overflow-y-auto">
              <p>{`id ${student.id_siswa}`}</p>
            </DialogContent>
          </Dialog>
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  Hapus data {`${student.nama_lengkap}`} ?
                </DialogTitle>
                <DialogDescription>
                  Untuk melanjutkan, ketik &quot;
                  <span>{`${student.nama_lengkap}`}</span>
                  &quot; dalam kotak dibawah
                </DialogDescription>
                <FormDeleteStudent
                  namaLengkap={student.nama_lengkap}
                  idSiswa={student.id_siswa}
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsViewDetail(true)}>
                Lihat detail siswa
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                Edit siswa
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Hapus siswa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell> */}
      </TableRow>
    ));
  };

  const renderTableHead = () => {
    const dataTableHead = [
      "Nama Lengkap",
      "NIS/NISN",
      "Kelas",
      "L/P",
      "Tempat/Tanggal lahir",
      // "Alamat",
      // "Telepon",
      // "Nama Ayah",
      // "Nama Ibu",
      "Tahun masuk/lulus",
      "Actions",
    ];
    return dataTableHead.map((data, index) => (
      <TableHead key={index + 1}>{data}</TableHead>
    ));
  };

  return (
    <DashboardLayout
      titleHeader={"Tabel data siswa"}
      messageHeader={"Berikut semua data siswa pada kelas ini"}
    >
      {isLoading ? (
        <ThreeDotsLoading />
      ) : (
        <div className="overflow-x-auto w-full">
          <Table>
            <TableCaption>Semua data siswa terbaru</TableCaption>
            <TableHeader>
              <TableRow>{renderTableHead()}</TableRow>
            </TableHeader>
            <TableBody>{renderTable()}</TableBody>
          </Table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AllStudent;
