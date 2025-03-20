
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md mx-auto animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6">
          <span className="text-red-500 dark:text-red-400 text-5xl font-bold">404</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Page not found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          We couldn't find the page you're looking for. The page might have been moved or doesn't exist.
        </p>
        <Link to="/">
          <Button className="flex items-center gap-2 mx-auto">
            <LayoutDashboard className="h-4 w-4" />
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
