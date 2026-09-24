import type { Metadata } from 'next'
import { getHomePageData } from '../lib/getHomePage'
import { HomeClient } from './HomeClient'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomePageData()
  return {
    title: 'Synthese — An Open Scholarly Computational Press & Personal Lab',
    description: home.heroSubheadline,
  }
}

export default async function HomePage() {
  const home = await getHomePageData()
  return <HomeClient home={home} />
}
