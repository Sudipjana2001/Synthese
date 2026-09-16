import { defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      title: 'Site Name / Brand',
      type: 'string',
      description: 'e.g. "Sudip\'s Journal" or "Synthese"',
      initialValue: 'Sudip',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'siteDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
      description: 'Global fallback description for SEO',
    },
    {
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      initialValue: 'Sudip',
    },
    {
      name: 'navItems',
      title: 'Navigation Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label', validation: (Rule) => Rule.required() },
            { name: 'url', type: 'string', title: 'URL Path (e.g. /blog, /projects)', validation: (Rule) => Rule.required() },
            { name: 'isExternal', type: 'boolean', title: 'External link?', initialValue: false },
          ],
        },
      ],
      initialValue: [
        { label: 'Writing', url: '/blog', isExternal: false },
        { label: 'Projects', url: '/projects', isExternal: false },
        { label: 'Garden', url: '/garden', isExternal: false },
        { label: 'About', url: '/about', isExternal: false },
      ],
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
    },
    {
      name: 'footerBio',
      title: 'Footer Bio Text',
      type: 'text',
      rows: 2,
      description: 'Short statement displayed in the footer',
    },
    {
      name: 'footerCopyright',
      title: 'Footer Copyright Notice',
      type: 'string',
      description: 'e.g. "© 2026 Sudip. All rights reserved."',
    },
    {
      name: 'seo',
      title: 'Global Default SEO',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'siteName',
      subtitle: 'siteDescription',
    },
  },
})
