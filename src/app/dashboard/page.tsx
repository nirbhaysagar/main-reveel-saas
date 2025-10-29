'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface DashboardStats {
  totalCompetitors: number
  totalChanges: number
  activeJobs: number
  recentChanges: Array<{
    id: string
    competitorId: string
    competitorName: string
    changeType: string
    oldValue: string | null
    newValue: string | null
    createdAt: string
  }>
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCompetitors: 0,
    totalChanges: 0,
    activeJobs: 0,
    recentChanges: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch competitors
        const competitorsRes = await fetch('/api/competitors')
        const competitorsData = await competitorsRes.json()
        const competitors = competitorsData.competitors || []

        // Fetch changes from all competitors (get recent ones)
        const allChanges = []
        for (const competitor of competitors) {
          try {
            const changesRes = await fetch(`/api/competitors/${competitor.id}/changes`)
            const changesData = await changesRes.json()
            if (changesData.changes) {
              allChanges.push(...changesData.changes.map((change: any) => ({
                ...change,
                competitorName: competitor.name
              })))
            }
          } catch (err) {
            console.error(`Error fetching changes for ${competitor.id}:`, err)
          }
        }

        // Sort by date and get most recent
        const recentChanges = allChanges
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5)

        // Fetch jobs
        let activeJobs = 0
        try {
          const jobsRes = await fetch('/api/jobs/status')
          const jobsData = await jobsRes.json()
          if (jobsData.jobs) {
            activeJobs = jobsData.jobs.filter((job: any) => job.status === 'active' || job.status === 'waiting').length
          }
        } catch (err) {
          console.error('Error fetching jobs:', err)
        }

        setStats({
          totalCompetitors: competitors.length,
          totalChanges: allChanges.length,
          activeJobs,
          recentChanges
        })
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  }

  const getChangeTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      price: 'Price Change',
      content: 'Content Update',
      product: 'Product Change',
      text: 'Text Change',
      url: 'URL Change'
    }
    return labels[type] || 'Change Detected'
  }

  const getChangeTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      price: 'text-green-600 bg-green-50',
      content: 'text-blue-600 bg-blue-50',
      product: 'text-purple-600 bg-purple-50',
      text: 'text-orange-600 bg-orange-50',
      url: 'text-red-600 bg-red-50'
    }
    return colors[type] || 'text-gray-600 bg-gray-50'
  }

  if (loading) {
    return (
      <div className="space-y-10">
        <div>
          <h1 className="text-5xl font-light text-gray-900 mb-3 tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
            Dashboard
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
            Loading...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-light text-gray-900 mb-3 tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
          Dashboard
        </h1>
        <p className="text-xl text-gray-600 font-light leading-relaxed" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
          Welcome back! Here&apos;s what&apos;s happening with your competitors.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
              <div className="w-6 h-6 bg-blue-500 rounded-lg"></div>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Total Competitors</h3>
          <div className="text-4xl font-light text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>{stats.totalCompetitors}</div>
          <p className="text-sm text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Tracked competitors</p>
        </div>
        
        <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-300">
              <div className="w-6 h-6 bg-orange-500 rounded-lg"></div>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Changes Detected</h3>
          <div className="text-4xl font-light text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>{stats.totalChanges}</div>
          <p className="text-sm text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Total changes found</p>
        </div>
        
        <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:bg-purple-100 transition-colors duration-300">
              <div className="w-6 h-6 bg-purple-500 rounded-lg"></div>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Active Jobs</h3>
          <div className="text-4xl font-light text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>{stats.activeJobs}</div>
          <p className="text-sm text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Running now</p>
        </div>
        
        <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300">
              <div className="w-6 h-6 bg-green-500 rounded-lg"></div>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Recent Changes</h3>
          <div className="text-4xl font-light text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>{stats.recentChanges.length}</div>
          <p className="text-sm text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Last 24 hours</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Recent Activity</h2>
              <p className="text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Latest changes detected across your competitors
              </p>
            </div>
            <Link href="/dashboard/competitors">
              <div className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-2xl cursor-pointer hover:bg-blue-100 transition-colors duration-300">
                View All
              </div>
            </Link>
          </div>
        </div>
        <div className="p-8">
          {stats.recentChanges.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No recent activity yet. Start tracking competitors to see changes here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {stats.recentChanges.map((change) => (
                <Link key={change.id} href={`/dashboard/competitors/${change.competitorId}`}>
                  <div className="group flex items-center justify-between py-4 px-6 rounded-2xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-6"></div>
                      <div className="flex-1">
                        <p className="text-base font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                          {change.competitorName} - {getChangeTypeLabel(change.changeType)}
                        </p>
                        <p className="text-sm text-gray-500 font-light mt-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                          {formatTimeAgo(change.createdAt)} • {change.competitorName}
                        </p>
                        {change.oldValue && change.newValue && (
                          <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                            <span className="line-through">{change.oldValue}</span> → <span className="font-medium">{change.newValue}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${getChangeTypeColor(change.changeType)}`} style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                        {getChangeTypeLabel(change.changeType)}
                      </span>
                      <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-gray-400 transition-colors duration-300"></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

