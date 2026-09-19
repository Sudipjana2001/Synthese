import { client } from '../sanity/lib/client'
import { aboutPageQuery, timelineQuery } from '../sanity/lib/queries'
import { SAMPLE_ABOUT, AboutData, TimelineItem } from './sampleAbout'

export async function getAboutData(): Promise<AboutData> {
  try {
    const [sanityAbout, sanityTimeline] = await Promise.all([
      client.fetch<Partial<AboutData>>(aboutPageQuery),
      client.fetch<TimelineItem[]>(timelineQuery),
    ])

    const timeline =
      sanityTimeline && sanityTimeline.length > 0
        ? sanityTimeline
        : SAMPLE_ABOUT.timeline

    if (sanityAbout) {
      return {
        ...SAMPLE_ABOUT,
        headline: sanityAbout.headline || SAMPLE_ABOUT.headline,
        timeline,
      }
    }
  } catch (error) {
    console.warn('Error fetching about data from Sanity, falling back to sample data:', error)
  }

  return SAMPLE_ABOUT
}
