import { Link } from 'react-router-dom'
import { useOverview } from '@/hooks/useStats'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/ErrorState'

export function TopLinksCard() {
  const { data, isLoading, isError, error, refetch } = useOverview()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Top links</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-full" />
            ))}
          </div>
        ) : isError ? (
          <ErrorState
            title="Could not load top links"
            error={error}
            onRetry={() => refetch()}
          />
        ) : !data || data.topLinks.length === 0 ? (
          <p className="text-muted-foreground py-6 text-center text-sm">
            No clicks recorded yet.
          </p>
        ) : (
          <ol className="divide-y">
            {data.topLinks.map((link, i) => (
              <li
                key={link.id}
                className="flex items-center gap-3 py-2.5 text-sm"
              >
                <span className="text-muted-foreground w-4 tabular-nums">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/links/${link.id}`}
                    className="font-medium hover:underline"
                  >
                    {link.shortCode}
                  </Link>
                  <p className="text-muted-foreground truncate text-xs">
                    {link.originalUrl}
                  </p>
                </div>
                <span className="tabular-nums font-medium">
                  {link.clicks.toLocaleString()}
                </span>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  )
}
