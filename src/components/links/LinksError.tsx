import { TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getErrorMessage } from '@/lib/problemDetails'

interface LinksErrorProps {
  error: unknown
  onRetry: () => void
}

export function LinksError({ error, onRetry }: LinksErrorProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-16 text-center"
    >
      <div className="bg-destructive/10 flex size-10 items-center justify-center rounded-full">
        <TriangleAlert
          className="text-destructive size-5"
          aria-hidden="true"
        />
      </div>
      <div className="space-y-1">
        <p className="font-medium">Could not load links</p>
        <p className="text-muted-foreground text-sm">
          {getErrorMessage(error)}
        </p>
      </div>
      <Button variant="outline" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}
