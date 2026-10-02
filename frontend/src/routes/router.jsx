import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout.jsx";
import BloodPressurePage from "../pages/BloodPressurePage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "blood-pressure",
            element: <BloodPressurePage />,
          },
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
