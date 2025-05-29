import { useStateContext } from "@/contexts/StateContext";
import {
  Search,
  Bell,
  MessageSquare,
  CircleUser,
  Sun,  
  SidebarClose,
  SidebarOpen,
} from "lucide-react";

const Topbar = () => {
  const { activeMenu, setActiveMenu } = useStateContext();

  return (
    <header className="flex justify-between items-center px-6 py-4 text-white shadow">
      <button 
          type="button"
          className="cursor-pointer"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          {activeMenu ? <SidebarClose /> : <SidebarOpen />}
        </button>
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search tasks, projects..."
          className="w-full bg-gray-800 text-sm text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none"
        />
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
      </div>

      <div className="flex items-center gap-6">
        <Sun className="w-5 h-5 cursor-pointer hover:text-blue-400" />
        <MessageSquare className="w-5 h-5 cursor-pointer hover:text-blue-400" />
        <Bell className="w-5 h-5 cursor-pointer hover:text-blue-400" />
        <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
          <CircleUser className="w-5 h-5 text-white" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
