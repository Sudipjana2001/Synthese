'use client'

import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  FileText,
  Compass,
  Sparkles,
  Sliders,
  Sprout,
  Cpu,
  User,
  ArrowRight,
  BookOpen,
} from 'lucide-react'
import { SAMPLE_POSTS } from '../lib/samplePosts'
import { SAMPLE_PROJECTS } from '../lib/sampleProjects'
import { SAMPLE_GARDEN_NOTES } from '../lib/sampleGarden'
import styles from './SearchModal.module.css'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
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

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Compile universal search corpus
  const allSearchItems = useMemo<SearchResultItem[]>(() => {
    const postItems: SearchResultItem[] = SAMPLE_POSTS.map((p) => ({
      id: `post-${p._id}`,
      title: p.title,
      subtitle: `${p.author?.name || 'Sudip Jana'} • ${p.readingTime} min read`,
      href: `/blog/${p.slug.current}`,
      tag: p.tags?.[0] || 'Paper',
      icon: BookOpen,
      category: 'Manuscripts',
    }))

    const projectItems: SearchResultItem[] = SAMPLE_PROJECTS.map((prj) => ({
      id: `project-${prj._id}`,
      title: prj.title,
      subtitle: `${prj.category} • ${prj.metrics.label1}: ${prj.metrics.value1}`,
      href: '/projects',
      tag: prj.disciplineTag || 'Lab',
      icon: Cpu,
      category: 'Simulations',
    }))

    const gardenItems: SearchResultItem[] = SAMPLE_GARDEN_NOTES.map((n) => ({
      id: `garden-${n.id}`,
      title: `${n.id}: ${n.title}`,
      subtitle: `${n.discipline} • ${n.stage.toUpperCase()}`,
      href: '/garden',
      tag: n.stage,
      icon: Sprout,
      category: 'Garden Notes',
    }))

    return [...PAGE_LINKS, ...postItems, ...projectItems, ...gardenItems]
  }, [])

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

  useEffect(() => {
    setActiveIndex(0)
  }, [filteredResults])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleSelect = (href: string) => {
    onClose()
    router.push(href)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((prev) => (prev + 1) % (filteredResults.length || 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((prev) => (prev - 1 + filteredResults.length) % (filteredResults.length || 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredResults[activeIndex]) {
          handleSelect(filteredResults[activeIndex].href)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredResults, activeIndex, onClose])

  if (!isOpen) return null

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchHeader}>
          <Search size={18} />
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Search papers, simulations, garden notes, or pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
              const isActive = idx === activeIndex
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
