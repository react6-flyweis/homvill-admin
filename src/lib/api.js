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
  async (error) => {
    // If we have no response or no config, just reject
    const originalRequest = error?.config;
    const status = error?.response?.status;

    // Do not perform retry or global logout for authentication endpoints (login, password reset, etc.)
    const AUTH_EXCLUDE = ["/api/user/admin-login"];
    const isAuthRequest = !!(
      originalRequest &&
      originalRequest.url &&
      AUTH_EXCLUDE.some((u) => originalRequest.url.includes(u))
    );
    if (isAuthRequest) {
      // Let the consumer handle auth endpoint errors (e.g., bad credentials)
      return Promise.reject(error);
    }

    // If 401, try one retry (in case token was just updated in the store)
    if (status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Re-read token from zustand store and attach if present
        const token = useAuthStore.getState
          ? useAuthStore.getState().token
          : null;
        if (token) {
          originalRequest.headers = originalRequest.headers || {};
          if (
            !originalRequest.headers.Authorization &&
            !originalRequest.headers.authorization
          ) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
        }

        // Retry the original request once
        return api(originalRequest);
      } catch (e) {
        // fall through to logout handling below
      }
    }

    // If still 401 (or retry not possible), clear auth and redirect to login
    if (status === 401) {
      try {
        const store = useAuthStore.getState ? useAuthStore.getState() : {};
        store.clearToken && store.clearToken();
        store.clearUser && store.clearUser();
      } catch (e) {
        // ignore
      }
      if (typeof window !== "undefined") {
        // navigate to login page so the app can re-authenticate
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
