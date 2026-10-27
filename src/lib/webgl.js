/* Decides whether this device should run the three.js scenes.

   WebGL without a GPU falls back to software rendering (SwiftShader, llvmpipe),
   where every frame of a full-screen scene is a long main-thread task — the
   page janks, batteries drain and PageSpeed's lab test (which has no GPU)
   records seconds of blocking time. Those devices, people who ask for reduced
   motion and Data Saver users get the static CSS fallback instead. */

const SOFTWARE_RENDERER = /swiftshader|llvmpipe|softpipe|software|basic render/i

let cached

export function canRender3D() {
  if (cached !== undefined) return cached
  cached = detect()
  return cached
}

function detect() {
  if (typeof window === 'undefined') return false
  try {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false
    if (navigator.connection?.saveData) return false

    // failIfMajorPerformanceCaveat makes the browser refuse a context it
    // would only be able to render in software
    const canvas = document.createElement('canvas')
    const opts = { failIfMajorPerformanceCaveat: true }
    const gl = canvas.getContext('webgl2', opts) || canvas.getContext('webgl', opts)
    if (!gl) return false

    const info = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : ''
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return !SOFTWARE_RENDERER.test(renderer)
  } catch {
    return false
  }
}
