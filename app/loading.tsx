export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: '12px',
        color: 'var(--color-text-tertiary)',
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          border: '2px solid var(--color-border)',
          borderTopColor: 'var(--color-accent)',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        Loading…
      </span>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
