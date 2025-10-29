'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Users } from 'lucide-react'
import Link from 'next/link'

interface Competitor {
  id: string
  name: string
  url: string
  platform: string
  isActive: boolean
  lastScrapedAt: string | null
  createdAt: string
}

export default function CompetitorsPage() {
  const [showForm, setShowForm] = useState(false)
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    platform: 'website',
    targetSelector: '',
    scrapeInterval: '24'
  })

  useEffect(() => {
    fetchCompetitors()
  }, [])

  async function fetchCompetitors() {
    try {
      const res = await fetch('/api/competitors')
      const data = await res.json()
      setCompetitors(data.competitors || [])
    } catch (error) {
      console.error('Error fetching competitors:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch('/api/competitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          url: formData.url,
          platform: formData.platform,
          targetSelector: formData.targetSelector || undefined,
          scrapeInterval: parseInt(formData.scrapeInterval) || 24
        })
      })

      if (!res.ok) {
        const error = await res.json()
        alert(error.error || 'Failed to create competitor')
        return
      }

      // Reset form and refresh list
      setFormData({ name: '', url: '', platform: 'website', targetSelector: '', scrapeInterval: '24' })
      setShowForm(false)
      await fetchCompetitors()
      alert('Competitor added successfully!')
    } catch (error) {
      console.error('Error creating competitor:', error)
      alert('Failed to create competitor')
    } finally {
      setSubmitting(false)
    }
  }

  const formatTimeAgo = (dateString: string | null) => {
    if (!dateString) return 'Never'
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-light text-gray-900 mb-3 tracking-tight flex items-center gap-4" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              Competitors
            </h1>
            <p className="text-xl text-gray-600 font-light leading-relaxed" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              Manage and track your competitors&apos; activities
            </p>
          </div>
          <Button 
            onClick={() => setShowForm(true)} 
            className="flex items-center gap-3 px-6 py-3 text-base font-medium"
            style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
          >
            <Plus className="w-5 h-5" />
            Add Competitor
          </Button>
        </div>
      </div>

      {showForm ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-6" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
            Add New Competitor
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Competitor Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-50 font-light text-base transition-all duration-300 hover:bg-gray-100 focus:bg-white"
                placeholder="e.g., Nike, Amazon, Google"
                style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Website URL
              </label>
              <input
                type="url"
                required
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-50 font-light text-base transition-all duration-300 hover:bg-gray-100 focus:bg-white"
                placeholder="https://www.example.com"
                style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Platform
              </label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-50 font-light text-base transition-all duration-300 hover:bg-gray-100 focus:bg-white"
              >
                <option value="website">Website</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="linkedin">LinkedIn</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                CSS Selector (Optional)
              </label>
              <input
                type="text"
                value={formData.targetSelector}
                onChange={(e) => setFormData({ ...formData, targetSelector: e.target.value })}
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-50 font-light text-base transition-all duration-300 hover:bg-gray-100 focus:bg-white"
                placeholder="e.g., .product-price, h1.title"
                style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Scrape Interval (hours)
              </label>
              <input
                type="number"
                min="1"
                value={formData.scrapeInterval}
                onChange={(e) => setFormData({ ...formData, scrapeInterval: e.target.value })}
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-50 font-light text-base transition-all duration-300 hover:bg-gray-100 focus:bg-white"
                placeholder="24"
                style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
              />
            </div>
            <div className="flex gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowForm(false)}
                className="flex-1"
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={submitting}>
                {submitting ? 'Adding...' : 'Add Competitor'}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          {loading ? (
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-12 text-center">
              <p className="text-gray-500">Loading competitors...</p>
            </div>
          ) : competitors.length === 0 ? (
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-12 text-center">
              <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No Competitors Yet</h3>
              <p className="text-slate-600 mb-6">
                Start tracking your competitors by adding your first competitor.
              </p>
              <Button onClick={() => setShowForm(true)} className="flex items-center gap-2 mx-auto">
                <Plus className="w-4 h-4" />
                Add Your First Competitor
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {competitors.map((competitor) => (
                <div key={competitor.id} className="group bg-white rounded-3xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                        <div className="w-8 h-8 bg-blue-500 rounded-xl"></div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>{competitor.name}</h3>
                        <p className="text-gray-600 font-light mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>{competitor.url}</p>
                        <div className="flex items-center gap-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${competitor.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'}`} style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                            <div className={`w-2 h-2 ${competitor.isActive ? 'bg-green-500' : 'bg-gray-500'} rounded-full mr-2`}></div>
                            {competitor.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <span className="text-sm text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                            Last scraped: {formatTimeAgo(competitor.lastScrapedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="px-6 py-2">Edit</Button>
                      <Link href={`/dashboard/competitors/${competitor.id}`}>
                        <Button variant="outline" size="sm" className="px-6 py-2">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
