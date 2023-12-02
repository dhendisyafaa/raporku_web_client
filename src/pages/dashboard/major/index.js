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
import { useAllMajor } from "@/pages/api/resolver/majorResolver";
import { useRouter } from "next/router";
import FormDeleteMajor from "@/components/form/FormDeleteMajor";

const AllMajor = () => {
  const { data: majors, isLoading } = useAllMajor();
  const [loadingButton, setloadingButton] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { push } = useRouter();

  const renderTable = () => {
    return majors?.data.map((major) => {
      const utcDate = new Date(major.createdAt);
      const createdAt = utcDate.toLocaleString();
      return (
        <TableRow key={major.id_jurusan}>
          <TableCell className="font-semibold">{major.id_jurusan}</TableCell>
          <TableCell className="font-semibold">{major.nama_jurusan}</TableCell>
          <TableCell className="font-semibold">{createdAt}</TableCell>
          <TableCell className="font-semibold">
            <div className="flex gap-1">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <FormEditMajor
                    infoMajor={{
                      majorName: major.nama_jurusan,
                      idMajor: major.id_jurusan,
                    }}
                  />
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
                      Hapus data {`${major.nama_jurusan}`} ?
                    </DialogTitle>
                    <DialogDescription>
                      Untuk melanjutkan, ketik &quot;
                      <span>{`${major.nama_jurusan}`}</span>
                      &quot; dalam kotak dibawah
                    </DialogDescription>
                  </DialogHeader>
                  <FormDeleteMajor
                    major={major.nama_jurusan}
                    idMajor={major.id_jurusan}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </TableCell>
        </TableRow>
      );
    });
  };

  const renderTableHead = () => {
    const dataTableHead = ["No/ID", "Nama Jurusan", "Dibuat", "Actions"];
    return dataTableHead.map((data, index) => (
      <TableHead key={index + 1}>{data}</TableHead>
    ));
  };
  return (
    <DashboardLayout messageHeader={"Edit akunmu"} titleHeader={"Pengaturan"}>
      {isLoading ? (
        <ThreeDotsLoading />
      ) : (
        <div className="overflow-x-auto w-full">
          <Table>
            <TableCaption>Semua data jurusan terbaru</TableCaption>
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
