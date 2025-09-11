import { Routes, Route } from "react-router-dom";
import { authRoutes, routes } from "./routes";
import AdminLayout from "./components/AdminLayout";

const App = () => {
  return (
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
    </Routes>
  );
};

export default App;
