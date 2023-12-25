import { baseUrl } from "@/configs/config";
import axios from "axios";

const getAllSchoolYear = () => {
  return axios.get(`${baseUrl}/tahun-ajaran`);
};

const createSchoolYear = (data) => {
  return axios.post(`${baseUrl}/tahun-ajaran/`, data);
};

export { createSchoolYear, getAllSchoolYear };
