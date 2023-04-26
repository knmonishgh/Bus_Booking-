import axios from "axios";


axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
export const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});