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
      initialValue: 'Writings & Essays',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Page Description / Subtitle',
      type: 'text',
      rows: 3,
      initialValue:
        'Thoughts, technical tutorials, architectural deep-dives, and personal reflections on software engineering.',
    },
    {
      name: 'featuredSectionTitle',
      title: 'Featured Post Section Heading',
      type: 'string',
      initialValue: 'Featured Story',
    },
    {
      name: 'allPostsTitle',
      title: 'All Posts Section Heading',
      type: 'string',
      initialValue: 'All Articles',
    },
    {
      name: 'showSearchBar',
      title: 'Show Search Bar',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'searchPlaceholder',
      title: 'Search Bar Placeholder Text',
      type: 'string',
      initialValue: 'Search by title, topic, or keyword...',
    },
    {
      name: 'showCategoryFilter',
      title: 'Show Category Filter Tabs',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'postsPerPage',
      title: 'Articles Per Page (Pagination / Load More)',
      type: 'number',
      initialValue: 9,
    },
    {
      name: 'showNewsletter',
      title: 'Show Newsletter Box at Bottom',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'newsletterTitle',
      title: 'Newsletter Box Title',
      type: 'string',
      initialValue: 'Subscribe to the newsletter',
    },
    {
      name: 'newsletterDescription',
      title: 'Newsletter Box Description',
      type: 'text',
      rows: 2,
      initialValue: 'Get new articles delivered directly to your inbox whenever published.',
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
