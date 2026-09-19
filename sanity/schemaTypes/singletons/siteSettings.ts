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
      initialValue: 'Synthese',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'siteDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
      initialValue: 'An Open Scholarly Computational Press & Personal Research Laboratory exploring artificial cognition, complex adaptive systems, and interactive computation.',
    },
    {
      name: 'authorName',
      title: 'Principal Investigator & Author',
      type: 'string',
      initialValue: 'Sudip Jana',
    },
    {
      name: 'ticker',
      title: 'Top Ticker Bar Settings',
      type: 'object',
      fields: [
        { name: 'showTicker', type: 'boolean', title: 'Show Ticker Bar', initialValue: true },
        { name: 'issueText', type: 'string', title: 'Issue / Volume Text', initialValue: 'Issue No. 10 • Vol. IV • Computational Epistemology' },
        { name: 'doi', type: 'string', title: 'DOI Text', initialValue: 'DOI: 10.48550/SYNTHESE.2026.04' },
        { name: 'rightBadge', type: 'string', title: 'Right Badge / License', initialValue: 'Open Access CC-BY-4.0' },
      ],
    },
    {
      name: 'socialLinks',
      title: 'Social & Research Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
    },
    {
      name: 'footerBio',
      title: 'Footer Brand Subtitle',
      type: 'string',
      initialValue: 'An Open Scholarly Computational Press',
    },
    {
      name: 'footerCopyright',
      title: 'Footer Copyright & ISSN',
      type: 'string',
      initialValue: '© 2026 Synthese Lab. ISSN 2769-188X. Open Access CC-BY-4.0.',
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
