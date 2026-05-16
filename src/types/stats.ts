export type Granularity = 'day' | 'week' | 'month'

export interface CountryClicks {
  country: string
  clicks: number
}

export interface DeviceClicks {
  device: string
  clicks: number
}

export interface ReferrerClicks {
  referrer: string
  clicks: number
}

export interface TimeBucket {
  bucket: string
  clicks: number
}

export interface TopLinkDto {
  id: string
  shortCode: string
  originalUrl: string
  clicks: number
}

// All-time snapshot, cached ~15 min, no date range (brief sec. 3/7.1).
export interface OverviewStatsDto {
  totalLinks: number
  activeLinks: number
  totalClicks: number
  topLinks: TopLinkDto[]
}

export interface LinkStatsDto {
  id: string
  shortCode: string
  totalClicks: number
  uniqueIps: number
  lastClickAt: string | null
  byCountry: CountryClicks[]
  byDevice: DeviceClicks[]
}
