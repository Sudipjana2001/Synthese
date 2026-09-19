import {
  GardenNote,
  GraphLink,
  MemoSlip,
  TopologicalCluster,
} from '../types/garden'

// ============================================
// TOPOLOGICAL CLUSTERS
// ============================================

export const CLUSTERS: TopologicalCluster[] = [
  {
    id: 'cluster-01',
    label: 'CLUSTER 01 // VARIATIONAL INFERENCE',
    color: 'rgba(13, 148, 136, 0.08)',
    memberIds: ['fep-04', 'cog-112', 'cog-147', 'inf-039'],
    collapsed: false,
  },
  {
    id: 'cluster-02',
    label: 'CLUSTER 02 // NONLINEAR TOPOLOGIES',
    color: 'rgba(59, 130, 246, 0.08)',
    memberIds: ['geom-084', 'geom-102', 'cmp-091', 'cat-015'],
    collapsed: false,
  },
  {
    id: 'cluster-03',
    label: 'CLUSTER 03 // DYNAMICAL SYSTEMS',
    color: 'rgba(168, 85, 247, 0.08)',
    memberIds: ['cmp-063', 'cmp-078', 'hyp-022'],
    collapsed: false,
  },
  {
    id: 'cluster-04',
    label: 'CLUSTER 04 // SPECULATIVE FRONTIERS',
    color: 'rgba(245, 158, 11, 0.08)',
    memberIds: ['hyp-018', 'hyp-031', 'hyp-044', 'inf-055'],
    collapsed: false,
  },
]

// ============================================
// GARDEN NOTES (15 SCHOLARLY NOTES)
// ============================================

