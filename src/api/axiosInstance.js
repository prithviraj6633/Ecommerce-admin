import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:7000/",
  // remove default Content-Type; let each request set it if needed
});

// Attach JWT token automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // make sure token exists
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
