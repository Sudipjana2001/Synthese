'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, ArrowUpRight } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { SearchModal } from './SearchModal'
import styles from './Header.module.css'

const NAV_TABS = [
  { label: 'JOURNAL & LAB', href: '/' },
  { label: 'Essays & Papers', href: '/blog' },
  { label: 'Interactive Lab', href: '/projects' },
  { label: 'Digital Garden', href: '/garden' },
  { label: 'About & Curriculum', href: '/about' },
]

import { SiteSettingsData, DEFAULT_SITE_SETTINGS } from '../lib/getSiteSettings'

interface HeaderProps {
  settings?: SiteSettingsData
}

export function Header({ settings = DEFAULT_SITE_SETTINGS }: HeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)

  // Listen for global Cmd+K or Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchModalOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close mobile drawer upon route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Don't render website header inside embedded Sanity Studio
  if (pathname?.startsWith('/studio')) {
    return null
  }

  const isTabActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

  const ticker = settings?.ticker || DEFAULT_SITE_SETTINGS.ticker

  return (
    <>
      {/* ── Top Issue / Metadata Ticker ── */}
      {ticker.showTicker !== false && (
        <div className={styles.ticker}>
          <div className={`container ${styles.tickerInner}`}>
            <div className={styles.tickerLeft}>
              <span className={styles.tickerDot} />
              <span>{ticker.issueText}</span>
              <span>•</span>
              <span>{ticker.doi}</span>
            </div>
            <div className={styles.tickerRight}>
              <span>{ticker.statusText || 'Sanity CMS Connected'}</span>
              <span>•</span>
              <span>{ticker.rightBadge}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Sticky Navigation Header ── */}
      <header className={styles.header}>
        <div className={`container ${styles.navContainer}`}>
          {/* Left: Brand Logo & Title */}
          <Link href="/" className={styles.brandLink} aria-label="Synthese Home">
            <Image
              src="/images/synthese-icon.png"
              alt="Synthese Icon"
              width={28}
              height={28}
              priority
              className={styles.brandIcon}
            />
            <span className={styles.brandName}>Synthese</span>
          </Link>

          {/* Middle: Centered Navigation Tabs */}
          <nav aria-label="Main Navigation" className={styles.mainNav}>
            <ul className={styles.navTabs}>
              {NAV_TABS.map((tab) => {
                const active = isTabActive(tab.href)
                return (
                  <li key={tab.href}>
                    <Link
                      href={tab.href}
                      prefetch={true}
                      className={`${styles.tabItem} ${active ? styles.activeTab : ''}`}
                    >
                      {tab.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Right Actions: Search + Theme + Sandbox/Studio + Mobile */}
          <div className={styles.actionsWrapper}>
            <button
              type="button"
              className={styles.searchTrigger}
              onClick={() => setSearchModalOpen(true)}
              aria-label="Search content"
            >
              <Search size={13} />
              <span>Search</span>
              <span className={styles.kbdShortcut}>⌘K</span>
            </button>

            <ThemeToggle />

            <button
              type="button"
              className={styles.mobileMenuToggle}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Slide-In Navigation Drawer ── */}
      {mobileMenuOpen && (
        <>
          <div
            className={styles.mobileDrawerOverlay}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <aside className={styles.mobileDrawer} aria-label="Mobile Navigation">
            <div className={styles.drawerHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Image
                  src="/images/synthese-icon.png"
                  alt="Synthese Icon"
                  width={24}
                  height={24}
                  className={styles.brandIcon}
                />
                <span className={styles.brandName} style={{ fontSize: '20px' }}>Synthese</span>
              </div>
              <button
                type="button"
                className={styles.drawerClose}
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <ul className={styles.drawerNavList}>
              {NAV_TABS.map((tab) => {
                const active = isTabActive(tab.href)
                return (
                  <li key={tab.href}>
                    <Link
                      href={tab.href}
                      prefetch={true}
                      className={`${styles.drawerNavItem} ${active ? styles.drawerActiveTab : ''}`}
                    >
                      <span>{tab.label}</span>
                      {active && <span className="status-dot status-dot-active" />}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className={styles.drawerFooter}>
              <button
                type="button"
                className={styles.searchTrigger}
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  setMobileMenuOpen(false)
                  setSearchModalOpen(true)
                }}
              >
                <Search size={14} />
                <span>Search Papers &amp; Systems</span>
                <span className={styles.kbdShortcut}>⌘K</span>
              </button>
            </div>
          </aside>
        </>
      )}

      {/* ── Search Modal ── */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  )
}
