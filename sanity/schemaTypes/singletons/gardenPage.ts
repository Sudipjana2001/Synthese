import { defineType } from 'sanity'

export const gardenPage = defineType({
  name: 'gardenPage',
  title: 'Page: Digital Garden',
  type: 'document',
  groups: [
    { name: 'masthead', title: '🌱 Masthead & Vault', default: true },
    { name: 'graph', title: '🕸️ Synaptic Graph' },
    { name: 'explorer', title: '🔍 Catalog Explorer' },
    { name: 'scratchpad', title: '📝 Epistemic Scratchpad' },
    { name: 'seo', title: '🔍 SEO & Meta' },
  ],
  fields: [
    // ── 01: Masthead & Vault ──
    {
      name: 'mastheadKicker',
      title: 'Masthead Kicker Tag',
      type: 'string',
      group: 'masthead',
      placeholder: 'REPOSITORY INDEX // V4.19',
      initialValue: 'REPOSITORY INDEX // V4.19',
    },
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'masthead',
      description: '📍 Where it appears: Main heading on /garden.',
      placeholder: 'The Digital Garden & Zettelkasten Archive',
      initialValue: 'The Digital Garden & Zettelkasten Archive',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Page Description / Subtitle',
      type: 'text',
      rows: 3,
      group: 'masthead',
      description: '📍 Where it appears: Subtitle on /garden.',
      placeholder: 'A networked repository of evolving notes, speculative hypotheses, formal lemmas, and verified citations.',
      initialValue:
        'A networked repository of evolving notes, speculative hypotheses, formal lemmas, and verified citations.',
    },
    {
      name: 'bibtexBtnText',
      title: 'BibTeX Export Button Label',
      type: 'string',
      group: 'masthead',
      placeholder: 'BibTeX Export',
      initialValue: 'BibTeX Export',
    },
    {
      name: 'vaultBtnText',
      title: 'Vault Download Button Label',
      type: 'string',
      group: 'masthead',
      placeholder: 'Download Vault (.md)',
      initialValue: 'Download Vault (.md)',
    },

    // ── 02: Synaptic Graph ──
    {
      name: 'showInteractiveGraph',
      title: 'Show Interactive 2D Synaptic Graph',
      type: 'boolean',
      group: 'graph',
      description: 'Toggle on to display the interactive physics-directed graph canvas.',
      initialValue: true,
    },
    {
      name: 'epistemicWarning',
      title: 'Epistemic Warning Banner',
      type: 'string',
      group: 'graph',
      description: '📍 Where it appears: Optional note banner explaining active research status.',
      placeholder: 'Notes in this garden represent live working hypotheses across varying stages of formal maturity.',
      initialValue: 'Notes in this garden represent live working hypotheses across varying stages of formal maturity.',
    },

    // ── 03: Catalog Explorer ──
    {
      name: 'explorerLabel',
      title: 'Explorer Section Tag',
      type: 'string',
      group: 'explorer',
      placeholder: 'CATALOGUS FOLIIS',
      initialValue: 'CATALOGUS FOLIIS',
    },
    {
      name: 'searchPlaceholder',
      title: 'Search Bar Placeholder',
      type: 'string',
      group: 'explorer',
      placeholder: 'Search title, lemma, or tag...',
      initialValue: 'Search title, lemma, or tag...',
    },

    // ── 04: Epistemic Scratchpad ──
    {
      name: 'scratchpadKicker',
      title: 'Scratchpad Section Kicker',
      type: 'string',
      group: 'scratchpad',
      placeholder: 'EPISTEMIC SCRATCHPAD',
      initialValue: 'EPISTEMIC SCRATCHPAD',
    },
    {
      name: 'scratchpadSubtitle',
      title: 'Scratchpad Section Subtitle',
      type: 'string',
      group: 'scratchpad',
      placeholder: 'Unfiltered analytical dispatches, preliminary proofs, and marginal commentary recorded in the field.',
      initialValue:
        'Unfiltered analytical dispatches, preliminary proofs, and marginal commentary recorded in the field.',
    },
    {
      name: 'scratchpadBtnText',
      title: 'Scratchpad Button Text',
      type: 'string',
      group: 'scratchpad',
      placeholder: 'View all 74 scratchpad slips →',
      initialValue: 'View all 74 scratchpad slips →',
    },
    {
      name: 'memos',
      title: 'Scratchpad Memos & Field Slips',
      type: 'array',
      group: 'scratchpad',
      description: '📍 Where it appears: Quick index slips displayed under the Epistemic Scratchpad on /garden.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'Memo ID (e.g. memo-2026-06-02)' },
            { name: 'timestamp', type: 'string', title: 'Timestamp Header (e.g. MEMO-2026.06.02 // 14:22 UTC)' },
            { name: 'title', type: 'string', title: 'Memo Title' },
            { name: 'body', type: 'text', rows: 4, title: 'Memo Body / Content' },
            { name: 'tags', type: 'array', title: 'Tags', of: [{ type: 'string' }] },
            { name: 'linkedNoteIds', type: 'array', title: 'Linked Card IDs', of: [{ type: 'string' }] },
          ],
        },
      ],
      initialValue: [
        {
          _key: 'memo-1',
          id: 'memo-2026-06-02',
          timestamp: 'MEMO-2026.06.02 // 14:22 UTC',
          title: 'MH Hypothesis on Markov Blanket Orthogonality',
          body: 'Let dissipated density φ phase manifold partition into internal states. Should one universal schema that satisfy conditional independence…\n\nP(s, a | s, a) = P(s | s, a) P(a | s, a)\n\nNote the recursive (CLTm, LS19) self-confirming grid decoupling under autonomous, corporal stochastic flow.',
          tags: ['#MarkovBlankets', '#FreeEnergyBoundaries'],
          linkedNoteIds: ['fep-04', 'cog-112'],
        },
        {
          _key: 'memo-2',
          id: 'memo-2026-05-29',
          timestamp: 'MEMO-2026.05.29 // 01:10 UTC',
          title: 'MH Derivatives Draft on Poincaré Embedding Layer',
          body: 'Boundary resolution limit needed at d(u,v) > 1  →  repulsion…\n\nCurvature rescaling must be tied to model depth. The embedding layer should maintain hyperbolic distance proportional to hierarchical depth.',
          tags: ['#PoincaréBall', '#HyperbolicEmbedding'],
          linkedNoteIds: ['geom-084', 'geom-102'],
        },
        {
          _key: 'memo-3',
          id: 'memo-2026-05-15',
          timestamp: 'MEMO-2026.05.15 // 09:33 UTC',
          title: 'Soliton-Morphogen Duality Conjecture',
          body: 'Could the KdV soliton waveform solutions be reinterpreted as morphogen concentration waves in a 1D reaction-diffusion system? If the dispersive term balances nonlinearity in both cases, there may be a formal duality between topological conservation (solitons) and pattern formation (Turing). Cross-reference CMP-091 ↔ CMP-063.',
          tags: ['#Solitons', '#Morphogenesis', '#CrossCluster'],
          linkedNoteIds: ['cmp-091', 'cmp-063'],
        },
        {
          _key: 'memo-4',
          id: 'memo-2026-04-28',
          timestamp: 'MEMO-2026.04.28 // 16:45 UTC',
          title: 'Reading Notes: Friston & Sengupta (2024)',
          body: 'Key insight from Section 4.2: the expected free energy functional can be decomposed into epistemic value (information gain) and pragmatic value (reward). This decomposition provides a normative account of curiosity-driven exploration in biological agents. Need to formalize connection to COG-147 active inference framework.',
          tags: ['#LiteratureReview', '#FristonSengupta', '#ActiveInference'],
          linkedNoteIds: ['fep-04', 'cog-147'],
        },
        {
          _key: 'memo-5',
          id: 'memo-2026-04-10',
          timestamp: 'MEMO-2026.04.10 // 22:07 UTC',
          title: 'Attention Drift & Fluid Analogy Sketch',
          body: 'Reynolds number analogy: at low Re (simple sequences), attention flow is laminar — single-head dominance, smooth token routing. At high Re (complex long-range dependencies), turbulent regime: multi-head interference patterns, vortex-like attention sinks. Can we define a critical Reynolds number for transformer architectures? See HYP-018.',
          tags: ['#AttentionFluid', '#ReynoldsNumber', '#Speculative'],
          linkedNoteIds: ['hyp-018'],
        },
      ],
    },

    // ── 05: SEO ──
    {
      name: 'seo',
      title: 'Garden Page SEO',
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
        title: 'Digital Garden Page Settings',
        subtitle: title || 'Configure digital garden page',
      }
    },
  },
})
