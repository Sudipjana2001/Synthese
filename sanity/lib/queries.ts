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
    kicker,
    title,
    description,
    featuredBadge,
    readManuscriptLabel,
    featuredSectionTitle,
    allPostsTitle,
    showSearchBar,
    searchPlaceholder,
    showCategoryFilter,
    postsPerPage,
    seo
  }
`

// Fetch about page singleton settings (bio, skills, headline, resume, pillars, metrics, publications, instrumentarium, contact)
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    kicker,
    title,
    name,
    role,
    affiliation,
    location,
    email,
    githubUrl,
    orcid,
    pgpKey,
    cvDownloadLabel,
    bibtexArchiveLabel,
    profileImage,
    bioStory,
    headline,
    statementHeading,
    statementParagraph1,
    abstract,
    statementParagraph3,
    metrics,
    pillarsHeading,
    epistemicPillars,
    skillsHeadline,
    skills,
    showTimeline,
    timelineKicker,
    timelineHeading,
    timelineSubtitle,
    resumeUrl,
    publicationsKicker,
    publicationsHeading,
    publicationsSubtitle,
    publicationsButtonText,
    publicationsButtonUrl,
    publications,
    instrumentariumKicker,
    instrumentariumHeading,
    instrumentariumSubtitle,
    instrumentarium,
    contactCards,
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
    authorSubtitle,
    heroHeadline,
    heroSubheadline,
    heroPrimaryCta,
    heroSecondaryCta,
    velocityCard,
    featuredPaperCard,
    essaysSectionHeading,
    fieldNotesTitle,
    fieldNotesBadge,
    fieldNotesLinkText,
    fieldNotesLinkUrl,
    fieldNotes,
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
    authorRole,
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
    statusKicker,
    issnTag,
    webglBadge,
    title,
    description,
    primaryButton,
    secondaryButton,
    showFilter,
    arsenalKicker,
    arsenalHeading,
    arsenalDesc,
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
    mastheadKicker,
    title,
    description,
    bibtexBtnText,
    vaultBtnText,
    showInteractiveGraph,
    epistemicWarning,
    explorerLabel,
    searchPlaceholder,
    scratchpadKicker,
    scratchpadSubtitle,
    scratchpadBtnText,
    memos,
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

