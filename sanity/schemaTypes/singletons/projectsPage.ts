import { defineType } from 'sanity'

export const projectsPage = defineType({
  name: 'projectsPage',
  title: 'Page: Interactive Lab',
  type: 'document',
  groups: [
    { name: 'masthead', title: '🚀 Masthead & Status', default: true },
    { name: 'arsenal', title: '🔬 Computational Arsenal' },
    { name: 'embed', title: '📦 Manuscript Embedding' },
    { name: 'seo', title: '🔍 Search Engine SEO' },
  ],
  fields: [
    // ── 01: Status Row & Masthead ──
    {
      name: 'statusKicker',
      title: 'Status Row Kicker Pill',
      type: 'string',
      group: 'masthead',
      description: '📍 Where it appears: Top left badge above title on /projects.',
      placeholder: 'Comp-Lab Suite v2.4',
      initialValue: 'Comp-Lab Suite v2.4',
    },
    {
      name: 'issnTag',
      title: 'ISSN Tag',
      type: 'string',
      group: 'masthead',
      placeholder: 'ISSN 2769-188X',
      initialValue: 'ISSN 2769-188X',
    },
    {
      name: 'webglBadge',
      title: 'WebGL Status Badge',
      type: 'string',
      group: 'masthead',
      placeholder: 'WebGL 2.0 Active',
      initialValue: 'WebGL 2.0 Active',
    },
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'masthead',
      description: '📍 Where it appears: Main heading on /projects.',
      placeholder: 'The Computational Lab: Interactive Models & Live Explainables',
      initialValue: 'The Computational Lab: Interactive Models & Live Explainables',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Page Description / Subtitle',
      type: 'text',
      rows: 3,
      group: 'masthead',
      description: '📍 Where it appears: Intro paragraph on /projects.',
      placeholder: 'An open repository of mathematically rigorous, dynamic algorithmic simulations. Built to accompany long-form analytical monographs, allowing researchers to evaluate parametric phase spaces in real time.',
      initialValue:
        'An open repository of mathematically rigorous, dynamic algorithmic simulations. Built to accompany long-form analytical monographs, allowing researchers to evaluate parametric phase spaces in real time.',
    },
    {
      name: 'primaryButton',
      title: 'Primary Action Button',
      type: 'object',
      group: 'masthead',
      fields: [
        { name: 'label', type: 'string', title: 'Button Label', placeholder: 'Submit Algorithm', initialValue: 'Submit Algorithm' },
        { name: 'url', type: 'string', title: 'Button Link', placeholder: 'https://github.com/Sudipjana2001/Synthese', initialValue: 'https://github.com/Sudipjana2001/Synthese' },
      ],
    },
    {
      name: 'secondaryButton',
      title: 'Secondary Action Button',
      type: 'object',
      group: 'masthead',
      fields: [
        { name: 'label', type: 'string', title: 'Button Label', placeholder: 'Jupyter Kernel (Pyodide)', initialValue: 'Jupyter Kernel (Pyodide)' },
        { name: 'url', type: 'string', title: 'Button Link', placeholder: 'https://pyodide.org/', initialValue: 'https://pyodide.org/' },
      ],
    },

    // ── 02: Computational Arsenal Section ──
    {
      name: 'showFilter',
      title: 'Show Discipline Filter Bar',
      type: 'boolean',
      group: 'arsenal',
      description: 'Toggle on to show the horizontal category filter pills (Agent-Based, Neural Networks, etc.).',
      initialValue: true,
    },
    {
      name: 'arsenalKicker',
      title: 'Arsenal Section Kicker',
      type: 'string',
      group: 'arsenal',
      placeholder: 'Active Algorithmic Arsenal',
      initialValue: 'Active Algorithmic Arsenal',
    },
    {
      name: 'arsenalHeading',
      title: 'Arsenal Section Heading',
      type: 'string',
      group: 'arsenal',
      placeholder: 'Specialized Computation Enclosures',
      initialValue: 'Specialized Computation Enclosures',
    },
    {
      name: 'arsenalDesc',
      title: 'Arsenal Section Description',
      type: 'string',
      group: 'arsenal',
      placeholder: 'Drag parameters, test assumptions, and fork computational code sandbox states.',
      initialValue: 'Drag parameters, test assumptions, and fork computational code sandbox states.',
    },

    // ── 03: Manuscript Embedding ──
    {
      name: 'ctaBox',
      title: 'Embed Live Models Callout Box',
      type: 'object',
      group: 'embed',
      description: '📍 Where it appears: Dark banner at the bottom of /projects for manuscript embedding.',
      fields: [
        { name: 'show', type: 'boolean', title: 'Show Embed Box', initialValue: true },
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          placeholder: 'Embed Live Models in Academic Manuscripts',
          initialValue: 'Embed Live Models in Academic Manuscripts',
        },
        {
          name: 'description',
          type: 'text',
          rows: 2,
          title: 'Description',
          placeholder: 'Every widget in Synthese Lab compiles to a standalone, zero-dependency Web Component. Include fully interactive mathematical figures in your Substack, Quarto document, or HTML publication.',
          initialValue:
            'Every widget in Synthese Lab compiles to a standalone, zero-dependency Web Component. Include fully interactive mathematical figures in your Substack, Quarto document, or HTML publication.',
        },
        { name: 'snippetText', type: 'string', title: 'Snippet Code (Copied to Clipboard)', placeholder: '<synthese-model type="gray-scott" f="0.054" k="0.062" />', initialValue: '<synthese-model type="gray-scott" f="0.054" k="0.062" />' },
        { name: 'buttonText', type: 'string', title: 'Button Text', placeholder: 'Explore Manuscripts', initialValue: 'Explore Manuscripts' },
        { name: 'buttonUrl', type: 'string', title: 'Button Link', placeholder: '/blog', initialValue: '/blog' },
      ],
    },
    {
      name: 'seo',
      title: 'Projects Page SEO',
      type: 'seo',
      group: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Projects & Lab Page Settings',
        subtitle: title || 'Configure computational lab page title and options',
      }
    },
  },
})
