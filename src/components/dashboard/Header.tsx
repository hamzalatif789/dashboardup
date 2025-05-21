
import { User, Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white py-4 px-6 flex justify-end items-center border-b border-gray-100">
      <div className="flex items-center">
        
        
        <div className="relative mx-4">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">3</span>
        </div>
        
        <div className="ml-4 flex items-center">
          <div className="relative mr-4">
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center border-2 border-r-academize-orange border-t-academize-orange border-l-gray-200 border-b-gray-200 rotate-45">
              <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center -rotate-45">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium">Admin</h3>
            <p className="text-xs text-gray-500">admin2024@gmail.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
