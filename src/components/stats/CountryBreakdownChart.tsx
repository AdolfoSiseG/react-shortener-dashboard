import { useByCountry } from '@/hooks/useStats'
import { ChartCard } from '@/components/stats/ChartCard'
import { CountryBars } from '@/components/stats/CountryBars'

export function CountryBreakdownChart() {
  const query = useByCountry()
  const data = query.data ?? []

  return (
    <ChartCard
      title="Top countries"
      description="All-time, not affected by the date range."
      isLoading={query.isLoading}
      error={query.isError ? query.error : undefined}
      onRetry={() => query.refetch()}
      isEmpty={data.length === 0}
      emptyMessage="No location data yet."
    >
      <CountryBars data={data} />
    </ChartCard>
  )
}
