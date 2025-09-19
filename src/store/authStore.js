import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

const STORAGE_KEY = "homvill_auth";

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
      getStorage: () => localStorage,
      // called when rehydration starts/finishes; set isHydrated true after rehydrate
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
