import axios from 'axios'
import type { AuthResponse } from '@/types'

const baseURL = import.meta.env.VITE_API_URL

// Bare axios (no interceptors) so a refresh call cannot recurse into the
// 401 handler on its own failure. Lives in its own module to keep
// client.ts and the auth bootstrap from importing each other in a cycle.
export function refreshTokens(refreshToken: string): Promise<AuthResponse> {
  return axios
    .post<AuthResponse>(`${baseURL}/api/auth/refresh`, { refreshToken })
    .then((r) => r.data)
}
