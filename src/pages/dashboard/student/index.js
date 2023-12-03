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
        <TableCell>{`${student.tahun_masuk} / \n${student.tahun_lulus}`}</TableCell>
        <TableCell>
          <Link href={`student/${student.id_siswa}`}>
            <Button size="sm">Detail</Button>
          </Link>
        </TableCell>
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
      "Tahun masuk/lulus",
      "Actions",
    ];
    return dataTableHead.map((data, index) => (
      <TableHead key={index + 1}>{data}</TableHead>
    ));
  };

  return (
    <DashboardLayout
      titleHeader={"Tabel informasi semua siswa"}
      messageHeader={"Semua data siswa pada sekolah ini"}
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
