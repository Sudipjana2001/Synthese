import { defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Page: About & Curriculum Dossier',
  type: 'document',
  fields: [
    {
      name: 'kicker',
      title: 'Top Kicker',
      type: 'string',
      initialValue: 'CURRICULUM VITAE & SCHOLARLY DOSSIER // DEPT. OF COGNITIVE COMPUTATION',
    },
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Curriculum & Editorial Dossier',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'profileImage',
      title: 'Profile Portrait Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
    },
    {
      name: 'headline',
      title: 'Epistemic Thesis Headline',
      type: 'text',
      rows: 3,
      initialValue: 'Investigating the mathematical continuum between non-equilibrium statistical mechanics, morphogenetic substrates, and synthetic cognitive architectures.',
    },
    {
      name: 'abstract',
      title: 'Scholarly Abstract / Bio Narrative',
      type: 'text',
      rows: 4,
      initialValue:
        'Our laboratory focuses on the fundamental question: How do self-organizing physical substrates spontaneously compute, minimize informational entropy, and manifest cognitive invariants? By unifying Turing reaction-diffusion dynamics, Friston variational mechanics, and differential geometric latent representations, Synthese operates as both a formal theoretical press and an executable experimental sandbox.',
    },
    {
      name: 'bioStory',
      title: 'Full Extended Biography (Portable Text)',
      type: 'blockContent',
    },
    {
      name: 'orcid',
      title: 'ORCID Identifier',
      type: 'string',
      initialValue: '0000-0002-1825-0097',
    },
    {
      name: 'pgpKey',
      title: 'PGP Public Key',
      type: 'string',
      initialValue: '0x8F3C9A1E 4D27 B901',
    },
    {
      name: 'metrics',
      title: 'Bibliometric Highlights',
      type: 'object',
      fields: [
        { name: 'citations', type: 'string', title: 'Citations', initialValue: '1,480+' },
        { name: 'hIndex', type: 'string', title: 'h-Index', initialValue: '18' },
        { name: 'publications', type: 'string', title: 'Manuscripts', initialValue: '24' },
        { name: 'activeSimulations', type: 'string', title: 'Active Models', initialValue: '14' },
      ],
    },
    {
      name: 'epistemicPillars',
      title: 'Core Theoretical Pillars',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Pillar Title' },
            { name: 'discipline', type: 'string', title: 'Discipline / Field' },
            { name: 'summary', type: 'text', rows: 2, title: 'Summary' },
          ],
        },
      ],
      initialValue: [
        {
          title: 'Thermodynamic Morphogenesis',
          discipline: 'Nonlinear PDEs & Physical Substrates',
          summary: 'Continuous reaction-diffusion Turing substrates functioning as asynchronous, ultra-low-power logic networks that bypass von Neumann architectural constraints.',
        },
        {
          title: 'Geometric Deep Learning & Manifolds',
          discipline: 'Differential Geometry & Information Theory',
          summary: 'Analyzing neural representation spaces through persistent homology and hyperbolic embeddings to prevent semantic drift and characterize latent manifold curvature.',
        },
        {
          title: 'Variational Neurodynamics',
          discipline: 'Free Energy Principle & Bayesian Mechanics',
          summary: 'Formulating normative bounds on cortical active inference where Markov blankets delineate internal informational states from external thermodynamic surprise.',
        },
      ],
    },
    {
      name: 'skillsHeadline',
      title: 'Skills Section Title',
      type: 'string',
      initialValue: 'Core Competencies & Tooling',
    },
    {
      name: 'skills',
      title: 'Skills / Tech List',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'showTimeline',
      title: 'Show Experience / Career Timeline',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'timelineHeading',
      title: 'Timeline Section Heading',
      type: 'string',
      initialValue: 'Experience & Milestones',
    },
    {
      name: 'resumeUrl',
      title: 'External Resume / PDF CV URL (Optional)',
      type: 'string',
    },
    {
      name: 'seo',
      title: 'About Page SEO',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'headline',
      media: 'profileImage',
    },
  },
})
