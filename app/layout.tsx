import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '../components/ThemeProvider'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { DevConsoleFilter } from '../components/DevConsoleFilter'
import { NavigationProgress } from '../components/NavigationProgress'
import { getSiteSettings } from '../lib/getSiteSettings'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: {
    default: 'Synthese — An Open Scholarly Computational Press & Personal Lab',
    template: '%s | Synthese',
  },
  description:
    'Synthese is an open computational press, research journal, and interactive digital garden sharing long-form treatises, systems engineering, and living mental models.',
  keywords: [
    'computational press',
    'software engineering',
    'complex adaptive systems',
    'interactive computation',
    'digital garden',
    'architecture',
  ],
  authors: [{ name: 'Sudip Jana' }],
  creator: 'Sudip Jana',
  metadataBase: new URL('https://synthese.blog'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Synthese',
    title: 'Synthese — An Open Scholarly Computational Press & Personal Lab',
    description:
      'Synthese is an open computational press, research journal, and interactive digital garden sharing long-form treatises, systems engineering, and living mental models.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Synthese — An Open Scholarly Computational Press & Personal Lab',
    description:
      'Synthese is an open computational press, research journal, and interactive digital garden sharing long-form treatises, systems engineering, and living mental models.',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <DevConsoleFilter />
        <NavigationProgress />
        <ThemeProvider>
          <Header settings={settings} />
          <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            {children}
          </div>
          <Footer settings={settings} />
        </ThemeProvider>
      </body>
    </html>
  )
}

