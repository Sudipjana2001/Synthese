export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        width: '100%',
        color: 'var(--color-text-dim, #64748b)',
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '0.78rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.6rem 1.2rem',
          border: '1px solid var(--color-border, #e2e8f0)',
          borderRadius: '4px',
          background: 'var(--color-surface, #ffffff)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-accent, #0ea5e9)',
          }}
        />
        <span>Retrieving Archive State...</span>
      </div>
    </div>
  )
}
