import axios from "axios";

const axiosDefaultParams = {
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_TO_DO_API_URL,
  ...axiosDefaultParams,
});

export default axiosInstance;
