import { baseUrl } from "@/configs/config";
import { convertToURI } from "@/lib/convertObjectToURI";
import axios from "axios";

const getAllStudent = (params = {}) => {
  const objString = convertToURI(params);
  return axios.get(`${baseUrl}/siswa/${objString}`);
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
