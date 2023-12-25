import { baseUrl } from "@/configs/config";
import axios from "axios";

const getChartSiswa = (id) => {
  return axios.get(`${baseUrl}/chart-siswa/${id}`);
};

const getChartRanking = (idKelas, semester) => {
  return axios.get(
    `${baseUrl}/kelas-ranking/${idKelas}?nama_semester=${semester}`
  );
};

const getTotalStudentByYears = () => {
  return axios.get(`${baseUrl}/chart-data/tahun-ajaran`);
};

const getAverageStudentScore = (idKelas) => {
  return axios.get(`${baseUrl}/total-nilai/${idKelas}`);
};

export {
  getChartRanking,
  getChartSiswa,
  getAverageStudentScore,
  getTotalStudentByYears,
};
