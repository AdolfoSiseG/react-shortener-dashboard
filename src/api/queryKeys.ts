import type { Granularity, LinkStatus } from '@/types'

// Central query-key factory. Keys are tuples (brief sec. 7.1):
//   ['links', { page, status, search }]
//   ['link', id]
//   ['link', id, 'stats']
//   ['stats', 'overview']                       (no params — all-time)
//   ['stats', 'byTime', { from, to, granularity }]
//   ['stats', 'byCountry' | 'byDevice' | 'byReferrer']
// Mutations invalidate by prefix: invalidating ['links'] drops every
// paginated/filtered variant; ['link', id] targets one detail.
export const queryKeys = {
  links: (params: { page: number; status?: LinkStatus; search?: string }) =>
    ['links', params] as const,
  link: (id: string) => ['link', id] as const,
  linkStats: (id: string) => ['link', id, 'stats'] as const,
  linkQr: (id: string, size: number) =>
    ['link', id, 'qr', size] as const,
  statsOverview: () => ['stats', 'overview'] as const,
  statsByTime: (params: {
    from: string
    to: string
    granularity: Granularity
  }) => ['stats', 'byTime', params] as const,
  statsByCountry: () => ['stats', 'byCountry'] as const,
  statsByDevice: () => ['stats', 'byDevice'] as const,
  statsByReferrer: () => ['stats', 'byReferrer'] as const,
} as const
