import { createClient } from 'next-sanity'
import fs from 'fs'
import path from 'path'

const envFile = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf-8')
for (const line of envFile.split('\n')) {
  const [k, ...v] = line.trim().split('=')
  if (k && v.length) {
    process.env[k.trim()] = v.join('=').trim()
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hdomb3fq'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('Missing SANITY_API_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

async function main() {
  console.log('🔄 Starting complete sync and population of all Studio fields...')

  // ── 01: About Page Singleton ──
  console.log('Syncing aboutPage...')
  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    title: 'Curriculum & Editorial Dossier',
    kicker: 'CURRICULUM VITAE & SCHOLARLY DOSSIER // DEPT. OF COGNITIVE COMPUTATION',
    name: 'Sudip Jana, Ph.D.',
    role: 'Principal Investigator & Editor-in-Chief',
    affiliation: 'Synthese Computational Press & Laboratory',
    location: 'Berlin, DE & Cambridge, MA',
    email: 'investigator@synthese.press',
    githubUrl: 'https://github.com/Sudipjana2001/Synthese',
    orcid: '0000-0002-1825-0097',
    pgpKey: '0x8F3C9A1E 4D27 B901',
    cvDownloadLabel: 'Download Complete CV (.md / .pdf)',
    bibtexArchiveLabel: 'BibTeX Archive (.bib)',
    headline:
      'Investigating the mathematical continuum between non-equilibrium statistical mechanics, morphogenetic substrates, and synthetic cognitive architectures.',
    statementHeading: 'The Epistemic Thesis of Synthese',
    statementParagraph1:
      'Modern artificial intelligence is overwhelmingly framed through the lens of static Euclidean parameter optimization in deep feed-forward topologies. While empirically formidable, this paradigm often neglects the thermodynamic and continuous dynamical substrates that give rise to physical morphogenesis and biological cognition.',
    abstract:
      'Our laboratory focuses on the fundamental question: How do self-organizing physical substrates spontaneously compute, minimize informational entropy, and manifest cognitive invariants? By unifying Turing reaction-diffusion dynamics, Friston variational mechanics, and differential geometric latent representations, Synthese operates as both a formal theoretical press and an executable experimental sandbox.',
    statementParagraph3:
      'Through the Synthese Computational Press, all theoretical treatises are formally accompanied by browser-native, interactive numerical simulations. Reviewers and fellows can directly perturb physical parameters, test boundary conditions, and verify mathematical lemmas in real time.',
    metrics: {
      citations: '1,480+',
      hIndex: '18',
      publications: '24',
      activeSimulations: '14',
    },
    pillarsHeading: 'Core Theoretical Pillars',
    epistemicPillars: [
      {
        _key: 'pillar-1',
        title: 'Thermodynamic Morphogenesis',
        discipline: 'Nonlinear PDEs & Physical Substrates',
        summary:
          'Continuous reaction-diffusion Turing substrates functioning as asynchronous, ultra-low-power logic networks that bypass von Neumann architectural constraints.',
      },
      {
        _key: 'pillar-2',
        title: 'Geometric Deep Learning & Manifolds',
        discipline: 'Differential Geometry & Information Theory',
        summary:
          'Analyzing neural representation spaces through persistent homology and hyperbolic embeddings to prevent semantic drift and characterize latent manifold curvature.',
      },
      {
        _key: 'pillar-3',
        title: 'Variational Neurodynamics',
        discipline: 'Free Energy Principle & Bayesian Mechanics',
        summary:
          'Formulating normative bounds on cortical active inference where Markov blankets delineate internal informational states from external thermodynamic surprise.',
      },
    ],
    skillsHeadline: 'Core Competencies & Tooling',
    skills: [
      'Nonlinear Dynamics',
      'Turing Morphogenesis',
      'Differential Geometry',
      'Variational Inference',
      'WebGL & Shaders',
      'Persistent Homology',
      'Rust / WASM PDE Solvers',
      'Lean 4 Formal Proofs',
    ],
    showTimeline: true,
    timelineKicker: 'CHRONOLOGY OF RESEARCH',
    timelineHeading: 'Curriculum Temporale & Appointments',
    timelineSubtitle:
      'Academic milestones, fellowships, institutional directorships, and foundational research degrees.',
    resumeUrl: '',
    publicationsKicker: 'BIBLIOMETRIC RECORD',
    publicationsHeading: 'Selected Treatises & Preprints',
    publicationsSubtitle:
      'Peer-reviewed papers, computational monographs, and conference proceedings with verified DOIs.',
    publicationsButtonText: 'View Full Journal Archive →',
    publicationsButtonUrl: '/blog',
    publications: [
      {
        _key: 'pub-1',
        id: 'jana2026topological',
        title: 'Topological Entropy and Semantic Drift in Deep Generative Latents',
        venue: 'Synthese Press Monograph Series, Vol. 4, Art. 12',
        year: '2026',
        doi: '10.48550/SYNTHESE.2026.04229',
        type: 'Peer-Reviewed Journal',
        slug: 'topological-entropy-and-semantic-drift',
        authors: 'Sudip Jana',
        abstract:
          'By analyzing vector manifold deformations through persistent homology, we identify the exact thermodynamic inflection point where autoregressive language models depart from ground truth grounding into hallucinatory self-referential hypertoruses.',
      },
      {
        _key: 'pub-2',
        id: 'jana2026morphogenetic',
        title: 'Morphogenetic Computing: Reaction-Diffusion Substrates as Low-Power Logic Networks',
        venue: 'Physical Review Letters (Computation & Non-Equilibrium Systems)',
        year: '2026',
        doi: '10.1103/PhysRevLett.136.088001',
        type: 'Peer-Reviewed Journal',
        slug: 'morphogenetic-computing-reaction-diffusion',
        authors: 'Sudip Jana',
        abstract:
          'Turing reaction-diffusion patterns implemented in synthetic biological gels offer non-von-Neumann asynchronous pattern recognition with sub-picowatt energy consumption.',
      },
      {
        _key: 'pub-3',
        id: 'jana2026machineaffect',
        title: 'The Hard Problem of Machine Affect: Functionalism, Homeostasis, and Synthetic Interiority',
        venue: 'Philosophical Transactions of Cognitive Systems, Vol. 19',
        year: '2026',
        doi: '10.1098/rstb.2026.0018',
        type: 'Preprint Monograph',
        slug: 'hard-problem-of-machine-affect',
        authors: 'Sudip Jana',
        abstract:
          'We argue that sentiment in reinforcement learning cannot generate true experiential valence without metabolic somatic vulnerability. A formalization of synthetic allostasis.',
      },
      {
        _key: 'pub-4',
        id: 'jana2025hyperbolic',
        title: 'Curvature-Aware Latent Traversals on Hyperbolic Poincaré Manifolds',
        venue: 'International Conference on Geometric Deep Learning (ICGDL)',
        year: '2025',
        doi: '10.1145/3643834.3661529',
        type: 'Conference Proceedings',
        externalUrl: 'https://arxiv.org',
        authors: 'Sudip Jana',
        abstract:
          'Demonstrates that Riemannian gradient flow on hyperbolic Poincaré balls yields exponential capacity expansion for taxonomic tree representations compared to standard Euclidean embeddings.',
      },
      {
        _key: 'pub-5',
        id: 'jana2023variational',
        title: 'Variational Bounds on Sensory Entropy Minimization Across Cortical Layers',
        venue: 'Journal of Mathematical Neuroscience, 14(3), 112–138',
        year: '2023',
        doi: '10.1186/s13408-023-00142-9',
        type: 'Peer-Reviewed Journal',
        externalUrl: 'https://doi.org',
        authors: 'Sudip Jana',
        abstract:
          'Exact thermodynamic derivation establishing that canonical cortical microcircuits minimize a localized variational free energy bound via coupled dendritic predictive coding.',
      },
    ],
    instrumentariumKicker: 'LABORATORY INFRASTRUCTURE',
    instrumentariumHeading: 'Computational Substrates & Tooling',
    instrumentariumSubtitle:
      'Specialized hardware nodes, formal verification engines, and numerical runtime kernels supporting Synthese press publications.',
    instrumentarium: [
      {
        _key: 'inst-1',
        category: 'Computational Clusters & Silicon',
        name: 'High-Density Tensor Nodes',
        description:
          'Dedicated GPU acceleration cluster for parallelized PDE solving and high-dimensional persistent homology.',
        specs: [
          '2× NVIDIA H100 SXM5 80GB',
          'AMD EPYC 9654 (96 Cores, 192 Threads)',
          '1.5TB DDR5 ECC RAM',
          '4× 7.68TB NVMe PCIe 5.0',
        ],
      },
      {
        _key: 'inst-2',
        category: 'Mathematical Proof & Verification',
        name: 'Interactive Theorem Proving',
        description:
          'Formal verification environment for mathematical lemmas, category-theoretic functors, and topological invariant proofs.',
        specs: ['Lean 4 Formal Mathlib', 'Coq Proof Assistant', 'Wolfram Mathematica 14', 'Z3 SMT Solver'],
      },
      {
        _key: 'inst-3',
        category: 'Simulation Engines & Substrates',
        name: 'Numerical Physics Runtimes',
        description:
          'Custom WebGL 2.0 and WebAssembly simulation kernels compiled for real-time in-browser scientific exploration.',
        specs: [
          'JAX / Equinox Autodiff',
          'WebGL 2.0 Compute Shaders',
          'D3.js Force Simulation Engine',
          'Rust / WASM PDE Solvers',
        ],
      },
    ],
    contactCards: [
      {
        _key: 'contact-1',
        heading: 'Academic Inquiries',
        value: 'investigator@synthese.press',
        subtext: 'Encrypted PGP submissions encouraged',
      },
      {
        _key: 'contact-2',
        heading: 'Laboratory Location',
        value: 'Synthese Computational Press Labs',
        subtext: 'Room 402, Inst. for Non-Equilibrium Systems',
      },
      {
        _key: 'contact-3',
        heading: 'Fellowships & Sabbaticals',
        value: 'Visiting Scholar Program',
        subtext: 'Applications open annually for Autumn semester',
      },
    ],
  })

  // ── 02: Home Page Singleton ──
  console.log('Syncing homePage...')
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    kicker: "Editor's Foreword",
    authorSubtitle: 'Principal Investigator',
    heroHeadline:
      'Exploring the intersection of artificial cognition, complex adaptive systems, and interactive computation.',
    heroSubheadline:
      'Synthese is an open computational press and experimental laboratory. We construct executable models, distill long-form philosophical treatises, and publish rigorous mathematical syntheses that transcend traditional static print.',
    heroPrimaryCta: {
      label: 'Launch Interactive Lab',
      url: '/projects',
    },
    heroSecondaryCta: {
      label: 'Read Manuscripts & Math',
      url: '/blog',
    },
    velocityCard: {
      title: 'Research Velocity',
      tag: '2024–2026',
      metrics: [
        { _key: 'm-1', label: 'Peer-Reviewed Papers', value: '38', subtext: '2024–2026' },
        { _key: 'm-2', label: 'Executable Simulations', value: '14', subtext: '• Real-Time WebGL' },
        { _key: 'm-3', label: 'Model Telemetry', value: '120k', subtext: 'Active Runs' },
      ],
      licenseText: 'Curated under CC-BY-4.0 Computational Press',
      versionText: 'v2.4',
    },
    featuredPaperCard: {
      badge: 'Featured Computational Paper',
      readTime: '18 min read',
      accessTag: 'Open Access',
      title: 'Emergence of Spontaneous Coordination in Multi-Agent Neural Topologies',
      summary:
        'We demonstrate how high-dimensional stochastic coupling between decentralized transformer-based agents yields phase transitions toward macro-scale consensus without external reward gradients. Read the mathematical derivation alongside live parameter perturbation.',
      tags: ['#ReinforcementLearning', '#NeuroTopology', '#DynamicalSystems'],
      buttonLabel: 'Read Manuscript & Math',
      buttonUrl: '/blog',
      doi: 'DOI: 10.48550/SYNTHESE.2026.04229',
      simulationTitle: 'Simulation Sandbox Preview',
      simulationSubtitle: 'WebGL • Canvas 01',
      simulationMetric1: 'AGENTS: 256',
      simulationMetric2: 'COUPLING: 0.72',
      simulationButtonText: 'Launch Full Sandbox',
      simulationButtonUrl: '/projects',
    },
    essaysSectionHeading: 'Recent Essays & Working Papers',
    fieldNotesTitle: 'Micro-Thoughts & Field Notes',
    fieldNotesBadge: 'Live RSS',
    fieldNotesLinkText: 'Explore all 1,200+ garden notes ↗',
    fieldNotesLinkUrl: '/garden',
    fieldNotes: [
      {
        _key: 'fn-1',
        date: '#Log:2026-03-14',
        timeAgo: '2h ago',
        text: 'If attention mechanisms in transformers can be isomorphic to spatial graph diffusion clustering, why do we still evaluate attention purely as linguistic weights rather than physical field interactions?',
      },
      {
        _key: 'fn-2',
        date: '#Log:2026-03-11',
        timeAgo: '4d ago',
        text: 'Finished benchmarking puny layers on Monte Carlo model on DDIM parameter manifolds. Convergence speeds double when we penalize entropy extremes early in training.',
      },
    ],
    epistemicQuote: {
      badge: 'Epistemic Stance',
      quoteText:
        'A model is not a passive mirror of empirical nature; it is an apparatus that forces our premises to collide with mathematical consequences.',
      quoteAuthor: '— Synthese Editorial Board Charter',
    },
    newsletter: {
      show: true,
      badge: 'Institutional Dispatch & Preprint Alerts • ISSN 2769-188X • Bi-weekly Overviews',
      title: 'Subscribe to the Synthese Scholarly Computation Gazette',
      description:
        'Receive newly verified mathematical models, long-form philosophical inquiries, and downloadable Jupyter & WebGL environments directly in your inbox every second Thursday. No marketing drivel; purely executable research.',
      placeholder: 'researcher@institute.edu or scholar@domain.org',
      buttonText: 'Subscribe to Dispatch →',
      privacyPerks: ['🔒 PGP Encrypted Alerts', 'No Ad Tracking Pixels', 'Instant Unsubscribe'],
    },
  })

  // ── 03: Projects Page Singleton ──
  console.log('Syncing projectsPage...')
  await client.createOrReplace({
    _id: 'projectsPage',
    _type: 'projectsPage',
    statusKicker: 'Comp-Lab Suite v2.4',
    issnTag: 'ISSN 2769-188X',
    webglBadge: 'WebGL 2.0 Active',
    title: 'The Computational Lab: Interactive Models & Live Explainables',
    description:
      'An open repository of mathematically rigorous, dynamic algorithmic simulations. Built to accompany long-form analytical monographs, allowing researchers to evaluate parametric phase spaces in real time.',
    primaryButton: {
      label: 'Submit Algorithm',
      url: 'https://github.com/Sudipjana2001/Synthese',
    },
    secondaryButton: {
      label: 'Jupyter Kernel (Pyodide)',
      url: 'https://pyodide.org/',
    },
    showFilter: true,
    arsenalKicker: 'Active Algorithmic Arsenal',
    arsenalHeading: 'Specialized Computation Enclosures',
    arsenalDesc: 'Drag parameters, test assumptions, and fork computational code sandbox states.',
    ctaBox: {
      show: true,
      title: 'Embed Live Models in Academic Manuscripts',
      description:
        'Every widget in Synthese Lab compiles to a standalone, zero-dependency Web Component. Include fully interactive mathematical figures in your Substack, Quarto document, or HTML publication.',
      snippetText: '<synthese-model type="gray-scott" f="0.054" k="0.062" />',
      buttonText: 'Explore Manuscripts',
      buttonUrl: '/blog',
    },
  })

  // ── 04: Digital Garden Page Singleton ──
  console.log('Syncing gardenPage...')
  await client.createOrReplace({
    _id: 'gardenPage',
    _type: 'gardenPage',
    mastheadKicker: 'REPOSITORY INDEX // V4.19',
    title: 'The Digital Garden & Zettelkasten Archive',
    description:
      'A networked repository of evolving notes, speculative hypotheses, formal lemmas, and verified citations.',
    bibtexBtnText: 'BibTeX Export',
    vaultBtnText: 'Download Vault (.md)',
    showInteractiveGraph: true,
    epistemicWarning:
      'Notes in this garden represent live working hypotheses across varying stages of formal maturity.',
    explorerLabel: 'CATALOGUS FOLIIS',
    searchPlaceholder: 'Search title, lemma, or tag...',
    scratchpadKicker: 'EPISTEMIC SCRATCHPAD',
    scratchpadSubtitle:
      'Unfiltered analytical dispatches, preliminary proofs, and marginal commentary recorded in the field.',
    scratchpadBtnText: 'View all 74 scratchpad slips →',
    memos: [
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
  })

  // ── 05: Blog Page Singleton ──
  console.log('Syncing blogPage...')
  await client.createOrReplace({
    _id: 'blogPage',
    _type: 'blogPage',
    kicker: 'Public Archive • Section 02',
    title: 'Essays & Working Papers',
    description:
      'Long-form peer-reviewed computational treatises, architectural proofs, and theoretical essays exploring biological computation and synthetic cognition.',
    featuredBadge: 'Featured Treatise & Mathematical Model',
    readManuscriptLabel: 'Read Full Manuscript',
    featuredSectionTitle: 'Featured Treatise',
    allPostsTitle: 'All Publications & Manuscripts',
    showSearchBar: true,
    searchPlaceholder: 'Search by title, topic, or keyword...',
    showCategoryFilter: true,
    postsPerPage: 10,
  })

  // ── 06: Site Settings Singleton ──
  console.log('Syncing siteSettings...')
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'Synthese',
    siteDescription:
      'An Open Scholarly Computational Press & Personal Research Laboratory exploring artificial cognition, complex adaptive systems, and interactive computation.',
    authorName: 'Sudip Jana',
    authorRole: 'Principal Investigator',
    ticker: {
      showTicker: true,
      issueText: 'Issue No. 10 • Vol. IV • Computational Epistemology',
      doi: 'DOI: 10.48550/SYNTHESE.2026.04',
      statusText: 'Sanity CMS Connected',
      rightBadge: 'Open Access CC-BY-4.0',
    },
    footerBio: 'An Open Scholarly Computational Press',
    footerCopyright: '© 2026 Synthese Lab. ISSN 2769-188X. Open Access CC-BY-4.0.',
  })

  console.log('✅ ALL SINGLETONS SUCCESSFULLY SYNCED AND PRE-FILLED IN SANITY!')
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
