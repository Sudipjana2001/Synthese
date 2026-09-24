import type { Metadata } from 'next'
import { getProjectsData } from '../../lib/getProjects'
import { ProjectsClient } from './ProjectsClient'

export const revalidate = 60


export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getProjectsData()
  return {
    title: `${settings.title || 'Interactive Lab & Simulations'} — Synthese`,
    description: settings.description,
  }
}

export default async function ProjectsPage() {
  const { projects, settings } = await getProjectsData()
  return <ProjectsClient projects={projects} settings={settings} />
}
