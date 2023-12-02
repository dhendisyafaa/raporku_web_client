import { baseUrl } from "@/configs/config";
import axios from "axios";

const updateAvatar = (level, idSiswa, data) => {
  // return console.log(`${baseUrl}/avatar/${level}/${idSiswa}`);
  return axios.patch(`${baseUrl}/avatar/${level}/${idSiswa}`, data);
};

export { updateAvatar };
