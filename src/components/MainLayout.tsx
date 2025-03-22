
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { SidebarMobileProvider, useSidebarMobile } from '@/hooks/use-sidebar-mobile';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayoutContent({ children }: MainLayoutProps) {
  const { isOpen, setIsOpen, isMobile } = useSidebarMobile();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsOpen(false)}
      />
      
      <Sidebar />
      
      <Button 
        variant="outline"
        size="icon"
        className={`fixed top-4 left-4 z-50 lg:hidden`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-4 w-4" />
      </Button>
      
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isOpen ? 'lg:ml-64' : ''} pt-16 lg:pt-0`}>
        <div className="animate-fade-in p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarMobileProvider>
      <MainLayoutContent children={children} />
    </SidebarMobileProvider>
  );
}
