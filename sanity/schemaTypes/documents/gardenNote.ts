import { defineType } from 'sanity'

export const gardenNote = defineType({
  name: 'gardenNote',
  title: 'Digital Garden Note & Lemma',
  type: 'document',
  fields: [
    {
      name: 'noteId',
      title: 'Scholarly Note ID',
      type: 'string',
      description: 'e.g. "§ 2024.11-FEP.04" or "§ GEOM-084"',
      initialValue: '§ NOTE-01',
      validation: (Rule) => Rule.required(),
    },
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
          { title: '🌱 Sprout (Initial conjecture / exploratory)', value: 'sprout' },
          { title: '🌿 Budding (Formalizing / working lemma)', value: 'budding' },
          { title: '🌳 Evergreen (Established foundational note)', value: 'evergreen' },
        ],
        layout: 'radio',
      },
      initialValue: 'sprout',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'discipline',
      title: 'Discipline Category',
      type: 'string',
      options: {
        list: [
          'Cognitive Science',
          'Differential Geometry',
          'Complex Systems',
          'Category Theory',
          'Information Geometry',
          'Computational Neuroscience',
        ],
      },
      initialValue: 'Cognitive Science',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'cluster',
      title: 'Topological Cluster',
      type: 'string',
      options: {
        list: [
          { title: 'Cluster 01 // Variational Inference', value: 'cluster-01' },
          { title: 'Cluster 02 // Nonlinear Topologies', value: 'cluster-02' },
          { title: 'Cluster 03 // Dynamical Systems', value: 'cluster-03' },
          { title: 'Cluster 04 // Speculative Frontiers', value: 'cluster-04' },
        ],
      },
      initialValue: 'cluster-01',
    },
    {
      name: 'summary',
      title: 'Scholarly Abstract / Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'formalLemma',
      title: 'Formal Mathematical Lemma (Optional)',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Lemma Label (e.g. "FORMAL LEMMA A.2")' },
        { name: 'formula', type: 'string', title: 'LaTeX / Unicode Math Formula' },
        { name: 'explanation', type: 'text', rows: 2, title: 'Mathematical Explanation' },
      ],
    },
    {
      name: 'tags',
      title: 'Taxonomy Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'citationKey',
      title: 'BibTeX Citation Key',
      type: 'string',
      description: 'e.g. "jana2026fep"',
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
      noteId: 'noteId',
      stage: 'stage',
      discipline: 'discipline',
    },
    prepare({ title, noteId, stage, discipline }) {
      const icons: Record<string, string> = {
        sprout: '🌱',
        budding: '🌿',
        evergreen: '🌳',
      }
      const icon = stage ? icons[stage] || '📝' : '📝'
      return {
        title: `${noteId ? noteId + ': ' : ''}${title}`,
        subtitle: `${icon} ${discipline || ''} [${stage ? stage.toUpperCase() : ''}]`,
      }
    },
  },
})
