import { baseUrl } from "@/configs/config";
import axios from "axios";

const getRaporByStudent = (id, semester) => {
  return axios.get(
    `${baseUrl}/nilai-siswa/${id}/nilai?nama_semester=${semester}`
  );
};

const createRapor = (data) => {
  return axios.post(`${baseUrl}/nilai-siswa/`, data);
};

export { createRapor, getRaporByStudent };
