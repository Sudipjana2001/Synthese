import { defineType } from 'sanity'

export const statCounter = defineType({
  name: 'statCounter',
  title: 'Stat Counter',
  type: 'object',
  fields: [
    {
      name: 'number',
      title: 'Number or Value',
      type: 'string',
      description: 'e.g. "5+", "10K", "100%"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g. "Years Experience", "Articles Written", "Projects Shipped"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sublabel',
      title: 'Sublabel / Note',
      type: 'string',
      description: 'Optional small note below the label',
    },
  ],
})
