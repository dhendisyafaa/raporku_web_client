import { baseUrl } from "@/configs/config";
import axios from "axios";

const getAllMajor = () => {
  return axios.get(`${baseUrl}/jurusan`);
};

const createMajorData = (data) => {
  return axios.post(`${baseUrl}/jurusan/`, data);
};

const updateMajorData = (id, data) => {
  return axios.patch(`${baseUrl}/jurusan/${id}`, data);
};

const deleteMajorData = (id) => {
  return axios.delete(`${baseUrl}/jurusan/${id}`);
};

export { getAllMajor, createMajorData, deleteMajorData, updateMajorData };
