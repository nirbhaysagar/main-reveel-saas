'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Clock, CheckCircle, XCircle, Loader } from 'lucide-react'

interface Job {
  id: string
  name: string
  status: string
  progress?: number
  createdAt: string
  completedAt?: string
  failedAt?: string
  error?: string
  data?: { competitorId?: string }
}

export default function JobsPage() {
  const [scheduling, setScheduling] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  async function fetchJobs() {
    try {
      const res = await fetch('/api/jobs/status')
      if (res.ok) {
        const data = await res.json()
        setJobs(data.jobs || [])
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleScheduleJobs = async () => {
    setScheduling(true)
    try {
      const res = await fetch('/api/jobs/schedule', { method: 'POST' })
      if (!res.ok) {
        const error = await res.json()
        alert(error.error || 'Failed to schedule jobs')
        return
      }
      alert('All scraping jobs have been scheduled successfully!')
      await fetchJobs() // Refresh jobs list
    } catch (error) {
      console.error('Error scheduling jobs:', error)
      alert('Failed to schedule jobs')
    } finally {
      setScheduling(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle
      case 'active': return Loader
      case 'waiting': return Clock
      case 'failed': return XCircle
      default: return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50'
      case 'active': return 'text-blue-600 bg-blue-50'
      case 'waiting': return 'text-yellow-600 bg-yellow-50'
      case 'failed': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed'
      case 'active': return 'Running'
      case 'waiting': return 'Waiting'
      case 'failed': return 'Failed'
      default: return 'Unknown'
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    })
  }


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Background Jobs</h1>
          <p className="text-slate-600 mt-1">Monitor and manage automated scraping jobs</p>
        </div>
        <Button 
          onClick={handleScheduleJobs} 
          disabled={scheduling}
          className="flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          {scheduling ? 'Scheduling...' : 'Schedule All Jobs'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-600">Total Jobs</h3>
              <div className="text-2xl font-bold">{jobs.length}</div>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-600">Completed</h3>
              <div className="text-2xl font-bold text-green-600">
                {jobs.filter(j => j.status === 'completed').length}
              </div>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-600">Running</h3>
              <div className="text-2xl font-bold text-blue-600">
                {jobs.filter(j => j.status === 'active').length}
              </div>
            </div>
            <Loader className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-600">Failed</h3>
              <div className="text-2xl font-bold text-red-600">
                {jobs.filter(j => j.status === 'failed').length}
              </div>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold">Job Queue</h2>
          <p className="text-sm text-slate-600 mt-1">
            Current status of all background jobs
          </p>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading jobs...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No jobs scheduled yet. Click "Schedule All Jobs" to start.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => {
              const StatusIcon = getStatusIcon(job.status)
              const colorClass = getStatusColor(job.status)
              
              return (
                <div key={job.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">{job.name}</span>
                        <span className={`text-xs px-2 py-1 rounded ${colorClass}`}>
                          {getStatusText(job.status)}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600 mt-1">
                        Competitor: {job.data.competitorId}
                      </div>
                      {job.status === 'active' && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm text-slate-600 mb-1">
                            <span>Progress</span>
                            <span>{job.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${job.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      {job.status === 'failed' && job.error && (
                        <div className="mt-2 text-sm text-red-600">
                          Error: {job.error}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">
                    {job.status === 'completed' && job.completedAt && (
                      <div>
                        <div>Completed</div>
                        <div>{formatTime(job.completedAt)}</div>
                      </div>
                    )}
                    {job.status === 'failed' && job.failedAt && (
                      <div>
                        <div>Failed</div>
                        <div>{formatTime(job.failedAt)}</div>
                      </div>
                    )}
                    {job.status === 'active' && (
                      <div>
                        <div>Started</div>
                        <div>{formatTime(job.createdAt)}</div>
                      </div>
                    )}
                    {job.status === 'waiting' && (
                      <div>
                        <div>Queued</div>
                        <div>{formatTime(job.createdAt)}</div>
                      </div>
                    )}
                  </div>
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
