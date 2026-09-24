'use client'

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  FileText,
  Compass,
  Sparkles,
  Sprout,
  Cpu,
  User,
  BookOpen,
} from 'lucide-react'
import type { SearchCorpus, SearchIndexItem } from '../lib/getSiteSettings'
import styles from './SearchModal.module.css'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  searchCorpus?: SearchCorpus
}

interface SearchResultItem {
  id: string
  title: string
  subtitle?: string
  href: string
  tag: string
  icon: React.ComponentType<{ size?: number; className?: string; color?: string }>
  category: 'Pages' | 'Manuscripts' | 'Simulations' | 'Garden Notes'
}

const PAGE_LINKS: SearchResultItem[] = [
  { id: 'p-home', title: 'Journal & Foreword', subtitle: 'Academic press overview & latest dispatches', href: '/', tag: 'Home', icon: Compass, category: 'Pages' },
  { id: 'p-blog', title: 'Essays & Working Papers', subtitle: 'Peer-reviewed treatises & preprint archive', href: '/blog', tag: 'Writing', icon: FileText, category: 'Pages' },
  { id: 'p-projects', title: 'Interactive Lab & Systems', subtitle: 'Continuous PDE & agent simulation sandboxes', href: '/projects', tag: 'Projects', icon: Sparkles, category: 'Pages' },
  { id: 'p-garden', title: 'Digital Garden & Archive', subtitle: 'Topological knowledge graph & Zettelkasten notes', href: '/garden', tag: 'Garden', icon: Sprout, category: 'Pages' },
  { id: 'p-about', title: 'About & Curriculum Dossier', subtitle: 'Scholar bio, academic timeline & laboratory instrumentarium', href: '/about', tag: 'About', icon: User, category: 'Pages' },
]

function mapCorpusToSearchItems(corpus?: SearchCorpus): SearchResultItem[] {
  if (!corpus) return []

  const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
    Manuscripts: BookOpen,
    Simulations: Cpu,
    'Garden Notes': Sprout,
  }

  const mapItems = (items: SearchIndexItem[]): SearchResultItem[] =>
    items.map((item) => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      href: item.href,
      tag: item.tag,
      icon: iconMap[item.category] || FileText,
      category: item.category,
    }))

  return [
    ...mapItems(corpus.posts),
    ...mapItems(corpus.projects),
    ...mapItems(corpus.gardenNotes),
  ]
}

export function SearchModal({ isOpen, onClose, searchCorpus }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Build search corpus from live data passed via props
  const allSearchItems = useMemo<SearchResultItem[]>(() => {
    const corpusItems = mapCorpusToSearchItems(searchCorpus)
    return [...PAGE_LINKS, ...corpusItems]
  }, [searchCorpus])

  // Filter items based on active query
  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return PAGE_LINKS
    }
    const q = query.toLowerCase()
    return allSearchItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.tag.toLowerCase().includes(q)
    ).slice(0, 12)
  }, [query, allSearchItems])

  const clampedActiveIndex = Math.min(activeIndex, Math.max(0, filteredResults.length - 1))

  // Manage body scroll lock and focus
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    setQuery('')
    setActiveIndex(0)
    onClose()
  }, [onClose])

  const handleSelect = useCallback((href: string) => {
    handleClose()
    router.push(href)
  }, [handleClose, router])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') {
        handleClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((prev) => (prev + 1) % (filteredResults.length || 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((prev) => (prev - 1 + filteredResults.length) % (filteredResults.length || 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredResults[clampedActiveIndex]) {
          handleSelect(filteredResults[clampedActiveIndex].href)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredResults, clampedActiveIndex, handleClose, handleSelect])

  if (!isOpen) return null

  return (
    <div className={styles.backdrop} onClick={handleClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchHeader}>
          <Search size={18} />
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Search papers, simulations, garden notes, or pages..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActiveIndex(0)
            }}
          />
          <span className={styles.escKey}>ESC</span>
        </div>

        <div className={styles.resultsList}>
          <div className={styles.categoryTitle}>
            {query.trim()
              ? `Search Results (${filteredResults.length})`
              : 'Navigation & Sections (or type to search notes & papers)'}
          </div>

          {filteredResults.length > 0 ? (
            filteredResults.map((item, idx) => {
              const Icon = item.icon
              const isActive = idx === clampedActiveIndex
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.resultItem} ${isActive ? styles.resultItemActive : ''}`}
                  onClick={() => handleSelect(item.href)}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  <div className={styles.resultTitle}>
                    <Icon size={16} color="var(--color-accent)" />
                    <div className={styles.resultTextWrap}>
                      <span className={styles.resultMainTitle}>{item.title}</span>
                      {item.subtitle && (
                        <span className={styles.resultSubtitle}>{item.subtitle}</span>
                      )}
                    </div>
                  </div>
                  <span className={styles.resultTag}>{item.tag}</span>
                </button>
              )
            })
          ) : (
            <div className={styles.emptyState}>
              No manuscripts, models, or notes found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
