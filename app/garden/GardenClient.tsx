'use client'

import React, { useState, useMemo, useRef, useCallback } from 'react'
import { Download, FileText, Search, Database, BookOpen } from 'lucide-react'
import { KnowledgeGraph } from '../../components/KnowledgeGraph'
import { SynapticInspector } from '../../components/SynapticInspector'
import { DISCIPLINES, MEMO_SLIPS } from '../../lib/sampleGarden'
import { GardenNote, GrowthStage } from '../../types/garden'
import { GardenPageSettings } from '../../lib/getGarden'
import { ScrollReveal } from '../../components/ScrollReveal'
import styles from './garden.module.css'

const STAGE_BORDER_COLORS: Record<GrowthStage, string> = {
  evergreen: '#0d9488',
  budding: '#3b82f6',
  sprout: '#f59e0b',
}

interface GardenClientProps {
  notes: GardenNote[]
  settings: GardenPageSettings
}

export function GardenClient({ notes, settings }: GardenClientProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [stageFilter, setStageFilter] = useState<GrowthStage | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [disciplineFilter, setDisciplineFilter] = useState<string>('All Disciplines')
  const [explorerStageFilter, setExplorerStageFilter] = useState<GrowthStage | 'all'>('all')
  const graphRef = useRef<HTMLDivElement>(null)

  // ── Filter notes for explorer ──
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      // Stage filter
      if (explorerStageFilter !== 'all' && note.stage !== explorerStageFilter) return false
      // Discipline filter
      if (disciplineFilter !== 'All Disciplines' && note.discipline !== disciplineFilter) return false
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        return (
          note.title.toLowerCase().includes(q) ||
          note.summary.toLowerCase().includes(q) ||
          note.tags.some((t) => t.toLowerCase().includes(q)) ||
          note.id.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [searchQuery, disciplineFilter, explorerStageFilter, notes])

  // ── Card click → scroll to graph + select ──
  const handleCardClick = useCallback(
    (noteId: string) => {
      setSelectedNodeId(noteId)
      graphRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    []
  )

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleExportBibtex = () => {
    const bib = notes.map((note) => `@misc{${note.citationKey || note.slug},
  title={${note.title}},
  author={Sudip Jana},
  howpublished={Synthese Digital Garden \\& Zettelkasten Archive},
  year={2026},
  note={Stage: ${note.stage}, Discipline: ${note.discipline}}
}`).join('\n\n')
    downloadFile(bib, 'synthese_garden_citations.bib', 'text/plain')
  }

  const handleExportJsonLd = () => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'DataCatalog',
      name: 'Synthese Digital Garden & Zettelkasten Archive',
      author: {
        '@type': 'Person',
        name: 'Sudip Jana',
        affiliation: 'Synthese Computational Press',
      },
      dataset: notes.map((n) => ({
        '@type': 'ScholarlyArticle',
        identifier: n.id,
        name: n.title,
        description: n.summary,
        keywords: n.tags.join(', '),
        about: n.discipline,
      })),
    }
    downloadFile(JSON.stringify(jsonLd, null, 2), 'synthese_garden_vault.jsonld', 'application/ld+json')
  }

  const handleExportObsidian = () => {
    const vaultText = notes.map((n) => `---
id: "${n.id}"
title: "${n.title}"
stage: ${n.stage}
discipline: "${n.discipline}"
tags: [${n.tags.map((t) => `"${t}"`).join(', ')}]
author: "Sudip Jana"
---

# ${n.id}: ${n.title}

${n.summary}

${n.formalLemma ? `## Formal Lemma\n**${n.formalLemma.label}**\n$$\n${n.formalLemma.formula}\n$$\n*${n.formalLemma.explanation}*\n` : ''}
## Synaptic Links & Backlinks
${(n.backlinks || []).map((b) => `- [[${b.title}]] (${b.id}): ${b.excerpt}`).join('\n')}
`).join('\n\n' + '='.repeat(40) + '\n\n')
    downloadFile(vaultText, 'synthese_obsidian_vault.md', 'text/markdown')
  }

  return (
    <main className={`container ${styles.gardenPage}`}>
      {/* ════════════════════════════════
          Section 01 — Masthead
          ════════════════════════════════ */}
      <section className={styles.mastheadSection}>
        <div className={styles.mastheadContainer}>
          <span className={styles.kicker}>
            {settings.mastheadKicker || 'REPOSITORY INDEX // V4.19'} &bull; {notes.length} Active Nodes &bull; 1,294 Synaptic Edges
          </span>
          <h1 className={styles.mastheadTitle}>
            {settings.title || 'The Digital Garden & Zettelkasten Archive'}
          </h1>
          <p className={styles.mastheadSubtitle}>
            {settings.description ||
              'A networked repository of evolving notes, speculative hypotheses, formal lemmas, and verified citations.'}
          </p>
          <div className={styles.mastheadActions}>
            <button type="button" className={styles.btnSecondary} onClick={handleExportBibtex}>
              <FileText size={14} />
              <span>{settings.bibtexBtnText || 'BibTeX Export'}</span>
            </button>
            <button type="button" className={styles.btnPrimary} onClick={handleExportObsidian}>
              <Download size={14} />
              <span>{settings.vaultBtnText || 'Download Vault (.md)'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          Section 02 — Graph + Inspector
          ════════════════════════════════ */}
      <section className={styles.graphSection} ref={graphRef}>
        <div className={styles.graphInspectorGrid}>
          <div className={styles.graphColumn}>
            <KnowledgeGraph
              selectedNodeId={selectedNodeId}
              onSelectNode={setSelectedNodeId}
              stageFilter={stageFilter}
              onStageFilterChange={setStageFilter}
            />
          </div>
          <div className={styles.inspectorColumn}>
            <SynapticInspector
              selectedNodeId={selectedNodeId}
              onSelectNode={setSelectedNodeId}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          Section 03 — Filterable Explorer
          ════════════════════════════════ */}
      <section className={styles.explorerSection}>
        <div className={styles.explorerHeader}>
          <div className={styles.explorerTitleRow}>
            <div className={styles.explorerLabel}>
              <Database size={14} />
              <span>{settings.explorerLabel || 'CATALOGUS FOLIIS'}</span>
            </div>
            <span className={styles.explorerCount}>{filteredNotes.length} of {notes.length} notes</span>
          </div>

          {/* Search + Filters */}
          <div className={styles.explorerControls}>
            <div className={styles.searchWrapper}>
              <Search size={14} className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder={settings.searchPlaceholder || 'Search title, lemma, or tag...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.filterRow}>
              <div className={styles.filterPills}>
                {(DISCIPLINES as readonly string[]).map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={`${styles.filterPill} ${disciplineFilter === d ? styles.filterPillActive : ''}`}
                    onClick={() => setDisciplineFilter(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <div className={styles.filterRight}>
                <div className={styles.stagePills}>
                  {(['all', 'evergreen', 'budding', 'sprout'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`${styles.filterPill} ${explorerStageFilter === s ? styles.filterPillActive : ''}`}
                      onClick={() => setExplorerStageFilter(s)}
                    >
                      {s === 'all' ? 'All Stages' : s === 'evergreen' ? '🌳 Evergreen' : s === 'budding' ? '🌿 Budding' : '🌱 Sprout'}
                    </button>
                  ))}
                </div>

                <div className={styles.exportBtns}>
                  <button type="button" className={styles.exportBtn} onClick={handleExportJsonLd}>
                    JSON-LD Index
                  </button>
                  <button type="button" className={styles.exportBtn} onClick={handleExportObsidian}>
                    Obsidian Vault (.md)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Grid */}
        <div className={styles.explorerGrid}>
          {filteredNotes.map((note, idx) => (
            <ScrollReveal key={note.id} direction="up" delay={Math.min(idx * 50, 250)}>
              <button
                type="button"
                className={`${styles.noteCard} ${selectedNodeId === note.id ? styles.noteCardSelected : ''}`}
                onClick={() => handleCardClick(note.id)}
                style={{ borderLeftColor: STAGE_BORDER_COLORS[note.stage] }}
              >
                <div className={styles.noteCardHeader}>
                  <span className={styles.noteCardId}>§ {note.id.toUpperCase()}</span>
                  <span className={styles.noteCardTime}>{note.updatedAt}</span>
                </div>
                <h3 className={styles.noteCardTitle}>{note.title}</h3>
                <p className={styles.noteCardDesc}>{note.summary}</p>
                <div className={styles.noteCardFooter}>
                  <div className={styles.noteCardTags}>
                    {note.tags.slice(0, 3).map((t) => (
                      <span key={t} className={styles.noteCardTag}>{t}</span>
                    ))}
                  </div>
                  <span className={styles.noteCardLinks}>
                    <BookOpen size={10} />
                    {note.backlinksCount}
                  </span>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className={styles.emptyExplorer}>
            <p>No notes match your current filters.</p>
          </div>
        )}
      </section>

      {/* ════════════════════════════════
          Section 04 — Epistemic Scratchpad
          ════════════════════════════════ */}
      <section className={styles.scratchpadSection}>
        <div className={styles.scratchpadHeader}>
          <div className={styles.scratchpadLabel}>
            <span className={styles.scratchpadKicker}>{settings.scratchpadKicker || 'EPISTEMIC SCRATCHPAD'}</span>
            <span className={styles.scratchpadSubtitle}>
              {settings.scratchpadSubtitle ||
                'Unfiltered analytical dispatches, preliminary proofs, and marginal commentary recorded in the field.'}
            </span>
          </div>
          <button type="button" className={styles.viewAllBtn}>
            {settings.scratchpadBtnText || 'View all 74 scratchpad slips →'}
          </button>
        </div>

        <div className={styles.memoGrid}>
          {(settings.memos || MEMO_SLIPS).map((memo, mIdx) => (
            <ScrollReveal key={memo.id} direction="up" delay={Math.min(mIdx * 60, 240)}>
              <div className={styles.memoCard}>
                <div className={styles.memoTimestamp}>{memo.timestamp}</div>
                <h4 className={styles.memoTitle}>{memo.title}</h4>
                <p className={styles.memoBody}>{memo.body}</p>
                <div className={styles.memoFooter}>
                  <div className={styles.memoTags}>
                    {memo.tags.map((t) => (
                      <span key={t} className={styles.memoTag}>{t}</span>
                    ))}
                  </div>
                  <span className={styles.memoLinked}>
                    Linked to {memo.linkedNoteIds.length} card{memo.linkedNoteIds.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  )
}
