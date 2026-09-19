'use client'

import React, { useEffect, useRef } from 'react'

interface EnclosurePreviewProps {
  modelType: 'gray-scott' | 'boids' | 'bayes' | 'fourier' | 'loss-landscape' | 'markov' | 'matrix'
}

export function EnclosurePreview({ modelType }: EnclosurePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (modelType !== 'boids' && modelType !== 'fourier') return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number

    if (modelType === 'boids') {
      // 2D Boids Swarm simulation
      const boids = Array.from({ length: 28 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.8,
        vy: (Math.random() - 0.5) * 1.8,
      }))

      const drawBoids = () => {
        const isDark = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark'
        ctx.fillStyle = isDark ? '#090d16' : '#f8fafc'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw leader / attractor indicator
        ctx.strokeStyle = isDark ? 'rgba(59, 130, 246, 0.35)' : 'rgba(37, 99, 235, 0.25)'
        ctx.setLineDash([3, 3])
        ctx.beginPath()
        ctx.arc(canvas.width * 0.7, canvas.height * 0.5, 20, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])

        ctx.fillStyle = isDark ? '#60a5fa' : '#2563eb'
        ctx.font = '9px monospace'
        ctx.fillText('Attractor Gradient', canvas.width * 0.6, canvas.height * 0.85)

        for (const b of boids) {
          b.x += b.vx
          b.y += b.vy

          if (b.x < 0) b.x = canvas.width
          if (b.x > canvas.width) b.x = 0
          if (b.y < 0) b.y = canvas.height
          if (b.y > canvas.height) b.y = 0

          // Draw boid triangle
          const angle = Math.atan2(b.vy, b.vx)
          ctx.save()
          ctx.translate(b.x, b.y)
          ctx.rotate(angle)

          ctx.fillStyle = isDark ? '#93c5fd' : '#2563eb'
          ctx.beginPath()
          ctx.moveTo(6, 0)
          ctx.lineTo(-4, -3)
          ctx.lineTo(-4, 3)
          ctx.closePath()
          ctx.fill()

          ctx.restore()
        }

        animId = requestAnimationFrame(drawBoids)
      }

      drawBoids()
    } else if (modelType === 'fourier') {
      // Harmonic Fourier waveform animation
      let t = 0
      const drawFourier = () => {
        const isDark = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark'
        ctx.fillStyle = isDark ? '#0c101a' : '#f8fafc'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Axis
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.12)' : '#e2e8f0'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)
        ctx.lineTo(canvas.width, canvas.height / 2)
        ctx.stroke()

        // Composite Harmonic wave
        ctx.strokeStyle = isDark ? '#60a5fa' : '#2563eb'
        ctx.lineWidth = 1.8
        ctx.beginPath()
        for (let x = 0; x < canvas.width; x++) {
          const u = (x / canvas.width) * Math.PI * 6
          const y =
            canvas.height / 2 +
            Math.sin(u + t) * 16 +
            Math.sin(u * 2 + t * 1.5) * 8 +
            Math.sin(u * 3 + t * 0.8) * 4

          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        // Fundamental 1st Harmonic (dashed)
        ctx.strokeStyle = isDark ? 'rgba(96, 165, 250, 0.45)' : 'rgba(147, 197, 253, 0.6)'
        ctx.setLineDash([4, 4])
        ctx.beginPath()
        for (let x = 0; x < canvas.width; x++) {
          const u = (x / canvas.width) * Math.PI * 6
          const y = canvas.height / 2 + Math.sin(u + t) * 16
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
        ctx.setLineDash([])

        t += 0.03
        animId = requestAnimationFrame(drawFourier)
      }

      drawFourier()
    }

    return () => cancelAnimationFrame(animId)
  }, [modelType])

  // Canvas-based animations for Boids & Fourier
  if (modelType === 'boids') {
    return (
      <div style={{ height: '130px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
        <canvas ref={canvasRef} width={320} height={130} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
    )
  }

  if (modelType === 'fourier') {
    return (
      <div style={{ height: '130px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
        <canvas ref={canvasRef} width={320} height={130} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
    )
  }

  // SVG-based graphics for other mathematical enclosures
  if (modelType === 'bayes') {
    return (
      <div style={{ height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)' }}>
        <svg width="260" height="110" viewBox="0 0 260 110">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
            </marker>
          </defs>
          <line x1="60" y1="35" x2="120" y2="70" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <line x1="200" y1="35" x2="140" y2="70" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <circle cx="60" cy="35" r="18" fill="var(--color-bg-primary)" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="60" y="38" textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="var(--color-text-primary)">P(θ_A)</text>

          <circle cx="200" cy="35" r="18" fill="var(--color-bg-primary)" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="200" y="38" textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="var(--color-text-primary)">P(θ_B)</text>

          <circle cx="130" cy="80" r="22" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5" />
          <text x="130" y="83" textAnchor="middle" fontSize="9" fontWeight="600" fontFamily="var(--font-mono)" fill="#ffffff">P(X|θ)</text>
        </svg>
      </div>
    )
  }

  if (modelType === 'matrix') {
    return (
      <div style={{ height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)' }}>
        <svg width="260" height="110" viewBox="0 0 260 110">
          {/* Coordinate axes */}
          <line x1="20" y1="55" x2="240" y2="55" stroke="var(--color-border)" strokeWidth="1" />
          <line x1="130" y1="10" x2="130" y2="100" stroke="var(--color-border)" strokeWidth="1" />

          {/* Grid warp lines */}
          <line x1="50" y1="90" x2="210" y2="20" stroke="rgba(37, 99, 235, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Eigenvectors */}
          <line x1="130" y1="55" x2="80" y2="25" stroke="#ef4444" strokeWidth="2" />
          <text x="68" y="22" fontSize="9" fontWeight="600" fontFamily="var(--font-mono)" fill="#ef4444">λ₁v₁ = -2.1</text>

          <line x1="130" y1="55" x2="195" y2="35" stroke="#2563eb" strokeWidth="2" />
          <text x="198" y="32" fontSize="9" fontWeight="600" fontFamily="var(--font-mono)" fill="#2563eb">λ₂v₂ = 1.4</text>
        </svg>
      </div>
    )
  }

  if (modelType === 'loss-landscape') {
    return (
      <div style={{ height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)' }}>
        <svg width="260" height="110" viewBox="0 0 260 110">
          {/* Contour ellipses */}
          <ellipse cx="140" cy="55" rx="100" ry="40" fill="none" stroke="var(--color-border)" strokeWidth="1" />
          <ellipse cx="140" cy="55" rx="75" ry="30" fill="none" stroke="var(--color-border)" strokeWidth="1" />
          <ellipse cx="140" cy="55" rx="50" ry="20" fill="none" stroke="var(--color-border)" strokeWidth="1" />
          <ellipse cx="140" cy="55" rx="25" ry="10" fill="none" stroke="var(--color-border)" strokeWidth="1.5" />

          {/* Gradient descent trajectory */}
          <path
            d="M 60 25 Q 90 40, 110 50 T 138 55"
            fill="none"
            stroke="#ef4444"
            strokeWidth="1.8"
            strokeDasharray="4 3"
          />
          <circle cx="60" cy="25" r="4" fill="#3b82f6" />
          <circle cx="140" cy="55" r="4" fill="#ef4444" />
          <text x="80" y="20" fontSize="9" fontFamily="var(--font-mono)" fill="#ef4444">Adam Trajectory</text>
        </svg>
      </div>
    )
  }

  // Markov
  return (
    <div style={{ height: '130px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
      <div style={{ color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
        &ldquo;The epistemic <span style={{ color: 'var(--color-accent)', fontWeight: 600, borderBottom: '2px solid var(--color-accent)' }}>boundary [42%]</span> condition entails...&rdquo;
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>
        <span>Temperature: 0.72</span>
        <span>Entropy: 2.14 bits</span>
      </div>
      <div style={{ height: '4px', width: '100%', backgroundColor: 'var(--color-border)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ width: '72%', height: '100%', backgroundColor: 'var(--color-accent)' }} />
      </div>
    </div>
  )
}
