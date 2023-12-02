import { baseUrl } from "@/configs/config";
import axios from "axios";

const getAllStudent = () => {
  return axios.get(`${baseUrl}/siswa`);
};

const getAllStudentByClass = (id) => {
  return axios.get(`${baseUrl}/siswa-kelas/${id}`);
};

const getStudentById = (id) => {
  return axios.get(`${baseUrl}/siswa/${id}`);
};

const createStudentData = (data) => {
  return axios.post(`${baseUrl}/siswa/`, data);
};

const updateStudentData = (id, data) => {
  return axios.patch(`${baseUrl}/siswa/${id}`, data);
};

const deleteStudentData = (id) => {
  return axios.delete(`${baseUrl}/siswa/${id}`);
};

export {
  getAllStudent,
  getAllStudentByClass,
  getStudentById,
  createStudentData,
  updateStudentData,
  deleteStudentData,
};
