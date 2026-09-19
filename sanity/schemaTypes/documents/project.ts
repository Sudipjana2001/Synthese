import { defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Interactive Project & Simulation',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
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
      name: 'category',
      title: 'Discipline Category',
      type: 'string',
      options: {
        list: [
          'Agent-Based Simulations',
          'Probability & Inference',
          'Neural Networks',
          'Dynamical Systems',
          'Information Theory',
        ],
      },
      initialValue: 'Dynamical Systems',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'disciplineTag',
      title: 'Sub-Discipline Tag',
      type: 'string',
      description: 'e.g. "Linear Algebra", "Inference & DAG", "Agent-Based Models"',
      initialValue: 'Linear Algebra',
    },
    {
      name: 'modelType',
      title: 'Simulation Kernel Type',
      type: 'string',
      options: {
        list: [
          { title: 'Gray-Scott Reaction-Diffusion', value: 'gray-scott' },
          { title: 'Boids Swarm Simulator', value: 'boids' },
          { title: 'Bayesian Belief Network DAG', value: 'bayes' },
          { title: 'Fourier Signal Decomposition', value: 'fourier' },
          { title: 'Loss Landscape Descent', value: 'loss-landscape' },
          { title: 'Markov Stochastic Matrix', value: 'markov' },
          { title: 'Matrix Eigenvalue Plane', value: 'matrix' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'gray-scott',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Abstract & Mechanics Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'metrics',
      title: 'Live Telemetry Metrics Pair',
      type: 'object',
      fields: [
        { name: 'label1', type: 'string', title: 'Metric 1 Label', initialValue: 'det(A)' },
        { name: 'value1', type: 'string', title: 'Metric 1 Value', initialValue: '-1.91' },
        { name: 'label2', type: 'string', title: 'Metric 2 Label', initialValue: 'Trace' },
        { name: 'value2', type: 'string', title: 'Metric 2 Value', initialValue: '1.64' },
      ],
    },
    {
      name: 'actionLabel',
      title: 'Launch Button Label',
      type: 'string',
      initialValue: 'Launch Simulation Canvas',
    },
    {
      name: 'stars',
      title: 'Citations / Stars Counter',
      type: 'number',
      initialValue: 500,
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'demoUrl',
      title: 'Live Demo URL (Optional)',
      type: 'url',
    },
    {
      name: 'repoUrl',
      title: 'Repository URL (Optional)',
      type: 'url',
    },
    {
      name: 'featured',
      title: 'Featured Model',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      modelType: 'modelType',
    },
    prepare({ title, subtitle, modelType }) {
      return {
        title: title,
        subtitle: `${subtitle || ''} [Kernel: ${modelType || 'custom'}]`,
      }
    },
  },
})
