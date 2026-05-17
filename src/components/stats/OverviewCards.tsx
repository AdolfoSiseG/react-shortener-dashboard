import {
  CalendarDays,
  CircleCheck,
  Link2,
  MousePointerClick,
} from 'lucide-react'
import { useByTime, useOverview } from '@/hooks/useStats'
import { StatCard } from '@/components/stats/StatCard'
import { ErrorState } from '@/components/ErrorState'

function todayUtcRange() {
  const now = new Date()
  const from = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  ).toISOString()
  const to = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
  ).toISOString()
  return { from, to }
}

export function OverviewCards() {
  const overview = useOverview()

  const { from, to } = todayUtcRange()
  // "Clicks today" is NOT in the all-time overview payload; it is derived
  // from the only date-ranged endpoint as its own query (brief sec. 3).
  const today = useByTime({ from, to, granularity: 'day' })

  if (overview.isError) {
    return (
      <ErrorState
        title="Could not load overview"
        error={overview.error}
        onRetry={() => overview.refetch()}
      />
    )
  }

  const data = overview.data
  const clicksToday = today.data?.reduce((sum, b) => sum + b.clicks, 0)

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total clicks"
        value={data?.totalClicks?.toLocaleString()}
        icon={MousePointerClick}
        loading={overview.isLoading}
      />
      <StatCard
        label="Active links"
        value={data?.activeLinks?.toLocaleString()}
        icon={CircleCheck}
        loading={overview.isLoading}
      />
      <StatCard
        label="Total links"
        value={data?.totalLinks?.toLocaleString()}
        icon={Link2}
        loading={overview.isLoading}
      />
      <StatCard
        label="Clicks today"
        value={clicksToday?.toLocaleString()}
        icon={CalendarDays}
        loading={today.isLoading}
        hint="From time series (UTC day)"
      />
    </div>
  )
}
