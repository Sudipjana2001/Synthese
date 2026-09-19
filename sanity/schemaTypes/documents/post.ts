import { defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post & Manuscript',
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
      name: 'volume',
      title: 'Volume & Article Number',
      type: 'string',
      description: 'e.g. "Vol. 4 • Art. 12"',
      initialValue: 'Vol. 4 • Art. 12',
    },
    {
      name: 'status',
      title: 'Publication Status',
      type: 'string',
      options: {
        list: [
          { title: 'Peer Reviewed', value: 'Peer Reviewed' },
          { title: 'Preprint (Under Review)', value: 'Preprint (Under Review)' },
          { title: 'Working Paper', value: 'Working Paper' },
        ],
        layout: 'radio',
      },
      initialValue: 'Peer Reviewed',
    },
    {
      name: 'discipline',
      title: 'Academic Discipline',
      type: 'string',
      options: {
        list: [
          'Cognitive Computation',
          'Physical Substrates',
          'Philosophy of Mind',
          'Dynamical Systems',
          'Differential Geometry',
          'Complex Systems',
        ],
      },
      initialValue: 'Cognitive Computation',
    },
    {
      name: 'doi',
      title: 'DOI Identifier',
      type: 'string',
      description: 'e.g. "10.5821/synthese.2026.01452"',
    },
    {
      name: 'excerpt',
      title: 'Abstract / Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary displayed in manuscript cards and previews',
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
      name: 'tags',
      title: 'Taxonomy Tags',
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
      title: 'Featured Manuscript',
      type: 'boolean',
      description: 'Highlight this article at the top of the blog page and homepage',
      initialValue: false,
    },
    {
      name: 'readingTime',
      title: 'Reading Time (Minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes',
    },
    {
      name: 'body',
      title: 'Manuscript Body (Portable Text & Code)',
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
          title: 'Show Related Treatises',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showShareButtons',
          title: 'Show Citation / Share Buttons',
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
      volume: 'volume',
    },
    prepare(selection) {
      const { title, author, date, volume } = selection
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'Draft'
      return {
        title: title,
        subtitle: `${volume || ''} • ${author || 'Sudip Jana'} • ${formattedDate}`,
      }
    },
  },
})
