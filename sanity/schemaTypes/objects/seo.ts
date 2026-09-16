import { defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO & Metadata',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title shown in search engine results and browser tabs (50-60 characters)',
      validation: (Rule) => Rule.max(70).warning('Titles longer than 70 characters may get truncated.'),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description shown in search engine snippets (150-160 characters)',
      validation: (Rule) => Rule.max(160).warning('Descriptions longer than 160 characters may get truncated.'),
    },
    {
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image displayed when sharing on Twitter/X, LinkedIn, Facebook (1200x630 recommended)',
      options: { hotspot: true },
    },
    {
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Set if this page duplicates content from another URL',
    },
    {
      name: 'noIndex',
      title: 'Disallow search indexing (noindex)',
      type: 'boolean',
      initialValue: false,
    },
  ],
})
