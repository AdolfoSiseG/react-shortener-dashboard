import type { AuthResponse } from '@/types'

// Auth storage strategy and its XSS tradeoff (brief sec. 3):
// - The ACCESS token lives in memory only. It never touches localStorage,
//   so an injected script cannot read it back from storage on a later load.
// - The REFRESH token lives in localStorage because the backend returns it
//   in the JSON body (there is no httpOnly-cookie option). This is a known,
//   accepted XSS exposure. Mitigations elsewhere: no
//   dangerouslySetInnerHTML, all rendered API data treated as untrusted.
// - Every /api/auth/refresh ROTATES the refresh token; the old one is
//   revoked server-side, so the new one must replace it immediately.

const REFRESH_KEY = 'rsd.refreshToken'

let accessToken: string | null = null

export function getAccessToken(): string | null {
  return accessToken
}

export function setAccessToken(token: string | null): void {
  accessToken = token
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY)
}

export function setRefreshToken(token: string): void {
  localStorage.setItem(REFRESH_KEY, token)
}

// Persist a fresh AuthResponse: access token in memory, the rotated refresh
// token into localStorage (replacing the now-revoked previous one).
export function setSession(auth: AuthResponse): void {
  setAccessToken(auth.accessToken)
  setRefreshToken(auth.refreshToken)
}

export function clearAuth(): void {
  accessToken = null
  localStorage.removeItem(REFRESH_KEY)
}
