import { AnalyticsEvent } from './analytics'

// In-memory storage for development (replace with database in production)
class AnalyticsStorage {
  private events: AnalyticsEvent[] = []
  private sessionCounts: Map<string, number> = new Map()

  addEvent(event: AnalyticsEvent) {
    this.events.push(event)
    
    // Track unique sessions
    if (!this.sessionCounts.has(event.sessionId)) {
      this.sessionCounts.set(event.sessionId, 1)
    }
  }

  getStats() {
    const now = new Date()
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    
    // Filter events from last 24 hours
    const recentEvents = this.events.filter(
      event => new Date(event.timestamp) > last24Hours
    )

    const poem_generated = recentEvents.filter(e => e.event === 'poem_generated').length
    const poem_edited = recentEvents.filter(e => e.event === 'poem_edited').length
    const poem_saved = recentEvents.filter(e => e.event === 'poem_saved').length
    const total_sessions = this.sessionCounts.size

    // Get recent events (last 10)
    const recent_events = recentEvents
      .slice(-10)
      .reverse()
      .map(event => ({
        event: event.event,
        timestamp: event.timestamp,
        recipientName: event.recipientName,
        senderName: event.senderName,
      }))

    return {
      poem_generated,
      poem_edited,
      poem_saved,
      total_sessions,
      recent_events,
      conversion_rate: poem_generated > 0 ? (poem_saved / poem_generated) : 0,
      avg_edits_per_poem: poem_generated > 0 ? (poem_edited / poem_generated) : 0,
    }
  }

  // Get popular recipients
  getPopularRecipients() {
    const recipientCounts = new Map<string, number>()
    
    this.events.forEach(event => {
      if (event.recipientName) {
        const count = recipientCounts.get(event.recipientName) || 0
        recipientCounts.set(event.recipientName, count + 1)
      }
    })

    return Array.from(recipientCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name]) => name)
  }

  // Get time-based activity
  getTimeActivity() {
    const timeSlots = { morning: 0, afternoon: 0, evening: 0, night: 0 }
    
    this.events.forEach(event => {
      const hour = new Date(event.timestamp).getHours()
      if (hour >= 6 && hour < 12) timeSlots.morning++
      else if (hour >= 12 && hour < 18) timeSlots.afternoon++
      else if (hour >= 18 && hour < 22) timeSlots.evening++
      else timeSlots.night++
    })

    return timeSlots
  }
}

// Create singleton instance
export const analyticsStorage = new AnalyticsStorage()

// Service to handle analytics operations
export class AnalyticsService {
  static async getDashboardData() {
    try {
      // Get data from our storage
      const stats = analyticsStorage.getStats()
      const popularRecipients = analyticsStorage.getPopularRecipients()
      const timeActivity = analyticsStorage.getTimeActivity()

      return {
        ...stats,
        popular_recipients: popularRecipients,
        time_of_day_activity: timeActivity,
      }
    } catch (error) {
      console.error('Error fetching analytics data:', error)
      return {
        poem_generated: 0,
        poem_edited: 0,
        poem_saved: 0,
        total_sessions: 0,
        recent_events: [],
        conversion_rate: 0,
        avg_edits_per_poem: 0,
        popular_recipients: [],
        time_of_day_activity: { morning: 0, afternoon: 0, evening: 0, night: 0 },
      }
    }
  }

  static async trackEvent(event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId' | 'poemId'>) {
    const analyticsEvent: AnalyticsEvent = {
      ...event,
      timestamp: new Date().toISOString(),
      sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      poemId: `poem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }

    // Store in our analytics storage
    analyticsStorage.addEvent(analyticsEvent)

    return analyticsEvent
  }
}
