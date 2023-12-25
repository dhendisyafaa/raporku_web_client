import EmptyStateIllustration from "@/components/common/EmptyStateIllustration";
import LoadingComponent from "@/components/common/LoadingComponent";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAllSchoolYear } from "@/pages/api/resolver/schoolYearResolver";
import Link from "next/link";

const AllSchoolYear = ({ className }) => {
  const { data: schoolYears, isLoading } = useAllSchoolYear();

  const renderTable = () => {
    return schoolYears?.data.map((schoolYear, index) => (
      <TableRow key={index}>
        <TableCell>{index + 1}</TableCell>
        <TableCell className="font-semibold">
          {schoolYear.kode_tahun_ajaran}
        </TableCell>
        <TableCell>{schoolYear.jumlah_peserta_didik}</TableCell>
        <TableCell>{schoolYear.tanggal_mulai}</TableCell>
        <TableCell>{schoolYear.tanggal_berakhir}</TableCell>
      </TableRow>
    ));
  };

  const renderTableHead = () => {
    const dataTableHead = [
      "No",
      "Kode tahun ajaran",
      "Jumlah peserta didik",
      "Tanggal mulai",
      "Tanggal berakhir",
    ];

    return dataTableHead.map((data, index) => (
      <TableHead key={index + 1}>{data}</TableHead>
    ));
  };

  return (
    <DashboardLayout
      titleHeader={"Tahun ajaran"}
      messageHeader={"Semua data tahun ajaran"}
    >
      {isLoading ? (
        <LoadingComponent />
      ) : schoolYears?.data?.length !== undefined ? (
        <div className="overflow-x-auto w-full">
          <Table>
            <TableCaption>Semua data tahun ajaran terbaru</TableCaption>
            <TableHeader>
              <TableRow>{renderTableHead()}</TableRow>
            </TableHeader>
            <TableBody>{renderTable()}</TableBody>
          </Table>
        </div>
      ) : (
        <EmptyStateIllustration
          headerText={"Belum terdapat data untuk ditampilkan"}
          bodyText={"Buat data tahun ajaran terlebih dahulu"}
          illustration={"/images/match_not_found.svg"}
        />
      )}
    </DashboardLayout>
  );
};

export default AllSchoolYear;
