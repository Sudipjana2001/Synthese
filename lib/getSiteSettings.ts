import { fetchSanity } from '../sanity/lib/client'
import { siteSettingsQuery } from '../sanity/lib/queries'

export interface SiteSettingsData {
  siteName: string
  siteDescription: string
  authorName: string
  ticker: {
    showTicker: boolean
    issueText: string
    doi: string
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
  ticker: {
    showTicker: true,
    issueText: 'Issue No. 10 • Vol. IV • Computational Epistemology',
    doi: 'DOI: 10.48550/SYNTHESE.2026.04',
    rightBadge: 'Open Access CC-BY-4.0',
  },
  footerBio: 'An Open Scholarly Computational Press',
  footerCopyright: '© 2026 Synthese Lab. ISSN 2769-188X. Open Access CC-BY-4.0.',
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const sanitySettings = await fetchSanity<any>(siteSettingsQuery)
    if (sanitySettings) {
      return {
        siteName: sanitySettings.siteName || DEFAULT_SITE_SETTINGS.siteName,
        siteDescription: sanitySettings.siteDescription || DEFAULT_SITE_SETTINGS.siteDescription,
        authorName: sanitySettings.authorName || DEFAULT_SITE_SETTINGS.authorName,
        ticker: {
          showTicker: sanitySettings.ticker?.showTicker !== false,
          issueText: sanitySettings.ticker?.issueText || DEFAULT_SITE_SETTINGS.ticker.issueText,
          doi: sanitySettings.ticker?.doi || DEFAULT_SITE_SETTINGS.ticker.doi,
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
}
