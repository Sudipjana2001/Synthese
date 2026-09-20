import { defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: '🌐 Brand & Author', default: true },
    { name: 'ticker', title: '📢 Top Ticker Bar' },
    { name: 'footer', title: '🦶 Footer & Legal' },
    { name: 'seo', title: '🔍 Global SEO' },
  ],
  fields: [
    // ── 01: General & Author ──
    {
      name: 'siteName',
      title: 'Site Name / Brand',
      type: 'string',
      group: 'general',
      description: '📍 Where it appears: Top navigation bar logo text and browser tab titles.',
      placeholder: 'Synthese',
      initialValue: 'Synthese',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'siteDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
      group: 'general',
      description: '📍 Where it appears: Default description used by Google and social share embeds.',
      placeholder: 'An Open Scholarly Computational Press & Personal Research Laboratory exploring artificial cognition, complex adaptive systems, and interactive computation.',
      initialValue:
        'An Open Scholarly Computational Press & Personal Research Laboratory exploring artificial cognition, complex adaptive systems, and interactive computation.',
    },
    {
      name: 'authorName',
      title: 'Principal Investigator & Author',
      type: 'string',
      group: 'general',
      description: '📍 Where it appears: Author name shown on the homepage foreword and across manuscripts.',
      placeholder: 'Sudip Jana',
      initialValue: 'Sudip Jana',
    },
    {
      name: 'authorRole',
      title: 'Author Academic Title',
      type: 'string',
      group: 'general',
      placeholder: 'Principal Investigator',
      initialValue: 'Principal Investigator',
    },
    {
      name: 'socialLinks',
      title: 'Social & Research Links',
      type: 'array',
      group: 'general',
      of: [{ type: 'socialLink' }],
    },

    // ── 02: Top Ticker Bar ──
    {
      name: 'ticker',
      title: 'Top Ticker Bar Settings',
      type: 'object',
      group: 'ticker',
      description: '📍 Where it appears: The dark top notification bar at the very top of every page.',
      fields: [
        {
          name: 'showTicker',
          type: 'boolean',
          title: 'Show Top Ticker Bar',
          description: 'Toggle on to display the top metadata ticker bar across all pages.',
          initialValue: true,
        },
        {
          name: 'issueText',
          type: 'string',
          title: 'Issue / Volume Text (Left)',
          placeholder: 'Issue No. 10 • Vol. IV • Computational Epistemology',
          initialValue: 'Issue No. 10 • Vol. IV • Computational Epistemology',
        },
        {
          name: 'doi',
          type: 'string',
          title: 'DOI Text (Left)',
          placeholder: 'DOI: 10.48550/SYNTHESE.2026.04',
          initialValue: 'DOI: 10.48550/SYNTHESE.2026.04',
        },
        {
          name: 'statusText',
          type: 'string',
          title: 'CMS Connection Status Text (Right)',
          placeholder: 'Sanity CMS Connected',
          initialValue: 'Sanity CMS Connected',
        },
        {
          name: 'rightBadge',
          type: 'string',
          title: 'Right Badge / License',
          placeholder: 'Open Access CC-BY-4.0',
          initialValue: 'Open Access CC-BY-4.0',
        },
      ],
    },

    // ── 03: Footer & Legal ──
    {
      name: 'footerBio',
      title: 'Footer Brand Subtitle',
      type: 'string',
      group: 'footer',
      description: '📍 Where it appears: Small text directly underneath the brand name in the footer.',
      placeholder: 'An Open Scholarly Computational Press',
      initialValue: 'An Open Scholarly Computational Press',
    },
    {
      name: 'footerCopyright',
      title: 'Footer Copyright & ISSN',
      type: 'string',
      group: 'footer',
      description: '📍 Where it appears: The bottom legal line in the website footer.',
      placeholder: '© 2026 Synthese Lab. ISSN 2769-188X. Open Access CC-BY-4.0.',
      initialValue: '© 2026 Synthese Lab. ISSN 2769-188X. Open Access CC-BY-4.0.',
    },

    // ── 04: Global SEO ──
    {
      name: 'seo',
      title: 'Global Default SEO',
      type: 'seo',
      group: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'siteName',
      subtitle: 'siteDescription',
    },
  },
})
