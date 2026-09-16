import { defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Page: Home',
  type: 'document',
  fields: [
    {
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main large title on homepage (e.g. "Software Engineer, Writer, & Lifelong Explorer")',
      initialValue: 'Writing on technology, architecture, and mindful software craft.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroSubheadline',
      title: 'Hero Subheadline / Bio',
      type: 'text',
      rows: 4,
      description: 'Introduction paragraph below the headline',
      initialValue:
        'A digital garden and personal space sharing engineering deep dives, design systems, and notes on building high-craft experiences.',
    },
    {
      name: 'availableForWork',
      title: 'Available for work badge',
      type: 'object',
      fields: [
        { name: 'show', type: 'boolean', title: 'Show Badge', initialValue: true },
        { name: 'text', type: 'string', title: 'Badge Text', initialValue: 'Available for new projects' },
      ],
    },
    {
      name: 'heroPrimaryCta',
      title: 'Hero Primary Call to Action',
      type: 'cta',
    },
    {
      name: 'heroSecondaryCta',
      title: 'Hero Secondary Call to Action',
      type: 'cta',
    },
    {
      name: 'stats',
      title: 'Stats / Numbers Highlight',
      type: 'array',
      of: [{ type: 'statCounter' }],
    },
    {
      name: 'featuredSectionTitle',
      title: 'Featured Posts Section Heading',
      type: 'string',
      initialValue: 'Selected Writings',
    },
    {
      name: 'featuredSectionDescription',
      title: 'Featured Posts Section Description',
      type: 'string',
      initialValue: 'Essays and technical explorations on software craft.',
    },
    {
      name: 'projectsSectionTitle',
      title: 'Projects Section Heading',
      type: 'string',
      initialValue: 'Featured Work',
    },
    {
      name: 'showGardenPreview',
      title: 'Show Digital Garden Preview on Home',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'showNewsletter',
      title: 'Show Newsletter Section',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'newsletterHeading',
      title: 'Newsletter Heading',
      type: 'string',
      initialValue: 'Stay in the loop',
    },
    {
      name: 'newsletterDescription',
      title: 'Newsletter Description',
      type: 'text',
      rows: 2,
      initialValue: 'Periodic thoughtful dispatches on software, design, and ideas. No spam.',
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
        subtitle: title || 'Configure homepage content and toggles',
      }
    },
  },
})
