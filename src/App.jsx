import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import SmoothScroll from './components/SmoothScroll'
import ScrollProgress from './components/ScrollProgress'

import { AuthProvider, useAuth } from './admin/context/AuthContext'

/* Route-level code splitting — each page (and its three.js scenes) loads
   on demand instead of shipping the whole site in one bundle. */
const LandingPage          = lazy(() => import('./pages/LandingPage'))
const AboutPage            = lazy(() => import('./pages/AboutPage'))
const ServicesPage         = lazy(() => import('./pages/ServicesPage'))
const PortfolioPage        = lazy(() => import('./pages/PortfolioPage'))
const ContactPage          = lazy(() => import('./pages/ContactPage'))
const ServiceDetailPage    = lazy(() => import('./pages/ServiceDetailPage'))
const BlogPage             = lazy(() => import('./pages/BlogPage'))
const BlogDetailPage       = lazy(() => import('./pages/BlogDetailPage'))
const IslamabadPage        = lazy(() => import('./pages/IslamabadPage'))
const UsaClientsPage       = lazy(() => import('./pages/UsaClientsPage'))
const BusinessAnalyzerPage = lazy(() => import('./pages/BusinessAnalyzerPage'))
const DynamicSeoPage       = lazy(() => import('./pages/DynamicSeoPage'))

const AdminLogin     = lazy(() => import('./admin/AdminLogin'))
const AdminLayout    = lazy(() => import('./admin/AdminLayout'))
const Dashboard      = lazy(() => import('./admin/pages/Dashboard'))
const BlogCreate     = lazy(() => import('./admin/pages/BlogCreate'))
const BlogHistory    = lazy(() => import('./admin/pages/BlogHistory'))
const UserManagement = lazy(() => import('./admin/pages/UserManagement'))
const Analytics      = lazy(() => import('./admin/pages/Analytics'))
const Settings       = lazy(() => import('./admin/pages/Settings'))

gsap.registerPlugin(ScrollTrigger)

const GA_ID = 'G-B7C1MH1KZQ'

function GATracker() {
  const location = useLocation()
  useEffect(() => {
    if (typeof window.gtag !== 'function') return
    window.gtag('config', GA_ID, {
      page_path: location.pathname + location.search,
    })
  }, [location])
  return null
}

/* Branded loading screen shown while a route chunk downloads */
function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-dark">
      <div className="relative w-14 h-14 mb-5">
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            background: 'conic-gradient(from 0deg, transparent 25%, #2E55E0 55%, #E8155A 80%, transparent 90%)',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))',
          }}
        />
      </div>
      <p className="text-white/30 text-[11px] tracking-[0.3em] uppercase">Loading</p>
    </div>
  )
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) return <div className="min-h-screen bg-[#070C1B]" />
  if (!user) return <Navigate to="/admin/login" state={{ from: location }} replace />
  return children
}

function PublicLayout() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-bg-dark text-white">
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <Outlet />
      </div>
    </SmoothScroll>
  )
}

export default function App({ ssrData } = {}) {
  return (
    <AuthProvider initialBlogs={ssrData?.blogs}>
      <GATracker />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* /admin → redirect to /admin/login (avoids wildcard conflict) */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

          {/* Admin login — public, outside protected layout */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected admin pages */}
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard"      element={<Dashboard />} />
            <Route path="analytics"      element={<Analytics />} />
            <Route path="blogs/create"   element={<BlogCreate />} />
            <Route path="blogs/history"  element={<BlogHistory />} />
            <Route path="users"          element={<UserManagement />} />
            <Route path="settings"       element={<Settings />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Public site */}
          <Route element={<PublicLayout />}>
            <Route path="/"               element={<LandingPage />} />
            <Route path="/about"          element={<AboutPage />} />
            <Route path="/services"       element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/portfolio"      element={<PortfolioPage />} />
            <Route path="/contact"        element={<ContactPage />} />
            <Route path="/blog"           element={<BlogPage />} />
            <Route path="/blog/:slug"     element={<BlogDetailPage />} />
            <Route path="/islamabad"      element={<IslamabadPage />} />
            <Route path="/usa-clients"    element={<UsaClientsPage />} />
            <Route path="/analyzer"       element={<BusinessAnalyzerPage />} />
            <Route path="/:slug"          element={<DynamicSeoPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  )
}
