'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings,
  BarChart3,
  Clock,
  Bell,
  Shield
} from 'lucide-react'

const navItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Competitors',
    href: '/dashboard/competitors',
    icon: Users,
  },
  {
    name: 'Jobs',
    href: '/dashboard/jobs',
    icon: Clock,
  },
  {
    name: 'Notifications',
    href: '/dashboard/notifications',
    icon: Bell,
  },
  {
    name: 'Security',
    href: '/dashboard/security',
    icon: Shield,
  },
  {
    name: 'Reports',
    href: '/dashboard/reports',
    icon: BarChart3,
  },
  {
    name: 'Insights',
    href: '/dashboard/insights',
    icon: FileText,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r border-gray-100 h-screen sticky top-0">
      <div className="p-6">
        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-xl font-medium text-gray-900 tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
            Reveel
          </h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
                style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}