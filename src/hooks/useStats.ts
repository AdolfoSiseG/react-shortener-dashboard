import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/api/queryKeys'
import {
  getByCountry,
  getByDevice,
  getByReferrer,
  getByTime,
  getLinkStats,
  getOverview,
} from '@/api/stats'
import type { Granularity } from '@/types'

export function useOverview() {
  return useQuery({
    queryKey: queryKeys.statsOverview(),
    queryFn: getOverview,
  })
}

export function useByCountry() {
  return useQuery({
    queryKey: queryKeys.statsByCountry(),
    queryFn: getByCountry,
  })
}

export function useByDevice() {
  return useQuery({
    queryKey: queryKeys.statsByDevice(),
    queryFn: getByDevice,
  })
}

export function useByReferrer() {
  return useQuery({
    queryKey: queryKeys.statsByReferrer(),
    queryFn: getByReferrer,
  })
}

export function useByTime(
  params: { from: string; to: string; granularity: Granularity },
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: queryKeys.statsByTime(params),
    queryFn: () => getByTime(params),
    enabled: options?.enabled ?? true,
  })
}

export function useLinkStats(id: string) {
  return useQuery({
    queryKey: queryKeys.linkStats(id),
    queryFn: () => getLinkStats(id),
    enabled: Boolean(id),
  })
}
