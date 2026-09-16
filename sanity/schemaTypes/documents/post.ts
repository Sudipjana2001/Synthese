import { defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      rows: 3,
      description: 'Short summary displayed in post cards and previews',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    },
    {
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Highlight this article at the top of the blog page and homepage',
      initialValue: false,
    },
    {
      name: 'readingTime',
      title: 'Reading Time (Minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes (optional, auto-calculated if empty)',
    },
    {
      name: 'body',
      title: 'Article Body',
      type: 'blockContent',
    },
    {
      name: 'displayOptions',
      title: 'Display & Layout Options',
      type: 'object',
      fields: [
        {
          name: 'showTableOfContents',
          title: 'Show Table of Contents',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showAuthorBio',
          title: 'Show Author Bio Box',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showRelatedPosts',
          title: 'Show Related Posts',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showShareButtons',
          title: 'Show Social Share Buttons',
          type: 'boolean',
          initialValue: true,
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare(selection) {
      const { author, date } = selection
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'Draft'
      return {
        ...selection,
        subtitle: author ? `${author} • ${formattedDate}` : formattedDate,
      }
    },
  },
})
