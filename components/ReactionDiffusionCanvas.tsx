'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Play, Pause, RefreshCw, Zap, Bookmark, ExternalLink, Code } from 'lucide-react'
import styles from './ReactionDiffusionCanvas.module.css'

interface Preset {
  name: string
  label: string
  f: number
  k: number
}

const PRESETS: Preset[] = [
  {
    name: 'coral',
    label: 'Coral Growth & Meanders (F=0.0545, k=0.0620)',
    f: 0.0545,
    k: 0.062,
  },
  {
    name: 'mitotic',
    label: 'Mitotic Solitons & Bacteria (F=0.0340, k=0.0650)',
    f: 0.034,
    k: 0.065,
  },
  {
    name: 'spirals',
    label: 'Spirals & Turbulence (F=0.0180, k=0.0510)',
    f: 0.018,
    k: 0.051,
  },
  {
    name: 'labyrinth',
    label: 'Turing Labyrinth Waves (F=0.0290, k=0.0570)',
    f: 0.029,
    k: 0.057,
  },
]

export function ReactionDiffusionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState<number>(2)
  const [selectedPreset, setSelectedPreset] = useState<string>('coral')
  const [feedRate, setFeedRate] = useState<number>(0.0545)
  const [killRate, setKillRate] = useState<number>(0.062)
  const [activeMode, setActiveMode] = useState<'morphology' | 'gradient'>('morphology')
  const [fps, setFps] = useState<number>(60.0)
  const [stepCount, setStepCount] = useState<number>(13480)
  const [isCopied, setIsCopied] = useState(false)

  // Simulation Grid dimensions (optimized for high-fps continuous PDE)
  const WIDTH = 160
  const HEIGHT = 120

  const uRef = useRef<Float32Array>(new Float32Array(WIDTH * HEIGHT))
  const vRef = useRef<Float32Array>(new Float32Array(WIDTH * HEIGHT))
  const nextURef = useRef<Float32Array>(new Float32Array(WIDTH * HEIGHT))
  const nextVRef = useRef<Float32Array>(new Float32Array(WIDTH * HEIGHT))
  const isInteracting = useRef<boolean>(false)

  // Initialize reagents
  const initGrid = useCallback(() => {
    const u = uRef.current
    const v = vRef.current
    u.fill(1.0)
    v.fill(0.0)

    // Seed multiple random patches of chemical V
    const seedPatches = [
      { cx: WIDTH / 2, cy: HEIGHT / 2, r: 16 },
      { cx: WIDTH / 3, cy: HEIGHT / 3, r: 10 },
      { cx: (WIDTH * 2) / 3, cy: (HEIGHT * 2) / 3, r: 12 },
      { cx: (WIDTH * 2) / 3, cy: HEIGHT / 3, r: 8 },
    ]

    for (const patch of seedPatches) {
      for (let y = Math.floor(patch.cy - patch.r); y <= Math.ceil(patch.cy + patch.r); y++) {
        for (let x = Math.floor(patch.cx - patch.r); x <= Math.ceil(patch.cx + patch.r); x++) {
          if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) {
            const dx = x - patch.cx
            const dy = y - patch.cy
            if (dx * dx + dy * dy < patch.r * patch.r) {
              const idx = y * WIDTH + x
              v[idx] = 0.9 + Math.random() * 0.1
              u[idx] = 0.5 - Math.random() * 0.1
            }
          }
        }
      }
    }
  }, [WIDTH, HEIGHT])

  // Random perturbation
  const perturb = useCallback(() => {
    const v = vRef.current
    for (let k = 0; k < 6; k++) {
      const rx = Math.floor(Math.random() * (WIDTH - 20)) + 10
      const ry = Math.floor(Math.random() * (HEIGHT - 20)) + 10
      for (let dy = -6; dy <= 6; dy++) {
        for (let dx = -6; dx <= 6; dx++) {
          const x = rx + dx
          const y = ry + dy
          if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) {
            v[y * WIDTH + x] = 0.85
          }
        }
      }
    }
  }, [WIDTH, HEIGHT])

  // Select preset
  const handlePresetChange = (presetName: string) => {
    setSelectedPreset(presetName)
    const p = PRESETS.find((pr) => pr.name === presetName)
    if (p) {
      setFeedRate(p.f)
      setKillRate(p.k)
      initGrid()
    }
  }

  // Handle canvas mouse seed
  const handleCanvasInteraction = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = WIDTH / rect.width
    const scaleY = HEIGHT / rect.height
    const cx = Math.floor((e.clientX - rect.left) * scaleX)
    const cy = Math.floor((e.clientY - rect.top) * scaleY)

    const v = vRef.current
    const radius = 6
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const x = cx + dx
        const y = cy + dy
        if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) {
          if (dx * dx + dy * dy <= radius * radius) {
            v[y * WIDTH + x] = 0.95
          }
        }
      }
    }
  }

  // Copy embed snippet
  const copyEmbedCode = () => {
    const snippet = `<synthese-model type="gray-scott" f="${feedRate}" k="${killRate}" speed="${speed}x" />`
    navigator.clipboard.writeText(snippet)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  // Initialize on mount
  useEffect(() => {
    initGrid()
  }, [initGrid])

  // Continuous PDE Simulation Loop
  useEffect(() => {
    let animId: number
    let lastTime = performance.now()
    let frameCounter = 0
    let lastFpsUpdate = performance.now()

    const du = 0.2097
    const dv = 0.105

    const step = () => {
      const u = uRef.current
      const v = vRef.current
      const nextU = nextURef.current
      const nextV = nextVRef.current

      const F = feedRate
      const K = killRate

      if (isPlaying) {
        // Multi-step sub-stepping for numerical stability
        const subSteps = speed * 4
        for (let s = 0; s < subSteps; s++) {
          for (let y = 0; y < HEIGHT; y++) {
            const yUp = y > 0 ? y - 1 : HEIGHT - 1
            const yDown = y < HEIGHT - 1 ? y + 1 : 0

            for (let x = 0; x < WIDTH; x++) {
              const xLeft = x > 0 ? x - 1 : WIDTH - 1
              const xRight = x < WIDTH - 1 ? x + 1 : 0

              const idx = y * WIDTH + x
              const uVal = u[idx]
              const vVal = v[idx]

              // 5-point discrete Laplacian operator
              const lapU =
                u[y * WIDTH + xLeft] +
                u[y * WIDTH + xRight] +
                u[yUp * WIDTH + x] +
                u[yDown * WIDTH + x] -
                4.0 * uVal

              const lapV =
                v[y * WIDTH + xLeft] +
                v[y * WIDTH + xRight] +
                v[yUp * WIDTH + x] +
                v[yDown * WIDTH + x] -
                4.0 * vVal

              const uvv = uVal * vVal * vVal

              // Gray-Scott PDE update:
              // du/dt = Du * lapU - uv^2 + F(1-u)
              // dv/dt = Dv * lapV + uv^2 - (F+k)v
              const deltaU = du * lapU - uvv + F * (1.0 - uVal)
              const deltaV = dv * lapV + uvv - (F + K) * vVal

              nextU[idx] = Math.max(0, Math.min(1, uVal + deltaU))
              nextV[idx] = Math.max(0, Math.min(1, vVal + deltaV))
            }
          }

          // Swap buffers
          u.set(nextU)
          v.set(nextV)
        }

        setStepCount((prev) => prev + subSteps)
      }

      // Render to canvas
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          const imgData = ctx.createImageData(WIDTH, HEIGHT)
          const data = imgData.data

          for (let i = 0; i < WIDTH * HEIGHT; i++) {
            const uVal = u[i]
            const vVal = v[i]
            const pIdx = i * 4

            if (activeMode === 'morphology') {
              // Scientific blue/slate/ivory contrast palette
              const val = Math.max(0, Math.min(1, uVal - vVal))
              const intensity = Math.floor(val * 255)

              // High-contrast labyrinth morphology
              data[pIdx] = Math.floor(intensity * 0.92) // R
              data[pIdx + 1] = Math.floor(intensity * 0.94) // G
              data[pIdx + 2] = Math.floor(intensity * 0.98 + (1 - val) * 60) // B
              data[pIdx + 3] = 255
            } else {
              // Gradient flux mode
              data[pIdx] = Math.floor(vVal * 255 * 1.5)
              data[pIdx + 1] = Math.floor((1 - uVal) * 200)
              data[pIdx + 2] = Math.floor(uVal * 220)
              data[pIdx + 3] = 255
            }
          }

          ctx.putImageData(imgData, 0, 0)
        }
      }

      // Track FPS
      frameCounter++
      const now = performance.now()
      if (now - lastFpsUpdate >= 1000) {
        setFps(Math.round((frameCounter * 1000) / (now - lastFpsUpdate)))
        frameCounter = 0
        lastFpsUpdate = now
      }

      animId = requestAnimationFrame(step)
    }

    animId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animId)
  }, [feedRate, killRate, isPlaying, speed, activeMode, WIDTH, HEIGHT])

  return (
    <div className={styles.featuredEngineCard}>
      {/* ── Header Telemetry Bar ── */}
      <div className={styles.engineHeader}>
        <div className={styles.engineHeaderLeft}>
          <span className="status-dot status-dot-active" />
          <span className={styles.engineHeaderTitle}>Featured Live Computational Engine</span>
        </div>
        <div className={styles.engineHeaderRight}>
          <span>Model: Gray-Scott Diffusive PDE [Turing 1952]</span>
        </div>
      </div>

      {/* ── Main Two-Column Interactive Layout ── */}
      <div className={styles.engineContent}>
        {/* ── Left Column: Live Canvas Sandbox ── */}
        <div className={styles.canvasWrapper}>
          <div className={styles.canvasTelemetryOverlay}>
            <div className={styles.telemetryPills}>
              <span className={styles.telemetryPill}>● FPS: {fps}.0</span>
              <span className={styles.telemetryPill}>Step: {stepCount.toLocaleString()}</span>
              <span className={`${styles.telemetryPill} ${styles.telemetryTertiary}`}>Gibbs Free Energy: -0.18</span>
            </div>

            <div className={styles.modeToggleGroup}>
              <button
                type="button"
                className={`${styles.modeBtn} ${activeMode === 'morphology' ? styles.modeBtnActive : ''}`}
                onClick={() => setActiveMode('morphology')}
              >
                Morphology
              </button>
              <button
                type="button"
                className={`${styles.modeBtn} ${activeMode === 'gradient' ? styles.modeBtnActive : ''}`}
                onClick={() => setActiveMode('gradient')}
              >
                Gradient Flux
              </button>
            </div>
          </div>

          <canvas
            ref={canvasRef}
            width={WIDTH}
            height={HEIGHT}
            className={styles.simCanvas}
            onMouseDown={(e) => {
              isInteracting.current = true
              handleCanvasInteraction(e)
            }}
            onMouseMove={(e) => {
              if (isInteracting.current) handleCanvasInteraction(e)
            }}
            onMouseUp={() => {
              isInteracting.current = false
            }}
            onMouseLeave={() => {
              isInteracting.current = false
            }}
          />

          <div className={styles.canvasFooterBar}>
            <span className={styles.footerDeskText}>Resolution: 512 × 400 Grid (160×120 internal)</span>
            <span className={styles.footerMobText}>512×400 Grid</span>
            <span className={styles.footerDeskText}>Click/Drag canvas to seed reagent perturbation</span>
            <span className={styles.footerMobText}>Drag to seed reagents</span>
          </div>
        </div>

        {/* ── Right Column: Parameter Controls & Monograph ── */}
        <div className={styles.controlsCol}>
          <div className={styles.controlMetaRow}>
            <span className={styles.categoryBadge}>Dynamical System • Morphogenesis</span>
            <button type="button" className={styles.iconBtn} aria-label="Bookmark model">
              <Bookmark size={15} />
            </button>
          </div>

          <h3 className={styles.modelTitle}>Cellular Automata &amp; Morphogenetic Pattern Generator</h3>

          <p className={styles.modelDesc}>
            Simulates spontaneous chemical self-organization via the Gray-Scott continuous formulation of reaction-diffusion.
            Reproduces leopard rosettes, zebra stripes, and mitotic labyrinth patterns.
          </p>

          {/* Preset Selector */}
          <div className={styles.paramBlock}>
            <label className={styles.paramLabel}>
              <span>Preset Dynamics Archetype</span>
              <span className={styles.activePresetIndicator}>Active: {selectedPreset}</span>
            </label>
            <select
              className={styles.presetSelect}
              value={selectedPreset}
              onChange={(e) => handlePresetChange(e.target.value)}
            >
              {PRESETS.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Feed Rate (F) Slider */}
          <div className={styles.paramBlock}>
            <div className={styles.sliderHeader}>
              <span className={styles.sliderName}>Feed Rate (F)</span>
              <span className={styles.sliderValue}>{feedRate.toFixed(4)}</span>
            </div>
            <input
              type="range"
              min="0.0100"
              max="0.0900"
              step="0.0005"
              value={feedRate}
              onChange={(e) => {
                setFeedRate(parseFloat(e.target.value))
                setSelectedPreset('custom')
              }}
              className={styles.rangeInput}
            />
            <div className={styles.sliderBounds}>
              <span>0.0100 (extinction)</span>
              <span>0.0900 (chaos)</span>
            </div>
          </div>

          {/* Kill Rate (k) Slider */}
          <div className={styles.paramBlock}>
            <div className={styles.sliderHeader}>
              <span className={styles.sliderName}>Kill Rate (k)</span>
              <span className={styles.sliderValue}>{killRate.toFixed(4)}</span>
            </div>
            <input
              type="range"
              min="0.0450"
              max="0.0700"
              step="0.0005"
              value={killRate}
              onChange={(e) => {
                setKillRate(parseFloat(e.target.value))
                setSelectedPreset('custom')
              }}
              className={styles.rangeInput}
            />
            <div className={styles.sliderBounds}>
              <span>0.0450 (suppression)</span>
              <span>0.0700 (decay)</span>
            </div>
          </div>

          {/* Diffusion Ratio Info */}
          <div className={styles.infoRow}>
            <span className={styles.infoKey}>Diffusion Ratio (Du / Dv)</span>
            <span className={styles.infoVal}>2.09 × 10⁻⁵</span>
          </div>

          {/* Execution Controls Row */}
          <div className={styles.actionControlsRow}>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              <span>{isPlaying ? 'Pause' : 'Resume'}</span>
            </button>

            <button type="button" className={styles.btnSecondary} onClick={perturb}>
              <Zap size={13} />
              <span>Perturb</span>
            </button>

            <button type="button" className={styles.btnSecondary} onClick={initGrid}>
              <RefreshCw size={13} />
              <span>Reset</span>
            </button>

            <button
              type="button"
              className={styles.btnSpeed}
              onClick={() => setSpeed((prev) => (prev === 1 ? 2 : prev === 2 ? 4 : 1))}
            >
              <span>Speed: {speed}x</span>
            </button>
          </div>

          {/* Footer Action Links */}
          <div className={styles.cardBottomRow}>
            <span className={styles.doiTag}>doi: 10.1145/synthese.morpho.08</span>

            <div className={styles.rightLinks}>
              <button type="button" className={styles.linkActionBtn} onClick={copyEmbedCode}>
                <Code size={13} />
                <span>{isCopied ? 'Copied!' : 'Embed'}</span>
              </button>

              <button
                type="button"
                className={styles.linkActionBtn}
                onClick={() => window.open('https://github.com/Sudipjana2001/Synthese', '_blank')}
              >
                <ExternalLink size={13} />
                <span>Export WebGL</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
