import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
    
  baseURL: baseUrl,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;