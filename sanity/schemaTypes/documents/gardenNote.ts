import { defineType } from 'sanity'

export const gardenNote = defineType({
  name: 'gardenNote',
  title: 'Digital Garden Note',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'stage',
      title: 'Growth Stage',
      type: 'string',
      options: {
        list: [
          { title: '🌱 Seedling (Rough thought / initial idea)', value: 'seedling' },
          { title: '🌿 Budding (Developing / work in progress)', value: 'budding' },
          { title: '🌳 Evergreen (Polished / mature idea)', value: 'evergreen' },
        ],
        layout: 'radio',
      },
      initialValue: 'seedling',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'topics',
      title: 'Topics / Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'summary',
      title: 'Quick Summary',
      type: 'text',
      rows: 2,
    },
    {
      name: 'body',
      title: 'Note Content',
      type: 'blockContent',
    },
    {
      name: 'relatedNotes',
      title: 'Connected Notes (Backlinks / Graph)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'gardenNote' }] }],
    },
    {
      name: 'lastTended',
      title: 'Last Tended / Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      stage: 'stage',
      date: 'lastTended',
    },
    prepare({ title, stage, date }) {
      const icons: Record<string, string> = {
        seedling: '🌱',
        budding: '🌿',
        evergreen: '🌳',
      }
      const icon = stage ? icons[stage] || '📝' : '📝'
      const formattedDate = date ? new Date(date).toLocaleDateString() : ''
      return {
        title: `${icon} ${title}`,
        subtitle: `${stage ? stage.toUpperCase() : ''} • Tended ${formattedDate}`,
      }
    },
  },
})
