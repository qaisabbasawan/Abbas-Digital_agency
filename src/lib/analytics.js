/* Deferred Google Analytics loader.

   The gtag stub + config run inline in index.html (commands queue into
   window.dataLayer). This module injects the heavy googletagmanager.com
   script only after the first user interaction — or a short idle fallback —
   so it never blocks the main thread on initial load. Queued commands replay
   automatically once the real library arrives. */

const GA_ID = 'G-B7C1MH1KZQ'
const SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`

let loaded = false

function loadGA() {
  if (loaded) return
  loaded = true
  const s = document.createElement('script')
  s.async = true
  s.src = SRC
  document.head.appendChild(s)
  cleanup()
}

const EVENTS = ['mousemove', 'touchstart', 'keydown', 'scroll', 'click']
function cleanup() {
  EVENTS.forEach(e => window.removeEventListener(e, loadGA))
}

if (typeof window !== 'undefined') {
  EVENTS.forEach(e => window.addEventListener(e, loadGA, { once: true, passive: true }))
  // Fallback: load during idle time (max ~4s) so analytics still fires for
  // users who never interact before leaving.
  const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 4000))
  idle(() => loadGA(), { timeout: 4000 })
}