export const SAMPLE_GARDEN_NOTES: GardenNote[] = [
  // ── Cluster 01: Variational Inference & Free Energy ──
  {
    id: 'fep-04',
    slug: 'free-energy-principle',
    title: 'Free Energy Principle',
    stage: 'evergreen',
    discipline: 'Cognitive Science',
    summary:
      'A normative framework proposing that any self-organizing system minimizes its informational variational bound on surprising sensory entropy through probabilistic inference.',
    tags: ['Variational', 'Free Energy', 'Internal States'],
    backlinksCount: 8,
    updatedAt: '3 days ago',
    cluster: 'cluster-01',
    citationKey: 'jana2026fep',
    formalLemma: {
      label: 'FORMAL LEMMA A.2 // BOUND DEFINITION',
      formula: 'F(s, μ) = D_KL[q(θ|μ) ∥ p(θ)] − E_q[ln p(s|θ)] ≥ −ln p(s)',
      explanation:
        'Minimization of F guarantees Bayesian surprise reduction for non-equilibrium steady-state distributions.',
    },
    backlinks: [
      {
        id: 'cog-147',
        title: 'Active Inference in Sensory Ensembles',
        excerpt: 'Extending variational free energy bounds to cortical Markov...',
      },
      {
        id: 'inf-039',
        title: 'Thermodynamic Bounds in Cortical Columns',
        excerpt: 'Free energy dissipation rates mapped directly to...',
      },
      {
        id: 'cog-112',
        title: 'Markov Blankets and Bayesian Mechanics',
        excerpt: 'The statistical boundary condition entails variational...',
      },
    ],
  },
  {
    id: 'cog-112',
    slug: 'markov-blankets-bayesian-mechanics',
    title: 'Markov Blankets and Bayesian Mechanics',
    stage: 'evergreen',
    discipline: 'Cognitive Science',
    summary:
      'Formalizing the statistical boundary condition separating internal system states from external ambient fluctuations. An active inference agent...',
    tags: ['Variational Free Energy', 'Internal States'],
    backlinksCount: 5,
    updatedAt: 'Apr 23, 2026',
    cluster: 'cluster-01',
    citationKey: 'jana2026markov',
    formalLemma: {
      label: 'DEFINITION 3.1 // MARKOV BOUNDARY',
      formula: 'π(b) ⊥ π(η) | π(s, a)  where  b = s ∪ a',
      explanation:
        'The blanket states b screen off internal states from external states η, establishing conditional independence.',
    },
    backlinks: [
      {
        id: 'fep-04',
        title: 'Free Energy Principle',
        excerpt: 'The blanket partition underpins the variational bound...',
      },
    ],
  },
  {
    id: 'cog-147',
    slug: 'active-inference-sensory-ensembles',
    title: 'Active Inference in Sensory Ensembles',
    stage: 'evergreen',
    discipline: 'Computational Neuroscience',
    summary:
      'Extending variational free energy bounds to cortical hierarchies. We examine how Turing instabilities arise in neural field equations under active inference.',
    tags: ['Active Inference', 'Sensory Ensembles'],
    backlinksCount: 3,
    updatedAt: 'Apr 01, 2026',
    cluster: 'cluster-01',
    backlinks: [
      {
        id: 'fep-04',
        title: 'Free Energy Principle',
        excerpt: 'Active inference extends the FEP to action-perception loops...',
      },
    ],
  },
  {
    id: 'inf-039',
    slug: 'thermodynamic-bounds-cortical-columns',
    title: 'Thermodynamic Bounds in Cortical Columns',
    stage: 'budding',
    discipline: 'Information Geometry',
    summary:
      'Free energy dissipation rates mapped directly to cortical laminar architecture. Preliminary bounds connect thermodynamic entropy production to neural firing statistics.',
    tags: ['Thermodynamics', 'Cortical Columns', 'Entropy'],
    backlinksCount: 2,
    updatedAt: '2 weeks ago',
    cluster: 'cluster-01',
    formalLemma: {
      label: 'PROPOSITION 2.4 // DISSIPATION RATE',
      formula: 'σ̇ = ∫ J(x) · ∇μ(x) dx ≥ 0',
      explanation:
        'Non-negative entropy production rate for cortical micro-columns under non-equilibrium thermodynamic constraints.',
    },
  },

  // ── Cluster 02: Nonlinear Topologies & Geometric Structures ──
  {
    id: 'geom-084',
    slug: 'hyperbolic-embeddings-hierarchical-taxonomies',
    title: 'Hyperbolic Embeddings for Deep Hierarchical Taxonomies',
    stage: 'evergreen',
    discipline: 'Differential Geometry',
    summary:
      'Recursive multi-tree topological structures in exponential volume-growth spaces with radius, Euclidean embeddings introduce severe distortion. Morphological...',
    tags: ['Poincaré Ball', 'K=-1'],
    backlinksCount: 6,
    updatedAt: 'Nov 15, 2025',
    cluster: 'cluster-02',
    citationKey: 'jana2025hyperbolic',
    formalLemma: {
      label: 'THEOREM 1.1 // DISTORTION BOUND',
      formula: 'd_H(u, v) = arcosh(1 + 2‖u−v‖² / ((1−‖u‖²)(1−‖v‖²)))',
      explanation:
        'Hyperbolic distance in the Poincaré ball model. Tree-like hierarchies embed with O(1) distortion in ℍⁿ versus Ω(log n) in ℝⁿ.',
    },
    backlinks: [
      {
        id: 'geom-102',
        title: 'Riemannian Gradient Flows on Statistical Manifolds',
        excerpt: 'Gradient flows on the Poincaré disk generalize to...',
      },
    ],
  },
  {
    id: 'geom-102',
    slug: 'riemannian-gradient-flows-statistical-manifolds',
    title: 'Riemannian Gradient Flows on Statistical Manifolds',
    stage: 'budding',
    discipline: 'Differential Geometry',
    summary:
      'Gradient flows on the Poincaré disk generalize to Fisher-Rao manifolds. The natural gradient emerges as the steepest descent direction with respect to the Fisher information metric.',
    tags: ['Fisher-Rao', 'Natural Gradient', 'Manifolds'],
    backlinksCount: 4,
    updatedAt: 'Mar 19, 2026',
    cluster: 'cluster-02',
    backlinks: [
      {
        id: 'geom-084',
        title: 'Hyperbolic Embeddings for Deep Hierarchical Taxonomies',
        excerpt: 'The Poincaré ball isometric embedding connects to...',
      },
      {
        id: 'inf-055',
        title: 'Fisher Information Geometry of Diffusion Models',
        excerpt: 'Score functions parameterize tangent vectors on the...',
      },
    ],
  },
  {
    id: 'cmp-091',
    slug: 'soliton-waves-topological-conservation',
    title: 'Soliton Waves and Topological Conservation Laws',
    stage: 'budding',
    discipline: 'Complex Systems',
    summary:
      'Sub-continual solitary wave packets governed by Korteweg-de Vries formulations maintain velocity and geometric envelopes post-collision. Investigating...',
    tags: ['Nonlinear Dispersion', 'KdV Invariance'],
    backlinksCount: 2,
    updatedAt: 'Nov 06, 2025',
    cluster: 'cluster-02',
  },
  {
    id: 'cat-015',
    slug: 'functorial-semantics-neural-architectures',
    title: 'Functorial Semantics of Neural Network Architectures',
    stage: 'budding',
    discipline: 'Category Theory',
    summary:
      'A categorical framework mapping neural network layers as functors between enriched categories. Composition of learned transformations respects naturality conditions up to homotopy.',
    tags: ['Functors', 'Enriched Categories', 'Naturality'],
    backlinksCount: 3,
    updatedAt: 'Feb 14, 2026',
    cluster: 'cluster-02',
    formalLemma: {
      label: 'DEFINITION 4.1 // FUNCTORIAL LAYER',
      formula: 'F: C → D  s.t.  F(f ∘ g) = F(f) ∘ F(g)  and  F(id_A) = id_{F(A)}',
      explanation:
        'Each neural layer is a functor preserving compositional structure between representation categories.',
    },
  },

  // ── Cluster 03: Dynamical Systems & Morphogenesis ──
  {
    id: 'cmp-063',
    slug: 'reaction-diffusion-pdes-morphogenesis',
    title: 'Reaction-Diffusion PDEs as Morphogenetic Computations',
    stage: 'budding',
    discipline: 'Complex Systems',
    summary:
      'Nonlinear two-component partial differential reaction-diffusion systems (Turing pattern) produce stable stationary patterns. We examine Turing instabilities in...',
    tags: ['Laplacian Diff', 'Morphogens'],
    backlinksCount: 4,
    updatedAt: '18 hours ago',
    cluster: 'cluster-03',
  },
  {
    id: 'cmp-078',
    slug: 'cellular-automata-discrete-dynamical-systems',
    title: 'Cellular Automata as Discrete Dynamical Systems',
    stage: 'evergreen',
    discipline: 'Complex Systems',
    summary:
      'Formalizing the dynamical systems view of cellular automata: Phase portraits, Lyapunov exponents for discrete lattices, and connections to symbolic dynamics and shift spaces.',
    tags: ['Automata', 'Lyapunov', 'Symbolic Dynamics'],
    backlinksCount: 3,
    updatedAt: 'Jan 22, 2026',
    cluster: 'cluster-03',
    citationKey: 'jana2026automata',
  },
  {
    id: 'hyp-022',
    slug: 'symplectic-gradients-hamiltonian-neural-networks',
    title: 'Symplectic Gradients for Hamiltonian Neural Networks',
    stage: 'sprout',
    discipline: 'Complex Systems',
    summary:
      'Preliminary construction of symplectic 2-forms during backward automatic differentiation passes. Preliminary benchmarks show vanishing phase-space drift...',
    tags: ['Symplectic Form', 'Phase Space'],
    backlinksCount: 1,
    updatedAt: 'Jun 01, 2026',
    cluster: 'cluster-03',
  },

  // ── Cluster 04: Speculative Frontiers ──
  {
    id: 'hyp-018',
    slug: 'transformer-attention-non-equilibrium-fluid',
    title: 'Transformer Attention as Non-Equilibrium Fluid Flows',
    stage: 'sprout',
    discipline: 'Information Geometry',
    summary:
      'Speculative mapping: can scaled-dot-product attention heads be described as Navier-Stokes momentum transport over an irregular discrete lattice...',
    tags: ['Speculative', 'Attention Drift'],
    backlinksCount: 1,
    updatedAt: '10 hours ago',
    cluster: 'cluster-04',
  },
  {
    id: 'hyp-031',
    slug: 'quantum-decoherence-attention-collapse',
    title: 'Quantum Decoherence Models for Attention Collapse',
    stage: 'sprout',
    discipline: 'Computational Neuroscience',
    summary:
      'Mapping the density matrix formalism of quantum decoherence onto attention weight distributions. When contextual superposition collapses to a single attended token...',
    tags: ['Decoherence', 'Density Matrix', 'Attention'],
    backlinksCount: 1,
    updatedAt: 'May 30, 2026',
    cluster: 'cluster-04',
  },
  {
    id: 'hyp-044',
    slug: 'topos-theoretic-generalization-bounds',
    title: 'Topos-Theoretic Foundations of Generalization Bounds',
    stage: 'sprout',
    discipline: 'Category Theory',
    summary:
      'Can Grothendieck topoi provide a natural language for expressing uniform convergence? Initial explorations connecting sheaf-theoretic covering numbers to PAC-Bayes bounds.',
    tags: ['Topoi', 'PAC-Bayes', 'Sheaves'],
    backlinksCount: 0,
    updatedAt: 'Jun 05, 2026',
    cluster: 'cluster-04',
  },
  {
    id: 'inf-055',
    slug: 'fisher-information-geometry-diffusion-models',
    title: 'Fisher Information Geometry of Diffusion Models',
    stage: 'budding',
    discipline: 'Information Geometry',
    summary:
      'Score functions in denoising diffusion parameterize tangent vectors on the statistical manifold. The score-matching loss is dual to the Fisher-Rao geodesic distance.',
    tags: ['Score Matching', 'Fisher-Rao', 'Diffusion'],
    backlinksCount: 3,
    updatedAt: 'Apr 18, 2026',
    cluster: 'cluster-04',
    formalLemma: {
      label: 'LEMMA 3.2 // SCORE-FISHER DUALITY',
      formula: 'J(θ) = E_p[‖∇_x log p(x|θ) − s_θ(x)‖²] = tr(I(θ)) + const',
      explanation:
        'The score matching objective is equivalent to trace of the Fisher information matrix up to an additive constant independent of θ.',
    },
  },
]

