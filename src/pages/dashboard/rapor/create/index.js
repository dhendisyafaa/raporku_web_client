import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

import LoadingComponent from "@/components/common/LoadingComponent.jsx";
import { Button } from "@/components/ui/button";
import useUserData from "@/hooks/useUserData";
import { useAllStudentByClass } from "@/pages/api/resolver/studentResolver";
import Link from "next/link";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import EmptyStateIllustration from "@/components/common/EmptyStateIllustration";

const CreateRaporAllStudent = () => {
  const { userData } = useUserData();
  const { data: students, isLoading } = useAllStudentByClass(
    userData?.id_kelas
  );
  const [loadingButton, setloadingButton] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDetail, setIsViewDetail] = useState(false);

  const [sorting, setSorting] = useState([]);

  const columns = [
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Lengkap
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "nama_lengkap",
    },
    {
      header: "NIS/NISN",
      accessorFn: (row) => `${row.nis} / ${row.nisn}`,
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Kelas
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "kelas.nama_kelas",
    },
    {
      header: "L/P",
      accessorKey: "jenis_kelamin",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tahun Ajaran
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "kode_tahun_ajaran",
    },
    {
      header: "Actions",
      accessorKey: "id_siswa",
      cell: ({ row }) => {
        return (
          <div className="flex gap-0.5 items-center">
            <Link
              href={`/dashboard/rapor?siswa=${row?.original?.id_siswa}&semester=1`}
            >
              <Button size="sm">Lihat</Button>
            </Link>
            <Link href={`create/${row?.original?.id_siswa}`}>
              <Button size="sm">Buat Rapor</Button>
            </Link>
          </div>
          // <Link href={`student/${row?.original?.id_siswa}`}>
          //   <Button size="sm">Detail</Button>
          // </Link>
        );
      },
    },
  ];

  const data = students?.data;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <DashboardLayout
      titleHeader={"Buat laporan belajar siswa"}
      messageHeader={"Data yang dimasukkan wajib data yang sebenarnya"}
    >
      {isLoading ? (
        <LoadingComponent />
      ) : students?.data?.length !== undefined ? (
        <div className="overflow-x-auto w-full">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="font-medium">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <EmptyStateIllustration
          headerText={"Belum terdapat data untuk ditampilkan"}
          bodyText={"Hubungi admin untuk membuat data siswa"}
          illustration={"/images/match_not_found.svg"}
        />
      )}
    </DashboardLayout>
  );
};

export default CreateRaporAllStudent;
