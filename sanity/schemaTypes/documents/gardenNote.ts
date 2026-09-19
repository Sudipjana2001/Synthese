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
      description: '📍 Where it appears: Top badge on garden card and inspector (e.g. "§ 2024.11-FEP.04" or "§ GEOM-084").',
      placeholder: '§ GEOM-084',
      initialValue: '§ NOTE-01',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: '📍 Where it appears: Heading in the card grid and node label in the graph.',
      placeholder: 'Topological Invariants in High-Dimensional Embedding Manifolds',
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
      description: 'Select maturity stage. Dictates node color in the knowledge graph.',
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
      description: 'Used by the filter pills on /garden.',
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
      description: 'The body text displayed in the card grid and Synaptic Inspector.',
      placeholder: 'Persistent homology groups H_k characterize persistent topological cavities within high-dimensional neural activation tensors.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'formalLemma',
      title: 'Formal Mathematical Lemma (Optional)',
      type: 'object',
      description: 'Rendered in LaTeX math block in the Synaptic Inspector drawer.',
      fields: [
        {
          name: 'label',
          type: 'string',
          title: 'Lemma Label',
          placeholder: 'FORMAL LEMMA A.2 // BOUND DEFINITION',
          initialValue: 'FORMAL LEMMA A.2',
        },
        {
          name: 'formula',
          type: 'string',
          title: 'LaTeX / Math Formula',
          placeholder: 'D_{KL}(q(s) || p(s)) \\ge 0',
        },
        {
          name: 'explanation',
          type: 'text',
          rows: 2,
          title: 'Mathematical Explanation',
          placeholder: 'Lower bound on variational surprise ensures non-divergence of internal representations.',
        },
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
      placeholder: 'jana2026geom',
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
