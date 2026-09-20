import { cache } from 'react'
import { fetchSanity } from '../sanity/lib/client'
import { homePageQuery, postsQuery, siteSettingsQuery } from '../sanity/lib/queries'
import { Post } from '../types/blog'

export interface HomePaper {
  id: string
  slug: string
  volume: string
  readTime: string
  status: string
  discipline: string
  title: string
  excerpt: string
  authorDate: string
}

export interface FeaturedPaperCardData {
  badge: string
  readTime: string
  accessTag: string
  title: string
  summary: string
  tags: string[]
  buttonLabel: string
  buttonUrl: string
  doi: string
  simulationTitle: string
  simulationSubtitle: string
  simulationMetric1: string
  simulationMetric2: string
  simulationButtonText: string
  simulationButtonUrl: string
}

export interface FieldNoteItem {
  date: string
  timeAgo: string
  text: string
}

export interface HomePageData {
  kicker: string
  authorName: string
  authorSubtitle: string
  heroHeadline: string
  heroSubheadline: string
  heroPrimaryCta: { label: string; url: string }
  heroSecondaryCta: { label: string; url: string }
  velocityCard: {
    title: string
    tag: string
    metrics: Array<{ label: string; value: string; subtext?: string }>
    licenseText: string
    versionText: string
  }
  featuredPaperCard: FeaturedPaperCardData
  essaysSectionHeading: string
  fieldNotesTitle: string
  fieldNotesBadge: string
  fieldNotesLinkText: string
  fieldNotesLinkUrl: string
  fieldNotes: FieldNoteItem[]
  epistemicQuote: {
    badge: string
    quoteText: string
    quoteAuthor: string
  }
  newsletter: {
    show: boolean
    badge: string
    title: string
    description: string
    placeholder: string
    buttonText: string
    privacyPerks: string[]
  }
  papers: HomePaper[]
}

const DEFAULT_HOME_PAPERS: HomePaper[] = [
  {
    id: 'pr-01452',
    slug: 'topological-entropy-and-semantic-drift',
    volume: 'Vol. 4 • Art. 12',
    readTime: '24 min read',
    status: 'Peer Reviewed',
    discipline: 'Cognitive Computation',
    title: 'Topological Entropy and Semantic Drift in Deep Generative Latents',
    excerpt:
      'By analyzing vector manifold deformations through persistent homology, we identify the exact thermodynamic inflection point where autoregressive language models depart from ground truth grounding into hallucinatory self-referential hypertoruses.',
    authorDate: 'Sudip Jana • November 24, 2026',
  },
  {
    id: 'pr-01451',
    slug: 'morphogenetic-computing-reaction-diffusion',
    volume: 'Vol. 4 • Art. 11',
    readTime: '32 min read',
    status: 'Peer Reviewed',
    discipline: 'Physical Substrates',
    title: 'Morphogenetic Computing: Reaction-Diffusion Substrates as Low-Power Logic Networks',
    excerpt:
      'Turing reaction-diffusion patterns implemented in synthetic biological gels offer non-von-Neumann asynchronous pattern recognition with sub-picowatt energy consumption.',
    authorDate: 'Sudip Jana • October 19, 2026',
  },
  {
    id: 'pr-01450',
    slug: 'hard-problem-of-machine-affect',
    volume: 'Vol. 4 • Art. 10',
    readTime: '20 min read',
    status: 'Preprint (Under Review)',
    discipline: 'Philosophy of Mind',
    title: 'The Hard Problem of Machine Affect: Functionalism, Homeostasis, and Synthetic Interiority',
    excerpt:
      'We argue that sentiment in reinforcement learning cannot generate true experiential valence without metabolic somatic vulnerability. A formalization of synthetic allostasis.',
    authorDate: 'Sudip Jana • September 12, 2026',
  },
  {
    id: 'pr-01449',
    slug: 'emergence-of-spontaneous-coordination',
    volume: 'Vol. 4 • Art. 09',
    readTime: '18 min read',
    status: 'Peer Reviewed',
    discipline: 'Dynamical Systems',
    title: 'Phase Transitions in Unconstrained Transformer Multi-Agent Ensembles',
    excerpt:
      'Theoretical derivation demonstrating geometric resonance across high-dimensional latent policy embeddings with zero external loss formulation.',
    authorDate: 'Sudip Jana • August 30, 2026',
  },
]

