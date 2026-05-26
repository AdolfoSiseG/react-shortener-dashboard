import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navItems } from '@/components/layout/navItems'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open navigation"
        >
          <Menu className="size-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <span aria-hidden="true" className="bg-brand size-5 rounded-md" />
            Shortener
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-3" aria-label="Primary">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
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
      </SheetContent>
    </Sheet>
  )
}
