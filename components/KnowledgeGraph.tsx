'use client'

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import { SAMPLE_GARDEN_NOTES, GRAPH_LINKS, CLUSTERS } from '../lib/sampleGarden'
import type { GraphNode, GraphLink, GrowthStage, TopologicalCluster } from '../types/garden'
import styles from './KnowledgeGraph.module.css'

interface KnowledgeGraphProps {
  selectedNodeId: string | null
  onSelectNode: (id: string | null) => void
  stageFilter: GrowthStage | 'all'
  onStageFilterChange: (stage: GrowthStage | 'all') => void
}

// ── Stage visual config ──
const STAGE_CONFIG: Record<GrowthStage, { color: string; radius: number; label: string }> = {
  evergreen: { color: '#0d9488', radius: 18, label: 'Evergreen' },
  budding: { color: '#3b82f6', radius: 13, label: 'Budding' },
  sprout: { color: '#f59e0b', radius: 9, label: 'Sprout' },
}

const LINK_COLORS: Record<string, string> = {
  synaptic: 'rgba(99, 102, 241, 0.35)',
  citation: 'rgba(148, 163, 184, 0.25)',
  derivation: 'rgba(37, 99, 235, 0.4)',
}

function initializeNodes(): GraphNode[] {
  const clusterCentroids: Record<string, { x: number; y: number }> = {
    'cluster-01': { x: 220, y: 170 },
    'cluster-02': { x: 680, y: 160 },
    'cluster-03': { x: 220, y: 380 },
    'cluster-04': { x: 680, y: 370 },
  }
  return SAMPLE_GARDEN_NOTES.map((note, i) => {
    const centroid = clusterCentroids[note.cluster] || { x: 450, y: 260 }
    const angle = (i * 1.618) * Math.PI * 2
    const spread = 40 + (i % 4) * 25
    return {
      id: note.id,
      x: centroid.x + Math.cos(angle) * spread,
      y: centroid.y + Math.sin(angle) * spread,
      vx: 0,
      vy: 0,
      fx: null,
      fy: null,
      radius: STAGE_CONFIG[note.stage].radius,
      stage: note.stage,
      cluster: note.cluster,
      label: note.title,
      pinned: false,
    }
  })
}

// ── Link particle system ──
interface LinkParticle {
  linkIdx: number
  t: number      // 0..1 parametric position along the link
  speed: number
}

function createParticles(links: GraphLink[]): LinkParticle[] {
  const particles: LinkParticle[] = []
  links.forEach((link, i) => {
    if (link.type === 'synaptic') {
      // 2 particles per synaptic link
      particles.push({ linkIdx: i, t: Math.random(), speed: 0.003 + Math.random() * 0.002 })
      particles.push({ linkIdx: i, t: Math.random(), speed: 0.002 + Math.random() * 0.002 })
    }
  })
  return particles
}

