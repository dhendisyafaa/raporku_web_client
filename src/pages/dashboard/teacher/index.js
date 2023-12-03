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
import { useAllteacher } from "@/pages/api/resolver/teacherResolver";
import { useState } from "react";

import ThreeDotsLoading from "@/components/common/ThreeDotsLoading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAllTeacher } from "@/pages/api/resolver/teacherResolver";

const AllTeacher = () => {
  const { data: teachers, isLoading } = useAllTeacher();
  const [loadingButton, setloadingButton] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDetail, setIsViewDetail] = useState(false);

  const renderTable = () => {
    return teachers?.data.map((teacher) => (
      <TableRow key={teacher.id_guru}>
        <TableCell className="font-semibold">{teacher.nama_lengkap}</TableCell>
        <TableCell>{`${teacher.nip}`}</TableCell>
        <TableCell>{teacher.pendidikan_tertinggi}</TableCell>
        <TableCell>{teacher.jenis_kelamin}</TableCell>
        <TableCell>{`${teacher.tempat_lahir} / \n${teacher.tanggal_lahir}`}</TableCell>
        <TableCell>
          <Link href={`teacher/${teacher.id_guru}`}>
            <Button size="sm">Detail</Button>
          </Link>
        </TableCell>
      </TableRow>
    ));
  };

  const renderTableHead = () => {
    const dataTableHead = [
      "Nama Lengkap",
      "NIP",
      "Pend. Tertinggi",
      "L/P",
      "Tempat/Tanggal lahir",
      "Actions",
    ];
    return dataTableHead.map((data, index) => (
      <TableHead key={index + 1}>{data}</TableHead>
    ));
  };

  return (
    <DashboardLayout
      titleHeader={"Tabel informasi data guru"}
      messageHeader={"Semua data guru pada sekolah ini"}
    >
      {isLoading ? (
        <ThreeDotsLoading />
      ) : (
        <div className="overflow-x-auto w-full">
          <Table>
            <TableCaption>Semua data guru terbaru</TableCaption>
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

export default AllTeacher;
