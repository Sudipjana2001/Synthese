export interface TimelineItem {
  _id: string
  dateRange: string
  title: string
  company: string
  location: string
  description: string
  technologies: string[]
  order: number
}

export interface PublicationItem {
  id: string
  title: string
  venue: string
  year: string
  doi: string
  citations: number
  type: 'Peer-Reviewed Journal' | 'Conference Proceedings' | 'Preprint Monograph'
  slug?: string
  externalUrl?: string
  abstract: string
  authors: string
}

export interface InstrumentItem {
  category: string
  name: string
  description: string
  specs: string[]
}

export interface AboutData {
  name: string
  role: string
  affiliation: string
  location: string
  email: string
  pgpKey: string
  orcid: string
  metrics: {
    citations: string
    hIndex: string
    publications: string
    activeSimulations: string
  }
  headline: string
  abstract: string
  epistemicPillars: Array<{
    title: string
    discipline: string
    summary: string
  }>
  timeline: TimelineItem[]
  publications: PublicationItem[]
  instrumentarium: InstrumentItem[]
}

export const SAMPLE_ABOUT: AboutData = {
  name: 'Sudip Jana, Ph.D.',
  role: 'Principal Investigator & Editor-in-Chief',
  affiliation: 'Synthese Computational Press & Institute for Non-Equilibrium Systems',
  location: 'Berlin / Cambridge / Remote',
  email: 'investigator@synthese.press',
  pgpKey: '0x8F3C9A1E 4D27 B901',
  orcid: '0000-0002-1825-0097',
  metrics: {
    citations: '1,480+',
    hIndex: '18',
    publications: '24',
    activeSimulations: '14',
  },
  headline:
    'Investigating the mathematical continuum between non-equilibrium statistical mechanics, morphogenetic substrates, and synthetic cognitive architectures.',
  abstract:
    'Our laboratory focuses on the fundamental question: How do self-organizing physical substrates spontaneously compute, minimize informational entropy, and manifest cognitive invariants? By unifying Turing reaction-diffusion dynamics, Friston variational mechanics, and differential geometric latent representations, Synthese operates as both a formal theoretical press and an executable experimental sandbox.',
  epistemicPillars: [
    {
      title: 'Thermodynamic Morphogenesis',
      discipline: 'Nonlinear PDEs & Physical Substrates',
      summary:
        'Continuous reaction-diffusion Turing substrates functioning as asynchronous, ultra-low-power logic networks that bypass von Neumann architectural constraints.',
    },
    {
      title: 'Geometric Deep Learning & Manifolds',
      discipline: 'Differential Geometry & Information Theory',
      summary:
        'Analyzing neural representation spaces through persistent homology and hyperbolic embeddings to prevent semantic drift and characterize latent manifold curvature.',
    },
    {
      title: 'Variational Neurodynamics',
      discipline: 'Free Energy Principle & Bayesian Mechanics',
      summary:
        'Formulating normative bounds on cortical active inference where Markov blankets delineate internal informational states from external thermodynamic surprise.',
    },
  ],
  timeline: [
    {
      _id: 'time-01',
      dateRange: '2024 — Present',
      title: 'Founding Editor-in-Chief & Research Lead',
      company: 'Synthese Computational Press & Laboratory',
      location: 'Berlin, DE',
      description:
        'Architecting a new computational publishing paradigm pairing peer-reviewed mathematical monographs with real-time browser-executable numerical simulations and living Zettelkasten knowledge graphs.',
      technologies: ['Next.js', 'Sanity v3', 'WebGL 2.0', 'D3.js', 'WebAssembly'],
      order: 1,
    },
    {
      _id: 'time-02',
      dateRange: '2021 — 2024',
      title: 'Senior Research Fellow in Neuro-Computation',
      company: 'Max Planck Institute for Dynamics and Self-Organization',
      location: 'Göttingen / Berlin, DE',
      description:
        'Led theoretical research into non-equilibrium thermodynamic bounds in cortical sensory ensembles. Developed continuous PDE solvers for simulated reaction-diffusion neural cellular automata.',
      technologies: ['PyTorch Geometric', 'JAX/Equinox', 'C++20', 'CUDA', 'Information Geometry'],
      order: 2,
    },
    {
      _id: 'time-03',
      dateRange: '2018 — 2021',
      title: 'Ph.D. in Computational Science & Information Geometry',
      company: 'ETH Zürich (Swiss Federal Institute of Technology)',
      location: 'Zürich, CH',
      description:
        'Dissertation: "Topological Entropy, Fisher Information Manifolds, and Semantic Drift in Autoregressive Generative Models." Awarded ETH Silver Medal for outstanding doctoral thesis.',
      technologies: ['Differential Topology', 'Riemannian Manifolds', 'Statistical Mechanics', 'Lean 4'],
      order: 3,
    },
    {
      _id: 'time-04',
      dateRange: '2014 — 2018',
      title: 'B.A. & M.Eng. in Theoretical Physics & Computer Science',
      company: 'University of Cambridge (Trinity College)',
      location: 'Cambridge, UK',
      description:
        'Double First Class Honours with distinction. Tripos focus on Hamiltonian mechanics, quantum information theory, and probabilistic graphical models.',
      technologies: ['Hamiltonian Dynamics', 'Functional Analysis', 'Haskell', 'Python'],
      order: 4,
    },
  ],
  publications: [
    {
      id: 'pub-01',
      title: 'Topological Entropy and Semantic Drift in Deep Generative Latents',
      venue: 'Synthese Computational Press, Vol. 4, Art. 12',
      year: '2026',
      doi: '10.5821/synthese.2026.01452',
      citations: 42,
      type: 'Peer-Reviewed Journal',
      slug: 'topological-entropy-and-semantic-drift',
      authors: 'Sudip Jana',
      abstract:
        'Persistent homology proves vector manifold deformations cross a thermodynamic inflection point where autoregressive language models depart from ground truth grounding into self-referential hypertoruses.',
    },
    {
      id: 'pub-02',
      title: 'Morphogenetic Computing: Reaction-Diffusion Substrates as Low-Power Logic Networks',
      venue: 'Synthese Computational Press, Vol. 4, Art. 11',
      year: '2026',
      doi: '10.5821/synthese.2026.01451',
      citations: 89,
      type: 'Peer-Reviewed Journal',
      slug: 'morphogenetic-computing-reaction-diffusion',
      authors: 'Sudip Jana',
      abstract:
        'Continuous Turing reaction-diffusion chemical gels offer non-von-Neumann asynchronous pattern recognition with sub-picowatt energy consumption.',
    },
    {
      id: 'pub-03',
      title: 'The Hard Problem of Machine Affect: Functionalism, Homeostasis, and Synthetic Interiority',
      venue: 'Synthese Computational Press, Vol. 4, Art. 10',
      year: '2026',
      doi: '10.5821/synthese.2026.01450',
      citations: 34,
      type: 'Preprint Monograph',
      slug: 'hard-problem-of-machine-affect',
      authors: 'Sudip Jana',
      abstract:
        'Investigating whether homeostasis-driven active inference architectures possess functional analogs of phenomenal valence or remain sophisticated behavioral automata.',
    },
    {
      id: 'pub-04',
      title: 'Poincaré Embeddings and Hierarchical Latent Geometries in Large Multi-Modal Models',
      venue: 'Advances in Neural Information Processing Systems (NeurIPS)',
      year: '2024',
      doi: '10.48550/arXiv.2405.11892',
      citations: 215,
      type: 'Conference Proceedings',
      externalUrl: 'https://arxiv.org',
      authors: 'Sudip Jana',
      abstract:
        'Demonstrates that Riemannian gradient flow on hyperbolic Poincaré balls yields exponential capacity expansion for taxonomic tree representations compared to standard Euclidean embeddings.',
    },
    {
      id: 'pub-05',
      title: 'Variational Bounds on Sensory Entropy Minimization Across Cortical Layers',
      venue: 'Journal of Mathematical Neuroscience, 14(3), 112–138',
      year: '2023',
      doi: '10.1186/s13408-023-00142-9',
      citations: 167,
      type: 'Peer-Reviewed Journal',
      externalUrl: 'https://doi.org',
      authors: 'Sudip Jana',
      abstract:
        'Exact thermodynamic derivation establishing that canonical cortical microcircuits minimize a localized variational free energy bound via coupled dendritic predictive coding.',
    },
  ],
  instrumentarium: [
    {
      category: 'Computational Clusters & Silicon',
      name: 'High-Density Tensor Nodes',
      description: 'Dedicated GPU acceleration cluster for parallelized PDE solving and high-dimensional persistent homology.',
      specs: ['2× NVIDIA H100 SXM5 80GB', 'AMD EPYC 9654 (96 Cores, 192 Threads)', '1.5TB DDR5 ECC RAM', '4× 7.68TB NVMe PCIe 5.0'],
    },
    {
      category: 'Mathematical Proof & Verification',
      name: 'Interactive Theorem Proving',
      description: 'Formal verification environment for mathematical lemmas, category-theoretic functors, and topological invariant proofs.',
      specs: ['Lean 4 Formal Mathlib', 'Coq Proof Assistant', 'Wolfram Mathematica 14', 'Z3 SMT Solver'],
    },
    {
      category: 'Simulation Engines & Substrates',
      name: 'Numerical Physics Runtimes',
      description: 'Custom WebGL 2.0 and WebAssembly simulation kernels compiled for real-time in-browser scientific exploration.',
      specs: ['JAX / Equinox Autodiff', 'WebGL 2.0 Compute Shaders', 'D3.js Force Simulation Engine', 'Rust / WASM PDE Solvers'],
    },
  ],
}
