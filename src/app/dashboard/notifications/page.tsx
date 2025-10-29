'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Bell, Mail, CheckCircle, AlertCircle, Info } from 'lucide-react'

interface Notification {
  id: string
  type: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
  competitorId?: string
  competitorName?: string
}

export default function NotificationsPage() {
  const [sendingEmail, setSendingEmail] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotifications()
  }, [])

  async function fetchNotifications() {
    try {
      const res = await fetch('/api/notifications')
      if (res.ok) {
        const data = await res.json()
        setNotifications(data.notifications || [])
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleMarkAsRead(id: string) {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: 'POST' })
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      )
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  async function handleMarkAllAsRead() {
    try {
      const unreadIds = notifications.filter(n => !n.isRead).map(n => n.id)
      await Promise.all(unreadIds.map(id => 
        fetch(`/api/notifications/${id}/read`, { method: 'POST' })
      ))
      setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })))
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  const handleSendTestEmail = async () => {
    setSendingEmail(true)
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSendingEmail(false)
    alert('Test email sent successfully! Check your inbox.')
  }


  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'change': return AlertCircle
      case 'insight': return Info
      case 'scrape': return CheckCircle
      case 'alert': return Bell
      case 'report': return Mail
      default: return Bell
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'change': return 'text-red-600 bg-red-50'
      case 'insight': return 'text-blue-600 bg-blue-50'
      case 'scrape': return 'text-green-600 bg-green-50'
      case 'alert': return 'text-yellow-600 bg-yellow-50'
      case 'report': return 'text-purple-600 bg-purple-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-600 mt-1">Manage your alerts and notifications</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={handleSendTestEmail} 
            disabled={sendingEmail}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            {sendingEmail ? 'Sending...' : 'Send Test Email'}
          </Button>
          {unreadCount > 0 && (
            <Button 
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-600">Total Notifications</h3>
              <div className="text-2xl font-bold">{notifications.length}</div>
            </div>
            <Bell className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-600">Unread</h3>
              <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-600">Change Alerts</h3>
              <div className="text-2xl font-bold text-orange-600">
                {notifications.filter(n => n.type === 'change').length}
              </div>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-600">AI Insights</h3>
              <div className="text-2xl font-bold text-purple-600">
                {notifications.filter(n => n.type === 'insight').length}
              </div>
            </div>
            <Info className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold">Recent Notifications</h2>
          <p className="text-sm text-slate-600 mt-1">
            Latest alerts and updates from your competitors
          </p>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No notifications yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type)
                const colorClass = getNotificationColor(notification.type)
                
                return (
                  <div 
                    key={notification.id} 
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      notification.isRead 
                        ? 'border-slate-200 bg-slate-50' 
                        : 'border-blue-200 bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${colorClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900">{notification.title}</span>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          {notification.competitorName && (
                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                              {notification.competitorName}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {!notification.isRead && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="flex items-center gap-1"
                      >
                        <CheckCircle className="w-3 h-3" />
                        Mark Read
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

