import { defineType } from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'GitHub', value: 'github' },
          { title: 'Twitter / X', value: 'twitter' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Discord', value: 'discord' },
          { title: 'Email', value: 'email' },
          { title: 'RSS Feed', value: 'rss' },
          { title: 'Website / Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'label',
      title: 'Label / Handle',
      type: 'string',
      description: 'e.g. "@sudip", "sudip@example.com"',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
})
