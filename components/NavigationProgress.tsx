'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Ultra-lightweight top navigation progress indicator.
 * Provides instant (<10ms) tactile visual feedback as soon as any tab or link is clicked.
 */
export function NavigationProgress() {
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(false)

  // Complete and reset progress bar on route change
  useEffect(() => {
    if (active) {
      setProgress(100)
      const t = setTimeout(() => {
        setActive(false)
        setProgress(0)
      }, 250)
      return () => clearTimeout(t)
    }
  }, [pathname])

  // Listen for clicks on internal route links
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      if (!href) return

      // Don't trigger for external links, anchor fragments, or modified clicks
      if (
        href.startsWith('/') &&
        !href.startsWith('/#') &&
        href !== pathname &&
        !target.getAttribute('target') &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey
      ) {
        setActive(true)
        setProgress(35)
      }
    }

    document.addEventListener('click', handleDocumentClick, { capture: true })
    return () => document.removeEventListener('click', handleDocumentClick, { capture: true })
  }, [pathname])

  // Gradual simulated progress while waiting for RSC response
  useEffect(() => {
    if (!active) return

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 75) return prev + 12
        if (prev < 92) return prev + 3
        return prev
      })
    }, 100)

    return () => clearInterval(timer)
  }, [active])

  if (progress === 0 && !active) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2.5px',
        zIndex: 99999,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: 'var(--color-accent, #0ea5e9)',
          boxShadow: '0 0 10px var(--color-accent, #0ea5e9), 0 0 4px var(--color-accent, #0ea5e9)',
          transition: progress === 100 ? 'width 150ms ease-out, opacity 200ms ease' : 'width 180ms ease-out',
          opacity: progress === 100 ? 0 : 1,
        }}
      />
    </div>
  )
}
