import { baseUrl } from "@/configs/config";
import axios from "axios";

const getAllClassname = () => {
  return axios.get(`${baseUrl}/kelas`);
};

const createClassname = (data) => {
  return axios.post(`${baseUrl}/kelas/`, data);
};

const updateClassname = (id, data) => {
  return axios.patch(`${baseUrl}/kelas/${id}`, data);
};

const deleteClassname = (id) => {
  return axios.delete(`${baseUrl}/kelas/${id}`);
};

export { getAllClassname, createClassname, deleteClassname, updateClassname };
