import { format, isPast } from 'date-fns'
import type { ShortLinkDto } from '@/types'

export function formatDate(iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '—' : format(d, 'MMM d, yyyy')
}

// The public short URL is the backend origin + the short code (the
// unauthenticated redirect endpoint, brief sec. 7.1).
export function shortUrl(shortCode: string): string {
  return `${import.meta.env.VITE_API_URL}/${shortCode}`
}

// Backend status semantics: `expired` covers BOTH a past expiry date and
// an inactive link (brief sec. 3). The list DTO has no status field, so it
// is derived from isActive + expiresAt.
export function isLinkExpired(link: ShortLinkDto): boolean {
  if (!link.isActive) return true
  return link.expiresAt ? isPast(new Date(link.expiresAt)) : false
}
