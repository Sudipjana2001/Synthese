import { cache } from 'react'
import { fetchSanity } from '../sanity/lib/client'
import { siteSettingsQuery } from '../sanity/lib/queries'

export interface SiteSettingsData {
  siteName: string
  siteDescription: string
  authorName: string
  authorRole?: string
  ticker: {
    showTicker: boolean
    issueText: string
    doi: string
    statusText?: string
    rightBadge: string
  }
  footerBio: string
  footerCopyright: string
}

export const DEFAULT_SITE_SETTINGS: SiteSettingsData = {
  siteName: 'Synthese',
  siteDescription:
    'An Open Scholarly Computational Press & Personal Research Laboratory exploring artificial cognition, complex adaptive systems, and interactive computation.',
  authorName: 'Sudip Jana',
  authorRole: 'Principal Investigator',
  ticker: {
    showTicker: true,
    issueText: 'Issue No. 10 • Vol. IV • Computational Epistemology',
    doi: 'DOI: 10.48550/SYNTHESE.2026.04',
    statusText: 'Sanity CMS Connected',
    rightBadge: 'Open Access CC-BY-4.0',
  },
  footerBio: 'An Open Scholarly Computational Press',
  footerCopyright: '© 2026 Synthese Lab. ISSN 2769-188X. Open Access CC-BY-4.0.',
}

export const getSiteSettings = cache(async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const sanitySettings = await fetchSanity<any>(siteSettingsQuery)
    if (sanitySettings) {
      return {
        siteName: sanitySettings.siteName || DEFAULT_SITE_SETTINGS.siteName,
        siteDescription: sanitySettings.siteDescription || DEFAULT_SITE_SETTINGS.siteDescription,
        authorName: sanitySettings.authorName || DEFAULT_SITE_SETTINGS.authorName,
        authorRole: sanitySettings.authorRole || DEFAULT_SITE_SETTINGS.authorRole,
        ticker: {
          showTicker: sanitySettings.ticker?.showTicker !== false,
          issueText: sanitySettings.ticker?.issueText || DEFAULT_SITE_SETTINGS.ticker.issueText,
          doi: sanitySettings.ticker?.doi || DEFAULT_SITE_SETTINGS.ticker.doi,
          statusText: sanitySettings.ticker?.statusText || DEFAULT_SITE_SETTINGS.ticker.statusText,
          rightBadge: sanitySettings.ticker?.rightBadge || DEFAULT_SITE_SETTINGS.ticker.rightBadge,
        },
        footerBio: sanitySettings.footerBio || DEFAULT_SITE_SETTINGS.footerBio,
        footerCopyright: sanitySettings.footerCopyright || DEFAULT_SITE_SETTINGS.footerCopyright,
      }
    }
  } catch (err) {
    console.warn('Error fetching site settings from Sanity:', err)
  }

  return DEFAULT_SITE_SETTINGS
})

export { getSearchCorpus, type SearchCorpus, type SearchIndexItem } from './getSearchCorpus'
