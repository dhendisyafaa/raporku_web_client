import { baseUrl } from "@/configs/config";
import axios from "axios";

const loginUser = (data) => {
  return axios.post(`${baseUrl}/login`, data);
};

export { loginUser };
