
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProfileSection from "./ProfileSection";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="flex">
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
          <aside className="w-72 p-6 border-l border-gray-200">
            <ProfileSection />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
