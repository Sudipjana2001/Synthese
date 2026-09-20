'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Terminal,
  Code,
  Star,
  BookOpen,
  Copy,
  Check,
  Play,
} from 'lucide-react'
import { ReactionDiffusionCanvas } from '../../components/ReactionDiffusionCanvas'
import { EnclosurePreview } from '../../components/EnclosurePreview'
import { ScrollReveal } from '../../components/ScrollReveal'
import { Project } from '../../types/project'
import { ProjectsPageSettings } from '../../lib/getProjects'
import styles from './projects.module.css'

interface ProjectsClientProps {
  projects: Project[]
  settings: ProjectsPageSettings
}

export function ProjectsClient({ projects, settings }: ProjectsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All Models')
  const [copiedEmbed, setCopiedEmbed] = useState(false)
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null)

  // Derive categories dynamically from projects
  const categories = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => {
      if (p.category) set.add(p.category)
    })
    return ['All Models', ...Array.from(set)]
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All Models') return projects
    return projects.filter((p) => p.category === selectedCategory)
  }, [selectedCategory, projects])

  const copyEmbedSnippet = () => {
    navigator.clipboard.writeText('<synthese-model type="gray-scott" f="0.054" k="0.062" />')
    setCopiedEmbed(true)
    setTimeout(() => setCopiedEmbed(false), 2000)
  }

  return (
    <main className={`container ${styles.projectsContainer}`}>
      {/* ── 01: Top Status / Metadata Kicker ── */}
      <div className={styles.topStatusRow}>
        <span className={styles.kickerPill}>{settings.statusKicker || 'Comp-Lab Suite v2.4'}</span>
        <span className={styles.metaDivider}>•</span>
        <span className={styles.issnTag}>{settings.issnTag || 'ISSN 2769-188X'}</span>
        <span className={styles.metaDivider}>•</span>
        <span className={styles.webglBadge}>
          <span className="status-dot status-dot-active" />
          <span>{settings.webglBadge || 'WebGL 2.0 Active'}</span>
        </span>
      </div>

      {/* ── 02: Page Header (Title + Editorial Actions) ── */}
      <header className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>
            {settings.title || 'The Computational Lab: Interactive Models & Live Explainables'}
          </h1>
          <p className={styles.pageDesc}>
            {settings.description ||
              'An open repository of mathematically rigorous, dynamic algorithmic simulations. Built to accompany long-form analytical monographs, allowing researchers to evaluate parametric phase spaces in real time.'}
          </p>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.btnSecondaryAction}
              onClick={() => window.open(settings.secondaryButton?.url || 'https://pyodide.org/', '_blank')}
            >
              <Terminal size={14} />
              <span>{settings.secondaryButton?.label || 'Jupyter Kernel (Pyodide)'}</span>
            </button>

            <button
              type="button"
              className={styles.btnPrimaryAction}
              onClick={() => window.open(settings.primaryButton?.url || 'https://github.com/Sudipjana2001/Synthese', '_blank')}
            >
              <Code size={14} />
              <span>{settings.primaryButton?.label || 'Submit Algorithm'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── 03: Category Filter Pills (Horizontal Swipe on Mobile) ── */}
      {settings.showFilter !== false && (
        <nav aria-label="Simulation categories" className={styles.filterPillsNav}>
          <ul className={styles.filterPillsRow}>
            {categories.map((cat) => (
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
      )}

      {/* ── 04: Featured Live Computational Engine (Reaction-Diffusion) ── */}
      <section aria-label="Featured live engine" className={styles.featuredEngineSection}>
        <ReactionDiffusionCanvas />
      </section>

      {/* ── 05: Specialized Computation Enclosures ── */}
      <section className={styles.enclosuresSection}>
        <div className={styles.enclosuresHeader}>
          <div>
            <span className={styles.arsenalKicker}>{settings.arsenalKicker || 'Active Algorithmic Arsenal'}</span>
            <h2 className={styles.arsenalHeading}>{settings.arsenalHeading || 'Specialized Computation Enclosures'}</h2>
            <p className={styles.arsenalDesc}>
              {settings.arsenalDesc || 'Drag parameters, test assumptions, and fork computational code sandbox states.'}
            </p>
          </div>

          <span className={styles.displayCount}>
            Displaying {filteredProjects.length} of {projects.length} simulations
          </span>
        </div>

        <div className={styles.enclosuresGrid}>
          {filteredProjects.map((project, idx) => (
            <ScrollReveal key={project._id} direction="up" delay={Math.min(idx * 60, 240)}>
              <article className={styles.enclosureCard}>
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
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── 06: Embed Live Models Callout Card ── */}
      {settings.ctaBox?.show !== false && (
        <ScrollReveal direction="up" delay={60}>
          <section className={styles.embedBox}>
            <span className={styles.embedKicker}>Integrate Into Your Writing</span>
            <h2 className={styles.embedTitle}>{settings.ctaBox?.title || 'Embed Live Models in Academic Manuscripts'}</h2>
            <p className={styles.embedDesc}>
              {settings.ctaBox?.description ||
                'Every widget in Synthese Lab compiles to a standalone, zero-dependency Web Component. Include fully interactive, parameter-persisted mathematical figures in your Substack, Quarto document, or HTML publication.'}
            </p>

            <div className={styles.embedCodeRow}>
              <pre className={styles.codeSnippet}>
                <code>{settings.ctaBox?.snippetText || '<synthese-model type="gray-scott" f="0.054" k="0.062" />'}</code>
              </pre>

              <div className={styles.embedButtons}>
                <button
                  type="button"
                  className={styles.btnSecondaryAction}
                  onClick={() => {
                    navigator.clipboard.writeText(settings.ctaBox?.snippetText || '<synthese-model type="gray-scott" f="0.054" k="0.062" />')
                    setCopiedEmbed(true)
                    setTimeout(() => setCopiedEmbed(false), 2000)
                  }}
                  aria-label="Copy embed code"
                >
                  {copiedEmbed ? <Check size={13} color="var(--color-success)" /> : <Copy size={13} />}
                  <span>{copiedEmbed ? 'Copied to Clipboard' : 'Copy Embed Tag'}</span>
                </button>

                <Link href={settings.ctaBox?.buttonUrl || '/blog'} className={styles.btnPrimaryAction}>
                  <BookOpen size={13} />
                  <span>{settings.ctaBox?.buttonText || 'Explore Manuscripts'}</span>
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}

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
