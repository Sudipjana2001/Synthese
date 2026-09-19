import { fetchSanity } from '../sanity/lib/client'
import { gardenNotesQuery, gardenPageQuery } from '../sanity/lib/queries'
import { SAMPLE_GARDEN_NOTES } from './sampleGarden'
import { GardenNote, GrowthStage, Discipline } from '../types/garden'

export interface GardenPageSettings {
  title?: string
  description?: string
  epistemicWarning?: string
  showStats?: boolean
}

export async function getGardenData(): Promise<{
  notes: GardenNote[]
  settings: GardenPageSettings
}> {
  let notes = SAMPLE_GARDEN_NOTES
  let settings: GardenPageSettings = {
    title: 'The Epistemic Digital Garden & Synaptic Graph',
    description:
      'A non-linear, topological Zettelkasten knowledge base mapping evolving hypotheses, formal lemmas, and interdisciplinary connections across cognitive science, differential geometry, and theoretical physics.',
    showStats: true,
  }

  try {
    const [sanityNotes, sanitySettings] = await Promise.all([
      fetchSanity<any[]>(gardenNotesQuery),
      fetchSanity<GardenPageSettings>(gardenPageQuery),
    ])

    if (sanityNotes && sanityNotes.length > 0) {
      const mapped: GardenNote[] = sanityNotes.map((n) => ({
        id: n.noteId || n.title,
        slug: n.slug?.current || n._id,
        title: n.title,
        stage: (n.stage as GrowthStage) || 'sprout',
        discipline: (n.discipline as Discipline) || 'Cognitive Science',
        summary: n.summary || '',
        tags: n.tags || [],
        backlinksCount: 3,
        updatedAt: n.lastTended
          ? new Date(n.lastTended).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          : 'Recently',
        cluster: n.cluster || 'cluster-01',
        citationKey: n.citationKey,
        formalLemma: n.formalLemma,
      }))
      notes = mapped
    }

    if (sanitySettings) {
      settings = {
        title: sanitySettings.title || settings.title,
        description: sanitySettings.description || settings.description,
        epistemicWarning: sanitySettings.epistemicWarning,
        showStats: sanitySettings.showStats !== false,
      }
    }
  } catch (err) {
    console.warn('Error fetching garden notes from Sanity, falling back to sample data:', err)
  }

  return { notes, settings }
}
