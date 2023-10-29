import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";

const RaporTable = ({ dataEskul, dataKehadiran, dataRapor }) => {
  return (
    <div className="flex flex-col gap-4 p-1">
      <Card>
        <Title>Nilai Akademik</Title>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>No</TableHeaderCell>
              <TableHeaderCell>Mata Pelajaran</TableHeaderCell>
              <TableHeaderCell>Pengetahuan</TableHeaderCell>
              <TableHeaderCell>Keterampilan</TableHeaderCell>
              <TableHeaderCell>Nilai Akhir</TableHeaderCell>
              <TableHeaderCell>Predikat</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRapor?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Text>{item.mataPelajaran}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.pengetahuan}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.keterampilan}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.nilaiAkhir}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.predikat}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Card>
        <Title>Catatan Akademik</Title>
        <Text className="mt-3">
          Jokester began sneaking into the castle in the middle of the night and
          leaving jokes all over the place: under the kings pillow, in his soup,
          even in the royal toilet. The king was furious, but he couldnt seem to
          stop Jokester. And then, one day, the people of the kingdom discovered
          that the jokes left by Jokester were so funny that they couldnt help
          but laugh. And once they started laughing, they couldnt stop.
        </Text>
      </Card>
      <Card>
        <Title>Ekstrakulikuler</Title>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>No</TableHeaderCell>
              <TableHeaderCell>Kegiatan Ekstrakulikuler</TableHeaderCell>
              <TableHeaderCell>Keterangan</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataEskul?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Text>{item.kegiatanEskul}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.keterangan}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Card>
        <Title>Ketidakhadiran</Title>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>No</TableHeaderCell>
              <TableHeaderCell>Ketidakhadiran</TableHeaderCell>
              <TableHeaderCell>Jumlah</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataKehadiran?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Text>{item.ketidakhadiran}</Text>
                </TableCell>
                <TableCell>
                  <Text>{`${item.jumlah} hari`}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default RaporTable;
