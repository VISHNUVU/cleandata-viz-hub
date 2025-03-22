
import { useLocation, Link } from 'react-router-dom'
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { useSidebarMobile } from '@/hooks/use-sidebar-mobile'
import {
  LayoutDashboard,
  Upload,
  Search,
  BarChart3, 
  FileText,
  Settings,
  Database,
  LayoutGrid,
} from 'lucide-react'

interface SidebarItem {
  title: string
  path: string
  icon: React.ElementType
}

export default function Sidebar() {
  const location = useLocation()
  const { isMobile, isOpen, setIsOpen } = useSidebarMobile()
  
  const items: SidebarItem[] = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Data Upload',
      path: '/data-upload',
      icon: Upload,
    },
    {
      title: 'Data Cleansing',
      path: '/data-cleansing',
      icon: Search,
    },
    {
      title: 'Visualization',
      path: '/visualization',
      icon: BarChart3,
    },
    {
      title: 'Dashboard Builder',
      path: '/dashboard-builder',
      icon: LayoutGrid,
    },
    {
      title: 'Reports',
      path: '/reports',
      icon: FileText,
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: Settings,
    },
  ]

  return (
    <div
      className={cn(
        'fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col border-r bg-card transition-transform duration-300 ease-in-out lg:translate-x-0',
        isMobile && !isOpen && '-translate-x-full'
      )}
    >
      <div className='p-6 flex'>
        <Link to="/" className='flex items-center gap-2' onClick={() => setIsOpen(false)}>
          <Database className='h-6 w-6 text-primary' />
          <span className='text-xl font-bold tracking-tight'>DataViz Pro</span>
        </Link>
      </div>
      
      <div className='flex-1 space-y-1 p-2'>
        {items.map((item) => (
          <Button
            key={item.path}
            variant={location.pathname === item.path ? 'default' : 'ghost'}
            className='w-full justify-start'
            asChild
          >
            <Link
              to={item.path}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className='mr-2 h-4 w-4' />
              {item.title}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
