import { fetchSanity } from '../sanity/lib/client'
import { gardenNotesQuery, gardenPageQuery } from '../sanity/lib/queries'
import { SAMPLE_GARDEN_NOTES, MEMO_SLIPS } from './sampleGarden'
import { GardenNote, GrowthStage, Discipline, MemoSlip } from '../types/garden'

export interface GardenPageSettings {
  mastheadKicker?: string
  title?: string
  description?: string
  bibtexBtnText?: string
  vaultBtnText?: string
  showInteractiveGraph?: boolean
  epistemicWarning?: string
  explorerLabel?: string
  searchPlaceholder?: string
  scratchpadKicker?: string
  scratchpadSubtitle?: string
  scratchpadBtnText?: string
  memos?: MemoSlip[]
}

export async function getGardenData(): Promise<{
  notes: GardenNote[]
  settings: GardenPageSettings
}> {
  let notes = SAMPLE_GARDEN_NOTES
  let settings: GardenPageSettings = {
    mastheadKicker: 'REPOSITORY INDEX // V4.19',
    title: 'The Digital Garden & Zettelkasten Archive',
    description:
      'A networked repository of evolving notes, speculative hypotheses, formal lemmas, and verified citations.',
    bibtexBtnText: 'BibTeX Export',
    vaultBtnText: 'Download Vault (.md)',
    showInteractiveGraph: true,
    epistemicWarning: 'Notes in this garden represent live working hypotheses across varying stages of formal maturity.',
    explorerLabel: 'CATALOGUS FOLIIS',
    searchPlaceholder: 'Search title, lemma, or tag...',
    scratchpadKicker: 'EPISTEMIC SCRATCHPAD',
    scratchpadSubtitle:
      'Unfiltered analytical dispatches, preliminary proofs, and marginal commentary recorded in the field.',
    scratchpadBtnText: 'View all 74 scratchpad slips →',
    memos: MEMO_SLIPS,
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
        mastheadKicker: sanitySettings.mastheadKicker || settings.mastheadKicker,
        title: sanitySettings.title || settings.title,
        description: sanitySettings.description || settings.description,
        bibtexBtnText: sanitySettings.bibtexBtnText || settings.bibtexBtnText,
        vaultBtnText: sanitySettings.vaultBtnText || settings.vaultBtnText,
        showInteractiveGraph: sanitySettings.showInteractiveGraph !== false,
        epistemicWarning: sanitySettings.epistemicWarning || settings.epistemicWarning,
        explorerLabel: sanitySettings.explorerLabel || settings.explorerLabel,
        searchPlaceholder: sanitySettings.searchPlaceholder || settings.searchPlaceholder,
        scratchpadKicker: sanitySettings.scratchpadKicker || settings.scratchpadKicker,
        scratchpadSubtitle: sanitySettings.scratchpadSubtitle || settings.scratchpadSubtitle,
        scratchpadBtnText: sanitySettings.scratchpadBtnText || settings.scratchpadBtnText,
        memos: sanitySettings.memos && sanitySettings.memos.length > 0 ? sanitySettings.memos : MEMO_SLIPS,
      }
    }
  } catch (err) {
    console.warn('Error fetching garden notes from Sanity, falling back to sample data:', err)
  }

  return { notes, settings }
}
