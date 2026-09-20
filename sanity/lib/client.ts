import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn, token } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
})

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  perspective: 'previewDrafts',
})

interface CacheEntry<T> {
  data: T
  timestamp: number
}

// In-memory cache to make tab switching instantaneous (< 10ms)
const memoryCache = new Map<string, CacheEntry<any>>()
// 15-second TTL: ensures fast tab navigation while picking up Studio edits promptly
const CACHE_TTL_MS = 15_000

/**
 * Fetch helper with smart short-lived caching for instant navigation and fresh Studio updates.
 */
export async function fetchSanity<T>(
  query: string,
  params: Record<string, any> = {},
  options: { bypassCache?: boolean } = {}
): Promise<T> {
  const cacheKey = JSON.stringify({ query, params })
  const now = Date.now()

  if (!options.bypassCache) {
    const cached = memoryCache.get(cacheKey)
    if (cached && now - cached.timestamp < CACHE_TTL_MS) {
      return cached.data as T
    }
  }

  const data = await client.fetch<T>(query, params, {
    next: { revalidate: 15 },
  })

  memoryCache.set(cacheKey, { data, timestamp: now })
  return data
}

/**
 * Clear the in-memory cache to force immediate fresh fetches across all routes.
 */
export function clearSanityCache() {
  memoryCache.clear()
}

