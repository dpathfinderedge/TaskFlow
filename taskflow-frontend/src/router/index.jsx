import { createBrowserRouter } from "react-router-dom";

import { Landing, NotFound } from "../features/landing/pages";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../features/dashboard/pages/Dashboard";
import Projects from "../features/projects/pages/Projects";
import Tasks from "../features/tasks/pages/Tasks";
import Team from "../features/team/pages/Team";
import Notifications from "../features/notifications/pages/Notifications";
import Activity from "../features/activity/pages/Activity";
import Settings from "../features/settings/pages/Settings";

import { useAuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({children}) => {
  const { user } = useAuthContext();
  console.log(user);

  return user ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: "projects", element: <Projects /> },
      { path: "tasks", element: <Tasks /> },
      { path: "team", element: <Team /> },
      { path: "notifications", element: <Notifications /> },
      { path: "activity", element: <Activity /> },
      { path: "settings", element: <Settings /> },
      { path: "*", element: <NotFound /> }
    ],
  },
]);

export default router;