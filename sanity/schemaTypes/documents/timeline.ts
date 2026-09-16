import { defineType } from 'sanity'

export const timeline = defineType({
  name: 'timeline',
  title: 'Timeline & Milestones',
  type: 'document',
  fields: [
    {
      name: 'dateRange',
      title: 'Date Range / Year',
      type: 'string',
      description: 'e.g. "2023 — Present" or "2021 — 2023"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Role / Milestone Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'company',
      title: 'Company / Organization / Project',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description & Achievements',
      type: 'text',
      rows: 4,
    },
    {
      name: 'technologies',
      title: 'Technologies / Skills',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers display first (e.g. 1, 2, 3...)',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'company',
      date: 'dateRange',
    },
    prepare({ title, subtitle, date }) {
      return {
        title: title,
        subtitle: `${subtitle || ''} (${date || ''})`,
      }
    },
  },
})
