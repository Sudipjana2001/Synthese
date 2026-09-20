import { defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Page: Home',
  type: 'document',
  groups: [
    { name: 'hero', title: '🚀 Hero & Foreword', default: true },
    { name: 'telemetry', title: '📊 Research Velocity' },
    { name: 'featured', title: '🔬 Featured Paper & Sandbox' },
    { name: 'essays', title: '📚 Essays & Field Notes' },
    { name: 'editorial', title: '📜 Epistemic Stance' },
    { name: 'newsletter', title: '📬 Gazette Newsletter' },
    { name: 'seo', title: '🔍 Search Engine SEO' },
  ],
  fields: [
    // ── 01: Hero & Foreword ──
    {
      name: 'kicker',
      title: 'Top Kicker Badge',
      type: 'string',
      group: 'hero',
      description: '📍 Where it appears: Pill tag at the very top of the homepage hero (e.g. "Editor’s Foreword")',
      placeholder: "Editor's Foreword",
      initialValue: "Editor's Foreword",
    },
    {
      name: 'authorSubtitle',
      title: 'Author Subtitle / Title in Foreword',
      type: 'string',
      group: 'hero',
      description: '📍 Where it appears: Text beside the author name in the foreword kicker (e.g. "Principal Investigator")',
      placeholder: 'Principal Investigator',
      initialValue: 'Principal Investigator',
    },
    {
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'text',
      rows: 3,
      group: 'hero',
      description: '📍 Where it appears: The primary large headline at the top of the homepage.',
      placeholder: 'Exploring the intersection of artificial cognition, complex adaptive systems, and interactive computation.',
      initialValue: 'Exploring the intersection of artificial cognition, complex adaptive systems, and interactive computation.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroSubheadline',
      title: 'Hero Subheadline / Mission Statement',
      type: 'text',
      rows: 4,
      group: 'hero',
      description: '📍 Where it appears: Paragraph directly underneath the hero headline.',
      placeholder: 'Synthese is an open computational press and experimental laboratory. We construct executable models, distill long-form philosophical treatises, and publish rigorous mathematical syntheses that transcend traditional static print.',
      initialValue:
        'Synthese is an open computational press and experimental laboratory. We construct executable models, distill long-form philosophical treatises, and publish rigorous mathematical syntheses that transcend traditional static print.',
    },
    {
      name: 'heroPrimaryCta',
      title: 'Primary CTA Button',
      type: 'object',
      group: 'hero',
      description: '📍 Where it appears: Dark button on the left under the hero mission statement.',
      fields: [
        {
          name: 'label',
          type: 'string',
          title: 'Button Label',
          placeholder: 'Launch Interactive Lab',
          initialValue: 'Launch Interactive Lab',
        },
        {
          name: 'url',
          type: 'string',
          title: 'Button Link',
          placeholder: '/projects',
          initialValue: '/projects',
        },
      ],
    },
    {
      name: 'heroSecondaryCta',
      title: 'Secondary CTA Button',
      type: 'object',
      group: 'hero',
      description: '📍 Where it appears: Outline button on the right under the hero mission statement.',
      fields: [
        {
          name: 'label',
          type: 'string',
          title: 'Button Label',
          placeholder: 'Read Manuscripts & Math',
          initialValue: 'Read Manuscripts & Math',
        },
        {
          name: 'url',
          type: 'string',
          title: 'Button Link',
          placeholder: '/blog',
          initialValue: '/blog',
        },
      ],
    },

    // ── 02: Research Velocity Telemetry ──
    {
      name: 'velocityCard',
      title: 'Research Velocity / Telemetry Card',
      type: 'object',
      group: 'telemetry',
      description: '📍 Where it appears: Right-hand telemetry card beside the hero with live metric statistics.',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Card Title',
          placeholder: 'Research Velocity',
          initialValue: 'Research Velocity',
        },
        {
          name: 'tag',
          type: 'string',
          title: 'Period Tag (Top Right)',
          placeholder: '2024–2026',
          initialValue: '2024–2026',
        },
        {
          name: 'metrics',
          title: 'Metrics Highlights',
          type: 'array',
          description: 'Add metric pairs shown as large numbers with descriptions.',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', type: 'string', title: 'Metric Value (Large Number)', placeholder: '38' },
                { name: 'label', type: 'string', title: 'Metric Label', placeholder: 'Peer-Reviewed Papers' },
                { name: 'subtext', type: 'string', title: 'Subtext / Indicator', placeholder: '2024–2026' },
              ],
            },
          ],
          initialValue: [
            { _key: 'metric-1', label: 'Peer-Reviewed Papers', value: '38', subtext: '2024–2026' },
            { _key: 'metric-2', label: 'Executable Simulations', value: '14', subtext: '• Real-Time WebGL' },
            { _key: 'metric-3', label: 'Model Telemetry', value: '120k', subtext: 'Active Runs' },
          ],
        },
        {
          name: 'licenseText',
          type: 'string',
          title: 'License Text (Bottom Left)',
          placeholder: 'Curated under CC-BY-4.0 Computational Press',
          initialValue: 'Curated under CC-BY-4.0 Computational Press',
        },
        {
          name: 'versionText',
          type: 'string',
          title: 'Version Tag (Bottom Right)',
          placeholder: 'v2.4',
          initialValue: 'v2.4',
        },
      ],
    },

    // ── 03: Featured Paper & Simulation Sandbox ──
    {
      name: 'featuredPaperCard',
      title: 'Featured Paper & Simulation Box',
      type: 'object',
      group: 'featured',
      description: '📍 Where it appears: The large banner card below the hero highlighting the primary computational paper and WebGL simulation sandbox preview.',
      fields: [
        {
          name: 'badge',
          type: 'string',
          title: 'Featured Badge Pill',
          placeholder: 'Featured Computational Paper',
          initialValue: 'Featured Computational Paper',
        },
        {
          name: 'readTime',
          type: 'string',
          title: 'Reading Time Pill',
          placeholder: '18 min read',
          initialValue: '18 min read',
        },
        {
          name: 'accessTag',
          type: 'string',
          title: 'Access Pill',
          placeholder: 'Open Access',
          initialValue: 'Open Access',
        },
        {
          name: 'title',
          type: 'string',
          title: 'Paper Title',
          placeholder: 'Emergence of Spontaneous Coordination in Multi-Agent Neural Topologies',
          initialValue: 'Emergence of Spontaneous Coordination in Multi-Agent Neural Topologies',
        },
        {
          name: 'summary',
          type: 'text',
          rows: 3,
          title: 'Paper Summary',
          placeholder: 'We demonstrate how high-dimensional stochastic coupling between decentralized transformer-based agents yields phase transitions toward macro-scale consensus without external reward gradients. Read the mathematical derivation alongside live parameter perturbation.',
          initialValue:
            'We demonstrate how high-dimensional stochastic coupling between decentralized transformer-based agents yields phase transitions toward macro-scale consensus without external reward gradients. Read the mathematical derivation alongside live parameter perturbation.',
        },
        {
          name: 'tags',
          type: 'array',
          title: 'Topic Tags',
          of: [{ type: 'string' }],
          options: { layout: 'tags' },
          initialValue: ['#ReinforcementLearning', '#NeuroTopology', '#DynamicalSystems'],
        },
        {
          name: 'buttonLabel',
          type: 'string',
          title: 'Paper Button Label',
          placeholder: 'Read Manuscript & Math',
          initialValue: 'Read Manuscript & Math',
        },
        {
          name: 'buttonUrl',
          type: 'string',
          title: 'Paper Button Link',
          placeholder: '/blog',
          initialValue: '/blog',
        },
        {
          name: 'doi',
          type: 'string',
          title: 'Paper DOI Text',
          placeholder: 'DOI: 10.48550/SYNTHESE.2026.04229',
          initialValue: 'DOI: 10.48550/SYNTHESE.2026.04229',
        },
        // Sandbox Preview Widget Side
        {
          name: 'simulationTitle',
          type: 'string',
          title: 'Simulation Box Title',
          placeholder: 'Simulation Sandbox Preview',
          initialValue: 'Simulation Sandbox Preview',
        },
        {
          name: 'simulationSubtitle',
          type: 'string',
          title: 'Simulation Box Subtitle',
          placeholder: 'WebGL • Canvas 01',
          initialValue: 'WebGL • Canvas 01',
        },
        {
          name: 'simulationMetric1',
          type: 'string',
          title: 'Simulation Metric 1 (Left)',
          placeholder: 'AGENTS: 256',
          initialValue: 'AGENTS: 256',
        },
        {
          name: 'simulationMetric2',
          type: 'string',
          title: 'Simulation Metric 2 (Right)',
          placeholder: 'COUPLING: 0.72',
          initialValue: 'COUPLING: 0.72',
        },
        {
          name: 'simulationButtonText',
          type: 'string',
          title: 'Simulation Launch Button Text',
          placeholder: 'Launch Full Sandbox',
          initialValue: 'Launch Full Sandbox',
        },
        {
          name: 'simulationButtonUrl',
          type: 'string',
          title: 'Simulation Launch Button Link',
          placeholder: '/projects',
          initialValue: '/projects',
        },
      ],
    },

    // ── 04: Essays Section & Micro-Thoughts ──
    {
      name: 'essaysSectionHeading',
      title: 'Essays Section Heading',
      type: 'string',
      group: 'essays',
      description: '📍 Where it appears: Main heading above the recent working papers list.',
      placeholder: 'Recent Essays & Working Papers',
      initialValue: 'Recent Essays & Working Papers',
    },
    {
      name: 'fieldNotesTitle',
      title: 'Field Notes Widget Title',
      type: 'string',
      group: 'essays',
      placeholder: 'Micro-Thoughts & Field Notes',
      initialValue: 'Micro-Thoughts & Field Notes',
    },
    {
      name: 'fieldNotesBadge',
      title: 'Field Notes Widget Badge',
      type: 'string',
      group: 'essays',
      placeholder: 'Live RSS',
      initialValue: 'Live RSS',
    },
    {
      name: 'fieldNotesLinkText',
      title: 'Field Notes Bottom Link Text',
      type: 'string',
      group: 'essays',
      placeholder: 'Explore all 1,200+ garden notes ↗',
      initialValue: 'Explore all 1,200+ garden notes ↗',
    },
    {
      name: 'fieldNotesLinkUrl',
      title: 'Field Notes Bottom Link URL',
      type: 'string',
      group: 'essays',
      placeholder: '/garden',
      initialValue: '/garden',
    },
    {
      name: 'fieldNotes',
      title: 'Field Notes / Micro-Thoughts List',
      type: 'array',
      group: 'essays',
      description: 'Add quick research dispatches and field notes displayed on the homepage sidebar.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'date', type: 'string', title: 'Log Date / Tag', placeholder: '#Log:2026-03-14' },
            { name: 'timeAgo', type: 'string', title: 'Time Ago', placeholder: '2h ago' },
            { name: 'text', type: 'text', rows: 2, title: 'Note Text' },
          ],
        },
      ],
      initialValue: [
        {
          _key: 'note-1',
          date: '#Log:2026-03-14',
          timeAgo: '2h ago',
          text: 'If attention mechanisms in transformers can be isomorphic to spatial graph diffusion clustering, why do we still evaluate attention purely as linguistic weights rather than physical field interactions?',
        },
        {
          _key: 'note-2',
          date: '#Log:2026-03-11',
          timeAgo: '4d ago',
          text: 'Finished benchmarking puny layers on Monte Carlo model on DDIM parameter manifolds. Convergence speeds double when we penalize entropy extremes early in training.',
        },
      ],
    },

    // ── 05: Epistemic Stance ──
    {
      name: 'epistemicQuote',
      title: 'Epistemic Stance / Quote Card',
      type: 'object',
      group: 'editorial',
      description: '📍 Where it appears: Callout quote box on the right side of the homepage.',
      fields: [
        {
          name: 'badge',
          type: 'string',
          title: 'Badge Label',
          placeholder: 'Epistemic Stance',
          initialValue: 'Epistemic Stance',
        },
        {
          name: 'quoteText',
          type: 'text',
          rows: 3,
          title: 'Quote Text',
          placeholder: 'A model is not a passive mirror of empirical nature; it is an apparatus that forces our premises to collide with mathematical consequences.',
          initialValue:
            'A model is not a passive mirror of empirical nature; it is an apparatus that forces our premises to collide with mathematical consequences.',
        },
        {
          name: 'quoteAuthor',
          type: 'string',
          title: 'Author / Attribution',
          placeholder: '— Synthese Editorial Board Charter',
          initialValue: '— Synthese Editorial Board Charter',
        },
      ],
    },

    // ── 06: Gazette Newsletter ──
    {
      name: 'newsletter',
      title: 'Gazette Newsletter Section',
      type: 'object',
      group: 'newsletter',
      description: '📍 Where it appears: Dark subscription box near the bottom of the homepage.',
      fields: [
        { name: 'show', type: 'boolean', title: 'Show Newsletter Section', initialValue: true },
        {
          name: 'badge',
          type: 'string',
          title: 'Badge Text',
          placeholder: 'Institutional Dispatch & Preprint Alerts • ISSN 2769-188X • Bi-weekly Overviews',
          initialValue: 'Institutional Dispatch & Preprint Alerts • ISSN 2769-188X • Bi-weekly Overviews',
        },
        {
          name: 'title',
          type: 'string',
          title: 'Section Title',
          placeholder: 'Subscribe to the Synthese Scholarly Computation Gazette',
          initialValue: 'Subscribe to the Synthese Scholarly Computation Gazette',
        },
        {
          name: 'description',
          type: 'text',
          rows: 3,
          title: 'Description',
          placeholder: 'Receive newly verified mathematical models, long-form philosophical inquiries, and downloadable Jupyter & WebGL environments directly in your inbox every second Thursday. No marketing drivel; purely executable research.',
          initialValue:
            'Receive newly verified mathematical models, long-form philosophical inquiries, and downloadable Jupyter & WebGL environments directly in your inbox every second Thursday. No marketing drivel; purely executable research.',
        },
        {
          name: 'placeholder',
          type: 'string',
          title: 'Input Field Placeholder',
          placeholder: 'researcher@institute.edu or scholar@domain.org',
          initialValue: 'researcher@institute.edu or scholar@domain.org',
        },
        {
          name: 'buttonText',
          type: 'string',
          title: 'Subscribe Button Text',
          placeholder: 'Subscribe to Dispatch →',
          initialValue: 'Subscribe to Dispatch →',
        },
        {
          name: 'privacyPerks',
          type: 'array',
          title: 'Privacy Perks (Pills under input)',
          of: [{ type: 'string' }],
          initialValue: ['🔒 PGP Encrypted Alerts', 'No Ad Tracking Pixels', 'Instant Unsubscribe'],
        },
      ],
    },

    // ── 07: SEO ──
    {
      name: 'seo',
      title: 'Homepage SEO',
      type: 'seo',
      group: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'heroHeadline',
    },
    prepare({ title }) {
      return {
        title: 'Home Page Settings',
        subtitle: title || 'Configure homepage editorial content and toggles',
      }
    },
  },
})
