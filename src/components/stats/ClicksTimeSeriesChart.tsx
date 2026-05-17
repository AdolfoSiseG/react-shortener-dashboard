import { useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { format } from 'date-fns'
import { useByTime } from '@/hooks/useStats'
import { ChartCard } from '@/components/stats/ChartCard'
import {
  DateRangeSelector,
  type RangePreset,
} from '@/components/stats/DateRangeSelector'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { Granularity } from '@/types'

const DAY_MS = 86_400_000

const chartConfig = {
  clicks: { label: 'Clicks', color: 'var(--chart-1)' },
} satisfies ChartConfig

function utcDayStart(d: Date) {
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
  )
}

function presetRange(days: number) {
  const now = new Date()
  const to = utcDayStart(new Date(now.getTime() + DAY_MS)) // include today
  const from = utcDayStart(new Date(now.getTime() - (days - 1) * DAY_MS))
  const granularity: Granularity = days <= 30 ? 'day' : 'week'
  return { from: from.toISOString(), to: to.toISOString(), granularity }
}

export function ClicksTimeSeriesChart() {
  const [preset, setPreset] = useState<RangePreset>('30')
  const [customFrom, setCustomFrom] = useState('')
  const [customTo, setCustomTo] = useState('')

  const customReady =
    preset === 'custom' &&
    customFrom !== '' &&
    customTo !== '' &&
    customFrom <= customTo

  const range = useMemo(() => {
    if (preset !== 'custom') return presetRange(Number(preset))
    if (!customReady) return presetRange(30) // placeholder; query disabled
    const fromD = new Date(`${customFrom}T00:00:00.000Z`)
    const toD = new Date(`${customTo}T00:00:00.000Z`)
    const spanDays = Math.round((toD.getTime() - fromD.getTime()) / DAY_MS) + 1
    const granularity: Granularity =
      spanDays <= 31 ? 'day' : spanDays <= 180 ? 'week' : 'month'
    return {
      from: fromD.toISOString(),
      to: new Date(toD.getTime() + DAY_MS).toISOString(),
      granularity,
    }
  }, [preset, customReady, customFrom, customTo])

  const enabled = preset !== 'custom' || customReady
  const query = useByTime(range, { enabled })

  const fmt = range.granularity === 'month' ? 'MMM yyyy' : 'MMM d'
  const data = useMemo(
    () =>
      (query.data ?? []).map((b) => ({
        label: format(new Date(b.bucket), fmt),
        clicks: b.clicks,
      })),
    [query.data, fmt],
  )

  return (
    <ChartCard
      title="Clicks over time"
      description="The date range applies to this chart only."
      toolbar={
        <DateRangeSelector
          preset={preset}
          onPresetChange={setPreset}
          customFrom={customFrom}
          customTo={customTo}
          onCustomFromChange={setCustomFrom}
          onCustomToChange={setCustomTo}
        />
      }
      isLoading={enabled && query.isLoading}
      error={query.isError ? query.error : undefined}
      onRetry={() => query.refetch()}
      isEmpty={!enabled || data.length === 0}
      emptyMessage={
        !enabled ? 'Pick a start and end date.' : 'No clicks in this range.'
      }
    >
      <ChartContainer config={chartConfig} className="h-[280px] w-full">
        <AreaChart data={data} margin={{ left: 4, right: 12, top: 8 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={24}
          />
          <YAxis
            allowDecimals={false}
            width={32}
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            dataKey="clicks"
            type="monotone"
            stroke="var(--color-clicks)"
            fill="var(--color-clicks)"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </ChartCard>
  )
}
