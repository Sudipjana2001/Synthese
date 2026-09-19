import type { Metadata } from 'next'
import { getAboutData } from '../../lib/getAbout'
import { AboutClient } from './AboutClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutData()
  return {
    title: `${about.title || 'Curriculum & Editorial Dossier'} — Synthese`,
    description: about.headline || about.abstract,
  }
}

export default async function AboutPage() {
  const about = await getAboutData()
  return <AboutClient about={about} />
}
