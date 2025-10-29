'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Play, Clock, TrendingUp, TrendingDown, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface Competitor {
  id: string
  name: string
  url: string
  platform: string
  isActive: boolean
  lastScrapedAt: string | null
}

interface Change {
  id: string
  changeType: string
  oldValue: string | null
  newValue: string | null
  confidence: number
  createdAt: string
  insight: string | null
}

export default function CompetitorDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [scraping, setScraping] = useState(false)
  const [generatingInsight, setGeneratingInsight] = useState<string | null>(null)
  const [competitor, setCompetitor] = useState<Competitor | null>(null)
  const [changes, setChanges] = useState<Change[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [params.id])

  async function fetchData() {
    try {
      // Fetch competitor
      const competitorRes = await fetch(`/api/competitors/${params.id}`)
      if (!competitorRes.ok) {
        if (competitorRes.status === 404) {
          alert('Competitor not found')
          router.push('/dashboard/competitors')
          return
        }
        throw new Error('Failed to fetch competitor')
      }
      const competitorData = await competitorRes.json()
      setCompetitor(competitorData.competitor)

      // Fetch changes
      const changesRes = await fetch(`/api/competitors/${params.id}/changes`)
      if (changesRes.ok) {
        const changesData = await changesRes.json()
        setChanges(changesData.changes || [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      alert('Failed to load competitor data')
    } finally {
      setLoading(false)
    }
  }

  const handleScrape = async () => {
    setScraping(true)
    try {
      const res = await fetch(`/api/competitors/${params.id}/scrape`, {
        method: 'POST'
      })
      if (!res.ok) {
        const error = await res.json()
        alert(error.error || 'Failed to scrape competitor')
        return
      }
      alert('Scraping completed! Check for new changes.')
      await fetchData() // Refresh data
    } catch (error) {
      console.error('Error scraping:', error)
      alert('Failed to scrape competitor')
    } finally {
      setScraping(false)
    }
  }

  const handleGenerateInsight = async (changeId: string) => {
    setGeneratingInsight(changeId)
    try {
      const res = await fetch(`/api/changes/${changeId}/insight`, {
        method: 'POST'
      })
      if (!res.ok) {
        const error = await res.json()
        alert(error.error || 'Failed to generate insight')
        return
      }
      const data = await res.json()
      // Update the change with new insight
      setChanges(changes.map(c => 
        c.id === changeId ? { ...c, insight: data.insight } : c
      ))
      alert('AI insight generated!')
    } catch (error) {
      console.error('Error generating insight:', error)
      alert('Failed to generate insight')
    } finally {
      setGeneratingInsight(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <p>Loading...</p>
      </div>
    )
  }

  if (!competitor) {
    return (
      <div className="space-y-6">
        <p>Competitor not found</p>
      </div>
    )
  }

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'price': return TrendingDown
      case 'content': return TrendingUp
      case 'product': return Sparkles
      default: return TrendingUp
    }
  }

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'price': return 'text-red-600 bg-red-50'
      case 'content': return 'text-blue-600 bg-blue-50'
      case 'product': return 'text-purple-600 bg-purple-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/competitors">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{competitor.name}</h1>
            <p className="text-slate-600 mt-1">{competitor.url}</p>
          </div>
        </div>
        <Button 
          onClick={handleScrape} 
          disabled={scraping}
          className="flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          {scraping ? 'Scraping...' : 'Scrape Now'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-600">Total Changes</h3>
              <div className="text-2xl font-bold">{changes.length}</div>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-600">Last Scraped</h3>
              <div className="text-sm font-medium">
                {competitor.lastScrapedAt 
                  ? new Date(competitor.lastScrapedAt).toLocaleString()
                  : 'Never'}
              </div>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-600">Status</h3>
              <div className={`text-sm font-medium ${competitor.isActive ? 'text-green-600' : 'text-gray-600'}`}>
                {competitor.isActive ? 'Active' : 'Inactive'}
              </div>
            </div>
            <div className={`w-3 h-3 ${competitor.isActive ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></div>
          </div>
        </div>
      </div>

      {/* Changes List */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold">Change History</h2>
          <p className="text-sm text-slate-600 mt-1">
            Recent changes detected from {competitor.name}
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {changes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No changes detected yet. Click "Scrape Now" to start tracking.</p>
              </div>
            ) : (
              changes.map((change) => {
                const Icon = getChangeIcon(change.changeType)
                const colorClass = getChangeColor(change.changeType)
                
                return (
                  <div key={change.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${colorClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900 capitalize">{change.changeType} Change</span>
                          {change.confidence && (
                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                              {Math.round(change.confidence * 100)}% confidence
                            </span>
                          )}
                        </div>
                        {(change.oldValue || change.newValue) && (
                          <div className="text-sm text-slate-600 mt-1">
                            {change.oldValue && <span className="line-through">{change.oldValue}</span>}
                            {change.oldValue && change.newValue && ' → '}
                            {change.newValue && <span className="font-medium">{change.newValue}</span>}
                          </div>
                        )}
                        {change.insight && (
                          <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">{change.insight}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">
                        {new Date(change.createdAt).toLocaleDateString()}
                      </span>
                      {!change.insight && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleGenerateInsight(change.id)}
                          disabled={generatingInsight === change.id}
                          className="flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          {generatingInsight === change.id ? 'Generating...' : 'AI Insight'}
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

