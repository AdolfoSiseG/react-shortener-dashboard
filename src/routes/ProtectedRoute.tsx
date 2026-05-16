import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { AppShell } from '@/components/layout/AppShell'
import { RouteLoader } from '@/components/layout/RouteLoader'

// Layout route guard: blocks the authenticated shell until the session is
// known, then redirects out if there is none.
export function ProtectedRoute() {
  const { status } = useAuth()

  if (status === 'loading') return <RouteLoader />
  if (status === 'unauthenticated') return <Navigate to="/login" replace />
  return <AppShell />
}