// ============================================
// GRAPH LINKS (~30 EDGES)
// ============================================

export const GRAPH_LINKS: GraphLink[] = [
  // ── Cluster 01 internal (Variational Inference) ──
  { source: 'fep-04', target: 'cog-112', strength: 0.9, type: 'synaptic' },
  { source: 'fep-04', target: 'cog-147', strength: 0.85, type: 'synaptic' },
  { source: 'fep-04', target: 'inf-039', strength: 0.7, type: 'derivation' },
  { source: 'cog-112', target: 'cog-147', strength: 0.8, type: 'synaptic' },
  { source: 'cog-147', target: 'inf-039', strength: 0.6, type: 'citation' },

  // ── Cluster 02 internal (Nonlinear Topologies) ──
  { source: 'geom-084', target: 'geom-102', strength: 0.85, type: 'synaptic' },
  { source: 'geom-084', target: 'cat-015', strength: 0.5, type: 'citation' },
  { source: 'geom-102', target: 'inf-055', strength: 0.7, type: 'derivation' },
  { source: 'cmp-091', target: 'geom-084', strength: 0.4, type: 'citation' },
  { source: 'cat-015', target: 'geom-102', strength: 0.55, type: 'synaptic' },

  // ── Cluster 03 internal (Dynamical Systems) ──
  { source: 'cmp-063', target: 'cmp-078', strength: 0.8, type: 'synaptic' },
  { source: 'cmp-078', target: 'hyp-022', strength: 0.45, type: 'citation' },
  { source: 'cmp-063', target: 'hyp-022', strength: 0.5, type: 'derivation' },

  // ── Cluster 04 internal (Speculative Frontiers) ──
  { source: 'hyp-018', target: 'hyp-031', strength: 0.6, type: 'synaptic' },
  { source: 'hyp-031', target: 'hyp-044', strength: 0.35, type: 'citation' },
  { source: 'inf-055', target: 'hyp-018', strength: 0.5, type: 'synaptic' },
  { source: 'inf-055', target: 'hyp-044', strength: 0.4, type: 'citation' },

  // ── Cross-cluster bridges ──
  { source: 'fep-04', target: 'geom-084', strength: 0.55, type: 'citation' },
  { source: 'cog-112', target: 'cmp-063', strength: 0.5, type: 'synaptic' },
  { source: 'cog-147', target: 'hyp-018', strength: 0.35, type: 'citation' },
  { source: 'inf-039', target: 'inf-055', strength: 0.65, type: 'derivation' },
  { source: 'geom-102', target: 'fep-04', strength: 0.45, type: 'citation' },
  { source: 'cmp-091', target: 'cmp-063', strength: 0.7, type: 'synaptic' },
  { source: 'cmp-078', target: 'cog-112', strength: 0.4, type: 'citation' },
  { source: 'cat-015', target: 'hyp-044', strength: 0.6, type: 'derivation' },
  { source: 'hyp-022', target: 'geom-102', strength: 0.5, type: 'citation' },
  { source: 'hyp-031', target: 'cog-147', strength: 0.45, type: 'synaptic' },
  { source: 'inf-055', target: 'geom-084', strength: 0.55, type: 'derivation' },
  { source: 'cmp-063', target: 'hyp-031', strength: 0.3, type: 'citation' },
]

