'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Terminal,
  Code,
  Star,
  ExternalLink,
  BookOpen,
  Copy,
  Check,
  Play,
  Sliders,
} from 'lucide-react'
import { ReactionDiffusionCanvas } from '../../components/ReactionDiffusionCanvas'
import { EnclosurePreview } from '../../components/EnclosurePreview'
import { SAMPLE_PROJECTS } from '../../lib/sampleProjects'
import { Project } from '../../types/project'
import styles from './projects.module.css'

const CATEGORIES = [
  'All Models (14)',
  'Agent-Based Simulations',
  'Probability & Inference',
  'Neural Networks',
  'Dynamical Systems',
  'Information Theory',
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Models (14)')
  const [copiedEmbed, setCopiedEmbed] = useState(false)
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null)

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All Models (14)') return SAMPLE_PROJECTS
    return SAMPLE_PROJECTS.filter((p) => p.category === selectedCategory)
  }, [selectedCategory])

  const copyEmbedSnippet = () => {
    navigator.clipboard.writeText('<synthese-model type="gray-scott" f="0.054" k="0.062" />')
    setCopiedEmbed(true)
    setTimeout(() => setCopiedEmbed(false), 2000)
  }

  return (
    <main className={`container ${styles.projectsContainer}`}>
      {/* ── 01: Top Status / Metadata Kicker ── */}
      <div className={styles.topStatusRow}>
        <span className={styles.kickerPill}>Comp-Lab Suite v2.4</span>
        <span className={styles.metaDivider}>•</span>
        <span className={styles.issnTag}>ISSN 2769-188X</span>
        <span className={styles.metaDivider}>•</span>
        <span className={styles.webglBadge}>
          <span className="status-dot status-dot-active" />
          <span>WebGL 2.0 Active</span>
        </span>
      </div>

      {/* ── 02: Page Header (Title + Editorial Actions) ── */}
      <header className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>
            The Computational Lab: Interactive Models &amp; Live Explainables
          </h1>
          <p className={styles.pageDesc}>
            An open repository of mathematically rigorous, dynamic algorithmic simulations. Built to accompany
            long-form analytical monographs, allowing researchers to evaluate parametric phase spaces in real time.
          </p>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.btnSecondaryAction}
              onClick={() => window.open('https://pyodide.org/', '_blank')}
            >
              <Terminal size={14} />
              <span>Jupyter Kernel (Pyodide)</span>
            </button>

            <button
              type="button"
              className={styles.btnPrimaryAction}
              onClick={() => window.open('https://github.com/Sudipjana2001/Synthese', '_blank')}
            >
              <Code size={14} />
              <span>Submit Algorithm</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── 03: Category Filter Pills (Horizontal Swipe on Mobile) ── */}
      <nav aria-label="Simulation categories" className={styles.filterPillsNav}>
        <ul className={styles.filterPillsRow}>
          {CATEGORIES.map((cat) => (
            <li key={cat} className={styles.filterPillItem}>
              <button
                type="button"
                className={`${styles.filterPill} ${selectedCategory === cat ? styles.activeFilterPill : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── 04: Featured Live Computational Engine (Reaction-Diffusion) ── */}
      <section aria-label="Featured live engine" className={styles.featuredEngineSection}>
        <ReactionDiffusionCanvas />
      </section>

      {/* ── 05: Specialized Computation Enclosures ── */}
      <section className={styles.enclosuresSection}>
        <div className={styles.enclosuresHeader}>
          <div>
            <span className={styles.arsenalKicker}>Active Algorithmic Arsenal</span>
            <h2 className={styles.arsenalHeading}>Specialized Computation Enclosures</h2>
            <p className={styles.arsenalDesc}>
              Drag parameters, test assumptions, and fork computational code sandbox states.
            </p>
          </div>

          <span className={styles.displayCount}>
            Displaying {filteredProjects.length} of 14 simulations
          </span>
        </div>

        <div className={styles.enclosuresGrid}>
          {filteredProjects.map((project) => (
            <article key={project._id} className={styles.enclosureCard}>
              <div className={styles.cardContent}>
                <div className={styles.cardTopMeta}>
                  <span className={styles.disciplinePill}>{project.disciplineTag}</span>
                  <span className={styles.starsRow}>
                    <Star size={12} className={styles.starIcon} fill="#f59e0b" />
                    <span>{project.stars.toLocaleString()}</span>
                  </span>
                </div>

                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>

                {/* Living Graphic Preview */}
                <div className={styles.previewContainer}>
                  <EnclosurePreview modelType={project.modelType} />
                </div>
              </div>

              {/* Card Footer Metrics & Action */}
              <div className={styles.cardFooter}>
                <div className={styles.metricsRow}>
                  <span>
                    <span className={styles.metricKey}>{project.metrics.label1}: </span>
                    <span className={styles.metricVal}>{project.metrics.value1}</span>
                  </span>
                  <span>
                    <span className={styles.metricKey}>{project.metrics.label2}: </span>
                    <span className={styles.metricVal}>{project.metrics.value2}</span>
                  </span>
                </div>

                <button
                  type="button"
                  className={styles.launchBtn}
                  onClick={() => setActiveModalProject(project)}
                >
                  <Play size={11} />
                  <span>{project.actionLabel}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── 06: Embed Live Models Callout Card ── */}
      <section className={styles.embedBox}>
        <span className={styles.embedKicker}>Integrate Into Your Writing</span>
        <h2 className={styles.embedTitle}>Embed Live Models in Academic Manuscripts</h2>
        <p className={styles.embedDesc}>
          Every widget in Synthese Lab compiles to a standalone, zero-dependency Web Component. Include fully
          interactive, parameter-persisted mathematical figures in your Substack, Quarto document, or HTML publication.
        </p>

        <div className={styles.embedCodeRow}>
          <div className={styles.codeSnippet}>
            <code>&lt;synthese-model type=&quot;gray-scott&quot; f=&quot;0.054&quot; k=&quot;0.062&quot; /&gt;</code>
          </div>

          <div className={styles.embedButtons}>
            <button
              type="button"
              className={styles.btnSecondaryAction}
              onClick={copyEmbedSnippet}
              aria-label="Copy embed code"
            >
              {copiedEmbed ? <Check size={13} color="var(--color-success)" /> : <Copy size={13} />}
              <span>{copiedEmbed ? 'Copied to Clipboard' : 'Copy Embed Tag'}</span>
            </button>

            <Link href="/studio" className={styles.btnPrimaryAction} target="_blank">
              <BookOpen size={13} />
              <span>Open in Writing Studio</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Interactive Modal for Simulation Sandboxes ── */}
      {activeModalProject && (
        <div
          className={styles.modalOverlay}
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className={styles.modalDialog}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <span className={styles.disciplinePill}>{activeModalProject.disciplineTag}</span>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setActiveModalProject(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <h3 className={styles.modalTitle}>
              {activeModalProject.title}
            </h3>

            <p className={styles.modalDesc}>
              {activeModalProject.description}
            </p>

            <div className={styles.modalPreviewWrapper}>
              <EnclosurePreview modelType={activeModalProject.modelType} />
            </div>

            <div className={styles.modalFooter}>
              <span className={styles.modalStatusText}>
                Status: Executable Web Component Loaded
              </span>
              <button
                type="button"
                className={styles.btnPrimaryAction}
                onClick={() => setActiveModalProject(null)}
              >
                Close Sandbox
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
