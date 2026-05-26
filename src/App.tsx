import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/hooks/useAuth'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { PublicOnlyRoute } from '@/routes/PublicOnlyRoute'
import { RouteLoader } from '@/components/layout/RouteLoader'
import { Toaster } from '@/components/ui/sonner'

// Route-level code splitting: each page (and its heavy deps, e.g. Recharts
// on the dashboard) ships as its own chunk so the initial bundle stays
// small. Pages use named exports, so map them to `default` for React.lazy.
const Login = lazy(() =>
  import('@/pages/Login').then((m) => ({ default: m.Login })),
)
const Register = lazy(() =>
  import('@/pages/Register').then((m) => ({ default: m.Register })),
)
const Dashboard = lazy(() =>
  import('@/pages/Dashboard').then((m) => ({ default: m.Dashboard })),
)
const Links = lazy(() =>
  import('@/pages/Links').then((m) => ({ default: m.Links })),
)
const LinkDetail = lazy(() =>
  import('@/pages/LinkDetail').then((m) => ({ default: m.LinkDetail })),
)

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/links" element={<Links />} />
              <Route path="/links/:id" element={<LinkDetail />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
