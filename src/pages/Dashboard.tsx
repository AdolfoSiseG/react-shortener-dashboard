import { OverviewCards } from '@/components/stats/OverviewCards'
import { TopLinksCard } from '@/components/stats/TopLinksCard'
import { ClicksTimeSeriesChart } from '@/components/stats/ClicksTimeSeriesChart'
import { CountryBreakdownChart } from '@/components/stats/CountryBreakdownChart'
import { DeviceBreakdownChart } from '@/components/stats/DeviceBreakdownChart'

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          All-time overview of your links.
        </p>
      </div>

      <OverviewCards />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ClicksTimeSeriesChart />
        </div>
        <div className="lg:col-span-1">
          <TopLinksCard />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <CountryBreakdownChart />
        <DeviceBreakdownChart />
      </div>
    </div>
  )
}
