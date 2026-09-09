import { Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import BloodPressurePage from "../pages/BloodPressurePage";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />

        <Route path="/blood-pressure" element={<BloodPressurePage />} />

        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