// ============================================
// DISCIPLINES LIST (for filter pills)
// ============================================

export const DISCIPLINES = [
  'All Disciplines',
  'Differential Geometry',
  'Cognitive Science',
  'Complex Systems',
  'Category Theory',
  'Information Geometry',
  'Computational Neuroscience',
] as const

// ============================================
// EPISTEMIC SCRATCHPAD MEMOS (5 SLIPS)
// ============================================

export const MEMO_SLIPS: MemoSlip[] = [
  {
    id: 'memo-2026-06-02',
    timestamp: 'MEMO-2026.06.02 // 14:22 UTC',
    title: 'MH Hypothesis on Markov Blanket Orthogonality',
    body: 'Let dissipated density φ phase manifold partition into internal states. Should one universal schema that satisfy conditional independence…\n\nP(s, a | s, a) = P(s | s, a) P(a | s, a)\n\nNote the recursive (CLTm, LS19) self-confirming grid decoupling under autonomous, corporal stochastic flow.',
    tags: ['#MarkovBlankets', '#FreeEnergyBoundaries'],
    linkedNoteIds: ['fep-04', 'cog-112'],
  },
  {
    id: 'memo-2026-05-29',
    timestamp: 'MEMO-2026.05.29 // 01:10 UTC',
    title: 'MH Derivatives Draft on Poincaré Embedding Layer',
    body: 'Boundary resolution limit needed at d(u,v) > 1  →  repulsion…\n\nCurvature rescaling must be tied to model depth. The embedding layer should maintain hyperbolic distance proportional to hierarchical depth.',
    tags: ['#PoincaréBall', '#HyperbolicEmbedding'],
    linkedNoteIds: ['geom-084', 'geom-102'],
  },
  {
    id: 'memo-2026-05-15',
    timestamp: 'MEMO-2026.05.15 // 09:33 UTC',
    title: 'Soliton-Morphogen Duality Conjecture',
    body: 'Could the KdV soliton waveform solutions be reinterpreted as morphogen concentration waves in a 1D reaction-diffusion system? If the dispersive term balances nonlinearity in both cases, there may be a formal duality between topological conservation (solitons) and pattern formation (Turing). Cross-reference CMP-091 ↔ CMP-063.',
    tags: ['#Solitons', '#Morphogenesis', '#CrossCluster'],
    linkedNoteIds: ['cmp-091', 'cmp-063'],
  },
  {
    id: 'memo-2026-04-28',
    timestamp: 'MEMO-2026.04.28 // 16:45 UTC',
    title: 'Reading Notes: Friston & Sengupta (2024)',
    body: 'Key insight from Section 4.2: the expected free energy functional can be decomposed into epistemic value (information gain) and pragmatic value (reward). This decomposition provides a normative account of curiosity-driven exploration in biological agents. Need to formalize connection to COG-147 active inference framework.',
    tags: ['#LiteratureReview', '#FristonSengupta', '#ActiveInference'],
    linkedNoteIds: ['fep-04', 'cog-147'],
  },
  {
    id: 'memo-2026-04-10',
    timestamp: 'MEMO-2026.04.10 // 22:07 UTC',
    title: 'Attention Drift & Fluid Analogy Sketch',
    body: 'Reynolds number analogy: at low Re (simple sequences), attention flow is laminar — single-head dominance, smooth token routing. At high Re (complex long-range dependencies), turbulent regime: multi-head interference patterns, vortex-like attention sinks. Can we define a critical Reynolds number for transformer architectures? See HYP-018.',
    tags: ['#AttentionFluid', '#ReynoldsNumber', '#Speculative'],
    linkedNoteIds: ['hyp-018'],
  },
]
