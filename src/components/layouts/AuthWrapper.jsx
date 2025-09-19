import { Navigate } from "react-router-dom";

import { useAuthStore } from "@/store/authStore";

export const AuthWrapper = ({ children, requireAuth = true }) => {
  // In a real app, you would check for authentication status as well
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // If we're requiring authentication and the user isn't authenticated, redirect to login
  if (requireAuth && !isAuthenticated()) {
    return <Navigate replace to="/login" />;
  }

  // If we don't know their preference yet, go to personalize
  // return <Navigate to="/choose" replace />;
  return <>{children}</>;
};
