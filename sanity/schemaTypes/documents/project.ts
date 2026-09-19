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
      description: '📍 Where it appears: Heading of the simulation card in the Lab.',
      placeholder: 'Matrix Transformations: Determinants as Geometric Scaling',
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
      description: 'Used by the filter pills at the top of the lab.',
      options: {
        list: [
          'Agent-Based Simulations',
          'Probability & Inference',
          'Neural Networks',
          'Dynamical Systems',
          'Information Theory',
        ],
      },
      placeholder: 'Dynamical Systems',
      initialValue: 'Dynamical Systems',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'disciplineTag',
      title: 'Sub-Discipline Tag',
      type: 'string',
      description: 'Small tag pill on top of the card (e.g. "Linear Algebra", "Inference & DAG").',
      placeholder: 'Linear Algebra',
      initialValue: 'Linear Algebra',
    },
    {
      name: 'modelType',
      title: 'Simulation Kernel Type',
      type: 'string',
      description: 'Selects the live interactive WebGL/Canvas mathematical animation to render.',
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
      description: 'Paragraph explaining the physical or mathematical phenomenon.',
      placeholder: 'Drag the 2D basis vectors to transform the coordinate grid. Watch the unit square distort into a parallelogram.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'metrics',
      title: 'Live Telemetry Metrics Pair',
      type: 'object',
      description: 'Two live numerical telemetry values shown at the bottom of the card.',
      fields: [
        { name: 'label1', type: 'string', title: 'Metric 1 Label', placeholder: 'det(A)', initialValue: 'det(A)' },
        { name: 'value1', type: 'string', title: 'Metric 1 Value', placeholder: '-1.91', initialValue: '-1.91' },
        { name: 'label2', type: 'string', title: 'Metric 2 Label', placeholder: 'Trace', initialValue: 'Trace' },
        { name: 'value2', type: 'string', title: 'Metric 2 Value', placeholder: '1.64', initialValue: '1.64' },
      ],
    },
    {
      name: 'actionLabel',
      title: 'Launch Button Label',
      type: 'string',
      placeholder: 'Launch Simulation Canvas',
      initialValue: 'Launch Simulation Canvas',
    },
    {
      name: 'stars',
      title: 'Citations / Stars Counter',
      type: 'number',
      placeholder: '1420',
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
      title: 'External Live Demo URL (Optional)',
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
