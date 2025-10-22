'use client'

import { Input } from '@/components/ui/input'
import { Bell, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="h-20 border-b border-gray-100 bg-white/80 backdrop-blur-xl px-8 flex items-center justify-between animate-in fade-in-0 slide-in-from-top-4 duration-500">
      {/* Search Bar */}
      <div className="flex-1 max-w-lg">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-600 transition-colors duration-300" />
          <Input
            type="search"
            placeholder="Search competitors, reports..."
            className="pl-14 pr-6 py-4 w-full rounded-3xl border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 bg-gray-50 font-light text-base transition-all duration-300 hover:bg-gray-100 focus:bg-white focus:shadow-lg focus:shadow-gray-900/10"
            style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded-lg font-medium">
              ⌘K
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Quick Actions */}
        <div className="hidden lg:flex items-center gap-2">
          <Button variant="ghost" size="sm" className="rounded-2xl hover:bg-gray-100 px-4 py-2 text-sm font-medium transition-all duration-300">
            <span className="mr-2">📊</span>
            Analytics
          </Button>
          <Button variant="ghost" size="sm" className="rounded-2xl hover:bg-gray-100 px-4 py-2 text-sm font-medium transition-all duration-300">
            <span className="mr-2">⚡</span>
            Quick Scan
          </Button>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative rounded-2xl hover:bg-gray-100 transition-all duration-300 group">
          <Bell className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors duration-300" />
          <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            3
          </span>
        </Button>

        {/* User Menu */}
        <Button variant="ghost" className="flex items-center gap-4 rounded-2xl hover:bg-gray-100 px-4 py-2 transition-all duration-300 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-medium text-sm">JD</span>
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              John Doe
            </p>
            <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              Admin
            </p>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </Button>
      </div>
    </header>
  )
}