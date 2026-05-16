// Backend supports only these two status filters; `expired` already covers
// inactive AND past-expiry (brief sec. 3).
export type LinkStatus = 'active' | 'expired'

// The list/detail DTO. Note: no click count here — per-link totals come
// from /api/links/{id}/stats (brief sec. 7.1).
export interface ShortLinkDto {
  id: string
  shortCode: string
  originalUrl: string
  title: string | null
  expiresAt: string | null
  isActive: boolean
  hasPassword: boolean
  createdAt: string
}

export interface CreateShortLinkRequest {
  originalUrl: string
  title?: string
  customSlug?: string
  expiresAt?: string
  password?: string
}

// null/omit = no change. Clearing a field is not supported in v1.0
// (brief sec. 7.1).
export interface UpdateShortLinkRequest {
  title?: string
  expiresAt?: string
  isActive?: boolean
}
