import { baseUrl } from "@/configs/config";
import axios from "axios";

const updateAvatar = (level, idSiswa, data) => {
  return axios.patch(`${baseUrl}/avatar/${level}/${idSiswa}`, data);
};

const removeAvatar = (level, idSiswa, data) => {
  return axios.delete(`${baseUrl}/avatar/${level}/${idSiswa}`);
};

export { updateAvatar, removeAvatar };
