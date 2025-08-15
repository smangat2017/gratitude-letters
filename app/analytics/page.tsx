'use client'

import { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, FileText, Download, Edit3, Plus, RefreshCw } from 'lucide-react'

interface AnalyticsData {
  poem_generated: number
  poem_edited: number
  poem_saved: number
  total_sessions: number
  conversion_rate: number
  avg_edits_per_poem: number
  popular_recipients: string[]
  time_of_day_activity: {
    morning: number
    afternoon: number
    evening: number
    night: number
  }
  recent_events: Array<{
    event: string
    timestamp: string
    recipientName?: string
    senderName?: string
  }>
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchAnalyticsData = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true)
      const response = await fetch('/api/analytics/dashboard')
      if (response.ok) {
        const data = await response.json()
        setAnalyticsData(data)
      } else {
        console.error('Failed to fetch analytics data')
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No analytics data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="h-8 w-8 text-pink-400 mr-3" />
            <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <BarChart3 className="h-8 w-8 text-pink-400 ml-3" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            Track your gratitude poem engagement and user behavior.
          </p>
          
          {/* Refresh Button */}
          <div className="absolute top-0 right-0">
            <button
              onClick={() => fetchAnalyticsData(true)}
              disabled={refreshing}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white/60 backdrop-blur-sm rounded-lg border border-pink-200 hover:bg-white/80 hover:text-gray-800 transition-all duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Poems Generated</p>
                <p className="text-3xl font-bold text-pink-600">{analyticsData.poem_generated}</p>
              </div>
              <Plus className="h-8 w-8 text-pink-400" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Poems Edited</p>
                <p className="text-3xl font-bold text-orange-600">{analyticsData.poem_edited}</p>
              </div>
              <Edit3 className="h-8 w-8 text-orange-400" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Poems Saved</p>
                <p className="text-3xl font-bold text-green-600">{analyticsData.poem_saved}</p>
              </div>
              <Download className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-3xl font-bold text-blue-600">{analyticsData.total_sessions}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-100">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 mb-2">Conversion Rate</p>
              <p className="text-2xl font-bold text-purple-600">
                {(analyticsData.conversion_rate * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500 mt-1">Poems saved / generated</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-100">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 mb-2">Avg Edits per Poem</p>
              <p className="text-2xl font-bold text-indigo-600">
                {analyticsData.avg_edits_per_poem.toFixed(1)}
              </p>
              <p className="text-xs text-gray-500 mt-1">Edits / generated</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-100">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 mb-2">Popular Recipients</p>
              <div className="space-y-1">
                {analyticsData.popular_recipients.slice(0, 3).map((recipient, index) => (
                  <p key={index} className="text-sm text-gray-700">
                    {recipient}
                  </p>
                ))}
                {analyticsData.popular_recipients.length === 0 && (
                  <p className="text-sm text-gray-500">No data yet</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100">
          <h2 className="text-2xl font-display font-semibold text-gray-800 mb-6 flex items-center">
            <FileText className="h-6 w-6 text-pink-500 mr-2" />
            Recent Activity
          </h2>
          
          <div className="space-y-4">
            {analyticsData.recent_events.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-pink-100">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    event.event === 'poem_generated' ? 'bg-pink-100 text-pink-600' :
                    event.event === 'poem_edited' ? 'bg-orange-100 text-orange-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {event.event === 'poem_generated' ? <Plus className="h-4 w-4" /> :
                     event.event === 'poem_edited' ? <Edit3 className="h-4 w-4" /> :
                     <Download className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 capitalize">
                      {event.event.replace('_', ' ')}
                    </p>
                    {event.recipientName && (
                      <p className="text-sm text-gray-600">
                        For {event.recipientName}
                        {event.senderName && ` from ${event.senderName}`}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(event.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Analytics Info */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Real Analytics Data
          </h3>
          <div className="space-y-3 text-sm text-green-700">
            <p>
              <strong>✅ Real data is now live!</strong> This dashboard shows actual analytics from your app usage.
            </p>
            <p>
              <strong>Events tracked:</strong> poem_generated, poem_edited, poem_saved
            </p>
            <p>
              <strong>Data source:</strong> In-memory storage (resets on server restart). For production, connect to a database.
            </p>
            <p>
              <strong>Refresh:</strong> Click the refresh button to see the latest data.
            </p>
          </div>
        </div>

        {/* Note about implementation */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This dashboard now shows real data from your app usage. For production, consider connecting to a persistent database like PostgreSQL, MongoDB, or Supabase for long-term data storage.
          </p>
        </div>
      </div>
    </div>
  )
}
