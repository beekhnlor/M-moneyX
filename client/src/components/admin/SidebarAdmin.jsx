import { NavLink, useNavigate } from "react-router-dom";
import { 
    LayoutDashboard, 
    FilePenLine, 
    MessagesSquare, 
    LogOut 
} from "lucide-react";
import useMoneyStore from '../../store/money-store';

const SidebarAdmin = () => {
  const { actionLogout } = useMoneyStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    actionLogout();
    navigate("/");
  };

  const baseLinkClass = "flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-200";
  const activeLinkClass = "bg-gray-800 text-white";

  return (
  
    <div className="bg-gray-900 w-64 text-gray-100 flex flex-col h-screen">
      

      <div className="h-20 flex items-center justify-center border-b border-gray-700">
        <h1 className="text-2xl font-bold tracking-wider">Admin Panel</h1>
      </div>

  
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `${baseLinkClass} ${isActive ? activeLinkClass : ""}`
          }
        >
          <LayoutDashboard className="mr-3 h-5 w-5" />
          Dashboard
        </NavLink>

        <NavLink
          to="manage" 
          className={({ isActive }) =>
            `${baseLinkClass} ${isActive ? activeLinkClass : ""}`
          }
        >
          <FilePenLine className="mr-3 h-5 w-5" />
          Manage Content
        </NavLink>

        <NavLink
          to="chat" 
          className={({ isActive }) =>
            `${baseLinkClass} ${isActive ? activeLinkClass : ""}`
          }
        >
          <MessagesSquare className="mr-3 h-5 w-5" />
          Conversations
        </NavLink>
      </nav>


      <div className="px-4 py-4 border-t border-gray-700">
        <button
          onClick={handleLogout}

          className={`${baseLinkClass} w-full`} 
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SidebarAdmin;