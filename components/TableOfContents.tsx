'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { AlignLeft } from 'lucide-react'
import { HeadingItem, extractHeadings } from '../lib/toc'
import styles from './TableOfContents.module.css'

interface TableOfContentsProps {
  headings?: HeadingItem[]
  body?: any[]
}

export function TableOfContents({ headings: propHeadings, body }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  const headings = useMemo(() => {
    if (propHeadings && propHeadings.length > 0) return propHeadings
    if (body) return extractHeadings(body)
    return []
  }, [propHeadings, body])

  useEffect(() => {
    if (!headings || headings.length === 0) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i]
        const element = document.getElementById(heading.id)
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(heading.id)
          return
        }
      }

      if (headings.length > 0) {
        setActiveId(headings[0].id)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings])

  if (!headings || headings.length === 0) return null

  return (
    <nav className={styles.tocContainer} aria-label="Table of Contents">
      <div className={styles.tocTitle}>
        <AlignLeft size={13} />
        <span>Outline &amp; Sections</span>
      </div>
      <ul className={styles.tocList}>
        {headings.map((heading) => {
          const isActive = activeId === heading.id
          return (
            <li
              key={heading.id}
              className={`${styles.tocItem} ${heading.level === 3 ? styles.nestedItem : ''}`}
            >
              <a
                href={`#${heading.id}`}
                className={`${styles.tocLink} ${isActive ? styles.activeLink : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById(heading.id)
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' })
                    window.history.pushState(null, '', `#${heading.id}`)
                  }
                }}
              >
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
