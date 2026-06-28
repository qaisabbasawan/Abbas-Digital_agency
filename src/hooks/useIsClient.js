import { useSyncExternalStore } from 'react'

/* Returns false during SSR/prerender and on the first client render (so markup
   matches the server output and hydration stays clean), then flips to true
   after mount. Use to gate browser-only / WebGL components. */
const subscribe = () => () => {}

export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,   // client
    () => false,  // server / prerender
  )
}
