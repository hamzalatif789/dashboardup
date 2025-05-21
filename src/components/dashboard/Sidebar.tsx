import { NavLink } from "react-router-dom";
import { 
  LayoutGrid, 
  BookOpen, 
  MessageCircle, 
  Settings, 
  Calendar, 
  LogOut
} from "lucide-react";

type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: <LayoutGrid className="h-5 w-5" />
  },
  {
    title: "All Courses",
    path: "/courses",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <MessageCircle className="h-5 w-5" />
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <Settings className="h-5 w-5" />
  },
  {
    title: "Schedule",
    path: "/schedule",
    icon: <Calendar className="h-5 w-5" />
  }
];

const Sidebar = () => {
  return (
    <aside className="bg-[#2B2747] w-[230px] min-h-screen flex flex-col">
      {/* Logo section */}
      <div className="p-6 flex items-center">
        <div className="w-10 h-10 bg-[#FF5E18] rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
          </svg>
        </div>
        <span className="text-[#FF5E18] font-bold text-xl ml-3">ACADEMIZE</span>
      </div>

      <div className="mt-6 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center px-6 py-4 relative
              ${isActive 
                ? 'bg-white  rounded-l-full' 
                : 'text-gray-300 hover:text-[#FF5E18]'}
            `}
          >
            {({ isActive }) => (
              <>
                <span className={`mr-4 ${isActive ? 'text-[#FF5E18]' : 'text-gray-400'}`}>
                  {item.icon}
                </span>
                <span className={`${isActive ? 'text-[#FF5E18]' : 'text-gray-300'}`}>{item.title}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="p-6">
        <button className="flex items-center text-gray-300 hover:text-[#FF5E18] transition-colors duration-300 ease-in-out px-3 py-2 w-full">
          <LogOut className="h-5 w-5 mr-3 text-gray-400" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;