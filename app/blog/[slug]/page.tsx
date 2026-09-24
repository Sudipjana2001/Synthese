import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Calendar, ShieldCheck, Share2, BookOpen } from 'lucide-react'
import { getPostBySlug, getAllPosts } from '../../../lib/getPosts'
import { PortableTextRenderer } from '../../../components/PortableTextRenderer'
import { TableOfContents } from '../../../components/TableOfContents'
import { ReadingProgressBar } from '../../../components/ReadingProgressBar'
import styles from './post.module.css'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Publication Not Found' }
  }

  const metaTitle = post.seo?.metaTitle || `${post.title} | Synthese`
  const metaDescription = post.seo?.metaDescription || post.excerpt || 'A computational treatise published by Synthese Scholarly Press.'

  return {
    title: metaTitle,
    description: metaDescription,
    ...(post.seo?.canonicalUrl ? { alternates: { canonical: post.seo.canonicalUrl } } : {}),
    ...(post.seo?.noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: metaDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const primaryCategory = post.categories?.[0]?.title || 'Manuscript'
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <article className={`container ${styles.articleWrapper}`}>
      {/* ── Reading Progress Bar ── */}
      <ReadingProgressBar />

      {/* ── Breadcrumbs & Citation ── */}
      <div className={styles.topMeta}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
          <Link href="/" className={styles.breadcrumbLink}>Synthese</Link>
          <span>/</span>
          <Link href="/blog" className={styles.breadcrumbLink}>Essays &amp; Papers</Link>
          <span>/</span>
          <span>{primaryCategory}</span>
        </nav>

        <div className={styles.citationBar}>
          <span className="status-dot status-dot-active" />
          <span>Vol. IV • Computational Epistemology • Peer Reviewed</span>
        </div>
      </div>

      {/* ── Article Header ── */}
      <header className={styles.articleHeader}>
        <h1 className={styles.title}>{post.title}</h1>

        {post.excerpt && (
          <div className={styles.abstractBox}>
            <div className={styles.abstractLabel}>Abstract &amp; Summary</div>
            <p className={styles.abstractText}>{post.excerpt}</p>
          </div>
        )}

        {/* Author & Published Info */}
        <div className={styles.metaBar}>
          <div className={styles.authorGroup}>
            <div className={styles.avatarFallback}>
              {post.author?.name?.charAt(0) || 'S'}
            </div>
            <div className={styles.authorDetails}>
              <span className={styles.authorName}>{post.author?.name || 'Synthese Lab'}</span>
              <span className={styles.authorRole}>{post.author?.role || 'Principal Investigator'}</span>
            </div>
          </div>

          <div className={styles.publicationStats}>
            <div className={styles.statPill}>
              <Calendar size={13} />
              <span>{formattedDate}</span>
            </div>
            <div className={styles.statPill}>
              <Clock size={13} />
              <span>{post.readingTime || 18} min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Content Layout (Two-Column with Sticky Table of Contents) ── */}
      <div className={styles.contentLayout}>
        {/* Prose Body */}
        <div className={styles.proseCol}>
          <PortableTextRenderer value={post.body} />

          {/* Author Bio Box */}
          {post.displayOptions?.showAuthorBio !== false && (
            <section className={styles.authorBioBox}>
              <div className={styles.bioAvatar}>
                {post.author?.name?.charAt(0) || 'S'}
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                  About {post.author?.name || 'the Author'}
                </h3>
                <p className={styles.bioText}>
                  {post.author?.bio ||
                    'Synthese is an open computational press and experimental research laboratory investigating biological computing, mathematical epistemology, and machine interiority.'}
                </p>
              </div>
            </section>
          )}

          {/* Bottom Navigation */}
          <div className={styles.backLinkRow}>
            <Link href="/blog" className={styles.backLink}>
              <ArrowLeft size={16} />
              <span>Back to all Publications &amp; Manuscripts</span>
            </Link>
          </div>
        </div>

        {/* Sticky Sidebar (TOC & Paper Telemetry) */}
        <aside className={styles.sidebarCol}>
          {post.displayOptions?.showTableOfContents !== false && (
            <TableOfContents body={post.body} />
          )}

          <div className={styles.paperMetaCard}>
            <div className={styles.paperMetaTitle}>Publication Metadata</div>
            <div className={styles.metaItem}>
              <span>Review:</span>
              <span className={styles.metaItemValue}>Double-Blind Peer</span>
            </div>
            <div className={styles.metaItem}>
              <span>DOI:</span>
              <span className={styles.metaItemValue}>10.48550/SYNTHESE</span>
            </div>
            <div className={styles.metaItem}>
              <span>License:</span>
              <span className={styles.metaItemValue}>CC-BY-4.0</span>
            </div>
            <div className={styles.metaItem}>
              <span>Format:</span>
              <span className={styles.metaItemValue}>Executable Paper</span>
            </div>
          </div>
        </aside>
      </div>
    </article>
  )
}