export const getHomePageData = cache(async function getHomePageData(): Promise<HomePageData> {
  let sanityHome: any = null
  let sanityPosts: Post[] = []
  let siteSettings: any = null

  try {
    const [h, p, s] = await Promise.all([
      fetchSanity<any>(homePageQuery),
      fetchSanity<Post[]>(postsQuery),
      fetchSanity<any>(siteSettingsQuery),
    ])
    sanityHome = h
    sanityPosts = p || []
    siteSettings = s
  } catch (err) {
    console.warn('Error fetching homepage data from Sanity:', err)
  }

  // Map Sanity posts to HomePaper structure if available
  let papers = DEFAULT_HOME_PAPERS
  if (sanityPosts && sanityPosts.length > 0) {
    const mappedPosts: HomePaper[] = sanityPosts.map((post, idx) => {
      const categoryTitle =
        post.categories && post.categories.length > 0
          ? post.categories[0].title
          : 'Cognitive Computation'

      const dateStr = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        : '2026'

      return {
        id: post._id,
        slug: post.slug.current,
        volume: `Vol. 4 • Art. ${String(idx + 1).padStart(2, '0')}`,
        readTime: `${post.readingTime || 15} min read`,
        status: post.featured ? 'Featured Monograph' : 'Peer Reviewed',
        discipline: categoryTitle,
        title: post.title,
        excerpt: post.excerpt || '',
        authorDate: `${post.author?.name || 'Sudip Jana'} • ${dateStr}`,
      }
    })

    papers = mappedPosts
  }

  return {
    kicker: sanityHome?.kicker || "Editor's Foreword",
    authorName: siteSettings?.authorName || 'Sudip Jana',
    authorSubtitle: sanityHome?.authorSubtitle || 'Principal Investigator',
    heroHeadline:
      sanityHome?.heroHeadline ||
      'Exploring the intersection of artificial cognition, complex adaptive systems, and interactive computation.',
    heroSubheadline:
      sanityHome?.heroSubheadline ||
      'Synthese is an open computational press and experimental laboratory. We construct executable models, distill long-form philosophical treatises, and publish rigorous mathematical syntheses that transcend traditional static print.',
    heroPrimaryCta: sanityHome?.heroPrimaryCta || {
      label: 'Launch Interactive Lab',
      url: '/projects',
    },
    heroSecondaryCta: sanityHome?.heroSecondaryCta || {
      label: 'Read Manuscripts & Math',
      url: '/blog',
    },
    velocityCard: {
      title: sanityHome?.velocityCard?.title || 'Research Velocity',
      tag: sanityHome?.velocityCard?.tag || '2024–2026',
      metrics:
        sanityHome?.velocityCard?.metrics && sanityHome?.velocityCard?.metrics.length > 0
          ? sanityHome.velocityCard.metrics
          : [
              { label: 'Peer-Reviewed Papers', value: '38', subtext: '2024–2026' },
              { label: 'Executable Simulations', value: '14', subtext: '• Real-Time WebGL' },
              { label: 'Model Telemetry', value: '120k', subtext: 'Active Runs' },
            ],
      licenseText: sanityHome?.velocityCard?.licenseText || 'Curated under CC-BY-4.0 Computational Press',
      versionText: sanityHome?.velocityCard?.versionText || 'v2.4',
    },
    featuredPaperCard: {
      badge: sanityHome?.featuredPaperCard?.badge || 'Featured Computational Paper',
      readTime: sanityHome?.featuredPaperCard?.readTime || '18 min read',
      accessTag: sanityHome?.featuredPaperCard?.accessTag || 'Open Access',
      title:
        sanityHome?.featuredPaperCard?.title ||
        'Emergence of Spontaneous Coordination in Multi-Agent Neural Topologies',
      summary:
        sanityHome?.featuredPaperCard?.summary ||
        'We demonstrate how high-dimensional stochastic coupling between decentralized transformer-based agents yields phase transitions toward macro-scale consensus without external reward gradients. Read the mathematical derivation alongside live parameter perturbation.',
      tags:
        sanityHome?.featuredPaperCard?.tags && sanityHome?.featuredPaperCard?.tags.length > 0
          ? sanityHome.featuredPaperCard.tags
          : ['#ReinforcementLearning', '#NeuroTopology', '#DynamicalSystems'],
      buttonLabel: sanityHome?.featuredPaperCard?.buttonLabel || 'Read Manuscript & Math',
      buttonUrl: sanityHome?.featuredPaperCard?.buttonUrl || '/blog',
      doi: sanityHome?.featuredPaperCard?.doi || 'DOI: 10.48550/SYNTHESE.2026.04229',
      simulationTitle: sanityHome?.featuredPaperCard?.simulationTitle || 'Simulation Sandbox Preview',
      simulationSubtitle: sanityHome?.featuredPaperCard?.simulationSubtitle || 'WebGL • Canvas 01',
      simulationMetric1: sanityHome?.featuredPaperCard?.simulationMetric1 || 'AGENTS: 256',
      simulationMetric2: sanityHome?.featuredPaperCard?.simulationMetric2 || 'COUPLING: 0.72',
      simulationButtonText: sanityHome?.featuredPaperCard?.simulationButtonText || 'Launch Full Sandbox',
      simulationButtonUrl: sanityHome?.featuredPaperCard?.simulationButtonUrl || '/projects',
    },
    essaysSectionHeading: sanityHome?.essaysSectionHeading || 'Recent Essays & Working Papers',
    fieldNotesTitle: sanityHome?.fieldNotesTitle || 'Micro-Thoughts & Field Notes',
    fieldNotesBadge: sanityHome?.fieldNotesBadge || 'Live RSS',
    fieldNotesLinkText: sanityHome?.fieldNotesLinkText || 'Explore all 1,200+ garden notes ↗',
    fieldNotesLinkUrl: sanityHome?.fieldNotesLinkUrl || '/garden',
    fieldNotes:
      sanityHome?.fieldNotes && sanityHome?.fieldNotes.length > 0
        ? sanityHome.fieldNotes
        : [
            {
              date: '#Log:2026-03-14',
              timeAgo: '2h ago',
              text: 'If attention mechanisms in transformers can be isomorphic to spatial graph diffusion clustering, why do we still evaluate attention purely as linguistic weights rather than physical field interactions?',
            },
            {
              date: '#Log:2026-03-11',
              timeAgo: '4d ago',
              text: 'Finished benchmarking puny layers on Monte Carlo model on DDIM parameter manifolds. Convergence speeds double when we penalize entropy extremes early in training.',
            },
          ],
    epistemicQuote: {
      badge: sanityHome?.epistemicQuote?.badge || 'Epistemic Stance',
      quoteText:
        sanityHome?.epistemicQuote?.quoteText ||
        'A model is not a passive mirror of empirical nature; it is an apparatus that forces our premises to collide with mathematical consequences.',
      quoteAuthor:
        sanityHome?.epistemicQuote?.quoteAuthor || '— Synthese Editorial Board Charter',
    },
    newsletter: {
      show: sanityHome?.newsletter?.show !== false,
      badge:
        sanityHome?.newsletter?.badge ||
        'Institutional Dispatch & Preprint Alerts • ISSN 2769-188X • Bi-weekly Overviews',
      title:
        sanityHome?.newsletter?.title ||
        'Subscribe to the Synthese Scholarly Computation Gazette',
      description:
        sanityHome?.newsletter?.description ||
        'Receive newly verified mathematical models, long-form philosophical inquiries, and downloadable Jupyter & WebGL environments directly in your inbox every second Thursday. No marketing drivel; purely executable research.',
      placeholder:
        sanityHome?.newsletter?.placeholder ||
        'researcher@institute.edu or scholar@domain.org',
      buttonText:
        sanityHome?.newsletter?.buttonText || 'Subscribe to Dispatch →',
      privacyPerks:
        sanityHome?.newsletter?.privacyPerks && sanityHome?.newsletter?.privacyPerks.length > 0
          ? sanityHome.newsletter.privacyPerks
          : ['🔒 PGP Encrypted Alerts', 'No Ad Tracking Pixels', 'Instant Unsubscribe'],
    },
    papers,
  }
})
