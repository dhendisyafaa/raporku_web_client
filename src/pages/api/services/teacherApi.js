import { baseUrl } from "@/configs/config";
import axios from "axios";

const getAllTeacher = () => {
  return axios.get(`${baseUrl}/guru`);
};

const getTeacherById = (id) => {
  return axios.get(`${baseUrl}/guru/${id}`);
};

const createTeacherData = (data) => {
  return axios.post(`${baseUrl}/guru`, data);
};

const updateTeacherData = (id, data) => {
  return axios.patch(`${baseUrl}/guru/${id}`, data);
};

const deleteTeacherData = (id) => {
  return axios.delete(`${baseUrl}/guru/${id}`);
};

export {
  getAllTeacher,
  getTeacherById,
  createTeacherData,
  updateTeacherData,
  deleteTeacherData,
};
