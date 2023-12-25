import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import LoadingComponent from "@/components/common/LoadingComponent.jsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { baseUrl } from "@/configs/config";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAllStudent } from "@/pages/api/resolver/studentResolver";
import EmptyStateIllustration from "@/components/common/EmptyStateIllustration";

const AllStudent = () => {
  const [loadingButton, setloadingButton] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDetail, setIsViewDetail] = useState(false);
  const [sorting, setSorting] = useState([]);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const {
    data: students,
    isLoading,
    refetch,
    error,
    isFetching,
  } = useAllStudent(router.query.q);

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
      header: "Tempat/Tanggal lahir",
      accessorFn: (row) => `${row.tempat_lahir} / ${row.tanggal_lahir}`,
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
          <Link href={`student/${row?.original?.id_siswa}`}>
            <Button size="sm">Detail</Button>
          </Link>
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

  const handleSearch = (e) => {
    e.preventDefault();
    router.push({
      href: router.asPath,
      query: {
        q: search,
      },
    });
  };

  useEffect(() => {
    if (router.isReady) {
      setSearch(router.query.q);
      refetch();
    }
  }, [router.isReady, refetch, router.query.q]);

  return (
    <DashboardLayout
      titleHeader={"Tabel informasi semua siswa"}
      messageHeader={"Semua data siswa pada sekolah ini"}
    >
      <form onSubmit={(e) => handleSearch(e)}>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            className="max-w-xs"
            placeholder="Cari nama siswa"
          />
          <Button
            type="submit"
            onClick={(e) => handleSearch(e)}
            disabled={!search}
          >
            Cari
          </Button>
        </div>
      </form>
      {isLoading || isFetching ? (
        <LoadingComponent />
      ) : students?.data?.length !== undefined ? (
        error?.response?.status === 404 ? (
          <div className="flex h-full text-gray-800 justify-center items-center">
            Tidak terdapat nama siswa {router.query.q}
          </div>
        ) : (
          <div className="overflow-x-auto w-full mt-3">
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
        )
      ) : (
        <EmptyStateIllustration
          headerText={"Belum terdapat data untuk ditampilkan"}
          bodyText={"Buat data siswa terlebih dahulu"}
          illustration={"/images/match_not_found.svg"}
        />
      )}
    </DashboardLayout>
  );
};

export default AllStudent;
