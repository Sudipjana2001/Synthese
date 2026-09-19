import { Post } from '../types/blog'

export const SAMPLE_POSTS: Post[] = [
  {
    _id: 'sample-post-1',
    title: 'Emergence of Spontaneous Coordination in Multi-Agent Neural Topologies',
    slug: { current: 'emergence-of-spontaneous-coordination' },
    excerpt:
      'We demonstrate how high-dimensional stochastic coupling between decentralized transformer-based agents yields phase transitions toward macro-scale consensus without external reward gradients.',
    publishedAt: '2026-03-12T10:00:00Z',
    featured: true,
    readingTime: 18,
    tags: ['ReinforcementLearning', 'NeuroTopology', 'DynamicalSystems'],
    author: {
      _id: 'author-sudip',
      name: 'Sudip Jana',
      role: 'Principal Investigator & Editorial Moderator • Synthese Press',
      bio: 'Researching neural topology, thermodynamic computing substrates, and mathematical epistemology.',
    },
    categories: [
      {
        _id: 'cat-1',
        title: 'Cognitive Computation',
        slug: { current: 'cognitive-computation' },
        color: '#3b82f6',
      },
      {
        _id: 'cat-2',
        title: 'Dynamical Systems',
        slug: { current: 'dynamical-systems' },
        color: '#10b981',
      },
    ],
    displayOptions: {
      showTableOfContents: true,
      showAuthorBio: true,
      showRelatedPosts: true,
      showShareButtons: true,
    },
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text:
              'Classical distributed multi-agent systems have long operated under the assumption that macroscopic equilibrium necessitates explicitly structured global loss formulations or localized credit-assignment mechanisms. In this paper, we present an empirical and theoretical counterexample: spontaneous phase synchronization emerges organically within unconstrained transformer ensembles through non-linear geometric resonance.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Mathematical Formulation of Stochastic Coupling' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text:
              'Consider a network of N autonomous agents parameterized by latent policy embeddings. When token projections interact over an unweighted diffusion manifold, the Lyapunov exponent decreases inversely with attention entropy:',
          },
        ],
      },
      {
        _type: 'codeBlock',
        filename: 'kuramoto_neural_coupling.py',
        language: 'python',
        code: `import numpy as np
import torch
import torch.nn as nn

class StochasticCouplingField(nn.Module):
    def __init__(self, d_model=512, n_agents=64):
        super().__init__()
        self.d_model = d_model
        self.coupling_matrix = nn.Parameter(torch.randn(n_agents, n_agents) * 0.02)
        
    def forward(self, agent_latents, coupling_strength=0.72):
        # Compute pairwise phase differences
        phase_diff = torch.cdist(agent_latents, agent_latents)
        diffusion = torch.exp(-phase_diff / (2.0 * coupling_strength))
        
        # Non-linear phase synchronization step
        synchronized_latents = torch.matmul(diffusion, agent_latents)
        return synchronized_latents / torch.norm(synchronized_latents, dim=-1, keepdim=True)`,
      },
      {
        _type: 'callout',
        type: 'tip',
        text:
          'When coupling_strength exceeds the critical percolation threshold (approximately 0.68), the system exhibits a sharp second-order phase transition into collective harmonic oscillations.',
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Empirical Verification on High-Dimensional Manifolds' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text:
              'To test this hypothesis across high-dimensional latent manifolds, we simulated an ensemble of 256 transformer agents initialized with uncorrelated Gaussian noise. Over successive iterations without external rewards, the cluster entropy collapsed monotonically, yielding coherent semantic coordinate agreement.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _type: 'span',
            text:
              'Consensus is not an optimization objective imposed from without; it is a topological attractor discovered from within.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Implications for Future Architecture' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text:
              'This phenomenon presents a profound departure from traditional centralized reinforcement learning. By replacing communication protocols with geometric field coupling, decentralized systems achieve resilient fault tolerance without consensus bottlenecks.',
          },
        ],
      },
    ],
  },
  {
    _id: 'sample-post-2',
    title: 'Topological Entropy and Semantic Drift in Deep Generative Latents',
    slug: { current: 'topological-entropy-and-semantic-drift' },
    excerpt:
      'By analyzing vector manifold deformations through persistent homology, we identify the exact thermodynamic inflection point where autoregressive language models depart from ground truth grounding.',
    publishedAt: '2026-03-08T14:30:00Z',
    featured: false,
    readingTime: 24,
    tags: ['Topology', 'GenerativeAI', 'Thermodynamics'],
    author: {
      _id: 'author-sudip',
      name: 'Sudip Jana',
      role: 'Principal Investigator & Editorial Moderator • Synthese Press',
      bio: 'Investigating high-dimensional persistent homology and non-equilibrium cognitive dynamics.',
    },
    categories: [
      {
        _id: 'cat-1',
        title: 'Cognitive Computation',
        slug: { current: 'cognitive-computation' },
        color: '#3b82f6',
      },
    ],
    displayOptions: {
      showTableOfContents: true,
      showAuthorBio: true,
      showRelatedPosts: true,
      showShareButtons: true,
    },
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text:
              'Autoregressive generation can be rigorously modeled as a discrete dynamical system traversing a learned manifold. As sequence length scales, accumulative curvature errors introduce topological deformations that can be measured via persistent Betti curves.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Homological Filtration Across Layer Depths' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text:
              'By computing Vietoris-Rips complexes across activation matrices at layer boundaries, we observe that hallucination correlates with the appearance of non-contractible 1-cycles in latent representations.',
          },
        ],
      },
      {
        _type: 'callout',
        type: 'warning',
        text:
          'Topological drift does not manifest as sudden syntax degradation; rather, semantic invariants collapse silently while surface fluency remains deceptively intact.',
      },
    ],
  },
  {
    _id: 'sample-post-3',
    title: 'Morphogenetic Computing: Reaction-Diffusion Substrates as Low-Power Logic Networks',
    slug: { current: 'morphogenetic-computing-reaction-diffusion' },
    excerpt:
      'Turing reaction-diffusion patterns implemented in synthetic biological gels offer non-von-Neumann asynchronous pattern recognition with sub-picowatt energy consumption.',
    publishedAt: '2026-02-28T09:15:00Z',
    featured: false,
    readingTime: 32,
    tags: ['BioComputing', 'Morphogenesis', 'NonVonNeumann'],
    author: {
      _id: 'author-sudip',
      name: 'Sudip Jana',
      role: 'Principal Investigator & Editorial Moderator • Synthese Press',
      bio: 'Pioneering morphogenetic substrates, Turing logic, and unconventional computing paradigms.',
    },
    categories: [
      {
        _id: 'cat-3',
        title: 'Physical Substrates',
        slug: { current: 'physical-substrates' },
        color: '#8b5cf6',
      },
    ],
    displayOptions: {
      showTableOfContents: true,
      showAuthorBio: true,
      showRelatedPosts: true,
      showShareButtons: true,
    },
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text:
              'The von Neumann bottleneck is fundamentally a spatial constraint imposed by separating memory from arithmetic processing. In Turing pattern-forming chemical systems, memory and computation are topologically co-extensive within the reaction medium.',
          },
        ],
      },
    ],
  },
  {
    _id: 'sample-post-4',
    title: 'The Hard Problem of Machine Affect: Functionalism, Homeostasis, and Synthetic Interiority',
    slug: { current: 'the-hard-problem-of-machine-affect' },
    excerpt:
      'We argue that sentiment in reinforcement learning cannot generate true experiential valence without metabolic somatic vulnerability. A formalization of synthetic allostasis.',
    publishedAt: '2026-02-14T11:00:00Z',
    featured: false,
    readingTime: 20,
    tags: ['PhilosophyOfMind', 'AffectiveComputing', 'Cybernetics'],
    author: {
      _id: 'author-sudip',
      name: 'Sudip Jana',
      role: 'Principal Investigator & Editorial Moderator • Synthese Press',
      bio: 'Researching neural topology, thermodynamic computing substrates, and mathematical epistemology.',
    },
    categories: [
      {
        _id: 'cat-4',
        title: 'Philosophy of Mind',
        slug: { current: 'philosophy-of-mind' },
        color: '#f59e0b',
      },
    ],
    displayOptions: {
      showTableOfContents: true,
      showAuthorBio: true,
      showRelatedPosts: true,
      showShareButtons: true,
    },
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text:
              'Can synthetic agents possess genuine affective states? We analyze homeostatic drive mechanisms through the lens of cybernetic allostasis, concluding that without existential consequence, objective functions remain purely nominal.',
          },
        ],
      },
    ],
  },
]
