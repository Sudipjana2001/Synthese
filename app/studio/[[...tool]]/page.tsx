import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'
import { DevConsoleFilter } from '../../../components/DevConsoleFilter'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return (
    <>
      <DevConsoleFilter />
      <NextStudio config={config} />
    </>
  )
}
