import { baseUrl } from "@/configs/config";
import axios from "axios";

const getUserById = (levelUser, idUser) => {
  return axios.get(`${baseUrl}/${levelUser}/${idUser}`);
};

export { getUserById };
