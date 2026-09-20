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
        name: sanityAbout.name || SAMPLE_ABOUT.name,
        role: sanityAbout.role || SAMPLE_ABOUT.role,
        affiliation: sanityAbout.affiliation || SAMPLE_ABOUT.affiliation,
        location: sanityAbout.location || SAMPLE_ABOUT.location,
        email: sanityAbout.email || SAMPLE_ABOUT.email,
        githubUrl: sanityAbout.githubUrl || SAMPLE_ABOUT.githubUrl,
        cvDownloadLabel: sanityAbout.cvDownloadLabel || SAMPLE_ABOUT.cvDownloadLabel,
        bibtexArchiveLabel: sanityAbout.bibtexArchiveLabel || SAMPLE_ABOUT.bibtexArchiveLabel,
        headline: sanityAbout.headline || SAMPLE_ABOUT.headline,
        statementHeading: sanityAbout.statementHeading || SAMPLE_ABOUT.statementHeading,
        statementParagraph1: sanityAbout.statementParagraph1 || SAMPLE_ABOUT.statementParagraph1,
        abstract: sanityAbout.abstract || SAMPLE_ABOUT.abstract,
        statementParagraph3: sanityAbout.statementParagraph3 || SAMPLE_ABOUT.statementParagraph3,
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
        pillarsHeading: sanityAbout.pillarsHeading || SAMPLE_ABOUT.pillarsHeading,
        epistemicPillars:
          sanityAbout.epistemicPillars && sanityAbout.epistemicPillars.length > 0
            ? sanityAbout.epistemicPillars
            : SAMPLE_ABOUT.epistemicPillars,
        skillsHeadline: sanityAbout.skillsHeadline || 'Core Competencies & Tooling',
        skills: sanityAbout.skills || [],
        showTimeline: sanityAbout.showTimeline !== false,
        timelineKicker: sanityAbout.timelineKicker || SAMPLE_ABOUT.timelineKicker,
        timelineHeading: sanityAbout.timelineHeading || SAMPLE_ABOUT.timelineHeading,
        timelineSubtitle: sanityAbout.timelineSubtitle || SAMPLE_ABOUT.timelineSubtitle,
        resumeUrl: sanityAbout.resumeUrl,
        timeline,
        publicationsKicker: sanityAbout.publicationsKicker || SAMPLE_ABOUT.publicationsKicker,
        publicationsHeading: sanityAbout.publicationsHeading || SAMPLE_ABOUT.publicationsHeading,
        publicationsSubtitle: sanityAbout.publicationsSubtitle || SAMPLE_ABOUT.publicationsSubtitle,
        publicationsButtonText: sanityAbout.publicationsButtonText || SAMPLE_ABOUT.publicationsButtonText,
        publicationsButtonUrl: sanityAbout.publicationsButtonUrl || SAMPLE_ABOUT.publicationsButtonUrl,
        publications:
          sanityAbout.publications && sanityAbout.publications.length > 0
            ? sanityAbout.publications
            : SAMPLE_ABOUT.publications,
        instrumentariumKicker: sanityAbout.instrumentariumKicker || SAMPLE_ABOUT.instrumentariumKicker,
        instrumentariumHeading: sanityAbout.instrumentariumHeading || SAMPLE_ABOUT.instrumentariumHeading,
        instrumentariumSubtitle: sanityAbout.instrumentariumSubtitle || SAMPLE_ABOUT.instrumentariumSubtitle,
        instrumentarium:
          sanityAbout.instrumentarium && sanityAbout.instrumentarium.length > 0
            ? sanityAbout.instrumentarium
            : SAMPLE_ABOUT.instrumentarium,
        contactCards:
          sanityAbout.contactCards && sanityAbout.contactCards.length > 0
            ? sanityAbout.contactCards
            : SAMPLE_ABOUT.contactCards,
      }
    }
  } catch (error) {
    console.warn('Error fetching about data from Sanity, falling back to sample data:', error)
  }

  return SAMPLE_ABOUT
}
