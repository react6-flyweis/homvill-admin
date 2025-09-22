import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

const STORAGE_KEY = "homvill_auth";
const STORAGE_TYPE_KEY = "homvill_auth_persist_type"; // values: 'local' | 'session'

function getStorageByType(type) {
  try {
    if (type === "local") return window.localStorage;
    return window.sessionStorage;
  } catch (err) {
    // fallback to sessionStorage-like in-memory if storage isn't available
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
}

// custom storage wrapper that delegates to chosen storage at call time
const customStorage = {
  getItem: (name) => {
    const type = window.localStorage.getItem(STORAGE_TYPE_KEY) || "session";
    return getStorageByType(type).getItem(name);
  },
  setItem: (name, value) => {
    const type = window.localStorage.getItem(STORAGE_TYPE_KEY) || "session";
    return getStorageByType(type).setItem(name, value);
  },
  removeItem: (name) => {
    const type = window.localStorage.getItem(STORAGE_TYPE_KEY) || "session";
    return getStorageByType(type).removeItem(name);
  },
};

export const useAuthStore = create(
  persist(
    immer((set, get) => ({
      // indicates whether persisted state has been rehydrated from storage
      isHydrated: false,
      setIsHydrated(val) {
        set((state) => {
          state.isHydrated = val;
        });
      },
      token: null,
      user: null,
      // remember controls whether we persist to localStorage (true) or sessionStorage (false)
      remember: false,
      setRemember(val = false) {
        // when toggling remember, migrate existing persisted entry to the other storage type
        try {
          const currentType =
            window.localStorage.getItem(STORAGE_TYPE_KEY) || "session";
          const newType = val ? "local" : "session";
          if (currentType !== newType) {
            const from = getStorageByType(currentType);
            const to = getStorageByType(newType);
            const existing = from.getItem(STORAGE_KEY);
            if (existing != null) {
              to.setItem(STORAGE_KEY, existing);
              from.removeItem(STORAGE_KEY);
            }
            window.localStorage.setItem(STORAGE_TYPE_KEY, newType);
          }
        } catch (e) {
          // ignore storage migration errors
        }
        set((state) => {
          state.remember = !!val;
        });
      },
      setToken(token) {
        set((state) => {
          state.token = token;
        });
      },
      clearToken() {
        set((state) => {
          state.token = null;
        });
      },
      setUser(user) {
        set((state) => {
          state.user = user;
        });
      },
      clearUser() {
        set((state) => {
          state.user = null;
        });
      },
      isAuthenticated() {
        return !!get().token;
      },
    })),
    {
      name: STORAGE_KEY,
      // use our custom storage wrapper so we can delegate to session/local based on flag
      getStorage: () => customStorage,
      onRehydrateStorage: () => (state, error) => {
        // if there was an error during rehydration, still mark hydrated so app can proceed
        state && state.setIsHydrated && state.setIsHydrated(true);
        if (error) {
          // optionally log or handle the error here
          // console.error('authStore rehydrate error', error);
        }
      },
    }
  )
);
