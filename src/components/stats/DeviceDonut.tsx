import { Cell, Pie, PieChart } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { DeviceClicks } from '@/types'

const COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
]

const config = { clicks: { label: 'Clicks' } } satisfies ChartConfig

export function DeviceDonut({ data }: { data: DeviceClicks[] }) {
  return (
    <ChartContainer
      config={config}
      className="mx-auto aspect-square max-h-[280px]"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="device" />} />
        <Pie
          data={data}
          dataKey="clicks"
          nameKey="device"
          innerRadius={60}
          strokeWidth={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent nameKey="device" />} />
      </PieChart>
    </ChartContainer>
  )
}
