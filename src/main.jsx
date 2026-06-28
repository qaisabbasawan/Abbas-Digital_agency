import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'

const rootEl = document.getElementById('root')
const ssrData = typeof window !== 'undefined' ? window.__SSG_DATA__ : undefined

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App ssrData={ssrData} />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)

/* Pages are prerendered to static HTML (see scripts/prerender.mjs). When that
   markup is present we hydrate it; otherwise (e.g. dev) we render fresh. */
if (rootEl.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootEl, app)
} else {
  ReactDOM.createRoot(rootEl).render(app)
}
