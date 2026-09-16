import { type SchemaTypeDefinition } from 'sanity'

// Objects
import { blockContent } from './objects/blockContent'
import { seo } from './objects/seo'
import { cta } from './objects/cta'
import { socialLink } from './objects/socialLink'
import { statCounter } from './objects/statCounter'

// Documents
import { post } from './documents/post'
import { project } from './documents/project'
import { gardenNote } from './documents/gardenNote'
import { author } from './documents/author'
import { category } from './documents/category'
import { timeline } from './documents/timeline'

// Singletons
import { siteSettings } from './singletons/siteSettings'
import { homePage } from './singletons/homePage'
import { blogPage } from './singletons/blogPage'
import { projectsPage } from './singletons/projectsPage'
import { gardenPage } from './singletons/gardenPage'
import { aboutPage } from './singletons/aboutPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    blockContent,
    seo,
    cta,
    socialLink,
    statCounter,

    // Singletons
    siteSettings,
    homePage,
    blogPage,
    projectsPage,
    gardenPage,
    aboutPage,

    // Documents
    post,
    project,
    gardenNote,
    timeline,
    author,
    category,
  ],
}

export const singletonTypes = new Set([
  'siteSettings',
  'homePage',
  'blogPage',
  'projectsPage',
  'gardenPage',
  'aboutPage',
])
