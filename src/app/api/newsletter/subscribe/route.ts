import { NextRequest, NextResponse } from 'next/server'
import { subscribeToNewsletter } from '@/lib/beehiiv'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    const result = await subscribeToNewsletter({
      email,
      utm_source: 'website',
      utm_medium: 'homepage',
    })

    if (result.errors) {
      return NextResponse.json(
        { error: result.errors[0]?.message || 'Subscription failed' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed!',
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
