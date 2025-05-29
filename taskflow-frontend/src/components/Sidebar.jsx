import { NavLink } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";

import {
  LayoutDashboard,
  FolderKanban,
  ListChecks,
  Users,
  Bell,
  Clock,
  Settings,
  LogOut,
  CheckCircle,
  SidebarClose,
} from "lucide-react";
import { useStateContext } from "@/contexts/StateContext";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { name: "Projects", icon: FolderKanban, to: "/projects" },
  { name: "Tasks", icon: ListChecks, to: "/tasks" },
  { name: "Team", icon: Users, to: "/team" },
  { name: "Notifications", icon: Bell, to: "/notifications" },
  { name: "Activity Log", icon: Clock, to: "/activity" },
];

const Sidebar = () => {
  const { logoutUser } = useAuthContext();
  const { activeMenu } = useStateContext();

  return (
    <aside className={`h-full ${activeMenu ? 'w-64' : 'w-0 hidden'} bg-black/30 text-white flex flex-col justify-between py-6 px-4`}>
      {/* Top: Logo and Navigation */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-blue-400 p-2 rounded-full">
            <CheckCircle className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-semibold">TaskFlow</h1>
        </div>

        <nav className="space-y-3">
          {navItems.map(({ name, icon: Icon, to }) => (
            <NavLink
              key={name}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive ? "bg-blue-400" : "hover:bg-[#2A2A3B]"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom: Settings & Logout */}
      <div className="space-y-3">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#2A2A3B]"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
        <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#2A2A3B] w-full text-left">
          <LogOut className="w-5 h-5" />
          <span onClick={() => logoutUser()}>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
