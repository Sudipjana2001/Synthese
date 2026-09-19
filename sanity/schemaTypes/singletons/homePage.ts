import { defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Page: Home',
  type: 'document',
  fields: [
    {
      name: 'kicker',
      title: 'Top Kicker Badge',
      type: 'string',
      initialValue: 'Public Journal • Computational Epistemology',
    },
    {
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'text',
      rows: 3,
      initialValue: 'Exploring the intersection of artificial cognition, complex adaptive systems, and interactive computation.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroSubheadline',
      title: 'Hero Subheadline / Mission Statement',
      type: 'text',
      rows: 4,
      initialValue:
        'Synthese is an open computational press and experimental laboratory. We construct executable models, distill long-form philosophical treatises, and publish rigorous mathematical syntheses that transcend traditional static print.',
    },
    {
      name: 'heroPrimaryCta',
      title: 'Primary CTA Button',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Button Label', initialValue: 'Launch Interactive Lab' },
        { name: 'url', type: 'string', title: 'Button Link', initialValue: '/projects' },
      ],
    },
    {
      name: 'heroSecondaryCta',
      title: 'Secondary CTA Button',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Button Label', initialValue: 'Read Manuscripts & Math' },
        { name: 'url', type: 'string', title: 'Button Link', initialValue: '/blog' },
      ],
    },
    {
      name: 'velocityCard',
      title: 'Research Velocity / Telemetry Card',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Card Title', initialValue: 'RESEARCH VELOCITY // V4.19' },
        {
          name: 'metrics',
          title: 'Metrics Highlights',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'string', title: 'Metric Label' },
                { name: 'value', type: 'string', title: 'Metric Value' },
                { name: 'subtext', type: 'string', title: 'Subtext / Indicator' },
              ],
            },
          ],
          initialValue: [
            { label: 'ACTIVE SIMULATIONS', value: '14 Models', subtext: '• Real-Time WebGL' },
            { label: 'PREPRINTS UNDER REVIEW', value: '4 Volumes', subtext: '• Open Peer Review' },
            { label: 'TOPOLOGICAL NODES', value: '418 Lemmas', subtext: '• Zettelkasten' },
          ],
        },
      ],
    },
    {
      name: 'epistemicQuote',
      title: 'Epistemic Stance / Quote Card',
      type: 'object',
      fields: [
        { name: 'badge', type: 'string', title: 'Badge Label', initialValue: 'Epistemic Stance' },
        {
          name: 'quoteText',
          title: 'Quote Text',
          type: 'text',
          rows: 3,
          initialValue: 'A model is not a passive mirror of empirical nature; it is an apparatus that forces our premises to collide with mathematical consequences.',
        },
        { name: 'quoteAuthor', type: 'string', title: 'Author / Attribution', initialValue: '— Synthese Editorial Board Charter' },
      ],
    },
    {
      name: 'newsletter',
      title: 'Gazette Newsletter Section',
      type: 'object',
      fields: [
        { name: 'show', type: 'boolean', title: 'Show Newsletter Section', initialValue: true },
        { name: 'badge', type: 'string', title: 'Badge Text', initialValue: 'Institutional Dispatch & Preprint Alerts • ISSN 2769-188X • Bi-weekly Overviews' },
        { name: 'title', type: 'string', title: 'Section Title', initialValue: 'Subscribe to the Synthese Scholarly Computation Gazette' },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          initialValue: 'Receive newly verified mathematical models, long-form philosophical inquiries, and downloadable Jupyter & WebGL environments directly in your inbox every second Thursday. No marketing drivel; purely executable research.',
        },
      ],
    },
    {
      name: 'seo',
      title: 'Homepage SEO',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'heroHeadline',
    },
    prepare({ title }) {
      return {
        title: 'Home Page Settings',
        subtitle: title || 'Configure homepage editorial content and toggles',
      }
    },
  },
})
