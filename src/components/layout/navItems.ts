import { LayoutDashboard, Link2, type LucideIcon } from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  end: boolean
}

// Shared by the desktop Sidebar and the mobile nav drawer.
export const navItems: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/links', label: 'Links', icon: Link2, end: false },
]
