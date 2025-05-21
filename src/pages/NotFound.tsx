
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-6xl font-bold text-gray-200">404</h1>
        <p className="text-xl text-gray-600 mb-6 mt-2">Page not found</p>
        <p className="text-gray-500 mb-8 max-w-md text-center">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button className="bg-academize-orange hover:bg-academize-orange/90">
          <Home className="mr-2 h-4 w-4" />
          Return to Dashboard
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default NotFound;
