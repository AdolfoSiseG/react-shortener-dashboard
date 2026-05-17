import { api } from '@/api/client'
import type {
  CreateShortLinkRequest,
  LinkStatus,
  PaginatedResult,
  ShortLinkDto,
  UpdateShortLinkRequest,
} from '@/types'

export interface ListLinksParams {
  page: number
  pageSize: number
  status?: LinkStatus
  search?: string
}

export function listLinks(
  params: ListLinksParams,
): Promise<PaginatedResult<ShortLinkDto>> {
  return api
    .get<PaginatedResult<ShortLinkDto>>('/api/links', { params })
    .then((r) => r.data)
}

export function getLink(id: string): Promise<ShortLinkDto> {
  return api.get<ShortLinkDto>(`/api/links/${id}`).then((r) => r.data)
}

export function createLink(
  body: CreateShortLinkRequest,
): Promise<ShortLinkDto> {
  return api.post<ShortLinkDto>('/api/links', body).then((r) => r.data)
}

export function updateLink(
  id: string,
  body: UpdateShortLinkRequest,
): Promise<ShortLinkDto> {
  return api
    .patch<ShortLinkDto>(`/api/links/${id}`, body)
    .then((r) => r.data)
}

export function deleteLink(id: string): Promise<void> {
  return api.delete(`/api/links/${id}`).then(() => undefined)
}

// QR is a binary PNG behind auth, so it must go through the auth client as
// a blob (a bare <img src> would 401). Same blob backs the download.
export function getLinkQrBlob(id: string, size = 300): Promise<Blob> {
  return api
    .get(`/api/links/${id}/qr`, {
      params: { size },
      responseType: 'blob',
    })
    .then((r) => r.data as Blob)
}
