import { useNavigate } from 'react-router-dom'
import { ChevronDown, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { MobileNav } from '@/components/layout/MobileNav'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Topbar() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  async function handleSignOut() {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <header className="bg-background flex h-14 items-center justify-between border-b px-4">
      <MobileNav />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="max-w-[12rem] gap-1.5">
            <span className="truncate">{user?.email ?? 'Account'}</span>
            <ChevronDown className="size-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="truncate font-normal">
            {user?.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleSignOut}>
            <LogOut className="size-4" aria-hidden="true" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
