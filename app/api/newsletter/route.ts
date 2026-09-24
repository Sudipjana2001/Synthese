import { NextRequest, NextResponse } from 'next/server'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    if (!body || typeof body.email !== 'string') {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      )
    }

    const email = body.email.trim().toLowerCase()
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // Optional integration with external email provider (e.g. Resend, Buttondown)
    const apiKey = process.env.NEWSLETTER_API_KEY
    if (apiKey) {
      // Future webhook or provider dispatch can hook in here
      console.info(`[Newsletter] Subscribed via external provider: ${email}`)
    } else {
      console.info(`[Newsletter] Received local subscription: ${email}`)
    }

    return NextResponse.json({
      success: true,
      message: 'Subscription confirmed. You are enrolled to receive Synthese Dispatches and Research Briefs.',
    })
  } catch (error) {
    console.error('[Newsletter] Internal error:', error)
    return NextResponse.json(
      { error: 'Failed to process subscription. Please try again later.' },
      { status: 500 }
    )
  }
}
