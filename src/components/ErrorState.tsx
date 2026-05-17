import { TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getErrorMessage } from '@/lib/problemDetails'

interface ErrorStateProps {
  title?: string
  error: unknown
  onRetry: () => void
}

export function ErrorState({
  title = 'Could not load data',
  error,
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-12 text-center"
    >
      <div className="bg-destructive/10 flex size-10 items-center justify-center rounded-full">
        <TriangleAlert
          className="text-destructive size-5"
          aria-hidden="true"
        />
      </div>
      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        <p className="text-muted-foreground text-sm">
          {getErrorMessage(error)}
        </p>
      </div>
      <Button variant="outline" size="sm" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}
