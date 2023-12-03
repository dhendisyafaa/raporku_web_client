import { baseUrl } from "@/configs/config";
import axios from "axios";

const getChartSiswa = (id) => {
  return axios.get(`${baseUrl}/chart-siswa/${id}`);
};

export { getChartSiswa };
