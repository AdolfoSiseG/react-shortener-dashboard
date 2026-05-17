import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { queryKeys } from '@/api/queryKeys'
import {
  createLink,
  deleteLink,
  getLink,
  listLinks,
  updateLink,
} from '@/api/links'
import type {
  CreateShortLinkRequest,
  LinkStatus,
  UpdateShortLinkRequest,
} from '@/types'

export const LINKS_PAGE_SIZE = 10

interface UseLinksParams {
  page: number
  status?: LinkStatus
  search?: string
}

export function useLinks(params: UseLinksParams) {
  const search = params.search?.trim() ? params.search.trim() : undefined
  return useQuery({
    queryKey: queryKeys.links({
      page: params.page,
      status: params.status,
      search,
    }),
    queryFn: () =>
      listLinks({
        page: params.page,
        pageSize: LINKS_PAGE_SIZE,
        status: params.status,
        search,
      }),
    // Keeps the previous page visible while the next loads instead of
    // flashing an empty table on every pagination/filter change.
    placeholderData: keepPreviousData,
  })
}

export function useLink(id: string) {
  return useQuery({
    queryKey: queryKeys.link(id),
    queryFn: () => getLink(id),
    enabled: Boolean(id),
  })
}

export function useCreateLink() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: CreateShortLinkRequest) => createLink(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['links'] }),
  })
}

export function useUpdateLink(id: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: UpdateShortLinkRequest) => updateLink(id, body),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: ['links'] })
      qc.setQueryData(queryKeys.link(id), updated)
    },
  })
}

export function useDeleteLink() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteLink(id),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ['links'] })
      qc.removeQueries({ queryKey: queryKeys.link(id) })
    },
  })
}
