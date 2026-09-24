'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Play,
  BookOpen,
  ChevronDown,
  Check,
} from 'lucide-react'
import { HomePageData } from '../lib/getHomePage'
import { ScrollReveal } from '../components/ScrollReveal'
import styles from './page.module.css'

const DISCIPLINES = [
  'All Disciplines',
  'Cognitive Computation',
  'Physical Substrates',
  'Philosophy of Mind',
  'Dynamical Systems',
] as const

interface HomeClientProps {
  home: HomePageData
}

export function HomeClient({ home }: HomeClientProps) {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('All Disciplines')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredPapers = useMemo(() => {
    if (selectedDiscipline === 'All Disciplines') return home.papers
    return home.papers.filter((p) => p.discipline === selectedDiscipline)
  }, [selectedDiscipline, home.papers])

  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [newsletterMessage, setNewsletterMessage] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim() || newsletterStatus === 'loading') return

    setNewsletterStatus('loading')
    setNewsletterMessage('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      })
      const data = await res.json()
      if (res.ok) {
        setNewsletterStatus('success')
        setNewsletterMessage(data.message || 'Subscribed successfully!')
        setNewsletterEmail('')
      } else {
        setNewsletterStatus('error')
        setNewsletterMessage(data.error || 'Subscription failed. Please try again.')
      }
    } catch {
      setNewsletterStatus('error')
      setNewsletterMessage('Network error. Please try again later.')
    }
  }

  const featured = home.featuredPaperCard

  return (
    <main className={`container ${styles.mainContent}`}>
      {/* ── 01: Hero Section (Two-Column Layout) ── */}
      <section className={styles.heroGrid}>
        <div className={`${styles.heroLeft} animate-fade-up`}>
          <div className={styles.forewordKicker}>
            <span className={styles.kickerPill}>{home.kicker}</span>
            <span>•</span>
            <span>{home.authorName} • {home.authorSubtitle || 'Principal Investigator'}</span>
          </div>

          <h1 className={styles.headline}>
            {home.heroHeadline}
          </h1>

          <p className={styles.subheadline}>
            {home.heroSubheadline}
          </p>

          <div className={styles.ctaGroup}>
            <Link href={home.heroPrimaryCta?.url || '/projects'} className={`${styles.primaryCta} arrow-nudge`}>
              <span>{home.heroPrimaryCta?.label || 'Launch Interactive Lab'}</span>
              <ArrowRight size={14} />
            </Link>
            <Link href={home.heroSecondaryCta?.url || '/blog'} className={`${styles.secondaryCta} arrow-nudge`}>
              <span>{home.heroSecondaryCta?.label || 'Read Manuscripts & Math'}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Research Velocity / Telemetry Card */}
        <aside className={`${styles.velocityCard} animate-fade-up delay-100`}>
          <div className={styles.velocityHeader}>
            <span className={styles.velocityTitle}>{home.velocityCard.title}</span>
            <span className={styles.velocityTag}>{home.velocityCard.tag || '2024–2026'}</span>
          </div>

          <div className={styles.velocityStats}>
            {home.velocityCard.metrics.map((metric, idx) => (
              <div key={idx} className={styles.statItem}>
                <span className={styles.statVal}>{metric.value}</span>
                <span className={styles.statDesc}>{metric.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.velocityLicense}>
            <span>{home.velocityCard.licenseText || 'Curated under CC-BY-4.0 Computational Press'}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-accent)' }}>
              {home.velocityCard.versionText || 'v2.4'}
            </span>
          </div>
        </aside>
      </section>

      {/* ── 02: Featured Computational Paper ── */}
      {featured && (
        <ScrollReveal direction="up" delay={60}>
          <section className={styles.featuredPaperCard}>
            <div>
              <div className={styles.paperMetaPills}>
                <span className={styles.badgeDark}>{featured.badge}</span>
                <span className={styles.badgeMuted}>{featured.readTime}</span>
                <span className={styles.badgeAccess}>{featured.accessTag}</span>
              </div>

              <h2 className={styles.paperTitle}>
                {featured.title}
              </h2>

              <p className={styles.paperSummary}>
                {featured.summary}
              </p>

              <div className={styles.tagRow}>
                {featured.tags?.map((tag, idx) => (
                  <span key={idx} className={styles.tagPill}>{tag}</span>
                ))}
              </div>

              <div className={styles.paperActionGroup}>
                <Link href={featured.buttonUrl || '/blog'} className={`${styles.primaryCta} arrow-nudge`}>
                  <span>{featured.buttonLabel || 'Read Manuscript & Math'}</span>
                  <ArrowRight size={14} />
                </Link>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                  {featured.doi}
                </span>
              </div>
            </div>

            {/* Interactive Simulation Sandbox Preview Widget */}
            <div className={styles.simulationBox}>
              <div className={styles.simHeader}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="status-dot status-dot-active" />
                  <span>{featured.simulationTitle || 'Simulation Sandbox Preview'}</span>
                </span>
                <span>{featured.simulationSubtitle || 'WebGL • Canvas 01'}</span>
              </div>

              <div className={styles.simCanvasArea}>
                <svg className={styles.simNetworkSvg} viewBox="0 0 320 160">
                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <line x1="40" y1="80" x2="110" y2="40" stroke="url(#lineGrad)" strokeWidth="1.5" />
                  <line x1="110" y1="40" x2="170" y2="90" stroke="url(#lineGrad)" strokeWidth="1.5" />
                  <line x1="170" y1="90" x2="230" y2="50" stroke="url(#lineGrad)" strokeWidth="1.5" />
                  <line x1="230" y1="50" x2="280" y2="100" stroke="url(#lineGrad)" strokeWidth="1.5" />
                  <line x1="110" y1="40" x2="230" y2="50" stroke="url(#lineGrad)" strokeWidth="1.5" className={styles.simDashedLine} />
                  <line x1="40" y1="80" x2="170" y2="90" stroke="url(#lineGrad)" strokeWidth="1.5" className={styles.simDashedLine} />

                  <circle cx="40" cy="80" r="6" fill="#3b82f6" className={styles.simNode1} />
                  <circle cx="110" cy="40" r="8" fill="#60a5fa" className={styles.simNode2} />
                  <circle cx="170" cy="90" r="10" fill="#ffffff" className={styles.simNode3} />
                  <circle cx="230" cy="50" r="7" fill="#818cf8" className={styles.simNode4} />
                  <circle cx="280" cy="100" r="5" fill="#3b82f6" className={styles.simNode5} />
                </svg>
              </div>

              <div className={styles.simFooter}>
                <div className={styles.simMetrics}>
                  <span>{featured.simulationMetric1 || 'AGENTS: 256'}</span>
                  <span>{featured.simulationMetric2 || 'COUPLING: 0.72'}</span>
                </div>
                <Link href={featured.simulationButtonUrl || '/projects'} className={styles.simBtn}>
                  <Play size={11} />
                  <span>{featured.simulationButtonText || 'Launch Full Sandbox'}</span>
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* ── 03: Recent Essays & Working Papers (Two-Column) ── */}
      <section className={styles.contentGrid}>
        {/* Left Column: Papers List */}
        <div>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionHeading}>{home.essaysSectionHeading || 'Recent Essays & Working Papers'}</h2>

            <div className={styles.filterWrapper} ref={filterRef}>
              <button
                type="button"
                className={styles.filterBtn}
                onClick={() => setIsFilterOpen((prev) => !prev)}
                aria-expanded={isFilterOpen}
                aria-haspopup="true"
                aria-label="Filter essays by discipline"
              >
                <span>Filter: {selectedDiscipline}</span>
                <ChevronDown
                  size={12}
                  style={{
                    transform: isFilterOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.15s ease',
                  }}
                />
              </button>

              {isFilterOpen && (
                <div className={styles.filterDropdown} role="menu">
                  {DISCIPLINES.map((disc) => (
                    <button
                      key={disc}
                      type="button"
                      className={`${styles.filterItem} ${selectedDiscipline === disc ? styles.filterItemActive : ''}`}
                      onClick={() => {
                        setSelectedDiscipline(disc)
                        setIsFilterOpen(false)
                      }}
                      role="menuitem"
                    >
                      <span>{disc}</span>
                      {selectedDiscipline === disc && <Check size={12} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.essaysList}>
            {filteredPapers.map((paper, idx) => (
              <ScrollReveal key={paper.id} direction="up" delay={Math.min(idx * 60, 240)}>
                <article className={styles.essayCard}>
                  <div className={styles.essayTopRow}>
                    <div className={styles.essayPills}>
                      <span className={styles.badgeMuted}>{paper.volume}</span>
                      <span className={styles.badgeMuted}>{paper.readTime}</span>
                      <span className={styles.badgeAccess}>{paper.status}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-tertiary)' }}>
                      {paper.discipline}
                    </span>
                  </div>

                  <h3 className={styles.essayTitle}>
                    <Link href={`/blog/${paper.slug}`}>{paper.title}</Link>
                  </h3>

                  <p className={styles.essayExcerpt}>{paper.excerpt}</p>

                  <div className={styles.essayAuthorRow}>
                    <span>{paper.authorDate}</span>
                    <Link href={`/blog/${paper.slug}`} className="arrow-nudge" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                      <span>Read Full Paper</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}

            {filteredPapers.length === 0 && (
              <div
                style={{
                  padding: 'var(--space-8)',
                  textAlign: 'center',
                  color: 'var(--color-text-tertiary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  border: '1px dashed var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                No working papers found under &ldquo;{selectedDiscipline}&rdquo;.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Micro-Thoughts & Widgets */}
        <aside className={styles.widgetsCol}>
          {/* Micro-Thoughts / Field Notes (Garden) */}
          <ScrollReveal direction="up" delay={80}>
            <div className={styles.widgetBox}>
              <div className={styles.widgetHeader}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <BookOpen size={14} color="var(--color-accent)" />
                  <span>{home.fieldNotesTitle || 'Micro-Thoughts & Field Notes'}</span>
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-tertiary)' }}>
                  {home.fieldNotesBadge || 'Live RSS'}
                </span>
              </div>

              <div className={styles.gardenNoteList}>
                {home.fieldNotes.map((note, idx) => (
                  <div key={idx} className={styles.gardenNoteItem}>
                    <div className={styles.gardenNoteDate}>
                      <span>{note.date}</span>
                      <span>{note.timeAgo}</span>
                    </div>
                    <p className={styles.gardenNoteText}>
                      {note.text}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-3)' }}>
                <Link href={home.fieldNotesLinkUrl || '/garden'} style={{ fontSize: '11px', color: 'var(--color-accent)', fontWeight: 600 }}>
                  {home.fieldNotesLinkText || 'Explore all 1,200+ garden notes ↗'}
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Epistemic Stance Quote Box */}
          <ScrollReveal direction="up" delay={120}>
            <div className={styles.quoteBox}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>
                {home.epistemicQuote.badge}
              </div>
              <p className={styles.quoteText}>
                &ldquo;{home.epistemicQuote.quoteText}&rdquo;
              </p>
              <div className={styles.quoteAuthor}>
                {home.epistemicQuote.quoteAuthor}
              </div>
            </div>
          </ScrollReveal>
        </aside>
      </section>

      {/* ── 04: Newsletter / Gazette Signup Card ── */}
      {home.newsletter.show && (
        <ScrollReveal direction="up" delay={60}>
          <section className={styles.newsletterCard}>
            <span className={styles.newsletterBadge}>
              {home.newsletter.badge}
            </span>

            <h2 className={styles.newsletterTitle}>
              {home.newsletter.title}
            </h2>

            <p className={styles.newsletterDesc}>
              {home.newsletter.description}
            </p>

            <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                className={styles.newsletterInput}
                placeholder={home.newsletter.placeholder || 'researcher@institute.edu or scholar@domain.org'}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                disabled={newsletterStatus === 'loading'}
                required
              />
              <button
                type="submit"
                className={styles.newsletterButton}
                disabled={newsletterStatus === 'loading'}
              >
                {newsletterStatus === 'loading'
                  ? 'Transmitting...'
                  : home.newsletter.buttonText || 'Subscribe to Dispatch →'}
              </button>
            </form>

            {newsletterMessage && (
              <div
                className={`${styles.newsletterFeedback} ${
                  newsletterStatus === 'success' ? styles.newsletterSuccess : styles.newsletterError
                }`}
              >
                {newsletterMessage}
              </div>
            )}

            {home.newsletter.privacyPerks && home.newsletter.privacyPerks.length > 0 && (
              <div className={styles.newsletterPerks}>
                {home.newsletter.privacyPerks.map((perk, pIdx) => (
                  <React.Fragment key={pIdx}>
                    {pIdx > 0 && <span>•</span>}
                    <span>{perk}</span>
                  </React.Fragment>
                ))}
              </div>
            )}
          </section>
        </ScrollReveal>
      )}
    </main>
  )
}
