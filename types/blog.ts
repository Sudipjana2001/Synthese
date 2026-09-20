export interface Author {
  _id: string
  name: string
  slug?: { current: string }
  role?: string
  bio?: string
  avatar?: any
  socialLinks?: Array<{
    platform: string
    label?: string
    url: string
  }>
}

export interface Category {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  color?: string
}

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  mainImage?: any
  author?: Author
  categories?: Category[]
  tags?: string[]
  publishedAt: string
  featured?: boolean
  readingTime?: number
  body?: any
  displayOptions?: {
    showTableOfContents?: boolean
    showAuthorBio?: boolean
    showRelatedPosts?: boolean
    showShareButtons?: boolean
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: any
    canonicalUrl?: string
    noIndex?: boolean
  }
}

export interface BlogPageSettings {
  kicker?: string
  title?: string
  description?: string
  featuredBadge?: string
  readManuscriptLabel?: string
  featuredSectionTitle?: string
  allPostsTitle?: string
  showSearchBar?: boolean
  searchPlaceholder?: string
  showCategoryFilter?: boolean
  postsPerPage?: number
  showNewsletter?: boolean
  newsletterTitle?: string
  newsletterDescription?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: any
  }
}
