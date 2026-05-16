import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'

// Authenticated layout. The sidebar is desktop-only for now; a mobile nav
// drawer is a Fase 4 responsive-pass item (brief Week 16).
export function AppShell() {
  return (
    <div className="bg-muted/20 flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
