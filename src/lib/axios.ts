import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: baseUrl,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn("Token expirado, cerrando sesión automáticamente");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default API;