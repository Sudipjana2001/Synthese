import { fetchSanity } from '../sanity/lib/client'
import { projectsQuery, projectsPageQuery } from '../sanity/lib/queries'
import { SAMPLE_PROJECTS } from './sampleProjects'
import { Project } from '../types/project'

export interface ProjectsPageSettings {
  statusKicker?: string
  issnTag?: string
  webglBadge?: string
  title?: string
  description?: string
  primaryButton?: { label: string; url: string }
  secondaryButton?: { label: string; url: string }
  showFilter?: boolean
  arsenalKicker?: string
  arsenalHeading?: string
  arsenalDesc?: string
  ctaBox?: {
    show?: boolean
    title?: string
    description?: string
    snippetText?: string
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
    statusKicker: 'Comp-Lab Suite v2.4',
    issnTag: 'ISSN 2769-188X',
    webglBadge: 'WebGL 2.0 Active',
    title: 'The Computational Lab: Interactive Models & Live Explainables',
    description:
      'An open repository of mathematically rigorous, dynamic algorithmic simulations. Built to accompany long-form analytical monographs, allowing researchers to evaluate parametric phase spaces in real time.',
    primaryButton: {
      label: 'Submit Algorithm',
      url: 'https://github.com/Sudipjana2001/Synthese',
    },
    secondaryButton: {
      label: 'Jupyter Kernel (Pyodide)',
      url: 'https://pyodide.org/',
    },
    showFilter: true,
    arsenalKicker: 'Active Algorithmic Arsenal',
    arsenalHeading: 'Specialized Computation Enclosures',
    arsenalDesc: 'Drag parameters, test assumptions, and fork computational code sandbox states.',
    ctaBox: {
      show: true,
      title: 'Embed Live Models in Academic Manuscripts',
      description:
        'Every widget in Synthese Lab compiles to a standalone, zero-dependency Web Component. Include fully interactive mathematical figures in your Substack, Quarto document, or HTML publication.',
      snippetText: '<synthese-model type="gray-scott" f="0.054" k="0.062" />',
      buttonText: 'Explore Manuscripts',
      buttonUrl: '/blog',
    },
  }

  try {
    const [sanityProjects, sanitySettings] = await Promise.all([
      fetchSanity<any[]>(projectsQuery),
      fetchSanity<ProjectsPageSettings>(projectsPageQuery),
    ])

    if (sanityProjects && sanityProjects.length > 0) {
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
        statusKicker: sanitySettings.statusKicker || settings.statusKicker,
        issnTag: sanitySettings.issnTag || settings.issnTag,
        webglBadge: sanitySettings.webglBadge || settings.webglBadge,
        title: sanitySettings.title || settings.title,
        description: sanitySettings.description || settings.description,
        primaryButton: sanitySettings.primaryButton || settings.primaryButton,
        secondaryButton: sanitySettings.secondaryButton || settings.secondaryButton,
        showFilter: sanitySettings.showFilter !== false,
        arsenalKicker: sanitySettings.arsenalKicker || settings.arsenalKicker,
        arsenalHeading: sanitySettings.arsenalHeading || settings.arsenalHeading,
        arsenalDesc: sanitySettings.arsenalDesc || settings.arsenalDesc,
        ctaBox: sanitySettings.ctaBox || settings.ctaBox,
      }
    }
  } catch (err) {
    console.warn('Error fetching projects from Sanity, falling back to sample data:', err)
  }

  return { projects, settings }
}
