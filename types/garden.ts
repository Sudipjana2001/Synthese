// ============================================
// DIGITAL GARDEN & KNOWLEDGE GRAPH — TYPE DEFINITIONS
// ============================================

/** Growth stage for a Zettelkasten note */
export type GrowthStage = 'evergreen' | 'budding' | 'sprout'

/** Academic discipline taxonomy */
export type Discipline =
  | 'Differential Geometry'
  | 'Cognitive Science'
  | 'Complex Systems'
  | 'Category Theory'
  | 'Information Geometry'
  | 'Computational Neuroscience'

/** A single garden note (Zettelkasten slip) */
export interface GardenNote {
  id: string              // e.g. '§ GEOM-084'
  slug: string            // URL-safe identifier
  title: string
  stage: GrowthStage
  discipline: Discipline
  summary: string         // 2–4 sentence scholarly abstract
  tags: string[]          // monospace taxonomy badges
  backlinksCount: number  // incoming reference density
  updatedAt: string       // relative or ISO date
  cluster: string         // topological cluster ID
  citationKey?: string    // BibTeX key, e.g. 'jana2026fep'
  formalLemma?: {
    label: string         // e.g. 'FORMAL LEMMA A.2 // BOUND DEFINITION'
    formula: string       // mathematical expression
    explanation: string   // plain-language interpretation
  }
  backlinks?: {
    id: string
    title: string
    excerpt: string
  }[]
}

/** Physics-aware node for force-directed graph layout */
export interface GraphNode {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  fx: number | null       // fixed x (when dragging or pinned)
  fy: number | null       // fixed y
  radius: number
  stage: GrowthStage
  cluster: string
  label: string
  pinned: boolean
}

/** Network edge between two notes */
export interface GraphLink {
  source: string          // source node id
  target: string          // target node id
  strength: number        // spring constant (0–1)
  type: 'synaptic' | 'citation' | 'derivation'
}

/** Topological cluster definition */
export interface TopologicalCluster {
  id: string
  label: string           // e.g. 'CLUSTER 01 // VARIATIONAL INFERENCE'
  color: string           // cluster hull fill color
  memberIds: string[]     // node ids belonging to this cluster
  collapsed: boolean      // whether the cluster is collapsed into a meta-node
}

/** Epistemic Scratchpad memo slip */
export interface MemoSlip {
  id: string              // e.g. 'MEMO-2026.06.02'
  timestamp: string       // e.g. '2026.06.02 // 14:22 UTC'
  title: string
  body: string            // markdown-like content with inline math
  tags: string[]          // hashtag references
  linkedNoteIds: string[] // connected garden note IDs
}
