import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import { getChartSiswa } from "../services/graphApi";

const useChartSiswa = (id) =>
  useQueryNoRefecth(["chart siswa", id], async () => await getChartSiswa(id));

export { useChartSiswa };
