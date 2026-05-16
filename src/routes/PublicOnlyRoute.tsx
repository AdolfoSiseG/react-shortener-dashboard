import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { RouteLoader } from '@/components/layout/RouteLoader'

// Keeps an already-authenticated user (e.g. session restored on reload)
// off the login/register screens.
export function PublicOnlyRoute() {
  const { status } = useAuth()

  if (status === 'loading') return <RouteLoader />
  if (status === 'authenticated') return <Navigate to="/" replace />
  return <Outlet />
}
