'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, FileText, Compass, Sparkles, Sliders, ArrowRight, X } from 'lucide-react'
import styles from './SearchModal.module.css'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const DEFAULT_LINKS = [
  { title: 'Journal & Foreword', href: '/', tag: 'Home', icon: Compass },
  { title: 'Essays & Working Papers', href: '/blog', tag: 'Writing', icon: FileText },
  { title: 'Interactive Lab & Systems', href: '/projects', tag: 'Projects', icon: Sparkles },
  { title: 'Digital Garden & Archive', href: '/garden', tag: 'Garden', icon: Compass },
  { title: 'About & Curriculum', href: '/about', tag: 'About', icon: Compass },
  { title: 'Sanity Studio CMS', href: '/studio', tag: 'Admin', icon: Sliders },
]

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const filtered = DEFAULT_LINKS.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.tag.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (href: string) => {
    onClose()
    router.push(href)
  }

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchHeader}>
          <Search size={18} />
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Search papers, systems, garden notes, or pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className={styles.escKey}>ESC</span>
        </div>

        <div className={styles.resultsList}>
          <div className={styles.categoryTitle}>Navigation &amp; Sections</div>
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.href}
                  type="button"
                  className={styles.resultItem}
                  onClick={() => handleSelect(item.href)}
                >
                  <div className={styles.resultTitle}>
                    <Icon size={16} color="var(--color-accent)" />
                    <span>{item.title}</span>
                  </div>
                  <span className={styles.resultTag}>{item.tag}</span>
                </button>
              )
            })
          ) : (
            <div className={styles.emptyState}>No results found for &ldquo;{query}&rdquo;</div>
          )}
        </div>
      </div>
    </div>
  )
}
