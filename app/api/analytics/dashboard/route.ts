import { NextRequest, NextResponse } from 'next/server'
import { AnalyticsService } from '@/lib/analytics-service'

export async function GET(request: NextRequest) {
  try {
    const analyticsData = await AnalyticsService.getDashboardData()
    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error('Dashboard data error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}
