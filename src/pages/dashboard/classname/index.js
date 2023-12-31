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

import LoadingComponent from "@/components/common/LoadingComponent.jsx";
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
import EmptyStateIllustration from "@/components/common/EmptyStateIllustration";

const AllMajor = () => {
  const { data: classnames, isLoading } = useAllClassname();
  const [loadingButton, setloadingButton] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { push } = useRouter();

  const renderTable = () => {
    return classnames?.data.map((classname) => {
      return (
        <TableRow key={classname.id_kelas}>
          <TableCell className="font-semibold">{classname.id_kelas}</TableCell>
          <TableCell className="font-semibold">
            {classname.nama_kelas}
          </TableCell>
          <TableCell className="font-semibold">
            {classname?.jurusan?.nama_jurusan}
          </TableCell>
          {classname?.wali_kelas ? (
            <TableCell className="font-semibold">
              {classname?.wali_kelas?.nama_lengkap}
            </TableCell>
          ) : (
            <TableCell className="text-gray-700">
              Belum terdapat wali kelas
            </TableCell>
          )}
          <TableCell className="font-semibold">
            {classname.jumlah_siswa}
          </TableCell>
          <TableCell>
            <div className="flex gap-1">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <FormEditClassname
                    infoClassname={{
                      classname: classname.nama_kelas,
                      id_classname: classname.id_kelas,
                      id_jurusan: classname.id_jurusan,
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
                      Hapus data {`${classname.nama_kelas}`} ?
                    </DialogTitle>
                    <DialogDescription>
                      Untuk melanjutkan, ketik &quot;
                      <span>{`${classname.nama_kelas}`}</span>
                      &quot; dalam kotak dibawah
                    </DialogDescription>
                  </DialogHeader>
                  <FormDeleteClassname
                    infoClassname={{
                      classname: classname.nama_kelas,
                      id_classname: classname.id_kelas,
                    }}
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
    const dataTableHead = [
      "No/ID",
      "Nama Kelas",
      "Nama Jurusan",
      "Wali Kelas",
      "Jumlah Siswa",
      "Actions",
    ];
    return dataTableHead.map((data, index) => (
      <TableHead key={index + 1}>{data}</TableHead>
    ));
  };
  return (
    <DashboardLayout
      titleHeader={"Tabel semua data kelas"}
      messageHeader={"Semua data kelas"}
    >
      {isLoading ? (
        <LoadingComponent />
      ) : classnames?.data?.length !== undefined ? (
        <div className="overflow-x-auto w-full">
          <Table>
            <TableCaption>Semua data kelas terbaru</TableCaption>
            <TableHeader>
              <TableRow>{renderTableHead()}</TableRow>
            </TableHeader>
            <TableBody>{renderTable()}</TableBody>
          </Table>
        </div>
      ) : (
        <EmptyStateIllustration
          headerText={"Belum terdapat data untuk ditampilkan"}
          bodyText={"Buat data kelas terlebih dahulu"}
          illustration={"/images/match_not_found.svg"}
        />
      )}
    </DashboardLayout>
  );
};

export default AllMajor;
