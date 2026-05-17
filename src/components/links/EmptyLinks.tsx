import type { ReactNode } from 'react'
import { LinkIcon } from 'lucide-react'

interface EmptyLinksProps {
  filtered: boolean
  action?: ReactNode
}

export function EmptyLinks({ filtered, action }: EmptyLinksProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-16 text-center">
      <div className="bg-muted flex size-10 items-center justify-center rounded-full">
        <LinkIcon className="text-muted-foreground size-5" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <p className="font-medium">
          {filtered ? 'No links match your filters' : 'No links yet'}
        </p>
        <p className="text-muted-foreground text-sm">
          {filtered
            ? 'Try clearing the search or status filter.'
            : 'Create your first short link to get started.'}
        </p>
      </div>
      {action}
    </div>
  )
}
