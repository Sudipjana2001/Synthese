'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  ArrowRight,
  Play,
  BookOpen,
  Compass,
  Sparkles,
  Sliders,
  ExternalLink,
  ChevronDown,
  Check,
} from 'lucide-react'
import styles from './page.module.css'

const DISCIPLINES = [
  'All Disciplines',
  'Cognitive Computation',
  'Physical Substrates',
  'Philosophy of Mind',
  'Dynamical Systems',
] as const

const HOME_PAPERS = [
  {
    id: 'pr-01452',
    slug: 'topological-entropy-and-semantic-drift',
    volume: 'Vol. 4 • Art. 12',
    readTime: '24 min read',
    status: 'Peer Reviewed',
    discipline: 'Cognitive Computation',
    title: 'Topological Entropy and Semantic Drift in Deep Generative Latents',
    excerpt:
      'By analyzing vector manifold deformations through persistent homology, we identify the exact thermodynamic inflection point where autoregressive language models depart from ground truth grounding into hallucinatory self-referential hypertoruses.',
    authorDate: 'Sudip Jana • November 24, 2026',
  },
  {
    id: 'pr-01451',
    slug: 'morphogenetic-computing-reaction-diffusion',
    volume: 'Vol. 4 • Art. 11',
    readTime: '32 min read',
    status: 'Peer Reviewed',
    discipline: 'Physical Substrates',
    title: 'Morphogenetic Computing: Reaction-Diffusion Substrates as Low-Power Logic Networks',
    excerpt:
      'Turing reaction-diffusion patterns implemented in synthetic biological gels offer non-von-Neumann asynchronous pattern recognition with sub-picowatt energy consumption.',
    authorDate: 'Sudip Jana • October 19, 2026',
  },
  {
    id: 'pr-01450',
    slug: 'hard-problem-of-machine-affect',
    volume: 'Vol. 4 • Art. 10',
    readTime: '20 min read',
    status: 'Preprint (Under Review)',
    discipline: 'Philosophy of Mind',
    title: 'The Hard Problem of Machine Affect: Functionalism, Homeostasis, and Synthetic Interiority',
    excerpt:
      'We argue that sentiment in reinforcement learning cannot generate true experiential valence without metabolic somatic vulnerability. A formalization of synthetic allostasis.',
    authorDate: 'Sudip Jana • September 12, 2026',
  },
  {
    id: 'pr-01449',
    slug: 'emergence-of-spontaneous-coordination',
    volume: 'Vol. 4 • Art. 09',
    readTime: '18 min read',
    status: 'Peer Reviewed',
    discipline: 'Dynamical Systems',
    title: 'Phase Transitions in Unconstrained Transformer Multi-Agent Ensembles',
    excerpt:
      'Theoretical derivation demonstrating geometric resonance across high-dimensional latent policy embeddings with zero external loss formulation.',
    authorDate: 'Sudip Jana • August 30, 2026',
  },
]

