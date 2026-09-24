import { revalidatePath } from 'next/cache'
import { clearSanityCache } from '../../../sanity/lib/client'
import { NextRequest, NextResponse } from 'next/server'

function validateSecret(request: NextRequest): boolean {
  const secret = request.nextUrl.searchParams.get('secret')
  const expected = process.env.REVALIDATION_SECRET
  if (!expected) {
    console.warn('REVALIDATION_SECRET is not set — revalidation endpoint is disabled.')
    return false
  }
  return secret === expected
}

export async function GET(request: NextRequest) {
  if (!validateSecret(request)) {
    return NextResponse.json(
      { revalidated: false, message: 'Invalid or missing secret.' },
      { status: 401 }
    )
  }

  clearSanityCache()
  revalidatePath('/', 'layout')
  return NextResponse.json({
    revalidated: true,
    message: 'Sanity in-memory and Next.js caches successfully purged.',
    now: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  if (!validateSecret(request)) {
    return NextResponse.json(
      { revalidated: false, message: 'Invalid or missing secret.' },
      { status: 401 }
    )
  }

  clearSanityCache()
  revalidatePath('/', 'layout')
  return NextResponse.json({
    revalidated: true,
    message: 'Sanity in-memory and Next.js caches successfully purged.',
    now: new Date().toISOString(),
  })
}

