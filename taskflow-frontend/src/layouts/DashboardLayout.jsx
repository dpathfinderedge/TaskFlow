import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useStateContext } from "@/contexts/StateContext";

const DashboardLayout = () => {
  const { activeMenu } = useStateContext();

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <Sidebar />
      
      <div className={
        `flex flex-col flex-1 overflow-hidden
        ${activeMenu 
         ? 'md:ml-w-64' 
         : ''
        }`
      }>
        <Topbar />
        <main className="flex-1 overflow-y-auto scrollbar-hide p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
