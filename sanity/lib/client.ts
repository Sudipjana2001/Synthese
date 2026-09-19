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

/**
 * Fetch helper that disables Next.js static caching for instant live updates upon publishing in Studio.
 */
export async function fetchSanity<T>(
  query: string,
  params: Record<string, any> = {}
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: 0 },
  })
}

