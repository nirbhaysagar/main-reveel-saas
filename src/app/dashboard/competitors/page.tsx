'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Users } from 'lucide-react'
import Link from 'next/link'

export default function CompetitorsPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-8 h-8" />
            Competitors
          </h1>
          <p className="text-slate-600 mt-1">Manage and track your competitors' activities</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4 mr-2" />
          Add Competitor
        </Button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Competitor</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Competitor Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Nike, Amazon, Google"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://www.example.com"
              />
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Add Competitor
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Empty State */}
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

          {/* Sample Competitors (for testing) */}
          <div className="grid gap-4">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Nike</h3>
                  <p className="text-slate-600">https://www.nike.com</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                    <span className="text-sm text-slate-500">Last scraped: 2 hours ago</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Link href="/dashboard/competitors/nike">
                    <Button variant="outline" size="sm">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Adidas</h3>
                  <p className="text-slate-600">https://www.adidas.com</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                    <span className="text-sm text-slate-500">Last scraped: 5 hours ago</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Link href="/dashboard/competitors/adidas">
                    <Button variant="outline" size="sm">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
