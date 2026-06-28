// ── Shared markdown renderer styles (blog detail + admin preview) ──────────
export const mdComponents = {
  // The page title is the sole <h1>; a leading "# Title" in post content
  // renders as <h2> (keeping the larger styling) to avoid a second h1.
  h1: ({ children }) => <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginTop: '2rem', marginBottom: '0.75rem', lineHeight: 1.3 }}>{children}</h2>,
  h2: ({ children }) => <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'rgba(255,255,255,0.92)', marginTop: '1.75rem', marginBottom: '0.6rem', lineHeight: 1.35 }}>{children}</h2>,
  h3: ({ children }) => <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginTop: '1.4rem', marginBottom: '0.5rem' }}>{children}</h3>,
  p:  ({ children }) => <p  style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, marginBottom: '1.1rem', fontSize: '15px' }}>{children}</p>,
  strong: ({ children }) => <strong style={{ color: '#fff', fontWeight: 700 }}>{children}</strong>,
  em:     ({ children }) => <em style={{ color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>{children}</em>,
  ul: ({ children }) => <ul style={{ paddingLeft: '1.4rem', marginBottom: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>{children}</ul>,
  ol: ({ children }) => <ol style={{ paddingLeft: '1.4rem', marginBottom: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, listStyleType: 'decimal' }}>{children}</ol>,
  li: ({ children }) => <li style={{ marginBottom: '0.25rem', fontSize: '15px' }}>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote style={{ borderLeft: '3px solid #E8155A', paddingLeft: '1rem', margin: '1.5rem 0', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
      {children}
    </blockquote>
  ),
  hr: () => <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '2rem 0' }} />,
  code: ({ inline, children }) => inline
    ? <code style={{ background: 'rgba(255,255,255,0.08)', padding: '0.15em 0.4em', borderRadius: '4px', fontSize: '13px', color: '#93c5fd' }}>{children}</code>
    : <pre style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1rem' }}><code style={{ fontSize: '13px', color: '#93c5fd' }}>{children}</code></pre>,
  a: ({ href, children }) => <a href={href} style={{ color: '#2E55E0', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">{children}</a>,
}
