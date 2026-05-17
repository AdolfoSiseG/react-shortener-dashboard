import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { CountryClicks } from '@/types'

const config = {
  clicks: { label: 'Clicks', color: 'var(--chart-1)' },
} satisfies ChartConfig

// Pure chart body (no query): reused by the dashboard breakdown and the
// per-link analytics, which feed it different data sources.
export function CountryBars({ data }: { data: CountryClicks[] }) {
  const top = [...data].sort((a, b) => b.clicks - a.clicks).slice(0, 8)
  return (
    <ChartContainer config={config} className="h-[280px] w-full">
      <BarChart data={top} layout="vertical" margin={{ left: 8, right: 16 }}>
        <CartesianGrid horizontal={false} />
        <XAxis
          type="number"
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          type="category"
          dataKey="country"
          width={90}
          tickLine={false}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="clicks" fill="var(--color-clicks)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
