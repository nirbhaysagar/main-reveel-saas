'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Users, Activity, AlertTriangle, Brain, Target, Plus } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState({
    competitors: 0,
    changes: 0,
    alerts: 0,
    insights: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [competitorsRes, changesRes] = await Promise.all([
        fetch('/api/competitors'),
        fetch('/api/changes')
      ])
      
      const competitors = await competitorsRes.json()
      const changes = await changesRes.json()
      
      setStats({
        competitors: competitors.competitors?.length || 0,
        changes: changes.changes?.length || 0,
        alerts: 0, // TODO: Implement alerts
        insights: 0  // TODO: Implement insights
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const userName = session?.user?.name || 'User'

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
            Welcome back, {userName}
          </h1>
          <p className="text-lg text-gray-600 mt-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
            Here&apos;s what&apos;s happening with your competitive intelligence
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/competitors/new" className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all duration-300 font-medium text-sm" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
            <Plus className="w-4 h-4 inline mr-2" />
            Add Competitor
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users className="w-7 h-7 text-blue-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              {loading ? '...' : stats.competitors}
            </h3>
            <p className="text-gray-600 font-medium" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              Competitors Tracked
            </p>
            <p className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              {stats.competitors === 0 ? 'Add your first competitor' : 'Active monitoring'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Activity className="w-7 h-7 text-green-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              {loading ? '...' : stats.changes}
            </h3>
            <p className="text-gray-600 font-medium" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              Changes Detected
            </p>
            <p className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              {stats.changes === 0 ? 'No changes yet' : 'Recent activity'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <AlertTriangle className="w-7 h-7 text-orange-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              {loading ? '...' : stats.alerts}
            </h3>
            <p className="text-gray-600 font-medium" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              Active Alerts
            </p>
            <p className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              {stats.alerts === 0 ? 'No alerts' : 'Requires attention'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-7 h-7 text-purple-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              {loading ? '...' : stats.insights}
            </h3>
            <p className="text-gray-600 font-medium" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              AI Insights
            </p>
            <p className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              {stats.insights === 0 ? 'Generate insights' : 'Available'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
                  Recent Activity
                </h2>
                <p className="text-gray-600 mt-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                  Latest changes from your competitors
                </p>
              </div>
              {stats.changes > 0 && (
                <Link href="/dashboard/changes" className="text-blue-600 hover:text-blue-700 font-medium text-sm" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                  View All
                </Link>
              )}
            </div>
          </div>
          <div className="p-8">
            {stats.changes === 0 ? (
              <div className="text-center py-12">
                <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                  No activity yet
                </h3>
                <p className="text-gray-500 mb-6" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                  Add competitors to start tracking changes
                </p>
                <Link href="/dashboard/competitors/new" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Competitor
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                  Loading recent activity...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions & Insights */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              Quick Actions
            </h3>
            <div className="space-y-4">
              <Link href="/dashboard/competitors/new" className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-300 group">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    Add Competitor
                  </p>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    Track a new competitor
                  </p>
                </div>
              </Link>

              <Link href="/dashboard/competitors" className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-300 group">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    View Competitors
                  </p>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    Manage your tracking
                  </p>
                </div>
              </Link>

              <Link href="/dashboard/insights" className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-300 group">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    AI Insights
                  </p>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    Generate reports
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              Getting Started
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${stats.competitors > 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {stats.competitors > 0 ? '✓' : '1'}
                </div>
                <span className={`text-sm ${stats.competitors > 0 ? 'text-green-600' : 'text-gray-600'}`} style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                  Add your first competitor
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${stats.changes > 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {stats.changes > 0 ? '✓' : '2'}
                </div>
                <span className={`text-sm ${stats.changes > 0 ? 'text-green-600' : 'text-gray-600'}`} style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                  Start monitoring changes
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium bg-gray-100 text-gray-400">
                  3
                </div>
                <span className="text-sm text-gray-600" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                  Generate AI insights
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}