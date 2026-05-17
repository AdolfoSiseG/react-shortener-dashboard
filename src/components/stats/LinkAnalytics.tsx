import { useLinkStats } from '@/hooks/useStats'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/ErrorState'
import { CountryBars } from '@/components/stats/CountryBars'
import { DeviceDonut } from '@/components/stats/DeviceDonut'
import { formatDate } from '@/lib/format'

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="text-xl font-semibold tabular-nums">{value}</p>
    </div>
  )
}

export function LinkAnalytics({ id }: { id: string }) {
  const query = useLinkStats(id)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        {query.isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-[240px] w-full" />
          </div>
        ) : query.isError ? (
          <ErrorState
            title="Could not load analytics"
            error={query.error}
            onRetry={() => query.refetch()}
          />
        ) : !query.data || query.data.totalClicks === 0 ? (
          <p className="text-muted-foreground py-8 text-center text-sm">
            No clicks recorded yet.
          </p>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Stat
                label="Total clicks"
                value={query.data.totalClicks.toLocaleString()}
              />
              <Stat
                label="Unique IPs"
                value={query.data.uniqueIps.toLocaleString()}
              />
              <Stat
                label="Last click"
                value={formatDate(query.data.lastClickAt)}
              />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-medium">Top countries</p>
                {query.data.byCountry.length > 0 ? (
                  <CountryBars data={query.data.byCountry} />
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No location data yet.
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Devices</p>
                {query.data.byDevice.length > 0 ? (
                  <DeviceDonut data={query.data.byDevice} />
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No device data yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
