import type { ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/ErrorState'

interface ChartCardProps {
  title: string
  description?: string
  toolbar?: ReactNode
  isLoading?: boolean
  error?: unknown
  onRetry?: () => void
  isEmpty?: boolean
  emptyMessage?: string
  children: ReactNode
}

// One wrapper that gives every chart the same loading / error / empty
// treatment, so an absent dataset shows an explicit message instead of an
// empty axis (brief sec. 3).
export function ChartCard({
  title,
  description,
  toolbar,
  isLoading,
  error,
  onRetry,
  isEmpty,
  emptyMessage = 'No data for this selection yet.',
  children,
}: ChartCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div className="space-y-1">
          <CardTitle className="text-base">{title}</CardTitle>
          {description ? (
            <p className="text-muted-foreground text-xs">{description}</p>
          ) : null}
        </div>
        {toolbar}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[280px] w-full" />
        ) : error ? (
          <ErrorState
            title={`Could not load ${title.toLowerCase()}`}
            error={error}
            onRetry={onRetry ?? (() => {})}
          />
        ) : isEmpty ? (
          <div className="text-muted-foreground flex h-[280px] items-center justify-center text-sm">
            {emptyMessage}
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  )
}
