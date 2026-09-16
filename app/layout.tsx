import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '../components/ThemeProvider'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

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
  authors: [{ name: 'Sudip' }],
  creator: 'Sudip',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
