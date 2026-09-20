import { cache } from 'react'
import { fetchSanity } from '../sanity/lib/client'
import {
  postsQuery,
  featuredPostQuery,
  postBySlugQuery,
  blogPageSettingsQuery,
  categoriesQuery,
} from '../sanity/lib/queries'
import { SAMPLE_POSTS } from './samplePosts'
import { Post, BlogPageSettings, Category } from '../types/blog'

export const getAllPosts = cache(async function getAllPosts(): Promise<Post[]> {
  try {
    const sanityPosts = await fetchSanity<Post[]>(postsQuery)
    if (sanityPosts && sanityPosts.length > 0) {
      return sanityPosts
    }
  } catch (error) {
    console.warn('Error fetching posts from Sanity, falling back to sample data:', error)
  }
  return SAMPLE_POSTS
})

export const getFeaturedPost = cache(async function getFeaturedPost(): Promise<Post | null> {
  try {
    const featured = await fetchSanity<Post>(featuredPostQuery)
    if (featured) return featured
  } catch (error) {
    console.warn('Error fetching featured post from Sanity:', error)
  }
  return SAMPLE_POSTS.find((p) => p.featured) || SAMPLE_POSTS[0] || null
})

export const getPostBySlug = cache(async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const sanityPost = await fetchSanity<Post>(postBySlugQuery, { slug })
    if (sanityPost) return sanityPost
  } catch (error) {
    console.warn(`Error fetching post by slug "${slug}" from Sanity:`, error)
  }
  return SAMPLE_POSTS.find((p) => p.slug.current === slug) || null
})

export const getBlogSettings = cache(async function getBlogSettings(): Promise<BlogPageSettings> {
  try {
    const settings = await fetchSanity<BlogPageSettings>(blogPageSettingsQuery)
    if (settings) return settings
  } catch (error) {
    console.warn('Error fetching blog page settings from Sanity:', error)
  }
  return {
    kicker: 'Public Archive • Section 02',
    title: 'Essays & Working Papers',
    description:
      'Long-form peer-reviewed computational treatises, architectural proofs, and theoretical essays exploring biological computation and synthetic cognition.',
    featuredBadge: 'Featured Treatise & Mathematical Model',
    readManuscriptLabel: 'Read Full Manuscript',
    featuredSectionTitle: 'Featured Treatise',
    allPostsTitle: 'All Publications & Manuscripts',
    showSearchBar: true,
    searchPlaceholder: 'Search by title, topic, or keyword...',
    showCategoryFilter: true,
  }
})

export const getAllCategories = cache(async function getAllCategories(): Promise<Category[]> {
  try {
    const categories = await fetchSanity<Category[]>(categoriesQuery)
    if (categories && categories.length > 0) return categories
  } catch (error) {
    console.warn('Error fetching categories from Sanity:', error)
  }
  return [
    { _id: 'cat-1', title: 'Cognitive Computation', slug: { current: 'cognitive-computation' }, color: '#3b82f6' },
    { _id: 'cat-2', title: 'Dynamical Systems', slug: { current: 'dynamical-systems' }, color: '#10b981' },
    { _id: 'cat-3', title: 'Physical Substrates', slug: { current: 'physical-substrates' }, color: '#8b5cf6' },
    { _id: 'cat-4', title: 'Philosophy of Mind', slug: { current: 'philosophy-of-mind' }, color: '#f59e0b' },
  ]
})


