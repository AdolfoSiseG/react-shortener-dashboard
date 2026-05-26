import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { navItems } from '@/components/layout/navItems'

export function Sidebar() {
  return (
    <aside className="bg-background hidden w-60 shrink-0 flex-col border-r md:flex">
      <div className="flex h-14 items-center gap-2 border-b px-4">
        <span
          aria-hidden="true"
          className="bg-brand size-6 rounded-md"
        />
        <span className="text-sm font-semibold">Shortener</span>
      </div>
      <nav className="flex flex-col gap-1 p-3" aria-label="Primary">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brand/10 text-brand'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
              )
            }
          >
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
