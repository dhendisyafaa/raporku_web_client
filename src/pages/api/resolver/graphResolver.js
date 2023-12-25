import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  getAverageStudentScore,
  getChartRanking,
  getChartSiswa,
  getTotalStudentByYears,
} from "../services/graphApi";

const useChartSiswa = (id) =>
  useQueryNoRefecth(["chart siswa", id], async () => await getChartSiswa(id));

const useChartRanking = (idKelas, semester) =>
  useQueryNoRefecth(
    ["chart ranking", idKelas, semester],
    async () => await getChartRanking(idKelas, semester)
  );

const useTotalStudentByYears = () =>
  useQueryNoRefecth(
    ["total student by years"],
    async () => await getTotalStudentByYears()
  );

const useAverageStudentScore = (idKelas) =>
  useQueryNoRefecth(
    ["average student score by class", idKelas],
    async () => await getAverageStudentScore(idKelas)
  );

export {
  useChartRanking,
  useChartSiswa,
  useAverageStudentScore,
  useTotalStudentByYears,
};
