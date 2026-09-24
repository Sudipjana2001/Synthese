import type { Metadata } from 'next'
import { getAllPosts, getFeaturedPost, getBlogSettings, getAllCategories } from '../../lib/getPosts'
import { BlogListClient } from '../../components/BlogListClient'
import styles from './blog.module.css'

export const revalidate = 60


export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBlogSettings()
  return {
    title: settings.title || 'Essays & Working Papers',
    description:
      settings.description ||
      'Long-form computational treatises, architectural proofs, and theoretical essays exploring biological computation and synthetic cognition.',
  }
}

export default async function BlogIndexPage() {
  const [posts, featuredPost, settings, categories] = await Promise.all([
    getAllPosts(),
    getFeaturedPost(),
    getBlogSettings(),
    getAllCategories(),
  ])

  return (
    <div className={`container ${styles.blogContainer}`}>
      {/* Page Header */}
      <header className={styles.headerSection}>
        <span className={styles.kicker}>{settings.kicker || 'Public Archive • Section 02'}</span>
        <h1 className={styles.pageTitle}>{settings.title || 'Essays & Working Papers'}</h1>
        <p className={styles.pageDesc}>
          {settings.description ||
            'Long-form peer-reviewed computational treatises, architectural proofs, and theoretical essays exploring biological computation and synthetic cognition.'}
        </p>
      </header>

      {/* Interactive Client Filter & Posts */}
      <BlogListClient
        initialPosts={posts}
        featuredPost={featuredPost}
        categories={categories}
        showSearchBar={settings.showSearchBar ?? true}
        searchPlaceholder={settings.searchPlaceholder}
        showCategoryFilter={settings.showCategoryFilter ?? true}
        featuredBadge={settings.featuredBadge}
        readManuscriptLabel={settings.readManuscriptLabel}
      />
    </div>
  )
}
