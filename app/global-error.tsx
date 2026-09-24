'use client'

import React from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          backgroundColor: '#0a0a0a',
          color: '#f0f0f0',
          padding: '2rem',
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '1rem' }}>
          Fatal Error
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#a0a0a0', maxWidth: '480px', marginBottom: '1.5rem' }}>
          A critical error prevented the application from loading. Please try refreshing the page.
        </p>
        {error.digest && (
          <p style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#6a6a6a', marginBottom: '1rem' }}>
            Digest: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          style={{
            padding: '10px 24px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#0a0a0a',
            backgroundColor: '#3b82f6',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Reload Page
        </button>
      </body>
    </html>
  )
}
