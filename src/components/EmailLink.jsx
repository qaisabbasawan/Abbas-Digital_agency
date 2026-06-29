import { useSyncExternalStore } from 'react'

/* Spam-bot-safe email. The address is assembled only on the client, so it never
   appears as harvestable plaintext in the prerendered/static HTML. We detect
   "mounted on client" with useSyncExternalStore (server snapshot = false), which
   is SSR-safe and produces no hydration mismatch: the server and the first
   client render both show the neutral label, then the real address appears. */
const USER = 'info'
const DOMAIN = 'abbasdigitalagency.com'

const emptySubscribe = () => () => {}
function useHydrated() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false)
}

export default function EmailLink({ className = '', children, label }) {
  const hydrated = useHydrated()
  if (!hydrated) return <span className={className}>{label || 'Email us'}</span>
  const addr = `${USER}@${DOMAIN}`
  return (
    <a href={`mailto:${addr}`} className={className}>
      {children || addr}
    </a>
  )
}

/* Plain text variant (no link) for places that just display the address. */
export function EmailText({ className = '' }) {
  const hydrated = useHydrated()
  return <span className={className}>{hydrated ? `${USER}@${DOMAIN}` : 'Email us'}</span>
}
