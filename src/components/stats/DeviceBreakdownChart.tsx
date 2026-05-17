import { useByDevice } from '@/hooks/useStats'
import { ChartCard } from '@/components/stats/ChartCard'
import { DeviceDonut } from '@/components/stats/DeviceDonut'

export function DeviceBreakdownChart() {
  const query = useByDevice()
  const data = query.data ?? []

  return (
    <ChartCard
      title="Devices"
      description="All-time, not affected by the date range."
      isLoading={query.isLoading}
      error={query.isError ? query.error : undefined}
      onRetry={() => query.refetch()}
      isEmpty={data.length === 0}
      emptyMessage="No device data yet."
    >
      <DeviceDonut data={data} />
    </ChartCard>
  )
}
