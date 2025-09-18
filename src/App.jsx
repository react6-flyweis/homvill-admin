import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { authRoutes, routes } from "./routes";
import { LoadingScreen } from "./components/layouts/LoadingScreen";
import AdminLayout from "./components/layouts/AdminLayout";
import NotFoundPage from "./pages/Notfound";
import AuthLayout from "@/components/layouts/AuthLayout";

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/dashboard" element={<AdminLayout />}>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        <Route element={<AuthLayout />}>
          {authRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
