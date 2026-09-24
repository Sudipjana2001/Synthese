import { cache } from 'react'
import { fetchSanity } from '../sanity/lib/client'
import { postsQuery, projectsQuery, gardenNotesQuery } from '../sanity/lib/queries'
import { SAMPLE_POSTS } from './samplePosts'
import { SAMPLE_PROJECTS } from './sampleProjects'
import { SAMPLE_GARDEN_NOTES } from './sampleGarden'
import { Post } from '../types/blog'
import { Project } from '../types/project'

/**
 * Lightweight search index item for the global ⌘K command palette.
 * Only carries the minimum data needed for search + navigation.
 */
export interface SearchIndexItem {
  id: string
  title: string
  subtitle?: string
  href: string
  tag: string
  category: 'Manuscripts' | 'Simulations' | 'Garden Notes'
}

export interface SearchCorpus {
  posts: SearchIndexItem[]
  projects: SearchIndexItem[]
  gardenNotes: SearchIndexItem[]
}

interface SanityGardenNote {
  _id: string
  noteId?: string
  title: string
  discipline?: string
  stage?: string
}

export const getSearchCorpus = cache(async function getSearchCorpus(): Promise<SearchCorpus> {
  let posts: SearchIndexItem[] = []
  let projects: SearchIndexItem[] = []
  let gardenNotes: SearchIndexItem[] = []

  try {
    const [sanityPosts, sanityProjects, sanityNotes] = await Promise.all([
      fetchSanity<Post[]>(postsQuery),
      fetchSanity<Project[]>(projectsQuery),
      fetchSanity<SanityGardenNote[]>(gardenNotesQuery),
    ])

    // Map Sanity posts
    if (sanityPosts && sanityPosts.length > 0) {
      posts = sanityPosts.map((p) => ({
        id: `post-${p._id}`,
        title: p.title,
        subtitle: `${p.author?.name || 'Sudip Jana'} • ${p.readingTime || 15} min read`,
        href: `/blog/${p.slug?.current || p._id}`,
        tag: p.tags?.[0] || p.categories?.[0]?.title || 'Paper',
        category: 'Manuscripts' as const,
      }))
    }

    // Map Sanity projects
    if (sanityProjects && sanityProjects.length > 0) {
      projects = sanityProjects.map((prj) => ({
        id: `project-${prj._id}`,
        title: prj.title,
        subtitle: `${prj.category || 'Lab'} • ${prj.disciplineTag || 'Applied Mathematics'}`,
        href: '/projects',
        tag: prj.disciplineTag || 'Lab',
        category: 'Simulations' as const,
      }))
    }

    // Map Sanity garden notes
    if (sanityNotes && sanityNotes.length > 0) {
      gardenNotes = sanityNotes.map((n) => ({
        id: `garden-${n._id}`,
        title: `${n.noteId || n.title}: ${n.title}`,
        subtitle: `${n.discipline || 'Cognitive Science'} • ${(n.stage || 'sprout').toUpperCase()}`,
        href: '/garden',
        tag: n.stage || 'sprout',
        category: 'Garden Notes' as const,
      }))
    }
  } catch (err) {
    console.warn('Error fetching search corpus from Sanity, falling back to sample data:', err)
  }

  // Fall back to sample data if Sanity returned nothing
  if (posts.length === 0) {
    posts = SAMPLE_POSTS.map((p) => ({
      id: `post-${p._id}`,
      title: p.title,
      subtitle: `${p.author?.name || 'Sudip Jana'} • ${p.readingTime} min read`,
      href: `/blog/${p.slug.current}`,
      tag: p.tags?.[0] || 'Paper',
      category: 'Manuscripts' as const,
    }))
  }

  if (projects.length === 0) {
    projects = SAMPLE_PROJECTS.map((prj) => ({
      id: `project-${prj._id}`,
      title: prj.title,
      subtitle: `${prj.category} • ${prj.metrics.label1}: ${prj.metrics.value1}`,
      href: '/projects',
      tag: prj.disciplineTag || 'Lab',
      category: 'Simulations' as const,
    }))
  }

  if (gardenNotes.length === 0) {
    gardenNotes = SAMPLE_GARDEN_NOTES.map((n) => ({
      id: `garden-${n.id}`,
      title: `${n.id}: ${n.title}`,
      subtitle: `${n.discipline} • ${n.stage.toUpperCase()}`,
      href: '/garden',
      tag: n.stage,
      category: 'Garden Notes' as const,
    }))
  }

  return { posts, projects, gardenNotes }
})
