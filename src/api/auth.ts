import { api } from '@/api/client'
import type { AuthResponse, LoginRequest, RegisterRequest } from '@/types'

export function login(body: LoginRequest): Promise<AuthResponse> {
  return api.post<AuthResponse>('/api/auth/login', body).then((r) => r.data)
}

export function register(body: RegisterRequest): Promise<AuthResponse> {
  return api.post<AuthResponse>('/api/auth/register', body).then((r) => r.data)
}

// Best-effort server-side revoke; the client clears local storage regardless.
export function logout(refreshToken: string): Promise<void> {
  return api.post('/api/auth/logout', { refreshToken }).then(() => undefined)
}
