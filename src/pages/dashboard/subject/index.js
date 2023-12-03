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
import { useState } from "react";

import ThreeDotsLoading from "@/components/common/ThreeDotsLoading";
import FormDeleteMajor from "@/components/form/FormDeleteMajor";
import FormEditMajor from "@/components/form/FormEditMajor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAllClassname } from "@/pages/api/resolver/classnameResolver";
import { useRouter } from "next/router";
import FormDeleteClassname from "@/components/form/FormDeleteClassname";
import FormEditClassname from "@/components/form/FormEditClassname";
import { useAllSubject } from "@/pages/api/resolver/subjectResolver";

const AllMajor = () => {
  const { data: subjects, isLoading } = useAllSubject();
  const [loadingButton, setloadingButton] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { push } = useRouter();

  const renderTable = () => {
    return subjects?.data.map((subject) => {
      return (
        <TableRow key={subject.id_kelas}>
          <TableCell className="font-semibold">
            {subject.id_mata_pelajaran}
          </TableCell>
          <TableCell className="font-semibold">
            {subject.kode_pelajaran}
          </TableCell>
          <TableCell className="font-semibold">
            {subject.nama_pelajaran}
          </TableCell>
          <TableCell className="font-semibold">{subject.bobot_nilai}</TableCell>
          <TableCell>
            <div className="flex gap-1">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  {/* <FormEditClassname
                    infoClassname={{
                      classname: subject.nama_kelas,
                      id_classname: subject.id_kelas,
                    }}
                  /> */}
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    Hapus
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      Hapus data {`${subject.nama_kelas}`} ?
                    </DialogTitle>
                    <DialogDescription>
                      Untuk melanjutkan, ketik &quot;
                      <span>{`${subject.nama_kelas}`}</span>
                      &quot; dalam kotak dibawah
                    </DialogDescription>
                  </DialogHeader>
                  {/* <FormDeleteClassname
                    infoClassname={{
                      classname: subject.nama_kelas,
                      id_classname: subject.id_kelas,
                    }}
                  /> */}
                </DialogContent>
              </Dialog>
            </div>
          </TableCell>
        </TableRow>
      );
    });
  };

  const renderTableHead = () => {
    const dataTableHead = [
      "No/ID",
      "Kode Mata Pelajaran",
      "Nama Mata Pelajaran",
      "Bobot",
      "Actions",
    ];
    return dataTableHead.map((data, index) => (
      <TableHead key={index + 1}>{data}</TableHead>
    ));
  };
  return (
    <DashboardLayout
      titleHeader={"Mata pelajaran"}
      messageHeader={"Semua data mata pelajaran"}
    >
      {isLoading ? (
        <ThreeDotsLoading />
      ) : (
        <div className="overflow-x-auto w-full">
          <Table>
            <TableCaption>Semua data mata pelajaran terbaru</TableCaption>
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

export default AllMajor;
