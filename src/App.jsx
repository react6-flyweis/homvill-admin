import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { authRoutes, routes } from "./routes";
import { LoadingScreen } from "./components/layouts/LoadingScreen";
import AdminLayout from "./components/AdminLayout";
import NotFoundPage from "./pages/Notfound";

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/dashboard" element={<AdminLayout />}>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        <Route>
          {authRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
