import { defineType } from 'sanity'

export const blogPage = defineType({
  name: 'blogPage',
  title: 'Page: Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
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
      description: '📍 Where it appears: Intro paragraph directly under the /blog title.',
      placeholder: 'Long-form peer-reviewed computational treatises, architectural proofs, and theoretical essays exploring biological computation and synthetic cognition.',
      initialValue:
        'Long-form peer-reviewed computational treatises, architectural proofs, and theoretical essays exploring biological computation and synthetic cognition.',
    },
    {
      name: 'featuredSectionTitle',
      title: 'Featured Post Section Heading',
      type: 'string',
      placeholder: 'Featured Treatise',
      initialValue: 'Featured Treatise',
    },
    {
      name: 'allPostsTitle',
      title: 'All Posts Section Heading',
      type: 'string',
      placeholder: 'All Publications & Manuscripts',
      initialValue: 'All Publications & Manuscripts',
    },
    {
      name: 'showSearchBar',
      title: 'Show Search Bar',
      type: 'boolean',
      description: 'Toggle on to display the instant real-time search bar on /blog.',
      initialValue: true,
    },
    {
      name: 'searchPlaceholder',
      title: 'Search Bar Placeholder Text',
      type: 'string',
      placeholder: 'Search by title, topic, or keyword...',
      initialValue: 'Search by title, topic, or keyword...',
    },
    {
      name: 'showCategoryFilter',
      title: 'Show Category Filter Tabs',
      type: 'boolean',
      description: 'Toggle on to display category filter buttons (Cognitive Computation, Dynamical Systems, etc.).',
      initialValue: true,
    },
    {
      name: 'postsPerPage',
      title: 'Articles Per Page',
      type: 'number',
      initialValue: 10,
    },
    {
      name: 'seo',
      title: 'Blog Page SEO',
      type: 'seo',
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
