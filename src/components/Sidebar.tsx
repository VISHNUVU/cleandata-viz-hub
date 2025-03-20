
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  Filter, 
  BarChart2, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { path: '/', name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { path: '/data-upload', name: 'Data Upload', icon: <Upload className="w-5 h-5" /> },
  { path: '/data-cleansing', name: 'Data Cleansing', icon: <Filter className="w-5 h-5" /> },
  { path: '/visualization', name: 'Visualization', icon: <BarChart2 className="w-5 h-5" /> },
  { path: '/reports', name: 'Reports', icon: <FileText className="w-5 h-5" /> },
  { path: '/settings', name: 'Settings', icon: <Settings className="w-5 h-5" /> },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  // Close sidebar when window resizes to larger than mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-primary text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200 hover:bg-primary/90"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-white">
              <BarChart2 className="w-5 h-5" />
            </div>
            <span className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">DataViz Pro</span>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="px-4 py-6 space-y-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className={`${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'} mr-3`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        {/* User profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <img className="h-9 w-9 rounded-full object-cover border border-gray-200 dark:border-gray-700" src="https://avatar.iran.liara.run/public" alt="User avatar" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800 dark:text-white">Alex Morgan</p>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Data Analyst</p>
            </div>
            <button className="ml-auto p-1.5 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
