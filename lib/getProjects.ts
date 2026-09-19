import { fetchSanity } from '../sanity/lib/client'
import { projectsQuery, projectsPageQuery } from '../sanity/lib/queries'
import { SAMPLE_PROJECTS } from './sampleProjects'
import { Project } from '../types/project'

export interface ProjectsPageSettings {
  title?: string
  description?: string
  showFilter?: boolean
  ctaBox?: {
    show?: boolean
    title?: string
    description?: string
    buttonText?: string
    buttonUrl?: string
  }
}

export async function getProjectsData(): Promise<{
  projects: Project[]
  settings: ProjectsPageSettings
}> {
  let projects = SAMPLE_PROJECTS
  let settings: ProjectsPageSettings = {
    title: 'Executable Computation & Formal Models',
    description:
      'A collection of browser-native numerical kernels, reaction-diffusion substrates, and agent-based dynamical systems developed under the Synthese Computational Press.',
    showFilter: true,
  }

  try {
    const [sanityProjects, sanitySettings] = await Promise.all([
      fetchSanity<any[]>(projectsQuery),
      fetchSanity<ProjectsPageSettings>(projectsPageQuery),
    ])

    if (sanityProjects && sanityProjects.length > 0) {
      // Map sanity projects to Project type
      const mapped: Project[] = sanityProjects.map((p) => ({
        _id: p._id,
        title: p.title,
        slug: p.slug?.current ? p.slug : { current: p._id },
        category: p.category || 'Dynamical Systems',
        disciplineTag: p.disciplineTag || 'Applied Mathematics',
        stars: p.stars ?? 500,
        description: p.description || '',
        demoUrl: p.demoUrl,
        repoUrl: p.repoUrl,
        featured: Boolean(p.featured),
        metrics: p.metrics || {
          label1: 'det(A)',
          value1: '-1.91',
          label2: 'Trace',
          value2: '1.64',
        },
        actionLabel: p.actionLabel || 'Launch Simulation Canvas',
        modelType: p.modelType || 'gray-scott',
        tags: p.tags || [],
      }))
      projects = mapped
    }

    if (sanitySettings) {
      settings = {
        title: sanitySettings.title || settings.title,
        description: sanitySettings.description || settings.description,
        showFilter: sanitySettings.showFilter !== false,
        ctaBox: sanitySettings.ctaBox,
      }
    }
  } catch (err) {
    console.warn('Error fetching projects from Sanity, falling back to sample data:', err)
  }

  return { projects, settings }
}
