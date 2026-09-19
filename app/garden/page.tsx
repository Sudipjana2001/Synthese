import type { Metadata } from 'next'
import { getGardenData } from '../../lib/getGarden'
import { GardenClient } from './GardenClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getGardenData()
  return {
    title: `${settings.title || 'Digital Garden & Synaptic Graph'} — Synthese`,
    description: settings.description,
  }
}

export default async function GardenPage() {
  const { notes, settings } = await getGardenData()
  return <GardenClient notes={notes} settings={settings} />
}
