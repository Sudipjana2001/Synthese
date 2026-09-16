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
      initialValue: 'Digital Garden',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Page Description / Subtitle',
      type: 'text',
      rows: 3,
      initialValue:
        'A collection of living, evolving thoughts, rough notes, mental models, and explorations that grow over time.',
    },
    {
      name: 'showStageLegend',
      title: 'Show Growth Stages Legend (Seedling / Budding / Evergreen)',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'showInteractiveGraph',
      title: 'Show Interactive 2D Knowledge Graph',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'graphHeadline',
      title: 'Graph Section Title',
      type: 'string',
      initialValue: 'Interactive Concept Network',
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
        title: 'Garden Page Settings',
        subtitle: title || 'Configure digital garden page',
      }
    },
  },
})
