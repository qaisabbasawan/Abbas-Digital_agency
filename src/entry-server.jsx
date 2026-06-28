import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'

/* Renders a single route to a complete HTML string for the prerenderer.
   renderToPipeableStream (not renderToString) is used so React.lazy route
   chunks and Suspense boundaries fully resolve before we capture the markup —
   onAllReady fires only once every boundary has settled. */
export function render(url, ssrData = {}) {
  return new Promise((resolve, reject) => {
    const helmetContext = {}
    let html = ''

    const collector = new Writable({
      write(chunk, _enc, cb) { html += chunk; cb() },
    })
    collector.on('finish', () => resolve({ html, helmet: helmetContext.helmet }))

    const { pipe, abort } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App ssrData={ssrData} />
        </StaticRouter>
      </HelmetProvider>,
      {
        onAllReady() { pipe(collector) },
        onError(err) { reject(err) },
      },
    )

    // Safety valve so a hung render can't block the whole build.
    setTimeout(() => abort(), 20000)
  })
}