export function KnowledgeGraph({
  selectedNodeId,
  onSelectNode,
  stageFilter,
  onStageFilterChange,
}: KnowledgeGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const minimapRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<GraphNode[]>(initializeNodes())
  const particlesRef = useRef<LinkParticle[]>(createParticles(GRAPH_LINKS))
  const animRef = useRef<number>(0)

  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
  const [dragNodeId, setDragNodeId] = useState<string | null>(null)
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const [canvasSize, setCanvasSize] = useState({ w: 900, h: 520 })
  const [tickCount, setTickCount] = useState(0)

  // Filtered links based on stage filter
  const filteredNodeIds = useMemo(() => {
    if (stageFilter === 'all') return new Set(SAMPLE_GARDEN_NOTES.map((n) => n.id))
    return new Set(SAMPLE_GARDEN_NOTES.filter((n) => n.stage === stageFilter).map((n) => n.id))
  }, [stageFilter])

  const filteredLinks = useMemo(() => {
    return GRAPH_LINKS.filter((l) => filteredNodeIds.has(l.source) && filteredNodeIds.has(l.target))
  }, [filteredNodeIds])

  // ── Cluster hulls ──
  const clusterHulls = useMemo(() => {
    return CLUSTERS.map((cluster) => {
      const memberNodes = nodesRef.current.filter(
        (n) => cluster.memberIds.includes(n.id) && filteredNodeIds.has(n.id)
      )
      return { ...cluster, members: memberNodes }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredNodeIds, tickCount])

  // Stage counts
  const stageCounts = useMemo(() => {
    const counts = { all: SAMPLE_GARDEN_NOTES.length, evergreen: 0, budding: 0, sprout: 0 }
    SAMPLE_GARDEN_NOTES.forEach((n) => {
      counts[n.stage]++
    })
    return counts
  }, [])

  // ── Resize observer ──
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setCanvasSize({ w: Math.floor(width), h: Math.floor(Math.max(height, 400)) })
      }
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // ── Physics simulation + render loop ──
  useEffect(() => {
    const canvas = canvasRef.current
    const minimap = minimapRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const mmCtx = minimap?.getContext('2d') ?? null

    let frameCount = 0
    const alpha = 0.3 // simulation cooling

    const tick = () => {
      const nodes = nodesRef.current
      const particles = particlesRef.current
      const W = canvasSize.w
      const H = canvasSize.h

      canvas.width = W * window.devicePixelRatio
      canvas.height = H * window.devicePixelRatio
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)

      // ── PHYSICS ──
      const currentAlpha = Math.max(0.001, alpha * Math.pow(0.995, frameCount))

      // Repulsion (charge + collision avoidance)
      for (let i = 0; i < nodes.length; i++) {
        if (!filteredNodeIds.has(nodes[i].id)) continue
        for (let j = i + 1; j < nodes.length; j++) {
          if (!filteredNodeIds.has(nodes[j].id)) continue
          const dx = nodes[j].x - nodes[i].x
          const dy = nodes[j].y - nodes[i].y
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          const force = (-1200 * currentAlpha) / Math.max(dist, 30)
          const fx = (dx / dist) * force
          const fy = (dy / dist) * force
          if (!nodes[i].pinned) { nodes[i].vx -= fx; nodes[i].vy -= fy }
          if (!nodes[j].pinned) { nodes[j].vx += fx; nodes[j].vy += fy }

          // Collision non-overlap buffer
          const minDist = nodes[i].radius + nodes[j].radius + 24
          if (dist < minDist) {
            const push = (minDist - dist) * 0.35 * currentAlpha
            const px = (dx / dist) * push
            const py = (dy / dist) * push
            if (!nodes[i].pinned) { nodes[i].vx -= px; nodes[i].vy -= py }
            if (!nodes[j].pinned) { nodes[j].vx += px; nodes[j].vy += py }
          }
        }
      }

      // Spring (links) - intra-cluster links tight, inter-cluster links loose
      filteredLinks.forEach((link) => {
        const src = nodes.find((n) => n.id === link.source)
        const tgt = nodes.find((n) => n.id === link.target)
        if (!src || !tgt) return
        const dx = tgt.x - src.x
        const dy = tgt.y - src.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const isSameCluster = src.cluster === tgt.cluster
        const restLen = isSameCluster ? 95 : 240
        const strength = isSameCluster ? link.strength * 0.035 : link.strength * 0.008
        const force = (dist - restLen) * strength * currentAlpha
        const fx = (dx / dist) * force
        const fy = (dy / dist) * force
        if (!src.pinned) { src.vx += fx; src.vy += fy }
        if (!tgt.pinned) { tgt.vx -= fx; tgt.vy -= fy }
      })

      // Cluster centroid attraction (quadrant gravity)
      const clusterCentroids: Record<string, { x: number; y: number }> = {
        'cluster-01': { x: W * 0.25, y: H * 0.30 },
        'cluster-02': { x: W * 0.75, y: H * 0.28 },
        'cluster-03': { x: W * 0.25, y: H * 0.72 },
        'cluster-04': { x: W * 0.75, y: H * 0.72 },
      }

      for (const node of nodes) {
        if (!filteredNodeIds.has(node.id) || node.pinned) continue
        const centroid = clusterCentroids[node.cluster]
        if (!centroid) continue
        node.vx += (centroid.x - node.x) * 0.015 * currentAlpha
        node.vy += (centroid.y - node.y) * 0.015 * currentAlpha
      }

      // Velocity integration + damping
      for (const node of nodes) {
        if (!filteredNodeIds.has(node.id)) continue
        if (node.pinned) { node.vx = 0; node.vy = 0; continue }
        node.vx *= 0.92
        node.vy *= 0.92
        node.x += node.vx
        node.y += node.vy
        // Boundary clamping
        node.x = Math.max(node.radius, Math.min(W - node.radius, node.x))
        node.y = Math.max(node.radius, Math.min(H - node.radius, node.y))
      }

      // Update particles
      for (const p of particles) {
        const link = GRAPH_LINKS[p.linkIdx]
        if (!filteredNodeIds.has(link.source) || !filteredNodeIds.has(link.target)) continue
        const baseSpeed = hoveredNodeId && (link.source === hoveredNodeId || link.target === hoveredNodeId)
          ? p.speed * 3
          : p.speed
        p.t += baseSpeed
        if (p.t > 1) p.t -= 1
      }

      frameCount++
      if (frameCount % 10 === 0) setTickCount(frameCount)

      // ── RENDER ──
      const isDark = typeof document !== 'undefined'
        && document.documentElement.getAttribute('data-theme') === 'dark'

      ctx.clearRect(0, 0, W, H)
      ctx.save()
      ctx.translate(pan.x, pan.y)
      ctx.scale(zoom, zoom)

      // Draw cluster hulls
      clusterHulls.forEach((cluster) => {
        if (cluster.members.length < 2) return
        const pts = cluster.members
        const cx = pts.reduce((a, p) => a + p.x, 0) / pts.length
        const cy = pts.reduce((a, p) => a + p.y, 0) / pts.length
        // Draw translucent hull circle
        const maxDist = Math.max(...pts.map((p) => Math.sqrt((p.x - cx) ** 2 + (p.y - cy) ** 2))) + 36
        ctx.beginPath()
        ctx.arc(cx, cy, maxDist, 0, Math.PI * 2)
        ctx.fillStyle = isDark ? cluster.color : cluster.color.replace('0.08', '0.05')
        ctx.fill()
        // Cluster label positioned neatly above the cluster envelope
        if (W >= 520) {
          ctx.font = '600 8.5px var(--font-mono, monospace)'
          ctx.fillStyle = isDark ? 'rgba(148, 163, 184, 0.65)' : 'rgba(71, 85, 105, 0.6)'
          ctx.textAlign = 'center'
          ctx.fillText(cluster.label, cx, cy - maxDist - 6)
        }
      })

      // Determine dimmed state
      const neighborIds = new Set<string>()
      if (hoveredNodeId || selectedNodeId) {
        const activeId = hoveredNodeId || selectedNodeId
        neighborIds.add(activeId!)
        filteredLinks.forEach((l) => {
          if (l.source === activeId) neighborIds.add(l.target)
          if (l.target === activeId) neighborIds.add(l.source)
        })
      }
      const shouldDim = neighborIds.size > 0

      // Draw links
      filteredLinks.forEach((link) => {
        const src = nodes.find((n) => n.id === link.source)
        const tgt = nodes.find((n) => n.id === link.target)
        if (!src || !tgt) return

        const isActive = neighborIds.has(link.source) && neighborIds.has(link.target)
        const dimOpacity = shouldDim && !isActive ? 0.08 : 1

        ctx.beginPath()
        if (link.type === 'synaptic') {
          // Curved Bézier
          const mx = (src.x + tgt.x) / 2
          const my = (src.y + tgt.y) / 2
          const dx = tgt.x - src.x
          const dy = tgt.y - src.y
          const cpx = mx - dy * 0.15
          const cpy = my + dx * 0.15
          ctx.moveTo(src.x, src.y)
          ctx.quadraticCurveTo(cpx, cpy, tgt.x, tgt.y)
        } else if (link.type === 'derivation') {
          // Double-line railroad
          const dx = tgt.x - src.x
          const dy = tgt.y - src.y
          const len = Math.sqrt(dx * dx + dy * dy) || 1
          const nx = -dy / len * 2
          const ny = dx / len * 2
          ctx.moveTo(src.x + nx, src.y + ny)
          ctx.lineTo(tgt.x + nx, tgt.y + ny)
          ctx.moveTo(src.x - nx, src.y - ny)
          ctx.lineTo(tgt.x - nx, tgt.y - ny)
        } else {
          // Citation: dashed straight
          ctx.setLineDash([4, 4])
          ctx.moveTo(src.x, src.y)
          ctx.lineTo(tgt.x, tgt.y)
        }
        const baseColor = LINK_COLORS[link.type] || LINK_COLORS.citation
        ctx.globalAlpha = dimOpacity
        ctx.strokeStyle = baseColor
        ctx.lineWidth = link.type === 'synaptic' ? 1.5 : 1
        ctx.stroke()
        ctx.setLineDash([])
        ctx.globalAlpha = 1
      })

      // Draw particles
      particles.forEach((p) => {
        const link = GRAPH_LINKS[p.linkIdx]
        if (!filteredNodeIds.has(link.source) || !filteredNodeIds.has(link.target)) return
        const src = nodes.find((n) => n.id === link.source)
        const tgt = nodes.find((n) => n.id === link.target)
        if (!src || !tgt) return

        const isActive = neighborIds.has(link.source) && neighborIds.has(link.target)
        if (shouldDim && !isActive) return

        // Quadratic Bézier interpolation
        const mx = (src.x + tgt.x) / 2
        const my = (src.y + tgt.y) / 2
        const dx = tgt.x - src.x
        const dy = tgt.y - src.y
        const cpx = mx - dy * 0.15
        const cpy = my + dx * 0.15
        const t = p.t
        const x = (1 - t) * (1 - t) * src.x + 2 * (1 - t) * t * cpx + t * t * tgt.x
        const y = (1 - t) * (1 - t) * src.y + 2 * (1 - t) * t * cpy + t * t * tgt.y

        ctx.beginPath()
        ctx.arc(x, y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = isDark ? 'rgba(165, 180, 252, 0.8)' : 'rgba(99, 102, 241, 0.7)'
        ctx.fill()
      })

      // Draw nodes
      nodes.forEach((node) => {
        if (!filteredNodeIds.has(node.id)) return
        const cfg = STAGE_CONFIG[node.stage]
        const isSelected = node.id === selectedNodeId
        const isHovered = node.id === hoveredNodeId
        const isDimmed = shouldDim && !neighborIds.has(node.id)

        ctx.globalAlpha = isDimmed ? 0.2 : 1

        // Glow for evergreen
        if (node.stage === 'evergreen' && !isDimmed) {
          const pulse = Math.sin(frameCount * 0.03) * 2 + 2
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius + 6 + pulse, 0, Math.PI * 2)
          ctx.fillStyle = isDark
            ? 'rgba(13, 148, 136, 0.12)'
            : 'rgba(13, 148, 136, 0.08)'
          ctx.fill()
        }

        // Budding orbit ring
        if (node.stage === 'budding' && !isDimmed) {
          ctx.save()
          ctx.translate(node.x, node.y)
          ctx.rotate(frameCount * 0.008)
          ctx.beginPath()
          ctx.arc(0, 0, node.radius + 5, 0, Math.PI * 2)
          ctx.strokeStyle = isDark ? 'rgba(59, 130, 246, 0.25)' : 'rgba(59, 130, 246, 0.18)'
          ctx.setLineDash([3, 5])
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.setLineDash([])
          ctx.restore()
        }

        // Selection halo
        if (isSelected) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2)
          ctx.strokeStyle = cfg.color
          ctx.lineWidth = 2
          ctx.stroke()
        }

        // Node body
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = isHovered || isSelected
          ? cfg.color
          : isDark
            ? cfg.color
            : cfg.color
        ctx.fill()

        // Inner ring highlight
        if (!isDimmed) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius - 3, 0, Math.PI * 2)
          ctx.fillStyle = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.25)'
          ctx.fill()
        }

        // Label
        if ((zoom > 0.7 && !isDimmed) || isHovered || isSelected) {
          ctx.font = `${isSelected || isHovered ? '600' : '400'} 9px var(--font-mono, monospace)`
          ctx.textAlign = 'center'
          ctx.fillStyle = isDark ? 'rgba(226, 232, 240, 0.85)' : 'rgba(15, 23, 42, 0.8)'
          const label = node.label.length > 22 ? node.label.slice(0, 20) + '…' : node.label
          ctx.fillText(label, node.x, node.y + node.radius + 14)
        }

        ctx.globalAlpha = 1
      })

      ctx.restore()

      // ── MINIMAP ──
      if (mmCtx && minimap) {
        const mw = 120
        const mh = 80
        minimap.width = mw * window.devicePixelRatio
        minimap.height = mh * window.devicePixelRatio
        mmCtx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)

        mmCtx.fillStyle = isDark ? 'rgba(12, 15, 26, 0.9)' : 'rgba(248, 250, 252, 0.9)'
        mmCtx.fillRect(0, 0, mw, mh)

        const scaleX = mw / W
        const scaleY = mh / H

        // Mini links
        filteredLinks.forEach((link) => {
          const src = nodes.find((n) => n.id === link.source)
          const tgt = nodes.find((n) => n.id === link.target)
          if (!src || !tgt) return
          mmCtx.beginPath()
          mmCtx.moveTo(src.x * scaleX, src.y * scaleY)
          mmCtx.lineTo(tgt.x * scaleX, tgt.y * scaleY)
          mmCtx.strokeStyle = isDark ? 'rgba(100,116,139,0.2)' : 'rgba(100,116,139,0.15)'
          mmCtx.lineWidth = 0.5
          mmCtx.stroke()
        })

        // Mini nodes
        nodes.forEach((node) => {
          if (!filteredNodeIds.has(node.id)) return
          mmCtx.beginPath()
          mmCtx.arc(node.x * scaleX, node.y * scaleY, 2, 0, Math.PI * 2)
          mmCtx.fillStyle = STAGE_CONFIG[node.stage].color
          mmCtx.fill()
        })

        // Viewport rectangle
        const vx = (-pan.x / zoom) * scaleX
        const vy = (-pan.y / zoom) * scaleY
        const vw = (W / zoom) * scaleX
        const vh = (H / zoom) * scaleY
        mmCtx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.6)' : 'rgba(37, 99, 235, 0.5)'
        mmCtx.lineWidth = 1
        mmCtx.strokeRect(vx, vy, vw, vh)
      }

      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [zoom, pan, hoveredNodeId, selectedNodeId, filteredNodeIds, filteredLinks, clusterHulls, canvasSize])

  // ── Mouse interaction handlers ──
  const screenToGraph = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current
      if (!canvas) return { x: 0, y: 0 }
      const rect = canvas.getBoundingClientRect()
      return {
        x: (clientX - rect.left - pan.x) / zoom,
        y: (clientY - rect.top - pan.y) / zoom,
      }
    },
    [pan, zoom]
  )

  const findNodeAt = useCallback(
    (gx: number, gy: number) => {
      const nodes = nodesRef.current
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i]
        if (!filteredNodeIds.has(n.id)) continue
        const dx = gx - n.x
        const dy = gy - n.y
        if (dx * dx + dy * dy <= (n.radius + 4) * (n.radius + 4)) return n
      }
      return null
    },
    [filteredNodeIds]
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const { x, y } = screenToGraph(e.clientX, e.clientY)
      const node = findNodeAt(x, y)
      if (node) {
        setDragNodeId(node.id)
        node.pinned = true
        node.fx = node.x
        node.fy = node.y
      } else {
        setIsPanning(true)
        setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
      }
    },
    [screenToGraph, findNodeAt, pan]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const { x, y } = screenToGraph(e.clientX, e.clientY)
      if (dragNodeId) {
        const node = nodesRef.current.find((n) => n.id === dragNodeId)
        if (node) {
          node.x = x
          node.y = y
          node.fx = x
          node.fy = y
        }
      } else if (isPanning) {
        setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y })
      } else {
        const node = findNodeAt(x, y)
        setHoveredNodeId(node?.id ?? null)
      }
    },
    [screenToGraph, dragNodeId, isPanning, panStart, findNodeAt]
  )

  const handleMouseUp = useCallback(() => {
    if (dragNodeId) {
      const node = nodesRef.current.find((n) => n.id === dragNodeId)
      if (node) {
        // Keep pinned after drag
        node.pinned = true
      }
    }
    setDragNodeId(null)
    setIsPanning(false)
  }, [dragNodeId])

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (dragNodeId) return // was dragging
      const { x, y } = screenToGraph(e.clientX, e.clientY)
      const node = findNodeAt(x, y)
      onSelectNode(node?.id ?? null)
    },
    [screenToGraph, findNodeAt, onSelectNode, dragNodeId]
  )

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? 0.9 : 1.1
      setZoom((z) => Math.max(0.3, Math.min(3, z * delta)))
    },
    []
  )

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      const { x, y } = screenToGraph(e.clientX, e.clientY)
      const node = findNodeAt(x, y)
      if (node) {
        setZoom(1.5)
        setPan({
          x: canvasSize.w / 2 - node.x * 1.5,
          y: canvasSize.h / 2 - node.y * 1.5,
        })
        onSelectNode(node.id)
      }
    },
    [screenToGraph, findNodeAt, canvasSize, onSelectNode]
  )

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length !== 1) return
      const touch = e.touches[0]
      const { x, y } = screenToGraph(touch.clientX, touch.clientY)
      const node = findNodeAt(x, y)
      if (node) {
        setDragNodeId(node.id)
        node.pinned = true
        node.fx = node.x
        node.fy = node.y
        onSelectNode(node.id)
      } else {
        setIsPanning(true)
        setPanStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y })
      }
    },
    [screenToGraph, findNodeAt, pan, onSelectNode]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length !== 1) return
      const touch = e.touches[0]
      const { x, y } = screenToGraph(touch.clientX, touch.clientY)
      if (dragNodeId) {
        const node = nodesRef.current.find((n) => n.id === dragNodeId)
        if (node) {
          node.x = x
          node.y = y
          node.fx = x
          node.fy = y
        }
      } else if (isPanning) {
        setPan({ x: touch.clientX - panStart.x, y: touch.clientY - panStart.y })
      }
    },
    [screenToGraph, dragNodeId, isPanning, panStart]
  )

  const handleTouchEnd = useCallback(() => {
    if (dragNodeId) {
      const node = nodesRef.current.find((n) => n.id === dragNodeId)
      if (node) {
        node.pinned = true
      }
    }
    setDragNodeId(null)
    setIsPanning(false)
  }, [dragNodeId])

  const resetView = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
    // Unpin all nodes
    nodesRef.current.forEach((n) => {
      n.pinned = false
      n.fx = null
      n.fy = null
    })
  }

  return (
    <div className={styles.graphContainer}>
      {/* ── Control Bar ── */}
      <div className={styles.controlBar}>
        <div className={styles.controlBarLeft}>
          <span className={styles.graphLabel}>
            <span className="status-dot status-dot-active" />
            <span>Topological Graph View</span>
          </span>
          <span className={styles.physicsLabel}>Barnes-Hut 2D</span>
        </div>

        <div className={styles.controlBarCenter}>
          {(['all', 'evergreen', 'budding', 'sprout'] as const).map((stage) => (
            <button
              key={stage}
              type="button"
              className={`${styles.stageFilterBtn} ${stageFilter === stage ? styles.stageFilterActive : ''}`}
              onClick={() => onStageFilterChange(stage)}
            >
              {stage === 'all'
                ? `All (${stageCounts.all})`
                : `${stage === 'evergreen' ? '🌳' : stage === 'budding' ? '🌿' : '🌱'} ${STAGE_CONFIG[stage].label}`}
            </button>
          ))}
        </div>

        <div className={styles.controlBarRight}>
          <button type="button" className={styles.zoomBtn} onClick={() => setZoom((z) => Math.min(3, z * 1.2))} aria-label="Zoom in">
            <ZoomIn size={14} />
          </button>
          <button type="button" className={styles.zoomBtn} onClick={() => setZoom((z) => Math.max(0.3, z * 0.8))} aria-label="Zoom out">
            <ZoomOut size={14} />
          </button>
          <button type="button" className={styles.zoomBtn} onClick={resetView} aria-label="Reset view">
            <Maximize2 size={14} />
          </button>
        </div>
      </div>

      {/* ── Canvas ── */}
      <div className={styles.canvasContainer} ref={containerRef}>
        <canvas
          ref={canvasRef}
          className={styles.graphCanvas}
          style={{ width: canvasSize.w, height: canvasSize.h, cursor: dragNodeId ? 'grabbing' : hoveredNodeId ? 'pointer' : isPanning ? 'grabbing' : 'grab' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />

        {/* ── Minimap ── */}
        <div className={styles.minimapContainer}>
          <canvas ref={minimapRef} className={styles.minimapCanvas} style={{ width: 120, height: 80 }} />
        </div>
      </div>

      {/* ── Legend ── */}
      <div className={styles.legendBar}>
        <div className={styles.legendItems}>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ backgroundColor: STAGE_CONFIG.evergreen.color }} />
            Evergreen Core
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ backgroundColor: STAGE_CONFIG.budding.color }} />
            Budding Synthesis
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ backgroundColor: STAGE_CONFIG.sprout.color }} />
            Speculative Sprout
          </span>
        </div>
        <span className={styles.legendHint}>Click node to inspect synaptic links</span>
      </div>
    </div>
  )
}
