import EmptyStateIllustration from "@/components/common/EmptyStateIllustration";
import useUserData from "@/hooks/useUserData";
import { useChartRanking } from "@/pages/api/resolver/graphResolver";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";
import { useRouter } from "next/router";

const RankingTable = () => {
  const { query } = useRouter();
  const { userData } = useUserData();
  const { data: dataRanking, isLoading } = useChartRanking(
    userData.id_kelas,
    query.ranking || 1
  );

  const ranking = dataRanking?.data?.siswa;

  if (ranking?.length === 0)
    return (
      <EmptyStateIllustration
        headerText={"Belum terdapat data untuk ditampilkan"}
        bodyText={"Buat rapor siswa terlebih dahulu"}
        illustration={"/images/match_not_found.svg"}
      />
    );

  return (
    <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell>No</TableHeaderCell>
          <TableHeaderCell>Nama Siswa</TableHeaderCell>
          <TableHeaderCell>Tahun Ajaran</TableHeaderCell>
          <TableHeaderCell>Bobot Nilai Akhir</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {ranking?.map((item, index) => {
          return (
            <TableRow key={index + 1}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Text>{item.nama_lengkap}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.kode_tahun_ajaran}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.bobot_nilai_akhir}</Text>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default RankingTable;
