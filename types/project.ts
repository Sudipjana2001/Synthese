export interface Project {
  _id: string
  title: string
  slug: { current: string }
  category: string
  disciplineTag: string
  stars: number
  description: string
  demoUrl?: string
  repoUrl?: string
  featured?: boolean
  metrics: {
    label1: string
    value1: string
    label2: string
    value2: string
  }
  actionLabel: string
  modelType: 'gray-scott' | 'boids' | 'bayes' | 'fourier' | 'loss-landscape' | 'markov' | 'matrix'
  tags: string[]
}
