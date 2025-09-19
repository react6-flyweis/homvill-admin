import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_BASE = import.meta.env.VITE_API_BASE || "";

const api = axios.create({
  baseURL: API_BASE,
  headers: {},
  withCredentials: false,
});

// Request interceptor: attach Authorization header when token exists in the auth store
api.interceptors.request.use(
  (config) => {
    try {
      // read token from zustand store
      const token = useAuthStore.getState
        ? useAuthStore.getState().token
        : null;
      if (token) {
        // set Authorization header
        config.headers = config.headers || {};
        // do not overwrite if already present
        if (!config.headers.Authorization && !config.headers.authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (e) {
      // safe to ignore - if store isn't available, proceed without token
      // console.warn('Could not read auth token', e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional place to handle auth globally)
api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Let error propagate to be handled by consumers
    return Promise.reject(error);
  }
);

export default api;
