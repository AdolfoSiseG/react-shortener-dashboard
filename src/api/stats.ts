import { api } from '@/api/client'
import type {
  CountryClicks,
  DeviceClicks,
  Granularity,
  LinkStatsDto,
  OverviewStatsDto,
  ReferrerClicks,
  TimeBucket,
} from '@/types'

// All-time snapshot, cached ~15 min server-side, no date range (brief 7.1).
export function getOverview(): Promise<OverviewStatsDto> {
  return api.get<OverviewStatsDto>('/api/stats/overview').then((r) => r.data)
}

export function getByCountry(): Promise<CountryClicks[]> {
  return api
    .get<CountryClicks[]>('/api/stats/by-country')
    .then((r) => r.data)
}

export function getByDevice(): Promise<DeviceClicks[]> {
  return api.get<DeviceClicks[]>('/api/stats/by-device').then((r) => r.data)
}

export function getByReferrer(): Promise<ReferrerClicks[]> {
  return api
    .get<ReferrerClicks[]>('/api/stats/by-referrer')
    .then((r) => r.data)
}

export interface ByTimeParams {
  from: string
  to: string
  granularity: Granularity
}

// The ONLY date-ranged endpoint; overview/by-* are all-time (brief 3).
export function getByTime(params: ByTimeParams): Promise<TimeBucket[]> {
  return api
    .get<TimeBucket[]>('/api/stats/by-time', { params })
    .then((r) => r.data)
}

export function getLinkStats(id: string): Promise<LinkStatsDto> {
  return api
    .get<LinkStatsDto>(`/api/links/${id}/stats`)
    .then((r) => r.data)
}
