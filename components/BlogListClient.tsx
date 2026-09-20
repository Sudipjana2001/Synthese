'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, BookOpen, Clock, Tag } from 'lucide-react'
import { Post, Category } from '../types/blog'
import { ScrollReveal } from './ScrollReveal'
import styles from '../app/blog/blog.module.css'

interface BlogListClientProps {
  initialPosts: Post[]
  featuredPost: Post | null
  categories: Category[]
  showSearchBar?: boolean
  searchPlaceholder?: string
  showCategoryFilter?: boolean
  featuredBadge?: string
  readManuscriptLabel?: string
}

export function BlogListClient({
  initialPosts,
  featuredPost,
  categories,
  showSearchBar = true,
  searchPlaceholder = 'Search by title, topic, or keyword...',
  showCategoryFilter = true,
  featuredBadge = 'Featured Treatise & Mathematical Model',
  readManuscriptLabel = 'Read Full Manuscript',
}: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // Exclude featured post from the general list if no search query
      if (!searchQuery && selectedCategory === 'all' && featuredPost && post._id === featuredPost._id) {
        return false
      }

      // Filter by category
      if (selectedCategory !== 'all') {
        const hasCategory = post.categories?.some(
          (c) => c.slug.current === selectedCategory || c.title.toLowerCase() === selectedCategory.toLowerCase()
        )
        if (!hasCategory) return false
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const titleMatch = post.title.toLowerCase().includes(query)
        const excerptMatch = post.excerpt?.toLowerCase().includes(query) || false
        const tagMatch = post.tags?.some((t) => t.toLowerCase().includes(query)) || false
        const authorMatch = post.author?.name.toLowerCase().includes(query) || false
        return titleMatch || excerptMatch || tagMatch || authorMatch
      }

      return true
    })
  }, [initialPosts, featuredPost, searchQuery, selectedCategory])

  return (
    <div>
      {/* ── Search & Filter Bar ── */}
      {(showSearchBar || showCategoryFilter) && (
        <section className={styles.controlsSection}>
          {showSearchBar && (
            <div className={styles.searchBarWrapper}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search articles"
              />
            </div>
          )}

          {showCategoryFilter && (
            <ul className={styles.categoryTabs} aria-label="Category filter">
              <li>
                <button
                  type="button"
                  className={`${styles.categoryTab} ${selectedCategory === 'all' ? styles.activeCategoryTab : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  All Disciplines
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat._id}>
                  <button
                    type="button"
                    className={`${styles.categoryTab} ${selectedCategory === cat.slug.current ? styles.activeCategoryTab : ''}`}
                    onClick={() => setSelectedCategory(cat.slug.current)}
                  >
                    {cat.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* ── Featured Post Highlight (Only show when not actively searching) ── */}
      {!searchQuery && selectedCategory === 'all' && featuredPost && (
        <ScrollReveal direction="up" delay={60}>
          <section className={styles.featuredBox}>
            <div className={styles.featuredLabel}>
              <span className="status-dot status-dot-active" />
              <span>{featuredBadge}</span>
            </div>

            <h2 className={styles.featuredTitle}>
              <Link href={`/blog/${featuredPost.slug.current}`}>{featuredPost.title}</Link>
            </h2>

            <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>

            <div className={styles.metaRow}>
              <span>
                {featuredPost.author?.name || 'Synthese Lab'} •{' '}
                {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>

              <Link href={`/blog/${featuredPost.slug.current}`} className={styles.readLink}>
                <span>{readManuscriptLabel}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* ── Articles Grid ── */}
      {filteredPosts.length > 0 ? (
        <section className={styles.articlesGrid}>
          {filteredPosts.map((post, idx) => {
            const primaryCategory = post.categories?.[0]?.title || post.tags?.[0] || 'Paper'
            const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })

            return (
              <ScrollReveal key={post._id} direction="up" delay={Math.min(idx * 60, 240)}>
                <article className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.categoryPill}>{primaryCategory}</span>
                    <span className={styles.readingTime}>
                      {post.readingTime ? `${post.readingTime} min read` : '15 min read'}
                    </span>
                  </div>

                  <h3 className={styles.cardTitle}>
                    <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
                  </h3>

                  <p className={styles.cardExcerpt}>{post.excerpt}</p>

                  <div className={styles.cardFooter}>
                    <span className={styles.authorName}>{post.author?.name || 'Synthese'}</span>
                    <Link href={`/blog/${post.slug.current}`} className={styles.readLink}>
                      <span>Read Paper</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            )
          })}
        </section>
      ) : (
        <div className={styles.emptyState}>
          <BookOpen size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
          <p>No publications found matching &ldquo;{searchQuery}&rdquo;.</p>
        </div>
      )}
    </div>
  )
}
