import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

const ADMIN_LOGIN = "/api/user/admin-login";

async function adminLogin(payload) {
  const { data } = await api.post(ADMIN_LOGIN, payload);
  return data;
}

export function useAdminLogin() {
  const authStore = useAuthStore();
  return useMutation({
    mutationFn: adminLogin,
    onSuccess: (data) => {
      authStore.setToken(data.data.token);
      authStore.setUser(data.data.user);
    },
  });
}
