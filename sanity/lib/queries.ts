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

// Fetch about page singleton settings (bio, skills, headline, resume)
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    title,
    headline,
    profileImage,
    bioStory,
    resumeUrl,
    skillsHeadline,
    skills,
    showTimeline,
    timelineHeading,
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
