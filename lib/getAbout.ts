import { fetchSanity } from '../sanity/lib/client'
import { aboutPageQuery, timelineQuery } from '../sanity/lib/queries'
import { urlForImage } from '../sanity/lib/image'
import { SAMPLE_ABOUT, AboutData, TimelineItem } from './sampleAbout'

export async function getAboutData(): Promise<AboutData> {
  try {
    const [sanityAbout, sanityTimeline] = await Promise.all([
      fetchSanity<any>(aboutPageQuery),
      fetchSanity<TimelineItem[]>(timelineQuery),
    ])

    const timeline =
      sanityTimeline && sanityTimeline.length > 0
        ? sanityTimeline
        : SAMPLE_ABOUT.timeline

    if (sanityAbout) {
      let profileImageUrl: string | undefined = undefined
      if (sanityAbout.profileImage?.asset) {
        profileImageUrl = urlForImage(sanityAbout.profileImage)?.width(800).auto('format').url()
      }

      return {
        ...SAMPLE_ABOUT,
        title: sanityAbout.title || 'Curriculum & Editorial Dossier',
        kicker: sanityAbout.kicker || 'CURRICULUM VITAE & SCHOLARLY DOSSIER // DEPT. OF COGNITIVE COMPUTATION',
        headline: sanityAbout.headline || SAMPLE_ABOUT.headline,
        abstract: sanityAbout.abstract || SAMPLE_ABOUT.abstract,
        profileImage: sanityAbout.profileImage,
        profileImageUrl,
        bioStory: sanityAbout.bioStory,
        orcid: sanityAbout.orcid || SAMPLE_ABOUT.orcid,
        pgpKey: sanityAbout.pgpKey || SAMPLE_ABOUT.pgpKey,
        metrics: {
          citations: sanityAbout.metrics?.citations || SAMPLE_ABOUT.metrics.citations,
          hIndex: sanityAbout.metrics?.hIndex || SAMPLE_ABOUT.metrics.hIndex,
          publications: sanityAbout.metrics?.publications || SAMPLE_ABOUT.metrics.publications,
          activeSimulations: sanityAbout.metrics?.activeSimulations || SAMPLE_ABOUT.metrics.activeSimulations,
        },
        epistemicPillars:
          sanityAbout.epistemicPillars && sanityAbout.epistemicPillars.length > 0
            ? sanityAbout.epistemicPillars
            : SAMPLE_ABOUT.epistemicPillars,
        skillsHeadline: sanityAbout.skillsHeadline || 'Core Competencies & Tooling',
        skills: sanityAbout.skills || [],
        showTimeline: sanityAbout.showTimeline !== false,
        timelineHeading: sanityAbout.timelineHeading || 'Curriculum Temporale & Appointments',
        resumeUrl: sanityAbout.resumeUrl,
        timeline,
      }
    }
  } catch (error) {
    console.warn('Error fetching about data from Sanity, falling back to sample data:', error)
  }

  return SAMPLE_ABOUT
}
