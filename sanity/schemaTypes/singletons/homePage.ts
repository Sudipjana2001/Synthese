import { defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Page: Home',
  type: 'document',
  groups: [
    { name: 'hero', title: '🚀 Hero & Foreword', default: true },
    { name: 'telemetry', title: '📊 Research Velocity' },
    { name: 'editorial', title: '📜 Epistemic Stance' },
    { name: 'newsletter', title: '📬 Gazette Newsletter' },
    { name: 'seo', title: '🔍 Search Engine SEO' },
  ],
  fields: [
    {
      name: 'kicker',
      title: 'Top Kicker Badge',
      type: 'string',
      group: 'hero',
      description: '📍 Where it appears: Pill tag at the very top of the homepage hero (e.g. "Editor’s Foreword" or "Public Journal")',
      placeholder: "Editor's Foreword",
      initialValue: "Editor's Foreword",
    },
    {
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'text',
      rows: 3,
      group: 'hero',
      description: '📍 Where it appears: The primary large headline at the top of the homepage.',
      placeholder: 'Exploring the intersection of artificial cognition, complex adaptive systems, and interactive computation.',
      initialValue: 'Exploring the intersection of artificial cognition, complex adaptive systems, and interactive computation.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroSubheadline',
      title: 'Hero Subheadline / Mission Statement',
      type: 'text',
      rows: 4,
      group: 'hero',
      description: '📍 Where it appears: Paragraph directly underneath the hero headline.',
      placeholder: 'Synthese is an open computational press and experimental laboratory. We construct executable models, distill long-form philosophical treatises, and publish rigorous mathematical syntheses that transcend traditional static print.',
      initialValue:
        'Synthese is an open computational press and experimental laboratory. We construct executable models, distill long-form philosophical treatises, and publish rigorous mathematical syntheses that transcend traditional static print.',
    },
    {
      name: 'heroPrimaryCta',
      title: 'Primary CTA Button',
      type: 'object',
      group: 'hero',
      description: '📍 Where it appears: Dark button on the left under the hero mission statement.',
      fields: [
        {
          name: 'label',
          type: 'string',
          title: 'Button Label',
          placeholder: 'Launch Interactive Lab',
          initialValue: 'Launch Interactive Lab',
        },
        {
          name: 'url',
          type: 'string',
          title: 'Button Link',
          placeholder: '/projects',
          initialValue: '/projects',
        },
      ],
    },
    {
      name: 'heroSecondaryCta',
      title: 'Secondary CTA Button',
      type: 'object',
      group: 'hero',
      description: '📍 Where it appears: Outline button on the right under the hero mission statement.',
      fields: [
        {
          name: 'label',
          type: 'string',
          title: 'Button Label',
          placeholder: 'Read Manuscripts & Math',
          initialValue: 'Read Manuscripts & Math',
        },
        {
          name: 'url',
          type: 'string',
          title: 'Button Link',
          placeholder: '/blog',
          initialValue: '/blog',
        },
      ],
    },
    {
      name: 'velocityCard',
      title: 'Research Velocity / Telemetry Card',
      type: 'object',
      group: 'telemetry',
      description: '📍 Where it appears: Right-hand telemetry card beside the hero with live metric statistics.',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Card Title',
          placeholder: 'RESEARCH VELOCITY // V4.19',
          initialValue: 'Research Velocity',
        },
        {
          name: 'metrics',
          title: 'Metrics Highlights',
          type: 'array',
          description: 'Add metric pairs shown as large numbers with descriptions.',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', type: 'string', title: 'Metric Value (Large Number)', placeholder: '38' },
                { name: 'label', type: 'string', title: 'Metric Label', placeholder: 'Peer-Reviewed Papers' },
                { name: 'subtext', type: 'string', title: 'Subtext / Indicator', placeholder: '2024–2026' },
              ],
            },
          ],
          initialValue: [
            { label: 'Peer-Reviewed Papers', value: '38', subtext: '2024–2026' },
            { label: 'Executable Simulations', value: '14', subtext: '• Real-Time WebGL' },
            { label: 'Model Telemetry', value: '120k', subtext: 'Active Runs' },
          ],
        },
      ],
    },
    {
      name: 'epistemicQuote',
      title: 'Epistemic Stance / Quote Card',
      type: 'object',
      group: 'editorial',
      description: '📍 Where it appears: Callout quote box on the right side of the homepage.',
      fields: [
        {
          name: 'badge',
          type: 'string',
          title: 'Badge Label',
          placeholder: 'Epistemic Stance',
          initialValue: 'Epistemic Stance',
        },
        {
          name: 'quoteText',
          type: 'text',
          rows: 3,
          title: 'Quote Text',
          placeholder: 'A model is not a passive mirror of empirical nature; it is an apparatus that forces our premises to collide with mathematical consequences.',
          initialValue:
            'A model is not a passive mirror of empirical nature; it is an apparatus that forces our premises to collide with mathematical consequences.',
        },
        {
          name: 'quoteAuthor',
          type: 'string',
          title: 'Author / Attribution',
          placeholder: '— Synthese Editorial Board Charter',
          initialValue: '— Synthese Editorial Board Charter',
        },
      ],
    },
    {
      name: 'newsletter',
      title: 'Gazette Newsletter Section',
      type: 'object',
      group: 'newsletter',
      description: '📍 Where it appears: Dark subscription box near the bottom of the homepage.',
      fields: [
        { name: 'show', type: 'boolean', title: 'Show Newsletter Section', initialValue: true },
        {
          name: 'badge',
          type: 'string',
          title: 'Badge Text',
          placeholder: 'Institutional Dispatch & Preprint Alerts • ISSN 2769-188X • Bi-weekly Overviews',
          initialValue: 'Institutional Dispatch & Preprint Alerts • ISSN 2769-188X • Bi-weekly Overviews',
        },
        {
          name: 'title',
          type: 'string',
          title: 'Section Title',
          placeholder: 'Subscribe to the Synthese Scholarly Computation Gazette',
          initialValue: 'Subscribe to the Synthese Scholarly Computation Gazette',
        },
        {
          name: 'description',
          type: 'text',
          rows: 3,
          title: 'Description',
          placeholder: 'Receive newly verified mathematical models, long-form philosophical inquiries, and downloadable Jupyter & WebGL environments directly in your inbox every second Thursday. No marketing drivel; purely executable research.',
          initialValue:
            'Receive newly verified mathematical models, long-form philosophical inquiries, and downloadable Jupyter & WebGL environments directly in your inbox every second Thursday. No marketing drivel; purely executable research.',
        },
      ],
    },
    {
      name: 'seo',
      title: 'Homepage SEO',
      type: 'seo',
      group: 'seo',
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
