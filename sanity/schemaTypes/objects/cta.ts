import { defineType } from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'Link URL',
      type: 'string',
      description: 'Internal path (/blog, /projects) or external URL (https://...)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'variant',
      title: 'Style Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (Filled)', value: 'primary' },
          { title: 'Secondary (Outline)', value: 'secondary' },
          { title: 'Ghost (Text with arrow)', value: 'ghost' },
        ],
      },
      initialValue: 'primary',
    },
    {
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    },
  ],
})
