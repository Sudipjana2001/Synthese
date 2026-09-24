'use client'

import React from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
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
          color: 'var(--color-error)',
        }}
      >
        Runtime Error • Unexpected Fault
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
        Something went wrong.
      </h1>

      <p
        style={{
          maxWidth: '480px',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-secondary)',
          lineHeight: 'var(--leading-normal)',
        }}
      >
        An unexpected error occurred while rendering this page. This has been
        logged and will be investigated.
      </p>

      {error.digest && (
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--color-text-tertiary)',
          }}
        >
          Error digest: {error.digest}
        </p>
      )}

      <button
        type="button"
        onClick={reset}
        style={{
          marginTop: 'var(--space-4)',
          padding: '10px 24px',
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--color-text-inverse)',
          backgroundColor: 'var(--color-accent)',
          borderRadius: 'var(--radius-md)',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color var(--transition-fast)',
        }}
      >
        Try Again
      </button>
    </main>
  )
}
