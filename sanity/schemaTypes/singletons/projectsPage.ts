import { defineType } from 'sanity'

export const projectsPage = defineType({
  name: 'projectsPage',
  title: 'Page: Interactive Lab',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: '📍 Where it appears: Main heading on /projects.',
      placeholder: 'The Computational Lab: Interactive Models & Live Explainables',
      initialValue: 'The Computational Lab: Interactive Models & Live Explainables',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Page Description / Subtitle',
      type: 'text',
      rows: 3,
      description: '📍 Where it appears: Intro paragraph on /projects.',
      placeholder: 'An open repository of mathematically rigorous, dynamic algorithmic simulations. Built to accompany long-form analytical monographs, allowing researchers to evaluate parametric phase spaces in real time.',
      initialValue:
        'An open repository of mathematically rigorous, dynamic algorithmic simulations. Built to accompany long-form analytical monographs, allowing researchers to evaluate parametric phase spaces in real time.',
    },
    {
      name: 'showFilter',
      title: 'Show Discipline Filter Bar',
      type: 'boolean',
      description: 'Toggle on to show the horizontal category filter pills (Agent-Based, Neural Networks, etc.).',
      initialValue: true,
    },
    {
      name: 'ctaBox',
      title: 'Embed Live Models Callout Box',
      type: 'object',
      description: '📍 Where it appears: Dark banner at the bottom of /projects for manuscript embedding.',
      fields: [
        { name: 'show', type: 'boolean', title: 'Show Embed Box', initialValue: true },
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          placeholder: 'Embed Live Models in Academic Manuscripts',
          initialValue: 'Embed Live Models in Academic Manuscripts',
        },
        {
          name: 'description',
          type: 'text',
          rows: 2,
          title: 'Description',
          placeholder: 'Every widget in Synthese Lab compiles to a standalone, zero-dependency Web Component. Include fully interactive mathematical figures in your Substack, Quarto document, or HTML publication.',
          initialValue:
            'Every widget in Synthese Lab compiles to a standalone, zero-dependency Web Component. Include fully interactive mathematical figures in your Substack, Quarto document, or HTML publication.',
        },
        { name: 'buttonText', type: 'string', title: 'Button Text', placeholder: 'Explore Manuscripts', initialValue: 'Explore Manuscripts' },
        { name: 'buttonUrl', type: 'string', title: 'Button Link', placeholder: '/blog', initialValue: '/blog' },
      ],
    },
    {
      name: 'seo',
      title: 'Projects Page SEO',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Projects & Lab Page Settings',
        subtitle: title || 'Configure computational lab page title and options',
      }
    },
  },
})