export default function HomePage() {
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
    if (selectedDiscipline === 'All Disciplines') return HOME_PAPERS
    return HOME_PAPERS.filter((p) => p.discipline === selectedDiscipline)
  }, [selectedDiscipline])

  return (
    <main className={`container ${styles.mainContent}`}>
      {/* ── 01: Hero Section (Two-Column Layout) ── */}
      <section className={styles.heroGrid}>
        <div className={styles.heroLeft}>
          <div className={styles.forewordKicker}>
            <span className={styles.kickerPill}>Editor&apos;s Foreword</span>
            <span>•</span>
            <span>Dr. Dana Vance • Principal Investigator</span>
          </div>

          <h1 className={styles.headline}>
            Exploring the intersection of <span className={styles.italic}>artificial cognition</span>, complex adaptive systems, and interactive computation.
          </h1>

          <p className={styles.subheadline}>
            Synthese is an open computational press and experimental laboratory. We construct executable models, distill long-form philosophical treatises, and publish rigorous mathematical syntheses that transcend traditional static print.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/studio" className={styles.primaryCta} target="_blank">
              <span>Open Admin Studio (/studio)</span>
              <ArrowUpRight size={15} />
            </Link>
            <Link href="/blog" className={styles.secondaryCta}>
              <span>Read Manuscripts &amp; Math</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Research Velocity / Telemetry Card */}
        <aside className={styles.velocityCard}>
          <div className={styles.velocityHeader}>
            <span className={styles.velocityTitle}>Research Velocity</span>
            <span className={styles.velocityTag}>2024–2026</span>
          </div>

          <div className={styles.velocityStats}>
            <div className={styles.statItem}>
              <span className={styles.statVal}>38</span>
              <span className={styles.statDesc}>Peer-Reviewed Papers</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>14</span>
              <span className={styles.statDesc}>Executable Simulations</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>120k</span>
              <span className={styles.statDesc}>Model Telemetry</span>
            </div>
          </div>

          <div className={styles.velocityLicense}>
            <span>Curated under CC-BY-4.0 Computational Press</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-accent)' }}>v2.4</span>
          </div>
        </aside>
      </section>

      {/* ── 02: Featured Computational Paper ── */}
      <section className={styles.featuredPaperCard}>
        <div>
          <div className={styles.paperMetaPills}>
            <span className={styles.badgeDark}>Featured Computational Paper</span>
            <span className={styles.badgeMuted}>18 min read</span>
            <span className={styles.badgeAccess}>Open Access</span>
          </div>

          <h2 className={styles.paperTitle}>
            Emergence of Spontaneous Coordination in Multi-Agent Neural Topologies
          </h2>

          <p className={styles.paperSummary}>
            We demonstrate how high-dimensional stochastic coupling between decentralized transformer-based agents yields phase transitions toward macro-scale consensus without external reward gradients. Read the mathematical derivation alongside live parameter perturbation.
          </p>

          <div className={styles.tagRow}>
            <span className={styles.tagPill}>#ReinforcementLearning</span>
            <span className={styles.tagPill}>#NeuroTopology</span>
            <span className={styles.tagPill}>#DynamicalSystems</span>
          </div>

          <div className={styles.paperActionGroup}>
            <Link href="/blog" className={styles.primaryCta}>
              <span>Read Manuscript &amp; Math</span>
              <ArrowRight size={14} />
            </Link>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
              DOI: 10.48550/SYNTHESE.2026.04229
            </span>
          </div>
        </div>

        {/* Interactive Simulation Sandbox Preview Widget */}
        <div className={styles.simulationBox}>
          <div className={styles.simHeader}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="status-dot status-dot-active" />
              <span>Simulation Sandbox Preview</span>
            </span>
            <span>WebGL • Canvas 01</span>
          </div>

          <div className={styles.simCanvasArea}>
            {/* Dynamic Svg Neural Topology */}
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
              <line x1="110" y1="40" x2="230" y2="50" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="40" y1="80" x2="170" y2="90" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="3 3" />

              <circle cx="40" cy="80" r="6" fill="#3b82f6" />
              <circle cx="110" cy="40" r="8" fill="#60a5fa" />
              <circle cx="170" cy="90" r="10" fill="#ffffff" />
              <circle cx="230" cy="50" r="7" fill="#818cf8" />
              <circle cx="280" cy="100" r="5" fill="#3b82f6" />
            </svg>
          </div>

          <div className={styles.simFooter}>
            <div className={styles.simMetrics}>
              <span>AGENTS: 256</span>
              <span>COUPLING: 0.72</span>
            </div>
            <Link href="/projects" className={styles.simBtn}>
              <Play size={11} />
              <span>Launch Full Sandbox</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 03: Recent Essays & Working Papers (Two-Column) ── */}
      <section className={styles.contentGrid}>
        {/* Left Column: Papers List */}
        <div>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionHeading}>Recent Essays &amp; Working Papers</h2>

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
            {filteredPapers.map((paper) => (
              <article key={paper.id} className={styles.essayCard}>
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
                  <Link href={`/blog/${paper.slug}`} style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                    Read Full Paper →
                  </Link>
                </div>
              </article>
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
          <div className={styles.widgetBox}>
            <div className={styles.widgetHeader}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen size={14} color="var(--color-accent)" />
                <span>Micro-Thoughts &amp; Field Notes</span>
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-tertiary)' }}>
                Live RSS
              </span>
            </div>

            <div className={styles.gardenNoteList}>
              <div className={styles.gardenNoteItem}>
                <div className={styles.gardenNoteDate}>
                  <span>#Log:2026-03-14</span>
                  <span>2h ago</span>
                </div>
                <p className={styles.gardenNoteText}>
                  If attention mechanisms in transformers can be isomorphic to spatial graph diffusion clustering, why do we still evaluate attention purely as linguistic weights rather than physical field interactions?
                </p>
              </div>

              <div className={styles.gardenNoteItem}>
                <div className={styles.gardenNoteDate}>
                  <span>#Log:2026-03-11</span>
                  <span>4d ago</span>
                </div>
                <p className={styles.gardenNoteText}>
                  Finished benchmarking puny layers on Monte Carlo model on DDIM parameter manifolds. Convergence speeds double when we penalize entropy extremes early in training.
                </p>
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-3)' }}>
              <Link href="/garden" style={{ fontSize: '11px', color: 'var(--color-accent)', fontWeight: 600 }}>
                Explore all 1,200+ garden notes ↗
              </Link>
            </div>
          </div>

          {/* Epistemic Stance Quote Box */}
          <div className={styles.quoteBox}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>
              Epistemic Stance
            </div>
            <p className={styles.quoteText}>
              &ldquo;A model is not a passive mirror of empirical nature; it is an apparatus that forces our premises to collide with mathematical consequences.&rdquo;
            </p>
            <div className={styles.quoteAuthor}>
              — Synthese Editorial Board Charter
            </div>
          </div>
        </aside>
      </section>

      {/* ── 04: Newsletter / Gazette Signup Card ── */}
      <section className={styles.newsletterCard}>
        <span className={styles.newsletterBadge}>
          Institutional Dispatch &amp; Preprint Alerts • ISSN 2769-188X • Bi-weekly Overviews
        </span>

        <h2 className={styles.newsletterTitle}>
          Subscribe to the Synthese Scholarly Computation Gazette
        </h2>

        <p className={styles.newsletterDesc}>
          Receive newly verified mathematical models, long-form philosophical inquiries, and downloadable Jupyter &amp; WebGL environments directly in your inbox every second Thursday. No marketing drivel; purely executable research.
        </p>

        <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            className={styles.newsletterInput}
            placeholder="researcher@institute.edu or scholar@domain.org"
            required
          />
          <button type="submit" className={styles.newsletterButton}>
            Subscribe to Dispatch →
          </button>
        </form>

        <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-4)', fontSize: '11px', color: '#64748b' }}>
          <span>🔒 PGP Encrypted Alerts</span>
          <span>•</span>
          <span>No Ad Tracking Pixels</span>
          <span>•</span>
          <span>Instant Unsubscribe</span>
        </div>
      </section>
    </main>
  )
}
