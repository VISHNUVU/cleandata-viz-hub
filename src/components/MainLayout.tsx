
import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 lg:ml-64 transition-all duration-300">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
