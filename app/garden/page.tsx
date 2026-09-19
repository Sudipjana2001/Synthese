'use client'

import React, { useState, useMemo, useRef, useCallback } from 'react'
import { Download, FileText, Search, Database, BookOpen } from 'lucide-react'
import { KnowledgeGraph } from '../../components/KnowledgeGraph'
import { SynapticInspector } from '../../components/SynapticInspector'
import {
  SAMPLE_GARDEN_NOTES,
  DISCIPLINES,
  MEMO_SLIPS,
} from '../../lib/sampleGarden'
import type { GrowthStage, Discipline } from '../../types/garden'
import styles from './garden.module.css'

const STAGE_BORDER_COLORS: Record<GrowthStage, string> = {
  evergreen: '#0d9488',
  budding: '#3b82f6',
  sprout: '#f59e0b',
}

export default function GardenPage() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [stageFilter, setStageFilter] = useState<GrowthStage | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [disciplineFilter, setDisciplineFilter] = useState<string>('All Disciplines')
  const [explorerStageFilter, setExplorerStageFilter] = useState<GrowthStage | 'all'>('all')
  const graphRef = useRef<HTMLDivElement>(null)

  // ── Filter notes for explorer ──
  const filteredNotes = useMemo(() => {
    return SAMPLE_GARDEN_NOTES.filter((note) => {
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
  }, [searchQuery, disciplineFilter, explorerStageFilter])

  // ── Card click → scroll to graph + select ──
  const handleCardClick = useCallback(
    (noteId: string) => {
      setSelectedNodeId(noteId)
      graphRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    []
  )

  return (
    <main className={styles.gardenPage}>
      {/* ════════════════════════════════
          Section 01 — Masthead
          ════════════════════════════════ */}
      <section className={styles.mastheadSection}>
        <div className={styles.mastheadContainer}>
          <span className={styles.kicker}>
            REPOSITORY INDEX // V4.19 &bull; 418 Active Nodes &bull; 1,294 Synaptic Edges
          </span>
          <h1 className={styles.mastheadTitle}>
            The Digital Garden &amp; Zettelkasten Archive
          </h1>
          <p className={styles.mastheadSubtitle}>
            A networked repository of evolving notes, speculative hypotheses, formal lemmas, and verified citations.
          </p>
          <div className={styles.mastheadActions}>
            <button type="button" className={styles.btnSecondary}>
              <FileText size={14} />
              <span>BibTeX Export</span>
            </button>
            <button type="button" className={styles.btnPrimary}>
              <Download size={14} />
              <span>Download Vault (.zip)</span>
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
              <span>CATALOGUS FOLIIS</span>
            </div>
            <span className={styles.explorerCount}>{filteredNotes.length} of {SAMPLE_GARDEN_NOTES.length} notes</span>
          </div>

          {/* Search + Filters */}
          <div className={styles.explorerControls}>
            <div className={styles.searchWrapper}>
              <Search size={14} className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search title, lemma, or tag..."
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
                  <button type="button" className={styles.exportBtn}>JSON-LD Index</button>
                  <button type="button" className={styles.exportBtn}>Obsidian Vault (.md)</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Grid */}
        <div className={styles.explorerGrid}>
          {filteredNotes.map((note) => (
            <button
              key={note.id}
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
            <span className={styles.scratchpadKicker}>EPISTEMIC SCRATCHPAD</span>
            <span className={styles.scratchpadSubtitle}>
              Unfiltered analytical dispatches, preliminary proofs, and marginal commentary recorded in the field.
            </span>
          </div>
          <button type="button" className={styles.viewAllBtn}>
            View all 74 scratchpad slips →
          </button>
        </div>

        <div className={styles.memoGrid}>
          {MEMO_SLIPS.map((memo) => (
            <div key={memo.id} className={styles.memoCard}>
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
          ))}
        </div>
      </section>
    </main>
  )
}
