import { defineType } from 'sanity'

export const blogPage = defineType({
  name: 'blogPage',
  title: 'Page: Blog',
  type: 'document',
  groups: [
    { name: 'masthead', title: '📰 Header & Kicker', default: true },
    { name: 'sections', title: '📑 Section Headings & Badges' },
    { name: 'controls', title: '🔍 Search & Filters' },
    { name: 'seo', title: '🔍 SEO & Meta' },
  ],
  fields: [
    // ── 01: Header & Kicker ──
    {
      name: 'kicker',
      title: 'Top Kicker Tag',
      type: 'string',
      group: 'masthead',
      description: '📍 Where it appears: Small tag above title on /blog.',
      placeholder: 'Public Archive • Section 02',
      initialValue: 'Public Archive • Section 02',
    },
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'masthead',
      description: '📍 Where it appears: Main heading on the /blog page.',
      placeholder: 'Essays & Working Papers',
      initialValue: 'Essays & Working Papers',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Page Description / Subtitle',
      type: 'text',
      rows: 3,
      group: 'masthead',
      description: '📍 Where it appears: Intro paragraph directly under the /blog title.',
      placeholder: 'Long-form peer-reviewed computational treatises, architectural proofs, and theoretical essays exploring biological computation and synthetic cognition.',
      initialValue:
        'Long-form peer-reviewed computational treatises, architectural proofs, and theoretical essays exploring biological computation and synthetic cognition.',
    },

    // ── 02: Section Headings & Badges ──
    {
      name: 'featuredBadge',
      title: 'Featured Treatise Badge Text',
      type: 'string',
      group: 'sections',
      placeholder: 'Featured Treatise & Mathematical Model',
      initialValue: 'Featured Treatise & Mathematical Model',
    },
    {
      name: 'readManuscriptLabel',
      title: 'Read Manuscript Link Text',
      type: 'string',
      group: 'sections',
      placeholder: 'Read Full Manuscript',
      initialValue: 'Read Full Manuscript',
    },
    {
      name: 'allPostsTitle',
      title: 'All Posts Section Heading',
      type: 'string',
      group: 'sections',
      placeholder: 'All Publications & Manuscripts',
      initialValue: 'All Publications & Manuscripts',
    },

    // ── 03: Controls & Search ──
    {
      name: 'showSearchBar',
      title: 'Show Search Bar',
      type: 'boolean',
      group: 'controls',
      description: 'Toggle on to display the instant real-time search bar on /blog.',
      initialValue: true,
    },
    {
      name: 'searchPlaceholder',
      title: 'Search Bar Placeholder Text',
      type: 'string',
      group: 'controls',
      placeholder: 'Search by title, topic, or keyword...',
      initialValue: 'Search by title, topic, or keyword...',
    },
    {
      name: 'showCategoryFilter',
      title: 'Show Category Filter Tabs',
      type: 'boolean',
      group: 'controls',
      description: 'Toggle on to display category filter buttons (Cognitive Computation, Dynamical Systems, etc.).',
      initialValue: true,
    },
    {
      name: 'postsPerPage',
      title: 'Articles Per Page',
      type: 'number',
      group: 'controls',
      initialValue: 10,
    },

    // ── 04: SEO ──
    {
      name: 'seo',
      title: 'Blog Page SEO',
      type: 'seo',
      group: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Blog Page Settings',
        subtitle: title || 'Configure blog page titles, filters, and display',
      }
    },
  },
})
