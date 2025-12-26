import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Handle expired/invalid token (401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Clear tokens
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("id");
      localStorage.removeItem("isAdmin");
      // Redirect to login
      window.location.href = "/loginform";
    }
    return Promise.reject(error);
  }
);
export default api;
