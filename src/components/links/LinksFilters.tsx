import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { LinkStatus } from '@/types'

export type StatusFilter = LinkStatus | 'all'

interface LinksFiltersProps {
  status: StatusFilter
  onStatusChange: (value: StatusFilter) => void
  search: string
  onSearchChange: (value: string) => void
}

export function LinksFilters({
  status,
  onStatusChange,
  search,
  onSearchChange,
}: LinksFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="grid w-full gap-1.5 sm:max-w-xs">
        <Label htmlFor="links-search">Search</Label>
        <div className="relative">
          <Search
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <Input
            id="links-search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Title or URL"
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="links-status">Status</Label>
        <Select
          value={status}
          onValueChange={(v) => onStatusChange(v as StatusFilter)}
        >
          <SelectTrigger id="links-status" className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
