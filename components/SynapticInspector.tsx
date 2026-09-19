'use client'

import React from 'react'
import { GitBranch, ArrowRight, Copy, Sparkles } from 'lucide-react'
import { SAMPLE_GARDEN_NOTES } from '../lib/sampleGarden'
import type { GardenNote } from '../types/garden'
import styles from './SynapticInspector.module.css'

const STAGE_LABELS: Record<string, { label: string; className: string }> = {
  evergreen: { label: 'EVERGREEN NOTE', className: styles.stageEvergreen },
  budding: { label: 'BUDDING NOTE', className: styles.stageBudding },
  sprout: { label: 'SPROUT NOTE', className: styles.stageSprout },
}

interface SynapticInspectorProps {
  selectedNodeId: string | null
  onSelectNode: (id: string) => void
}

export function SynapticInspector({ selectedNodeId, onSelectNode }: SynapticInspectorProps) {
  const note: GardenNote | undefined = selectedNodeId
    ? SAMPLE_GARDEN_NOTES.find((n) => n.id === selectedNodeId)
    : undefined

  const stageInfo = note ? STAGE_LABELS[note.stage] : null

  const copyFormula = () => {
    if (note?.formalLemma?.formula) {
      navigator.clipboard.writeText(note.formalLemma.formula)
    }
  }

  // Map note ID to display ID
  const getDisplayId = (id: string) => {
    const noteForId = SAMPLE_GARDEN_NOTES.find((n) => n.id === id)
    if (!noteForId) return `§ ${id.toUpperCase()}`
    // Format: § PREFIX-###
    return `§ ${id.toUpperCase()}`
  }

  return (
    <div className={styles.inspectorPanel}>
      {/* ── Header ── */}
      <div className={styles.inspectorHeader}>
        <div className={styles.inspectorTitle}>
          <GitBranch size={14} />
          <span>Synaptic Inspector</span>
        </div>
        {note && stageInfo && (
          <span className={`${styles.stagePill} ${stageInfo.className}`}>
            {stageInfo.label}
          </span>
        )}
      </div>

      {/* ── Content ── */}
      <div className={styles.inspectorBody}>
        {!note ? (
          <div className={styles.emptyState}>
            <Sparkles size={24} className={styles.emptyIcon} />
            <p className={styles.emptyText}>
              Click a node in the graph to inspect its synaptic connections.
            </p>
          </div>
        ) : (
          <>
            {/* Note ID + timestamp */}
            <div className={styles.noteMetaRow}>
              <span className={styles.noteId}>{getDisplayId(note.id)}</span>
              <span className={styles.noteTimestamp}>Synthesized {note.updatedAt}</span>
            </div>

            {/* Title */}
            <h3 className={styles.noteTitle}>{note.title}</h3>

            {/* Excerpt */}
            <p className={styles.noteExcerpt}>{note.summary}</p>

            {/* Tags */}
            <div className={styles.tagRow}>
              {note.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>

            {/* Formal Lemma */}
            {note.formalLemma && (
              <div className={styles.lemmaBox}>
                <div className={styles.lemmaHeader}>
                  <span className={styles.lemmaLabel}>{note.formalLemma.label}</span>
                  <button
                    type="button"
                    className={styles.copyBtn}
                    onClick={copyFormula}
                    aria-label="Copy formula"
                  >
                    <Copy size={12} />
                  </button>
                </div>
                <div className={styles.lemmaFormula}>
                  {note.formalLemma.formula}
                </div>
                <p className={styles.lemmaExplanation}>
                  {note.formalLemma.explanation}
                </p>
              </div>
            )}

            {/* Backlinks */}
            {note.backlinks && note.backlinks.length > 0 && (
              <div className={styles.backlinksSection}>
                <div className={styles.backlinksHeader}>
                  <GitBranch size={12} />
                  <span>
                    BACKLINKS (REFERENCED BY {note.backlinks.length} NOTE{note.backlinks.length > 1 ? 'S' : ''}) [Incoming]
                  </span>
                </div>
                <div className={styles.backlinksList}>
                  {note.backlinks.map((bl) => (
                    <button
                      key={bl.id}
                      type="button"
                      className={styles.backlinkItem}
                      onClick={() => onSelectNode(bl.id)}
                    >
                      <div className={styles.backlinkContent}>
                        <span className={styles.backlinkId}>{getDisplayId(bl.id)}</span>
                        <span className={styles.backlinkTitle}>{bl.title}</span>
                        <span className={styles.backlinkExcerpt}>{bl.excerpt}</span>
                      </div>
                      <ArrowRight size={12} className={styles.backlinkArrow} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
