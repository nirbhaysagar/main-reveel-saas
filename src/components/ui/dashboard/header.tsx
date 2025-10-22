'use client'

import { Input } from '@/components/ui/input'
import { Bell, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="h-16 border-b border-gray-100 bg-white px-6 flex items-center justify-between">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search competitors, reports..."
            className="pl-12 w-full rounded-2xl border-gray-200 focus:border-gray-900 focus:ring-gray-900 bg-gray-50 font-light"
            style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative rounded-2xl hover:bg-gray-50">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </Button>

        {/* User Menu */}
        <Button variant="ghost" className="flex items-center gap-3 rounded-2xl hover:bg-gray-50 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-900" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>John Doe</p>
            <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Admin</p>
          </div>
        </Button>
      </div>
    </header>
  )
}