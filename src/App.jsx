import { useEffect } from 'react'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import ContactPage from './pages/ContactPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'
import IslamabadPage from './pages/IslamabadPage'
import UsaClientsPage from './pages/UsaClientsPage'
import BusinessAnalyzerPage from './pages/BusinessAnalyzerPage'
import DynamicSeoPage from './pages/DynamicSeoPage'

import { AuthProvider, useAuth } from './admin/context/AuthContext'
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/pages/Dashboard'
import BlogCreate from './admin/pages/BlogCreate'
import BlogHistory from './admin/pages/BlogHistory'
import UserManagement from './admin/pages/UserManagement'
import Analytics from './admin/pages/Analytics'
import Settings from './admin/pages/Settings'

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

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) return <div className="min-h-screen bg-[#070C1B]" />
  if (!user) return <Navigate to="/admin/login" state={{ from: location }} replace />
  return children
}

function PublicLayout() {
  return (
    <div className="min-h-screen bg-bg-dark text-white">
      <CustomCursor />
      <Navbar />
      <Outlet />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <GATracker />
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
    </AuthProvider>
  )
}
