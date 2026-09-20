import { revalidatePath } from 'next/cache'
import { clearSanityCache } from '../../../sanity/lib/client'
import { NextResponse } from 'next/server'

export async function GET() {
  clearSanityCache()
  revalidatePath('/', 'layout')
  return NextResponse.json({
    revalidated: true,
    message: 'Sanity in-memory and Next.js caches successfully purged.',
    now: new Date().toISOString(),
  })
}

export async function POST() {
  clearSanityCache()
  revalidatePath('/', 'layout')
  return NextResponse.json({
    revalidated: true,
    message: 'Sanity in-memory and Next.js caches successfully purged.',
    now: new Date().toISOString(),
  })
}
