'use client'

import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      className="container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        gap: 'var(--space-4)',
        padding: 'var(--space-16) var(--space-4)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-text-tertiary)',
        }}
      >
        Error 404 • Document Not Found
      </span>

      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-4xl)',
          fontWeight: 400,
          lineHeight: 'var(--leading-tight)',
          color: 'var(--color-text-primary)',
        }}
      >
        This page does not exist in the archive.
      </h1>

      <p
        style={{
          maxWidth: '480px',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-secondary)',
          lineHeight: 'var(--leading-normal)',
        }}
      >
        The manuscript, simulation, or note you are looking for may have been
        moved, retracted, or never published. Please verify the URL or return to
        the main journal.
      </p>

      <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 20px',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--color-text-inverse)',
            backgroundColor: 'var(--color-accent)',
            borderRadius: 'var(--radius-md)',
            transition: 'background-color var(--transition-fast)',
          }}
        >
          Return to Journal
        </Link>
        <Link
          href="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 20px',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            transition: 'border-color var(--transition-fast)',
          }}
        >
          Browse Publications
        </Link>
      </div>
    </main>
  )
}
