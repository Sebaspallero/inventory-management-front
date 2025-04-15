import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
    
  baseURL: baseUrl,
});

API.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.message?.includes("expired")
    ) {
      console.warn("Token expirado, cerrando sesión automáticamente");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;