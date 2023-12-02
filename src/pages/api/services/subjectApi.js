import { baseUrl } from "@/configs/config";
import axios from "axios";

const getAllSubject = () => {
  return axios.get(`${baseUrl}/mapel`);
};

const createSubject = (data) => {
  return axios.post(`${baseUrl}/mapel/`, data);
};

const updateSubject = (id, data) => {
  return axios.patch(`${baseUrl}/mapel/${id}`, data);
};

const deleteSubject = (id) => {
  return axios.delete(`${baseUrl}/mapel/${id}`);
};

export { getAllSubject, createSubject, deleteSubject, updateSubject };
