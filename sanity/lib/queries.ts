import { groq } from 'next-sanity'

// Fetch all posts with author and categories expanded
export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    featured,
    readingTime,
    tags,
    author->{
      _id,
      name,
      role,
      avatar
    },
    categories[]->{
      _id,
      title,
      slug,
      color
    }
  }
`

// Fetch featured post
export const featuredPostQuery = groq`
  *[_type == "post" && featured == true && defined(slug.current)] | order(publishedAt desc)[0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    featured,
    readingTime,
    tags,
    author->{
      _id,
      name,
      role,
      avatar
    },
    categories[]->{
      _id,
      title,
      slug,
      color
    }
  }
`

// Fetch single post by slug with full body, author bio, display options, and SEO
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    featured,
    readingTime,
    tags,
    body,
    displayOptions,
    seo,
    author->{
      _id,
      name,
      role,
      bio,
      avatar,
      socialLinks
    },
    categories[]->{
      _id,
      title,
      slug,
      color
    }
  }
`

// Fetch all post slugs for static generation
export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`

// Fetch all categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color
  }
`

// Fetch blog page singleton settings (titles, toggles, descriptions)
export const blogPageSettingsQuery = groq`
  *[_type == "blogPage"][0] {
    title,
    description,
    featuredSectionTitle,
    allPostsTitle,
    showSearchBar,
    searchPlaceholder,
    showCategoryFilter,
    postsPerPage,
    showNewsletter,
    newsletterTitle,
    newsletterDescription,
    seo
  }
`

// Fetch about page singleton settings (bio, skills, headline, resume, pillars, metrics)
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    title,
    kicker,
    name,
    role,
    affiliation,
    location,
    email,
    headline,
    abstract,
    profileImage,
    bioStory,
    orcid,
    pgpKey,
    metrics,
    epistemicPillars,
    skillsHeadline,
    skills,
    showTimeline,
    timelineHeading,
    resumeUrl,
    seo
  }
`

// Fetch timeline entries ordered by custom order and date
export const timelineQuery = groq`
  *[_type == "timeline"] | order(order asc, dateRange desc) {
    _id,
    dateRange,
    title,
    company,
    location,
    description,
    technologies,
    order
  }
`

// Fetch home page singleton settings
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    kicker,
    heroHeadline,
    heroSubheadline,
    heroPrimaryCta,
    heroSecondaryCta,
    velocityCard,
    epistemicQuote,
    newsletter,
    seo
  }
`

// Fetch site settings (global brand, ticker, and metadata)
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    authorName,
    ticker,
    socialLinks,
    footerBio,
    footerCopyright,
    seo
  }
`

// Fetch projects page singleton
export const projectsPageQuery = groq`
  *[_type == "projectsPage"][0] {
    title,
    description,
    showFilter,
    ctaBox,
    seo
  }
`

// Fetch all projects / interactive models
export const projectsQuery = groq`
  *[_type == "project"] | order(featured desc, _createdAt desc) {
    _id,
    title,
    slug,
    category,
    disciplineTag,
    modelType,
    description,
    metrics,
    actionLabel,
    stars,
    tags,
    demoUrl,
    repoUrl,
    featured
  }
`

// Fetch digital garden singleton
export const gardenPageQuery = groq`
  *[_type == "gardenPage"][0] {
    title,
    description,
    epistemicWarning,
    showStats,
    seo
  }
`

// Fetch all digital garden notes
export const gardenNotesQuery = groq`
  *[_type == "gardenNote"] | order(stage desc, lastTended desc) {
    _id,
    noteId,
    title,
    slug,
    stage,
    discipline,
    cluster,
    summary,
    formalLemma,
    tags,
    citationKey,
    lastTended
  }
`

