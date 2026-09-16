import { defineType } from 'sanity'

export const projectsPage = defineType({
  name: 'projectsPage',
  title: 'Page: Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Craft & Code',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Page Description / Subtitle',
      type: 'text',
      rows: 3,
      initialValue:
        'A collection of open source tools, client work, experimental prototypes, and web applications.',
    },
    {
      name: 'showFilter',
      title: 'Show Tech Stack / Category Filter',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'ctaBox',
      title: 'Bottom Callout / Collaboration Box',
      type: 'object',
      fields: [
        { name: 'show', type: 'boolean', title: 'Show Collaboration Box', initialValue: true },
        { name: 'title', type: 'string', title: 'Title', initialValue: 'Have a project in mind?' },
        {
          name: 'description',
          type: 'text',
          rows: 2,
          title: 'Description',
          initialValue: "I'm always open to discussing engineering challenges, architecture, or interesting collaborations.",
        },
        { name: 'buttonText', type: 'string', title: 'Button Text', initialValue: 'Get in Touch' },
        { name: 'buttonUrl', type: 'string', title: 'Button Link', initialValue: 'mailto:contact@example.com' },
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
        title: 'Projects Page Settings',
        subtitle: title || 'Configure projects page content and CTAs',
      }
    },
  },
})
