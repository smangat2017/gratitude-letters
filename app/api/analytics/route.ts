import { NextRequest, NextResponse } from 'next/server'
import { AnalyticsEvent } from '@/lib/analytics'
import { AnalyticsService } from '@/lib/analytics-service'

export async function POST(request: NextRequest) {
  try {
    const event: AnalyticsEvent = await request.json()
    
    // Get client IP and user agent
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Add additional context
    const enrichedEvent = {
      ...event,
      ip,
      userAgent,
    }

    // Store the event using our analytics service
    await AnalyticsService.trackEvent({
      event: event.event,
      recipientName: event.recipientName,
      senderName: event.senderName,
      editCount: event.editCount,
    })

    // Log the event
    console.log('Analytics Event:', JSON.stringify(enrichedEvent, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics endpoint error:', error)
    return NextResponse.json(
      { error: 'Failed to track analytics event' },
      { status: 500 }
    )
  }
}
