import { defineType } from 'sanity'

export const gardenPage = defineType({
  name: 'gardenPage',
  title: 'Page: Digital Garden',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: '📍 Where it appears: Main heading on /garden.',
      placeholder: 'The Digital Garden & Zettelkasten Archive',
      initialValue: 'The Digital Garden & Zettelkasten Archive',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Page Description / Subtitle',
      type: 'text',
      rows: 3,
      description: '📍 Where it appears: Subtitle on /garden.',
      placeholder: 'A networked repository of evolving notes, speculative hypotheses, formal lemmas, and verified citations.',
      initialValue:
        'A networked repository of evolving notes, speculative hypotheses, formal lemmas, and verified citations.',
    },
    {
      name: 'showInteractiveGraph',
      title: 'Show Interactive 2D Synaptic Graph',
      type: 'boolean',
      description: 'Toggle on to display the interactive physics-directed graph canvas.',
      initialValue: true,
    },
    {
      name: 'epistemicWarning',
      title: 'Epistemic Warning Banner',
      type: 'string',
      description: '📍 Where it appears: Optional note banner explaining active research status.',
      placeholder: 'Notes in this garden represent live working hypotheses across varying stages of formal maturity.',
    },
    {
      name: 'seo',
      title: 'Garden Page SEO',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Digital Garden Page Settings',
        subtitle: title || 'Configure digital garden page',
      }
    },
  },
})
